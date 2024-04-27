import * as d3 from 'd3';

// https://d3js.org/d3-force#d3-force
// https://observablehq.com/@d3/force-directed-graph/2?intent=fork
export class LeerrouteWorkspace extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const width = 928;
        const height = 600;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Sample data, in the future this should get set by test-site
        const data = {
            nodes: [
                { id: 'A', group: 1 },
                { id: 'B', group: 2 },
                { id: 'C', group: 1 }
            ],
            links: [
                { source: 'A', target: 'B', value: 5 },
                { source: 'B', target: 'C', value: 8 },
                { source: 'C', target: 'A', value: 3 }
            ]
        };

        const links = data.links.map(d => ({ ...d }));
        const nodes = data.nodes.map(d => ({ ...d }));

        // Simulation is essentially the workspace where all the nodes and links will appear
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

        // svg is used to display the nodes and links
        const svg = d3.select(this.shadowRoot)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        // Links between nodes, in the future this should be done dynamically to create metro lines
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll()
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        // Node, in the future this should show the semesters like OOSDD
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll()
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", d => color(d.group));

        node.append("title")
            .text(d => d.id);

        //Drag them, to be removed in the future
        node.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        //A tick from the simulation, seems like you can change things in a tick akin to a useEffect() but for every simulation tick
        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }

        // Drag events, to be removed
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
        // Drag events

        simulation.on("end", () => {
            simulation.stop();
        });
    }
}
