import * as d3 from 'd3';

export class LeerrouteWorkspace extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.width = '100%';
        this.height = '100%';
        if (!this.leerrouteItems) this.leerrouteItems = [] // Prevents expected error
        this.createWorkspace()
    }

    // Define the observed attributes, distance for link distance
    static get observedAttributes() {
        return ['distance'];
    }

    // Called when an observed attribute has been added, removed, updated, or replaced
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'distance') {
            this.distance = parseInt(newValue);
            this.updateWorkspace();
        }
    }

    setLeerrouteItems(leerrouteItems) {
        console.log("Received leerrouteItems:", leerrouteItems);
        this.leerrouteItems = leerrouteItems;
        this.updateWorkspace();
    }

    createWorkspace() {
        // Create a container div for the simulation
        const container = document.createElement('div');
        container.style.width = this.width;
        container.style.height = this.height;
        this.shadowRoot.appendChild(container);

        this.container = container; // Store the container reference

        // Render the workspace content
        this.renderWorkspace();
    }

    updateWorkspace() {
        // Clear the existing content
        this.container.innerHTML = '';

        // Render the workspace content
        this.renderWorkspace();
    }

    renderWorkspace() {
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Get the width and height of the container so we can calculate center
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;

        // Simulation is essentially the workspace where all the nodes and links will appear
        const simulation = d3.forceSimulation(this.leerrouteItems)
            .force("link", d3.forceLink(this.leerrouteItems.flatMap(d => d.links)).id(d => d.id).distance(this.distance || 300)) // Use this.distance or default to 300
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
            .on("tick", ticked);

        // Append SVG to the container
        const svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

        // Links between nodes
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll()
            .data(this.leerrouteItems.flatMap(d => d.links))
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        // Node, a LeerrouteItem
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll()
            .data(this.leerrouteItems)
            .join("g");

        // Append circles for nodes
        node.append("circle")
            .attr("r", 40)
            .attr("fill", d => color(d.group));

        // Append text for labels
        node.append("text")
            .text(d => d.id)
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .attr("fill", "#000")
            .style("font-size", "14px");

        // A tick from the simulation
        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("transform", d => `translate(${d.x},${d.y})`);
        }

        simulation.on("end", () => {
            simulation.stop();
        });
    }
}
