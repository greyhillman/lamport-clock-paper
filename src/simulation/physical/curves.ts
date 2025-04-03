import { Direction, Point } from "../../Point"

type ParametricCurve<T> = (percent: number) => T;

// https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_B%C3%A9zier_curves
export const quadraticBezier = (start: Point, control: Point, end: Point): ParametricCurve<Point> => {
    const firstDiff = start.minus(control);
    const secondDiff = end.minus(control);

    return (percent: number): Point => {
        const firstInterpolation = firstDiff.scale(Math.pow(1 - percent, 2));
        const secondInterpolation = secondDiff.scale(Math.pow(percent, 2));

        return control.add(firstInterpolation).add(secondInterpolation);
    }
}

export const quadraticBezierTanget = (start: Point, control: Point, end: Point): ParametricCurve<Direction> => {
    const firstDiff = control.minus(start);
    const secondDiff = end.minus(control);

    return (percent: number): Direction => {
        const firstInterpolation = firstDiff.scale(2 * (1 - percent));
        const secondInterpolation = secondDiff.scale(2 * percent);

        return firstInterpolation.add(secondInterpolation);
    }
}

export function getSamplePoints(num: number): number[] {
    const result: number[] = [];

    const step = 1 / num;
    let current = 0;
    while (current <= 1) {
        result.push(current);

        current += step;
    }

    return result;
}