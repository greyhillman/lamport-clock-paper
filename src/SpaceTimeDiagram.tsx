import { createContext, JSX } from "preact";
import { SvgPathBuilder } from "./SvgPathBuilder";
import { useContext, useMemo, useState } from "preact/hooks";
import { toClass } from "./misc";
import { edge, Edge, getPaths, Graph, Path } from "./graph";
import { Point } from "./Point";
import { createWavyLine, Line, Polyline } from "./Svg";


export type PathSelection = [
    Edge<Point | undefined>,
    (start?: Point) => void,
    (end?: Point) => void,
];

export function usePathSelection(): PathSelection {
    const [start, setStart] = useState<Point | undefined>();
    const [end, setEnd] = useState<Point | undefined>();

    return [
        edge(start, end),
        (start?: Point) => {
            setStart(start);
        },
        (end?: Point) => {
            setEnd(end);
        },
    ];
}

interface SpaceTimeEvent {
    time: number;
    label?: JSX.Element;
    highlight?: boolean;
}

interface SpaceTimeProcess {
    events: SpaceTimeEvent[];
    label?: string;
    highlight?: boolean;
}

interface SpaceTimeMessage {
    from: readonly [number, number];
    to: readonly [number, number];
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

interface DiagramProps {
    width: number;
    height: number;
    processes: SpaceTimeProcess[];
    messages?: SpaceTimeMessage[];
    ticks?: number[][];

