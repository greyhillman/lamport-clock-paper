import { SpaceTime } from "./SpaceTime";

document.addEventListener("DOMContentLoaded", () => {
    for (const element of document.querySelectorAll<HTMLElement>("msub[data-event]")) {
        const targets = document.querySelectorAll(`space-time`);

        const eventId = element.dataset.event!;

        element.addEventListener("mouseenter", (event) => {
            for (const target of targets) {
                target.highlightEvent = [eventId];
                target.highlightMessage = [];
                target.highlightProcess = undefined;
                target.highlightSegment = [];
            }
        });
        element.addEventListener("mouseleave", (event) => {
            for (const target of targets) {
                target.highlightEvent = [];
                target.highlightMessage = [];
                target.highlightProcess = undefined;
                target.highlightSegment = [];
            }
        });
    }

    for (const element of document.querySelectorAll<HTMLElement>("span[data-process]")) {
        const targets = document.querySelectorAll("space-time");

        element.addEventListener("mouseenter", (event) => {
            for (const target of targets) {
                target.highlightEvent = [];
                target.highlightMessage = [];
                target.highlightSegment = [];
                target.highlightProcess = element.dataset.process;
            }
        });
        element.addEventListener("mouseout", (event) => {
            for (const target of targets) {
                target.highlightEvent = [];
                target.highlightMessage = [];
                target.highlightSegment = [];
                target.highlightProcess = undefined;
            }
        });
    }

    function addHighlightToPath(start: string, end: string, options: {
        messages?: [string, string][],
        segments?: [string, string][],
    }) {
        const vertices = new Set<string>();
        (options.messages || []).forEach(edge => {
            vertices.add(edge[0]);
            vertices.add(edge[1]);
        });
        (options.segments || []).forEach(edge => {
            vertices.add(edge[0]);
            vertices.add(edge[1]);
        });

        const element = document.querySelector<HTMLElement>(`mrow[data-event-from="${start}"][data-event-to="${end}"]`);
        if (!element) {
            return;
        }

        const targets = document.querySelectorAll("space-time");

        element.addEventListener("mouseenter", event => {
            for (const target of targets) {
                target.highlightEvent = [...vertices];
                target.highlightMessage = options.messages || [];
                target.highlightSegment = options.segments || [];
            }
        });
        element.addEventListener("mouseleave", event => {
            for (const target of targets) {
                target.highlightEvent = [];
                target.highlightMessage = [];
                target.highlightSegment = [];
            }
        });

        for (const child of element.querySelectorAll<HTMLElement>("[data-event]")) {
            child.addEventListener("mouseleave", event => {
                for (const target of targets) {
                    target.highlightEvent = [...vertices];
                    target.highlightMessage = options.messages || [];
                    target.highlightSegment = options.segments || [];
                }
            });
        }
    }

    addHighlightToPath("p1", "r4", {
        messages: [
            ["p1", "q2"],
            ["q4", "r3"],
        ],
        segments: [
            ["q2", "q3"],
            ["q3", "q4"],
            ["r3", "r4"],
        ],
    });
    addHighlightToPath("p2", "p3", {
        segments: [
            ["p2", "p3"],
        ]
    });
});
