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