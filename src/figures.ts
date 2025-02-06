import { html } from "lit";
import { DirectedGraph } from "./DirectedGraph";
import { SpaceTime } from "./SpaceTime";

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

let example = document.getElementById("happened-before-condition-1-example-1") as SpaceTime;
example.processes = [
    {
        label: "a process",
        events: [
            { time: 0, label: html`<math><mi>a</mi></math>` },
            { time: 10, label: html`<math><mi>b</mi></math>` },
        ]
    }
];

example = document.getElementById("happened-before-condition-1-example-2") as SpaceTime;
example.processes = [
    {
        label: "a process",
        events: [
            { time: 0, label: html`<math><mi>a</mi></math>` },
            { time: 10 },
            { time: 20 },
            { time: 30, label: html`<math><mi>b</mi></math>` },
        ]
    }
]

example = document.getElementById("happened-before-condition-2-example") as SpaceTime;
example.processes = [
    {
        label: "sender",
        events: [
            { time: 0, label: html`<math><mi>a</mi></math>` },
        ]
    },
    {
        label: "receiver",
        events: [
            { time: 10, label: html`<math><mi>b</mi></math>` },
        ]
    },
];
example.messages = [
    { from: { processIndex: 0, eventIndex: 0 }, to: { processIndex: 1, eventIndex: 0 } },
];

example = document.getElementById("happened-before-condition-3-example-1") as SpaceTime;
example.processes = [
    {
        events: [
            { time: 0, label: html`<math><mi>a</mi></math>` },
            { time: 10, label: html`<math><mi>b</mi></math>` },
        ]
    },
    {
        events: [
            { time: 20, label: html`<math><mi>c</mi></math>` },
        ]
    },
];
example.messages = [
    { from: { processIndex: 0, eventIndex: 1 }, to: { processIndex: 1, eventIndex: 0 } },
];

example = document.getElementById("happened-before-condition-3-example-2") as SpaceTime;
example.processes = [
    {
        events: [
            { time: 0, label: html`<math><mi>a</mi></math>` },
        ]
    },
    {
        events: [
            { time: 10, label: html`<math><mi>b</mi></math>` },
            { time: 20, label: html`<math><mi>c</mi></math>` },
        ]
    },
];
example.messages = [
    { from: { processIndex: 0, eventIndex: 0 }, to: { processIndex: 1, eventIndex: 0 } },
];