    path?: PathSelection;
}

function placeBetween(start: number, end: number, fraction: number): number {
    const length = end - start;

    return start + fraction * length;
}

const PathSelectionContext = createContext<PathSelection>([
    edge(undefined, undefined),
    () => { },
    () => { },
]);

export function StaticSpaceTimeDiagram(props: DiagramProps) {
    const width = props.width;
    const height = props.height;
    const data = {
        processes: props.processes,
        messages: props.messages,
    };

    const eventMaxTime = props.processes
        .reduce((prev, process) => {
            const processMaxTime = process.events.reduce((prev, event) => {
                return Math.max(prev, event.time);
            }, 0);

            return Math.max(prev, processMaxTime);
        }, 0);
    const tickMaxTime = props.ticks?.flatMap(x => x).reduce((prev, curr) => Math.max(prev, curr), 0);

    const maxTime = Math.max(eventMaxTime, tickMaxTime ?? 0);

    const processPosition = spaceBetween(data.processes.length, width * 0.7)
        .map(x => x + width * 0.15);

    const toPoint = (process: number, time: number) => {
        const x = processPosition[process];

        const preY = placeBetween(12, height - 12, time / maxTime);

        const y = height - preY;

        return new Point(x, y);
    }

    const pathSelection = props.path ?? useContext(PathSelectionContext);

    const pathStart = pathSelection[0].start;
    const pathEnd = pathSelection[0].end;

    const totalPath = useMemo<Path<Point>>(() => {
        if (!pathStart || !pathEnd) {
            return [];
        }

        const graph: Graph<Point> = [];
        props.processes.forEach((process, processIndex) => {
            process.events.forEach((event, index) => {
                if (index < process.events.length - 1) {
                    const start = new Point(processIndex, index);
                    const end = new Point(processIndex, index + 1);

                    graph.push(edge(start, end));
                }
            });
        });

        props.messages?.forEach(message => {
            const start = new Point(message.from[0], message.from[1]);
            const end = new Point(message.to[0], message.to[1]);

            graph.push(edge(start, end));
        })

        const paths = getPaths<Point>(graph, pathStart, pathEnd, (left, right) => left.equals(right, 0.001));

        const selectedPath: Path<Point> = paths.reduce((shortest, path) => {
            if (shortest.length) {
                if (path.length < shortest.length) {
                    return path;
                }

                return shortest
            } else {
                return path;
            }
        }, []);

        return selectedPath;
    }, [pathStart?.x, pathStart?.y, pathEnd?.x, pathEnd?.y]);

    const segments = data.processes
        .map((process, processIndex) => {
            const events = process.events;
            const segments: JSX.Element[] = [];

            const x = processPosition[processIndex];

            const pointFromTime = (time: number) => {
                return toPoint(processIndex, time);
            }

            let start = new Point(x, height - 7);
            let end = new Point(x, 2);

            if (events.length < 1) {
                segments.push(<Line class="segment" start={start} end={end} />);
            } else {
                const firstPoint = pointFromTime(events[0].time);

                segments.push(<Line class="segment" start={start} end={firstPoint} />);


                for (let i = 1; i <= events.length - 1; i++) {
                    const previousPoint = pointFromTime(events[i - 1].time);
                    const nextPoint = pointFromTime(events[i].time);

                    const classes = toClass({
                        "segment": true,
                        "highlight": (process.highlight ?? false)
                            || (
                                totalPath.some(point => point.equals(new Point(processIndex, i - 1), 0.01))
                                && totalPath.some(point => point.equals(new Point(processIndex, i), 0.01))
                            ),
                    });

                    segments.push(<Line class={classes} start={previousPoint} end={nextPoint} />);
                }

                const lastPoint = pointFromTime(events[events.length - 1].time);

                segments.push(<Line class="segment" start={lastPoint} end={end} />);
            }

            return <g class="process">
                <text x={x} y={height - 2} text-anchor="middle">{process.label}</text>
                {segments}
            </g>
        });

    const events = data.processes.flatMap((process, processIndex) => {
        return process.events.map((event, eventIndex) => {
            const center = toPoint(processIndex, event.time);

            const width = 10;
            const height = 10;

            const classes = toClass({
                "highlight": (event.highlight ?? false)
                    || (process.highlight ?? false)
                    || totalPath.some(point => point.equals(new Point(processIndex, eventIndex), 0.01))
                    || (pathSelection[0].start?.equals(new Point(processIndex, eventIndex), 0.01) ?? false),
            });

            return <g class="event">
                <circle
                    cx={center.x}
                    cy={center.y}
                    r={2}
                    class={classes}
                    onClick={event => {
                        pathSelection[1](new Point(processIndex, eventIndex));
                    }}
                    onMouseEnter={event => {
                        pathSelection[2](new Point(processIndex, eventIndex));
                    }}
                    onMouseLeave={event => {
                        pathSelection[2]();
                    }}
                />
                {event.label
                    ? <foreignObject class="label" x={center.x + 4} y={center.y - height / 2 - 1} width={width} height={height}>
                        {event.label}
                    </foreignObject>
                    : null}
            </g>
        })
    });

    const messages = (data.messages || []).map((message, index) => {
        const fromPair = (pair: readonly [number, number]): Point => {
            const processIndex = pair[0];
            const eventIndex = pair[1];

            const time = data.processes[processIndex].events[eventIndex].time;

            return toPoint(processIndex, time);
        }
        const start = fromPair(message.from);
        const end = fromPair(message.to);

        const motionPath = new SvgPathBuilder()
            .move.absolute(start)
            .line.absolute(end)
            .toString();

        const duration = 2000;
        const begin = duration * index / (data.messages || []).length;

        const rotate = end.x > start.x
            ? "auto"
            : "auto-reverse";

        const pathClass = toClass({
            "link": true,
            "highlight": totalPath.some(point => point.equals(new Point(message.from[0], message.from[1]), 0.01))
                && totalPath.some(point => point.equals(new Point(message.to[0], message.to[1]), 0.01)),
        });

        return <>
            <path d={createWavyLine(start, end)} class={pathClass} />
            <g class="message">
                <path d="M -4,-3 h 8 v 6 h -8 v -6 l 4,3 l 4,-3" />
                <animateMotion
                    dur={`${duration}ms`}
                    keyPoints="0.1; 0.9"
                    keyTimes="0; 1"
                    repeatCount="indefinite"
                    calcMode="linear"
                    fill="freeze"
                    rotate={rotate}
                    path={motionPath}
                    begin={`${begin}ms`}
                />
                <animate
                    attributeName="opacity"
                    values="0; 1; 1; 0"
                    keyTimes="0; 0.3; 0.7; 1"
                    dur={`${duration}ms`}
                    repeatCount="indefinite"
                    begin={`${begin}ms`}
                />
            </g>
        </>
    });

    const ticks = props.ticks?.map(times => {
        const points = times
            .map((time, index) => toPoint(index, time));

        return <Polyline class="tick" points={points} />
    });

    const onMouseLeaveDiagram = (event: MouseEvent) => {
        pathSelection[1]();
        pathSelection[2]();
    }

    const svgClasses = toClass({
        "space-time": true,
        "selectable": !!props.path,
    });

    return (
        <svg class={svgClasses} viewBox={`0 0 ${width} ${height}`} onMouseLeave={onMouseLeaveDiagram}>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
                <marker
                    id="arrow-highlight"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>

            {ticks}
            {messages}
            {segments}
            {events}
        </svg>
    )
}
