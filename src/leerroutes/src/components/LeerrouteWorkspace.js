import * as d3 from "d3";

export class LeerrouteWorkspace extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.width = "100%";
    this.height = "100%";
    if (!this.leerrouteItems) this.leerrouteItems = []; // Prevents expected error
    this.createWorkspace();
  }

  // Define the observed attributes, distance for link distance
  static get observedAttributes() {
    return ["distance"];
  }

  // Called when an observed attribute has been added, removed, updated, or replaced
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "distance") {
      this.distance = parseInt(newValue);
      this.updateWorkspace();
    }
  }

  setLeerrouteItems(leerrouteItems, groupPositions) {
    console.log("Received leerrouteItems:", leerrouteItems);
    this.leerrouteItems = leerrouteItems;

    // Add a parents array to each item for metrolines
    this.leerrouteItems.forEach((item) => {
      item.children.forEach((childID) => {
        const childItem = this.leerrouteItems.find(
          (childItem) => childItem.id === childID,
        );
        if (childItem) {
          if (!childItem.parents) {
            childItem.parents = [];
          }
          childItem.parents.push(item.id);
        }
      });
    });

    console.log("Parents added: ", this.leerrouteItems);

    //Create links backwards starting with items that have no children
    const noChildrenItems = this.leerrouteItems.filter((item) => {
      return !item.children || item.children.length === 0;
    });

    //Make sure every item has a link array
    this.leerrouteItems.forEach((item) => {
      if (!item.links) {
        item.links = [];
      }
    });

    const createRecursiveLinks = function (
      item,
      scopedLeerrouteItems,
      colour,
      constraints = [],
    ) {
      if (!item.parents || item.parents.length === 0) return; // If no parent, stop recursion

      item.parents.forEach((parent) => {
        // Check if current item is listed in the constraints of the parent item
        if (
          constraints.some((constraint) => {
            if (typeof constraint === "string") {
              return constraint === parent;
            } else if (typeof constraint === "object") {
              return constraint.from === item.id && constraint.to === parent;
            }
          })
        ) {
          return;
        }

        const parentInstance = scopedLeerrouteItems.find(
          (findParent) => findParent.id === parent,
        );
        if (!parent) return;

        // Create the link
        const link = {
          source: parentInstance.id,
          target: item.id,
          value: 20,
          colour: colour,
        };

        // Add link to the parent item
        if (!parentInstance.links) {
          parentInstance.links = [];
        }

        // Check if the link already exists
        const linkExists = parentInstance.links.some(
          (existingLink) =>
            existingLink.source === link.source &&
            existingLink.target === link.target &&
            existingLink.value === link.value &&
            existingLink.colour === link.colour,
        );

        if (!linkExists) {
          parentInstance.links.push(link);
        }

        // Recursively create links for the parent
        createRecursiveLinks(parentInstance, scopedLeerrouteItems, colour, [
          ...constraints,
          ...parentInstance.constraints,
        ]);
      });
    };

    const predefinedColors = [
      "green",
      "red",
      "purple",
      "brown",
      "pink",
      "gray",
      "gold",
    ];
    let colorIndex = 0;
    noChildrenItems.forEach((item) => {
      createRecursiveLinks(
        item,
        this.leerrouteItems,
        predefinedColors[colorIndex],
        item.constraints,
      );
      colorIndex = (colorIndex + 1) % predefinedColors.length; // with cycle back just in case
    });

    console.log("Links added: ", this.leerrouteItems);

    // Calculate positions for each node based on group and position, fx and fy are fixed
    this.leerrouteItems.forEach((item) => {
      const groupPosition = groupPositions[item.groupPosition];
      if (groupPosition) {
        item.fx = groupPosition.x;
        item.fy = groupPosition.y + (groupPosition.offsetY || 0);

        if (!groupPosition.offsetY) {
          groupPosition.offsetY = 150; // Default offsetY
        } else {
          groupPosition.offsetY += 150; // Increment offsetY for next item
        }
      }
    });

    this.updateWorkspace();
  }

  createWorkspace() {
    // Create a container div for the simulation
    const container = document.createElement("div");
    container.style.width = this.width;
    container.style.height = this.height;
    this.shadowRoot.appendChild(container);

    this.container = container; // Store the container reference

    // Render the workspace content
    this.renderWorkspace();
  }

  updateWorkspace() {
    // Clear the existing content
    this.container.innerHTML = "";

    // Render the workspace content
    this.renderWorkspace();
  }

  renderWorkspace() {
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Get the width and height of the container so we can calculate center
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;

    // Simulation is essentially the workspace where all the nodes and links will appear
    const simulation = d3
      .forceSimulation(this.leerrouteItems)
      .force(
        "link",
        d3
          .forceLink(this.leerrouteItems.flatMap((d) => d.links))
          .id((d) => d.id)
          .distance(this.distance || 300),
      ) // Use this.distance or default to 300
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
      .on("tick", ticked);

    // Append SVG to the container
    const svg = d3
      .select(this.container)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    // Links between nodes
    const link = svg
      .append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(this.leerrouteItems.flatMap((d) => d.links))
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value))
      .attr("stroke", (d) => d.colour);

    // Node, a LeerrouteItem
    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(this.leerrouteItems)
      .join("g");

    // Append circles for nodes
    node
      .append("circle")
      .attr("r", 40)
      .attr("fill", (d) => color(d.group));

    // Append text for labels
    node
      .append("text")
      .text((d) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#000")
      .style("font-size", "14px");

    // A tick from the simulation
    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => {
          const yOffset = calculateYOffset(d);
          const totalHeight = d.source.links.length * 4;
          return d.source.y + yOffset - totalHeight / 2;
        })
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => {
          const yOffset = calculateYOffset(d);
          const totalHeight = d.source.links.length * 4;
          return d.target.y + yOffset - totalHeight / 2;
        });

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);

      function calculateYOffset(d) {
        const index = d.source.links.indexOf(d);
        return index * 4; // Increase offset by 2 for each additional link
      }
    }

    simulation.on("end", () => {
      simulation.stop();
    });
  }
}
