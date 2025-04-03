import { Point } from "../../Point";

export function getPointsInRadius(center: Point, radius: number, num: number): Point[] {
    const result: Point[] = [];

    const angleStep = 2 * Math.PI / num;

    let currentAngle = Math.PI / 2; // 90 degrees

    for (let i = 0; i < num; i++) {
        const x = radius * Math.cos(currentAngle) + center.x;
        // Flip the sin so we start at 12 o'clock
        const y = radius * -Math.sin(currentAngle) + center.y;

        const point = new Point(x, y);

        result.push(point);

        currentAngle -= angleStep;
    }

    return result;
}
