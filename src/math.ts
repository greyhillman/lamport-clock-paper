function addNotationToggle(element: HTMLElement) {
    const titleAttr = element.attributes.getNamedItem("title");
    if (!titleAttr) {
        return;
    }

    const textNode = document.createElement("mtext");
    textNode.textContent = titleAttr.value;
    textNode.className = "description";

    const onNotationClick = (event: MouseEvent) => {
        event.stopPropagation();

        textNode.addEventListener("click", (event: MouseEvent) => {
            event.stopPropagation();

            textNode.replaceWith(element);

            const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, node => {
                const element = node as HTMLElement;

                if (element.tagName === "MTEXT") {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_SKIP;
            });

            const textElementsToChange: HTMLElement[] = [];

            while (walker.nextNode()) {
                const element = walker.currentNode as HTMLElement;

                textElementsToChange.push(element);
            }

            for (const element of textElementsToChange) {
                element.click();
            }
        });

        element.replaceWith(textNode);
    };

    element.addEventListener("click", onNotationClick);
}

for (const root of document.getElementsByTagName("math")) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);

    while (walker.nextNode()) {
        addNotationToggle(walker.currentNode as HTMLElement);
    }
}