example = document.getElementById("figure-1-diagram") as SpaceTime;
example.processes = [
    {
        id: "P",
        label: "process P",
        events: [
            {
                time: 0,
                id: "p1",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 20,
                id: "p2",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 40,
                id: "p3",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 60,
                id: "p4",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
        ]
    },
    {
        id: "Q",
        label: "process Q",
        events: [
            {
                time: 0,
                id: "q1",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 10,
                id: "q2",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 20,
                id: "q3",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 30,
                id: "q4",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
            {
                time: 40,
                id: "q5",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>5</mn>
                    </msub>
                </math>`
            },
            {
                time: 50,
                id: "q6",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>6</mn>
                    </msub>
                </math>`
            },
            {
                time: 60,
                id: "q7",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>7</mn>
                    </msub>
                </math>`
            },
        ]
    },
    {
        id: "R",
        label: "process R",
        events: [
            {
                time: 0,
                id: "r1",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 20,
                id: "r2",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 40,
                id: "r3",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 60,
                id: "r4",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
        ]
    }
];
example.messages = [
    { from: { processIndex: 0, eventIndex: 0 }, to: { processIndex: 1, eventIndex: 1 } },

    { from: { processIndex: 1, eventIndex: 0 }, to: { processIndex: 0, eventIndex: 1 } },
    { from: { processIndex: 1, eventIndex: 0 }, to: { processIndex: 2, eventIndex: 3 } },
    { from: { processIndex: 1, eventIndex: 3 }, to: { processIndex: 2, eventIndex: 2 } },
    { from: { processIndex: 1, eventIndex: 4 }, to: { processIndex: 0, eventIndex: 3 } },

    { from: { processIndex: 2, eventIndex: 1 }, to: { processIndex: 1, eventIndex: 6 } },
];


example = document.getElementById("figure-2-diagram") as SpaceTime;
example.processes = [
    {
        id: "P",
        label: "process P",
        events: [
            {
                time: 0,
                id: "p1",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 20,
                id: "p2",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 40,
                id: "p3",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 60,
                id: "p4",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
        ]
    },
    {
        id: "Q",
        label: "process Q",
        events: [
            {
                time: 0,
                id: "q1",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 10,
                id: "q2",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 20,
                id: "q3",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 30,
                id: "q4",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
            {
                time: 40,
                id: "q5",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>5</mn>
                    </msub>
                </math>`
            },
            {
                time: 50,
                id: "q6",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>6</mn>
                    </msub>
                </math>`
            },
            {
                time: 60,
                id: "q7",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>7</mn>
                    </msub>
                </math>`
            },
        ]
    },
    {
        id: "R",
        label: "process R",
        events: [
            {
                time: 0,
                id: "r1",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 20,
                id: "r2",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 40,
                id: "r3",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 60,
                id: "r4",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
        ]
    }
];
example.messages = [
    { from: { processIndex: 0, eventIndex: 0 }, to: { processIndex: 1, eventIndex: 1 } },

    { from: { processIndex: 1, eventIndex: 0 }, to: { processIndex: 0, eventIndex: 1 } },
    { from: { processIndex: 1, eventIndex: 0 }, to: { processIndex: 2, eventIndex: 3 } },
    { from: { processIndex: 1, eventIndex: 3 }, to: { processIndex: 2, eventIndex: 2 } },
    { from: { processIndex: 1, eventIndex: 4 }, to: { processIndex: 0, eventIndex: 3 } },

    { from: { processIndex: 2, eventIndex: 1 }, to: { processIndex: 1, eventIndex: 6 } },
];
example.ticks = [
    { times: [2, 2, 2] },
    { times: [7, 7, 7] },
    { times: [30, 13, 15] },
    { times: [44, 16, 22] },

    { times: [47, 23, 30] },
    { times: [50, 33, 37] },
    { times: [55, 43, 47] },
    { times: [70, 53, 57] },
]


example = document.getElementById("figure-3-diagram") as SpaceTime;
example.processes = [
    {
        id: "P",
        label: "process P",
        events: [
            {
                time: 0,
                id: "p1",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 20,
                id: "p2",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 30,
                id: "p3",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 70,
                id: "p4",
                label: html`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
        ]
    },
    {
        id: "Q",
        label: "process Q",
        events: [
            {
                time: 0,
                id: "q1",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 20,
                id: "q2",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 40,
                id: "q3",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 50,
                id: "q4",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
            {
                time: 60,
                id: "q5",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>5</mn>
                    </msub>
                </math>`
            },
            {
                time: 70,
                id: "q6",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>6</mn>
                    </msub>
                </math>`
            },
            {
                time: 80,
                id: "q7",
                label: html`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>7</mn>
                    </msub>
                </math>`
            },
        ]
    },
    {
        id: "R",
        label: "process R",
        events: [
            {
                time: 0,
                id: "r1",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>1</mn>
                    </msub>
                </math>`
            },
            {
                time: 30,
                id: "r2",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>2</mn>
                    </msub>
                </math>`
            },
            {
                time: 60,
                id: "r3",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>3</mn>
                    </msub>
                </math>`
            },
            {
                time: 80,
                id: "r4",
                label: html`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>4</mn>
                    </msub>
                </math>`
            },
        ]
    }
];
example.messages = [
    { from: { processIndex: 0, eventIndex: 0 }, to: { processIndex: 1, eventIndex: 1 } },

    { from: { processIndex: 1, eventIndex: 0 }, to: { processIndex: 0, eventIndex: 1 } },
    { from: { processIndex: 1, eventIndex: 0 }, to: { processIndex: 2, eventIndex: 3 } },
    { from: { processIndex: 1, eventIndex: 3 }, to: { processIndex: 2, eventIndex: 2 } },
    { from: { processIndex: 1, eventIndex: 4 }, to: { processIndex: 0, eventIndex: 3 } },

    { from: { processIndex: 2, eventIndex: 1 }, to: { processIndex: 1, eventIndex: 6 } },
];
example.ticks = [
    { times: [5, 5, 5] },
    { times: [15, 15, 15] },
    { times: [25, 25, 25] },
    { times: [35, 35, 35] },

    { times: [45, 45, 45] },
    { times: [55, 55, 55] },
    { times: [65, 65, 65] },
    { times: [75, 75, 75] },
]