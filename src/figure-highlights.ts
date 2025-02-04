for (const node of document.querySelectorAll("msub[data-event]")) {
    const element = node as HTMLElement;

    console.log(element.dataset.event);

    const targets = document.querySelectorAll(`figure svg g[data-event="${element.dataset.event}"]`);

    element.addEventListener("mouseenter", (event) => {
        for (const node of targets) {
            node.classList.add("highlight");
        }
    });
    element.addEventListener("mouseleave", (event) => {
        for (const node of targets) {
            node.classList.remove("highlight");
        }
    });
}

for (const node of document.querySelectorAll("span[data-process]")) {
    const element = node as HTMLElement;

    console.log(element.dataset.process);

    const targets = document.querySelectorAll(`figure svg g[data-process="${element.dataset.process}"]`);

    element.addEventListener("mouseenter", (event) => {
        for (const node of targets) {
            node.classList.add("highlight");
        }
    });
    element.addEventListener("mouseleave", (event) => {
        for (const node of targets) {
            node.classList.remove("highlight");
        }
    });
}

function addHighlightToPath(start: string, end: string, edges: [string, string][]) {
    const vertices = new Set<string>();
    edges.forEach(edge => {
        vertices.add(edge[0]);
        vertices.add(edge[1]);
    });

    const node = document.querySelector(`mrow[data-event-from="${start}"][data-event-to="${end}"]`);
    const element = node as HTMLElement;

    element.addEventListener("mouseenter", event => {
        for (const vertex of vertices) {
            for (const node of document.querySelectorAll(`[data-event="${vertex}"]`)) {
                node.classList.add("highlight");
            }
        }

        for (const edge of edges) {
            for (const node of document.querySelectorAll(`[data-event-from="${edge[0]}"][data-event-to="${edge[1]}"]`)) {
                node.classList.add("highlight");
            }
        }
    });
    element.addEventListener("mouseleave", event => {
        for (const vertex of vertices) {
            for (const node of document.querySelectorAll(`[data-event="${vertex}"]`)) {
                node.classList.remove("highlight");
            }
        }

        for (const edge of edges) {
            for (const node of document.querySelectorAll(`[data-event-from="${edge[0]}"][data-event-to="${edge[1]}"]`)) {
                node.classList.remove("highlight");
            }
        }
    });
}

addHighlightToPath("p1", "r4", [
    ["p1", "q2"],
    ["q2", "q3"],
    ["q3", "q4"],
    ["q4", "r3"],
    ["r3", "r4"],
]);
addHighlightToPath("p2", "p3", [
    ["p2", "p3"],
]);