import { ComponentChildren } from "preact";
import { Point } from "./Point";
import { SvgPathBuilder } from "./SvgPathBuilder";


interface Props {
    children: ComponentChildren;
}

export function DistributedSystemDiagram(props: Props) {
    return (
        <svg class="distributed-system" viewBox="0 0 100 100">
            {props.children}
        </svg>
    )
}

interface ProcessProps {
    id: number;
    point: Point;
}

export function Process(props: ProcessProps) {
    return (
        <g class="process">
            <circle
                cx={props.point.x}
                cy={props.point.y}
                r={5}
            />
            <text
                x={props.point.x}
                y={props.point.y}
                dominant-baseline="middle"
            >
                {props.id}
            </text>
        </g>
    )
}

interface LinkProps {
    start: Point;
    end: Point;
}

export function Link(props: LinkProps) {
    return (
        <line
            class="link"
            x1={props.start.x}
            y1={props.start.y}
            x2={props.end.x}
            y2={props.end.y}
        />
    )
}

interface MessageProps {
    start: Point;
    end: Point;

    latency: number;
}

export function Message(props: MessageProps) {
    const motionPath = new SvgPathBuilder()
        .move.absolute(props.start)
        .line.absolute(props.end)
        .toString();

    return (
        <g class="message">
            <path d="M -4,-3 h 8 v 6 h -8 v -6 l 4,3 l 4,-3" />
            <animateMotion
                dur={`${props.latency}ms`}
                keyTimes="0; 0.3; 0.6; 0.9; 1"
                keyPoints="0; 1; 1; 0; 0"
                repeatCount="indefinite"
                calcMode="linear"
                fill="freeze"
                rotate="auto"
                path={motionPath}
            />
        </g>
    );
}