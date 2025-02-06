import { css, CSSResultGroup, html, HTMLTemplateResult, LitElement, svg, SVGTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Point } from "./Point";
import { classMap } from "lit/directives/class-map.js";
import { SvgPathBuilder } from "./SvgPathBuilder";

declare global {
    interface HTMLElementTagNameMap {
        "space-time": SpaceTime;
    }
}

function spaceEvenly(num: number, length: number): number[] {
    if (num < 1) {
        return [];
    }

    return [...new Array(num).keys()]
        .map((_, index) => (index + 1) * length / (num + 1));
}

function spaceBetween(num: number, length: number): number[] {
    if (num < 1) {
        return [];
    } else if (num === 1) {
        return [length / 2];
    } else if (num === 2) {
        return [0, length];
    }

    return [...new Array(num).keys()]
        .map((_, index) => index * length / (num - 1));
}

function placeBetween(start: number, end: number, fraction: number): number {
    const length = end - start;

    return start + fraction * length;
}

interface ProcessEvent {
    id?: string;
    time: number;
    label?: HTMLTemplateResult;
}

interface Process {
    id?: string;
    events: ProcessEvent[];
    label?: string;
}

interface GlobalEventIndex {
    processIndex: number;
    eventIndex: number;
}

interface Message {
    from: GlobalEventIndex;
    to: GlobalEventIndex;
}

interface Tick {
    times: number[];
}

const fromList = (value: string | null, type: unknown): string[] => {
    if (value === null) {
        return [];
    } else {
        return value.split(" ");
    }
}

const messageConverter = (value: string | null, type: unknown): [string, string][] => {
    if (value === null) {
        return [];
    } else {
        return value.split(" ")
            .map(message => {
                const parts = message.split("->");

                return [parts[0], parts[1]];
            });
    }
}

@customElement("space-time")
export class SpaceTime extends LitElement {
    @property({ attribute: false })
    processes: Process[] = [];

    @property({ attribute: false })
    messages: Message[] = [];

    @property({ attribute: false })
    ticks: Tick[] = [];

    @property({ type: Number, attribute: "width", reflect: true })
    width: number = 100;

    @property({ type: Number, attribute: "height", reflect: true })
    height: number = 100;

    @property({ converter: fromList, attribute: "highlight-event", reflect: true })
    highlightEvent: string[] = [];

    @property({ attribute: "highlight-process", reflect: true })
    highlightProcess?: string;

    @property({ converter: messageConverter, attribute: "highlight-message", reflect: true })
    highlightMessage: [string, string][] = [];

    @property({ converter: messageConverter, attribute: "highlight-segment", reflect: true })
    highlightSegment: [string, string][] = [];

