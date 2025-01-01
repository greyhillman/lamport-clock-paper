export class Point {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    minus(other: Point): Direction {
        return new Direction(this.x - other.x, this.y - other.y);
    }

    add(direction: Direction): Point {
        return new Point(this.x + direction.dx, this.y + direction.dy);
    }

    equals(other: Point, tolerance: number): boolean {
        const equalWithin = (x: number, y: number, tolerance: number) => {
            const diff = Math.abs(x - y);

            return diff <= tolerance;
        }

        return equalWithin(this.x, other.x, tolerance)
            && equalWithin(this.y, other.y, tolerance);
    }

    asDirection(): Direction {
        return new Direction(this.x, this.y);
    }
}

export class Direction {
    readonly dx: number;
    readonly dy: number;

    constructor(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }

    scale(fraction: number): Direction {
        return new Direction(fraction * this.dx, fraction * this.dy);
    }

    get length(): number {
        return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
    }

    get angle(): number {
        return Math.atan2(this.dy, this.dx);
    }

    rotate(angle: number): Direction {
        const dx = this.dx * Math.cos(angle) - this.dy * Math.sin(angle);
        const dy = this.dx * Math.sin(angle) + this.dy * Math.cos(angle);

        return new Direction(dx, dy);
    }

    add(other: Direction): Direction {
        return new Direction(this.dx + other.dx, this.dy + other.dy);
    }

    negate(): Direction {
        return new Direction(-this.dx, -this.dy);
    }
}