import { ComponentChild, ComponentChildren, createContext, toChildArray, VNode } from "preact";
import { Point, SvgPathBuilder } from "./SvgPathBuilder";
import { useContext, useMemo, useState } from "preact/hooks";
import { toClass } from "./misc";
import { HighlightContext, useHighlightContext } from "./HighlightContext";
import { LinkData } from "./Link";
import { edge, Edge, getPaths, Graph, Path } from "./graph";


function toGraph(data: DiagramData): Graph<readonly [number, number]> {
    const edges: Graph<readonly [number, number]> = [];

    data.events.forEach((process, processIndex) => {
        process.forEach((event, index) => {
            if (index < process.length - 1) {
                edges.push(edge([processIndex, index], [processIndex, index + 1]));
            }
        })
    })

    data.messages.forEach(message => {
        edges.push(edge(message.start, message.end));
    })

    return edges;
}

interface DiagramData {
    events: number[][];
    messages: Edge<readonly [number, number]>[];
}

const DiagramContext = createContext<null | DiagramData>(null);

function useDiagram(children: ComponentChildren): DiagramData {
    const context = useContext(DiagramContext);
    if (context) {
        return context;
    }

    const points: number[][] = [];
    const edges: Edge<readonly [number, number]>[] = [];

    toChildArray(children).forEach((child, index) => {
        if (typeof child === "string" || typeof child === "number") {
            return;
        }

        if (typeof child.type === "string") {
            return
        }

        if (child.type === Process) {
            const process = child as VNode<ProcessProps>;

            const times: number[] = [];
            toChildArray(process.props.children).forEach((child, index) => {
                if (typeof child === "string" || typeof child === "number") {
                    return;
                }

                if (typeof child.type === "string") {
                    return;
                }

                if (child.type !== Event) {
                    return;
                }

                const event = child as VNode<EventProps>;

                times.push(event.props.time);
            });

            points.push(times);
        } else if (child.type === Message) {
            const message = child as VNode<MessageProps>;

            edges.push({
                start: message.props.start,
                end: message.props.end,
            });
        }

    });

    const [events, setEvents] = useState<number[][]>(points);
    const [messages, setMessages] = useState(edges);

    return {
        events: events,
        messages: messages,
    };
}

const CoordTransformContext = createContext<(x: number, y: number) => readonly [number, number]>((x, y) => [x, y]);

function useCoordTransform() {
    const context = useContext(CoordTransformContext);

    return context;
}

const ProcessContext = createContext<number>(0);

function useProcess() {
    const context = useContext(ProcessContext);

    return context;
}

const EventContext = createContext<number>(0);

function useEvent() {
    const context = useContext(EventContext);

    return context;
}

interface DiagramProps {
    path?: PathSelection;

    children: ComponentChildren;
}