    render() {
        const width = this.width;
        const height = this.height;

        const eventMaxTime = this.processes
            .reduce((prev, process) => {
                const processMaxTime = process.events.reduce((prev, event) => {
                    return Math.max(prev, event.time);
                }, 0);

                return Math.max(prev, processMaxTime);
            }, 0);
        const tickMaxTime = this.ticks?.flatMap(x => x.times).reduce((prev, curr) => Math.max(prev, curr), 0);

        const maxTime = Math.max(eventMaxTime, tickMaxTime ?? 0);

        const processPosition = spaceBetween(this.processes.length, width * 0.7)
            .map(x => x + width * 0.15);

        const toPoint = (process: number, time: number) => {
            const x = processPosition[process];

            const preY = placeBetween(12, height - 12, time / maxTime);

            const y = height - preY;

            return new Point(x, y);
        }

        const segments = this.processes
            .map((process, processIndex) => {
                const events = process.events;
                const segments: SVGTemplateResult[] = [];

                const x = processPosition[processIndex];

                const pointFromTime = (time: number) => {
                    return toPoint(processIndex, time);
                }

                let start = new Point(x, height - 7);
                let end = new Point(x, 2);

                if (events.length < 1) {
                    segments.push(svg`
                        <line
                            class="segment"
                            x1=${start.x}
                            y1=${start.y}
                            x2=${end.x}
                            y2=${end.y}
                        />
                    `);
                } else {
                    const firstPoint = pointFromTime(events[0].time);

                    segments.push(svg`
                        <line
                            class="segment"
                            x1=${start.x}
                            y1=${start.y}
                            x2=${firstPoint.x}
                            y2=${firstPoint.y}
                        />
                    `);


                    for (let i = 1; i <= events.length - 1; i++) {
                        const fromEvent = events[i - 1];
                        const toEvent = events[i];

                        const previousPoint = pointFromTime(fromEvent.time);
                        const nextPoint = pointFromTime(toEvent.time);

                        const classes = classMap({
                            "segment": true,
                            "highlight": this.highlightSegment.some(segment => {
                                return segment[0] === fromEvent.id
                                    && segment[1] === toEvent.id;
                            }),
                        });

                        segments.push(svg`
                            <line
                                class=${classes}
                                x1=${previousPoint.x}
                                y1=${previousPoint.y}
                                x2=${nextPoint.x}
                                y2=${nextPoint.y}
                            />
                        `);
                    }

                    const lastPoint = pointFromTime(events[events.length - 1].time);

                    segments.push(svg`
                        <line
                            class="segment"
                            x1=${lastPoint.x}
                            y1=${lastPoint.y}
                            x2=${end.x}
                            y2=${end.y}
                        />
                    `);
                }

                const classes = classMap({
                    "process": true,
                    "highlight": !!this.highlightProcess && this.highlightProcess === process.id,
                });

                return svg`
                    <g class=${classes}>
                        <text
                            x=${x}
                            y=${height - 2}
                            text-anchor="middle"
                        >
                            ${process.label}
                        </text>
                        ${segments}
                    </g>
                `;
            });

        const events = this.processes.flatMap((process, processIndex) => {
            return process.events.map((event, eventIndex) => {
                const center = toPoint(processIndex, event.time);

                const width = 10;
                const height = 10;

                const classes = classMap({
                    "event": true,
                    "highlight": this.highlightEvent.some(x => x === event.id),
                });

                return svg`
                <g class=${classes} data-event=${event.id}>
                    <circle
                        cx=${center.x}
                        cy=${center.y}
                        r="2"
                    />
                    ${event.label
                        ? svg`
                            <foreignObject
                                class="label"
                                x=${center.x + 4}
                                y=${center.y - height / 2 - 1}
                                width=${width}
                                height=${height}
                            >
                                ${event.label}
                            </foreignObject>
                        ` : null}
                </g>
                `;
            })
        });

        const messages = this.messages.map((message, index) => {
            const fromPair = (pair: GlobalEventIndex): Point => {
                const processIndex = pair.processIndex;
                const eventIndex = pair.eventIndex;

                const time = this.processes[processIndex].events[eventIndex].time;

                return toPoint(processIndex, time);
            }
            const start = fromPair(message.from);
            const end = fromPair(message.to);

            const fromEventId = this.processes[message.from.processIndex].events[message.from.eventIndex].id;
            const toEventId = this.processes[message.to.processIndex].events[message.to.eventIndex].id;

            const motionPath = new SvgPathBuilder()
                .move.absolute(start)
                .line.absolute(end)
                .toString();

            const duration = 2000;

            const rotate = end.x > start.x
                ? "auto"
                : "auto-reverse";

            const highlight = this.highlightMessage.some(message => {
                return message[0] === fromEventId
                    && message[1] === toEventId;
            });

            const linkClass = classMap({
                "link": true,
                "highlight": highlight,
            });
            const messageClass = classMap({
                "message": true,
                "highlight": highlight,
            })

            return svg`
                <path d=${motionPath} class=${linkClass} />
                <g class=${messageClass}>
                    <path d="M -4,-3 h 8 v 6 h -8 v -6 l 4,3 l 4,-3" />
                    <animateMotion
                        dur=${`${duration}ms`}
                        keyPoints="0.1; 0.9"
                        keyTimes="0; 1"
                        repeatCount="indefinite"
                        calcMode="linear"
                        fill="freeze"
                        rotate=${rotate}
                        path=${motionPath}
                    />
                    <animate
                        attributeName="opacity"
                        values="0; 1; 1; 0"
                        keyTimes="0; 0.3; 0.7; 1"
                        dur=${`${duration}ms`}
                        repeatCount="indefinite"
                    />
                </g>
            `;
        });

        const ticks = this.ticks.map(tick => {
            const points = tick.times
                .map((time, index) => toPoint(index, time))
                .map(point => `${point.x},${point.y}`);

            return svg`
                <polyline
                    class="tick"
                    points=${points.join(" ")}
                />
            `;
        });

        const svgClasses = classMap({
            "space-time": true,
        });

        const viewbox = `0 0 ${width} ${height}`;

        return html`
            <svg class=${svgClasses} viewBox=${viewbox}>
                <defs>
                    <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
                    </marker>
                </defs>

                ${ticks}
                ${messages}
                ${segments}
                ${events}
            </svg>
    `;
    }

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

    #arrow path {
        stroke: none;
    }

    g.process line.segment {
        stroke: var(--font-color);
        stroke-width: 1;
        fill: none;
    }

    g.process line.segment.highlight {
        stroke: var(--highlight-color);
    }

    g.process.highlight line.segment {
        stroke: var(--highlight-color);
    }

    g.process line.segment:last-of-type {
        marker-end: url(#arrow);
    }

    g.process text {
        font-size: 0.3em;
    }

    g.event circle {
        fill: var(--font-color);
        stroke: none;
    }

    g.event.highlight circle {
        fill: var(--highlight-color);
    }

    g.event .label {
        font-size: 6px;
        font-family: var(--font-family);
    }

    g.event .label math {
        font-family: var(--math-font-family);
    }

    math msub > :not(:first-child) {
        font-size: 4px;
    }

    path.link {
        stroke: var(--font-color);
        stroke-width: 1;

        marker-end: url(#arrow);
    }
    path.link.highlight {
        stroke: var(--highlight-color);
    }

    g.message path {
        stroke: var(--font-color);
        fill: var(--background-color);
    }

    g.message.highlight path {
        stroke: var(--highlight-color);
    }

    polyline.tick {
        stroke: var(--font-color);
        stroke-width: 1;
        fill: none;
        stroke-dasharray: 2 2;
    }
    `;
}