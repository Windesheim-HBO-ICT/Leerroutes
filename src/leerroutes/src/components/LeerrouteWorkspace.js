import * as d3 from 'd3';

export class LeerrouteWorkspace extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setLeerrouteItems(leerrouteItems) {
        this.leerrouteItems = leerrouteItems;
        this.render();
    }

    render() {
        const width = 928;
        const height = 600;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Simulation is essentially the workspace where all the nodes and links will appear
        const simulation = d3.forceSimulation(this.leerrouteItems)
            .force("link", d3.forceLink(this.leerrouteItems.flatMap(d => d.links)).id(d => d.id).distance(250))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

        // svg is used to display the nodes and links, the actual workspace
        const svg = d3.select(this.shadowRoot)
            .append("svg")
            .attr("style", "width: 100%; height: 100%;");

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

        //A tick from the simulation
        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("transform", d => `translate(${d.x},${d.y})`);
        }

        //Drag events
        node.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        // End Drag events

        simulation.on("end", () => {
            simulation.stop();
        });
    }
}
