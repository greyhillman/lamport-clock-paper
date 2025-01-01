import { Direction, Point } from "./Point";
import { SvgPathBuilder } from "./SvgPathBuilder";

interface LineProps {
    start: Point;
    end: Point;

    class: string;
}

export function Line(props: LineProps) {
    return <line
        class={props.class}
        x1={props.start.x}
        y1={props.start.y}
        x2={props.end.x}
        y2={props.end.y}
    />
}

interface PolylineProps {
    points: Point[];
    class?: string;
}

export function Polyline(props: PolylineProps) {
    const points = props.points
        .map(point => `${point.x},${point.y}`)
        .join(" ");

    return <polyline class={props.class} points={points} />;
}


export function createWavyLine(start: Point, end: Point): string {
    const direction = end.minus(start);

    const radius = direction.length;
    const angle = direction.angle;

    const transform = (point: Point): Point => {
        return start.add(point
            .asDirection()
            .rotate(angle));
    }

    function getBasicLine(length: number, desiredCurveLength: number) {
        const builder = new SvgPathBuilder();

        const numCurves = Math.round(length / desiredCurveLength);
        const curveLength = length / numCurves;

        const xAxis = new Direction(1, 0);
        const yAxis = new Direction(0, 1);

        let start: Point = new Point(0, 0);
        builder.move.absolute(start);

        let mid = xAxis.scale(curveLength / 2);
        let midOffset = yAxis.scale(2);

        let startControl: Point = start.add(mid);
        let endControl: Point = start.add(mid.add(midOffset));
        let end: Point = start.add(xAxis.scale(curveLength).add(midOffset));

        builder.cubic.absolute(startControl, endControl, end);

        for (let num = 1; num < numCurves - 2; num++) {
            midOffset = midOffset.negate();

            start = end;
            startControl = start.add(mid);
            endControl = start.add(mid.add(midOffset));
            end = start.add(xAxis.scale(curveLength).add(midOffset));

            builder.cubic.absolute(startControl, endControl, end);
        }

        start = end;
        startControl = start.add(mid);
        endControl = new Point(start.x + curveLength / 2, 0);
        end = new Point(length, 0);

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
