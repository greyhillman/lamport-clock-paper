import { css, CSSResultGroup, html, LitElement, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Point } from "./Point";
import { classMap } from "lit/directives/class-map.js";

declare global {
    interface HTMLElementTagNameMap {
        "directed-graph": DirectedGraph;
    }
}

interface Vertex {
    x: number;
    y: number;

    highlight?: boolean;
}

interface Edge {
    fromIndex: number;
    toIndex: number;
    highlight?: boolean;
}

@customElement("directed-graph")
export class DirectedGraph extends LitElement {
    @property({ attribute: false })
    vertices: Vertex[] = [];

    @property({ attribute: false })
    edges: Edge[] = [];

    @property({ type: Number, attribute: true })
    nodeRadius: number = 10;

    @property({ attribute: "health-period", type: Number, reflect: true })
    healthPeriod?: number;

    render() {
        const boundingBox = {
            minX: this.vertices.reduce((min, vertex) => Math.min(min, vertex.x), Number.MAX_VALUE),
            maxX: this.vertices.reduce((max, vertex) => Math.max(max, vertex.x), Number.MIN_VALUE),
            minY: this.vertices.reduce((min, vertex) => Math.min(min, vertex.y), Number.MAX_VALUE),
            maxY: this.vertices.reduce((max, vertex) => Math.max(max, vertex.y), Number.MIN_VALUE),
        };

        const buffer = this.nodeRadius + 5;

        boundingBox.minX -= buffer;
        boundingBox.maxX += buffer;
        boundingBox.minY -= buffer;
        boundingBox.maxY += buffer;

        const vertices = this.vertices.map((vertex, index) => {
            const classes = classMap({
                "vertex": true,
                "highlight": vertex.highlight ?? false,
            });

            return svg`
                <g class=${classes}>
                    <circle cx=${vertex.x} cy=${vertex.y} r=${this.nodeRadius} />
                    <text x=${vertex.x} y=${vertex.y} text-anchor="middle" dominant-baseline="middle">${index + 1}</text>
                </g>
            `;
        });

        const edges = this.edges.map(edge => {
            const fromVertex = this.vertices[edge.fromIndex];
            const toVertex = this.vertices[edge.toIndex];

            const from = new Point(fromVertex.x, fromVertex.y);
            const to = new Point(toVertex.x, toVertex.y);

            const direction = to.minus(from);
            const unitDirection = direction.scale(1 / direction.length);

            const start = from.add(unitDirection.scale(this.nodeRadius));
            const end = to.add(unitDirection.negate().scale(this.nodeRadius));

            const classes = classMap({
                "highlight": edge.highlight ?? false,
            });

            const link = svg`
                <line
                    class=${classes}
                    x1=${start.x}
                    y1=${start.y}
                    x2=${end.x}
                    y2=${end.y}
                />
            `;

            if (this.healthPeriod) {
                const delay = Math.random() * this.healthPeriod;
                const travelPercent = Math.random() * 0.8 + 0.2;

                const duration = `${this.healthPeriod}s`;
                const begin = `${delay}s`;

                const xValues = `${from.x}; ${to.x}; ${to.x}`;
                const yValues = `${from.y}; ${to.y}; ${to.y}`;

                const times = `0; ${travelPercent}; 1`;

                return svg`
                    ${link}
                    <line
                        class="message"
                        x1=${from.x}
                        y1=${from.y}
                        x2=${to.x}
                        y2=${to.x}
                    >
                        <animate attributeName="x2" calcMode="linear" values=${xValues} keyTimes=${times} dur=${duration} begin=${begin} repeatCount="indefinite" />
                        <animate attributeName="y2" calcMode="linear" values=${yValues} keyTimes=${times} dur=${duration} begin=${begin} repeatCount="indefinite" />
                    </line>
                `;
            } else {
                return link;
            }
        });

        const viewBox = `${boundingBox.minX} ${boundingBox.minY} ${boundingBox.maxX - boundingBox.minX} ${boundingBox.maxY - boundingBox.minY}`;

        return html`
        <svg viewBox=${viewBox}>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" stroke="context-stroke" fill="context-stroke" />
                </marker>
                <marker
                    id="message"
                    viewBox="-5 -5 10 10"
                    refX="0"
                    refY="0"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto">
                    <path d="M -4,-3 h 8 v 6 h -8 v -6 l 4,3 l 4,-3" />
                </marker>
            </defs>
            ${edges}
            ${vertices}
        </svg>`;
    }

    static vertexThickness = 2;
    static lineThickness = 2;

    static styles = css`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    svg circle {
        fill: var(--background-color);

        stroke: var(--font-color);
        stroke-width: ${DirectedGraph.vertexThickness};
    }

    svg g.vertex.highlight circle {
        stroke: var(--highlight-color);
    }

    svg line {
        stroke: var(--font-color);
        stroke-width: ${DirectedGraph.lineThickness};
        fill: none;

        marker-end: url(#arrow);
    }

    svg line.highlight {
        stroke: var(--highlight-color);
    }

    svg g.vertex text {
        font-size: 0.6em;
    }

    svg #message {
        fill: var(--background-color);
        stroke: var(--font-color);
    }

    svg line.message {
        marker-end: url(#message);
    }
    `;
}