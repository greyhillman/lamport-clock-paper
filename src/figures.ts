import { DirectedGraph } from "./DirectedGraph";

const graph = document.getElementById("physical-clock-directed-graph") as DirectedGraph;
graph.vertices = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 50, y: 50 },
    { x: 100, y: 100 },
    { x: 50, y: 100 },
    { x: 0, y: 100 },
];
graph.edges = [
    { fromIndex: 0, toIndex: 1 },
    { fromIndex: 1, toIndex: 2 },
    { fromIndex: 2, toIndex: 0 },
    { fromIndex: 3, toIndex: 2 },
    { fromIndex: 4, toIndex: 3 },
    { fromIndex: 5, toIndex: 2 },
    { fromIndex: 0, toIndex: 5 },
    { fromIndex: 5, toIndex: 4 },
];

const healthGraph = document.getElementById("physical-clock-directed-graph-health") as DirectedGraph;
healthGraph.vertices = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 50, y: 50 },
    { x: 100, y: 100 },
    { x: 50, y: 100 },
    { x: 0, y: 100 },
];
healthGraph.edges = [
    { fromIndex: 0, toIndex: 1 },
    { fromIndex: 1, toIndex: 2 },
    { fromIndex: 2, toIndex: 0 },
    { fromIndex: 3, toIndex: 2 },
    { fromIndex: 4, toIndex: 3 },
    { fromIndex: 5, toIndex: 2 },
    { fromIndex: 0, toIndex: 5 },
    { fromIndex: 5, toIndex: 4 },
];

document.getElementById("physical-clock-directed-graph-health-period")?.addEventListener("change", event => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;

    console.log(value);

    healthGraph.healthPeriod = +value;
});

const diameterGraph = document.getElementById("diameter-graph") as DirectedGraph;
diameterGraph.vertices = [
    { x: 0, y: 0 },
    { x: 100, y: 0, highlight: true },
    { x: 50, y: 50 },
    { x: 100, y: 100, highlight: true },
    { x: 50, y: 100 },
    { x: 0, y: 100 },
];
diameterGraph.edges = [
    { fromIndex: 0, toIndex: 1 },
    { fromIndex: 1, toIndex: 2, highlight: true },
    { fromIndex: 2, toIndex: 0, highlight: true },
    { fromIndex: 3, toIndex: 2 },
    { fromIndex: 4, toIndex: 3, highlight: true },
    { fromIndex: 5, toIndex: 2 },
    { fromIndex: 0, toIndex: 5, highlight: true },
    { fromIndex: 5, toIndex: 4, highlight: true },
];