type PathSelection = [
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

const PathContext = createContext<Path<readonly [number, number]>>([]);
const PathSelectionContext = createContext<PathSelection>([
    edge(undefined, undefined),
    () => { },
    () => { },
]);

export const SpaceTimeDiagram = (props: DiagramProps) => {
    const data = useDiagram(props.children);

    const pathSelection = props.path ?? useContext(PathSelectionContext);

    const pathStart = pathSelection[0].start;
    const pathEnd = pathSelection[0].end;

    const totalPath = useMemo<Path<readonly [number, number]>>(() => {
        if (!pathStart || !pathEnd) {
            return [];
        }

        const graph = toGraph(data);

        const paths = getPaths<readonly [number, number]>(graph, pathStart, pathEnd, (left, right) => left[0] === right[0] && left[1] === right[1]);

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
    }, [pathStart?.[0], pathStart?.[1], pathEnd?.[0], pathEnd?.[1]]);

    const sidePadding = 20;

    const processDiff = (200 - sidePadding * 2) / (data.events.length - 1);

    const maxTime = data.events.reduce((prev, curr) => Math.max(prev, curr.reduce((prev, curr) => Math.max(prev, curr), 0)), 0);

    const transform = (process: number, time: number) => {
        const timeHeight = 150 / maxTime;

        return [
            sidePadding + process * processDiff,
            180 - time * timeHeight,
        ] as const;
    }

    const classes = toClass({
        "space-time": true,
        "selection": !!props.path,
    });

    const onMouseLeave = (event: MouseEvent) => {
        pathSelection[1]();
        pathSelection[2]();
    }

    return (
        <>
            <svg class={classes} viewBox="0 0 200 200" onMouseLeave={onMouseLeave}>
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

                <PathSelectionContext.Provider value={pathSelection}>
                    <PathContext.Provider value={totalPath}>
                        <DiagramContext.Provider value={data}>
                            <CoordTransformContext.Provider value={transform}>
                                {props.children}
                            </CoordTransformContext.Provider>
                        </DiagramContext.Provider>
                    </PathContext.Provider>
                </PathSelectionContext.Provider>
            </svg>
        </>
    );
}

interface ProcessProps {
    id: number;

    target?: LinkData;

    children: [VNode<{}>, ...VNode<EventProps>[]];
}

export const Process = (props: ProcessProps) => {
    const transform = useCoordTransform();
    const data = useDiagram([]);

    const path = useContext(PathContext);

    const [x, _] = transform(props.id, 0);

    const isHighlight = props.target?.[0] ?? false;

    const children = props.children.slice(1).map((child, index) => {
        return <EventContext.Provider value={index}>
            {child}
        </EventContext.Provider>
    });

    const firstEventTime = props.children[1].props.time;

    const maxTime = data.events.reduce((max, curr) => Math.max(max, curr.reduce((max, curr) => Math.max(max, curr), 0)), 0);

    const segments = [];
    const events = data.events[props.id];
    if (events.length) {
        segments.push(<ProcessSegment start={-3} end={firstEventTime} />);

        events.forEach((event, index) => {
            if (index > events.length - 2) {
                return;
            }

            const highlight = isHighlight || path.filter(event => {
                const hasStart = event[0] === props.id && event[1] === index;
                const hasEnd = event[0] === props.id && event[1] === index + 1;

                return hasStart || hasEnd;
            }).length === 2;

            segments.push(<ProcessSegment start={event} end={events[index + 1]} highlight={highlight} />);
        })

        segments.push(<ProcessSegment start={events[events.length - 1]} end={maxTime + 10} />);
    } else {
        segments.push(<ProcessSegment start={-3} end={maxTime + 10} />);
    }

    return (
        <g class="process">
            <foreignObject class="label" x={x - 15} y={190} width={30} height={10}>
                {props.children[0]}
            </foreignObject>

            <ProcessContext.Provider value={props.id}>
                <HighlightContext value={isHighlight}>
                    {segments}
                    {children}
                </HighlightContext>
            </ProcessContext.Provider>
        </g>
    )
}

interface SegmentProps {
    start: number;
    end: number;

    highlight?: boolean;
}

function ProcessSegment(props: SegmentProps) {
    const transform = useCoordTransform();
    const process = useProcess();

    const highlight = useHighlightContext();

    const classes = toClass({
        "segment": true,
        "highlight": highlight || (props.highlight ?? false),
    });

    const start = transform(process, props.start);
    const end = transform(process, props.end);

    return (
        <line
            class={classes}
            x1={start[0]}
            y1={start[1]}
            x2={end[0]}
            y2={end[1]}
        />
    )
}

interface EventProps {
    time: number;
    target?: LinkData;

    children?: ComponentChild;
}

export const Event = (props: EventProps) => {
    const transform = useCoordTransform();
    const processIndex = useProcess();
    const eventIndex = useEvent();

    const path = useContext(PathContext);
    const [selectedPath, setSelectedPathStart, setSelectedPathEnd] = useContext(PathSelectionContext);

    let highlight = useHighlightContext();

    highlight = highlight
        || (props.target?.[0] ?? false)
        || (selectedPath.start && selectedPath.start[0] === processIndex && selectedPath.start[1] === eventIndex)
        || path.some(edge => edge[0] === processIndex && edge[1] === eventIndex);

    const classes = toClass({
        "event": true,
        "highlight": highlight,
    });
    const labelClasses = toClass({
        "label": true,
        "highlight": highlight,
    });

    const [x, y] = transform(processIndex, props.time);

    const onClick = (event: MouseEvent) => {
        if (selectedPath.start && selectedPath.start[0] === processIndex && selectedPath.start[1] === eventIndex) {
            setSelectedPathStart();
        } else {
            setSelectedPathStart([processIndex, eventIndex]);
        }
    };
    const onMouseOver = (event: MouseEvent) => {
        setSelectedPathEnd([processIndex, eventIndex]);
    };
    const onMouseOut = (event: MouseEvent) => {
        setSelectedPathEnd();
    };

    return (
        <>
            <circle
                class={classes}
                cx={x}
                cy={y}
                r={3}
                onClick={onClick}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            />
            <foreignObject class={labelClasses} x={x + 4} y={y - 5} width={10} height={10}>
                {props.children}
            </foreignObject>
        </>
    )
}

interface MessageProps {
    start: [number, number];
    end: [number, number];
}

function createWavyLine(start: readonly [number, number], end: readonly [number, number]): string {
    const radius = Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2));
    const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);

    const transform = (point: readonly [number, number]): readonly [number, number] => {
        point = [
            point[0] * Math.cos(angle) - point[1] * Math.sin(angle),
            point[0] * Math.sin(angle) + point[1] * Math.cos(angle),
        ];

        return [
            point[0] + start[0],
            point[1] + start[1],
        ] as const;
    }

    function getBasicLine(length: number, desiredCurveLength: number) {
        const builder = new SvgPathBuilder();

        const numCurves = Math.round(length / desiredCurveLength);
        const curveLength = length / numCurves;

        let offset = 2;

        let start: Point = [0, 0];
        let startControl: Point = [curveLength / 2, 0];
        let endControl: Point = [curveLength / 2, offset];
        let end: Point = [curveLength, offset];

        builder.move.absolute(start);
        builder.cubic.absolute(startControl, endControl, end);

        for (let num = 1; num < numCurves - 2; num++) {
            offset = -offset;

            start = end;
            startControl = [start[0] + curveLength / 2, start[1]];
            endControl = [start[0] + curveLength / 2, start[1] + offset];
            end = [start[0] + curveLength, start[1] + offset];

            builder.cubic.absolute(startControl, endControl, end);
        }

        start = end;
        startControl = [start[0] + curveLength / 2, start[1]];
        endControl = [start[0] + curveLength / 2, 0];
        end = [length, 0];

        builder.cubic.absolute(startControl, endControl, end);

        return builder;
    }

    const baseBuilder = getBasicLine(radius, 5);

    const builder = new SvgPathBuilder();

    baseBuilder.nodes.forEach(node => {
        if (node.type === "move-absolute") {
            builder.move.absolute(transform(node.point));
        } else if (node.type === "cubic-absolute") {
            builder.cubic.absolute(
                transform(node.startControl),
                transform(node.endControl),
                transform(node.end),
            );
        }
    });

    return builder.toString();
}

export function Message(props: MessageProps) {
    const data = useDiagram([]);
    const transform = useCoordTransform();

    const start = transform(props.start[0], data.events[props.start[0]][props.start[1]]);
    const end = transform(props.end[0], data.events[props.end[0]][props.end[1]]);

    const d = createWavyLine(start, end);

    const totalPath = useContext(PathContext);

    const classes = toClass({
        "message": true,
        "highlight": totalPath.filter(event => {
            const hasStart = event[0] === props.start[0] && event[1] === props.start[1];
            const hasEnd = event[0] === props.end[0] && event[1] === props.end[1];

            return hasStart || hasEnd;
        }).length === 2,
    })

    return (
        <path d={d} class={classes} />
    )
}

interface TickProps {
    times: number[];
}

export function Tick(props: TickProps) {
    const transform = useCoordTransform();

    const points = props.times
        .map((time, index) => transform(index, time))
        .map(point => `${point[0]},${point[1]}`)
        .join(" ");

    return (
        <polyline class="tick" points={points} />
    )
}