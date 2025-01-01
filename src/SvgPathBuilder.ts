import { Direction, Point } from "./Point";

export class SvgPathBuilder {
    public readonly nodes: PathNode[] = [];

    private readonly _moveBuilder;
    private readonly _lineBuilder;
    private readonly _quadraticBuilder;
    private readonly _cubicBuilder;

    constructor() {
        this._moveBuilder = {
            absolute: (point: Point): SvgPathBuilder => {
                this.nodes.push({
                    type: "move-absolute",
                    point,
                });

                return this;
            },
            relative: (direction: Direction): SvgPathBuilder => {
                this.nodes.push({
                    type: "move-relative",
                    direction,
                });

                return this;
            },
        };

        this._lineBuilder = {
            absolute: (point: Point): SvgPathBuilder => {
                this.nodes.push({
                    type: "line-absolute",
                    point,
                });

                return this;
            },
            relative: (direction: Direction): SvgPathBuilder => {
                this.nodes.push({
                    type: "line-relative",
                    direction,
                });

                return this;
            }
        }

        this._quadraticBuilder = {
            absolute: (control: Point, end: Point): SvgPathBuilder => {
                this.nodes.push({
                    type: "quadratic-absolute",
                    control,
                    end,
                });

                return this;
            },
            // relative: (dx: )
        }

        this._cubicBuilder = {
            absolute: (startControl: Point, endControl: Point, end: Point): SvgPathBuilder => {
                this.nodes.push({
                    type: "cubic-absolute",
                    startControl,
                    endControl,
                    end,
                });

                return this;
            },
        }
    }

    public get move() {
        return this._moveBuilder;
    }

    public get line() {
        return this._lineBuilder;
    }

    public get quadratic() {
        return this._quadraticBuilder;
    }

    public get cubic() {
        return this._cubicBuilder;
    }

    public toString(): string {
        return this.nodes
            .map(node => {
                switch (node.type) {
                    case "line-absolute":
                        return `L ${node.point.x} ${node.point.y}`;
                    case "line-relative":
                        return `l ${node.direction.dx} ${node.direction.dy}`;
                    case "move-absolute":
                        return `M ${node.point.x} ${node.point.y}`;
                    case "move-relative":
                        return `m ${node.direction.dx} ${node.direction.dy}`;
                    case "quadratic-absolute":
                        return `Q ${node.control.x}, ${node.control.x} ${node.end.x} ${node.end.y}`;
                    case "cubic-absolute":
                        return `C ${node.startControl.x}, ${node.startControl.y} ${node.endControl.x},${node.endControl.y} ${node.end.x},${node.end.y}`;
                    default:
                        throw new Error("Unknown node type");
                }
            })
            .join(" ");
    }
}

type PathNode
    = MoveAbsoluteNode
    | MoveRelativeNode
    | LineAbsoluteNode
    | LineRelativeNode
    | QuadraticAbsoluteControlNode
    | CubicAbsoluteNode
    ;

interface MoveAbsoluteNode {
    type: "move-absolute";

    point: Point;
}

interface MoveRelativeNode {
    type: "move-relative";

    direction: Direction;
}

interface LineAbsoluteNode {
    type: "line-absolute";

    point: Point;
}

interface LineRelativeNode {
    type: "line-relative";

    direction: Direction;
}

interface QuadraticAbsoluteControlNode {
    type: "quadratic-absolute";

    control: Point;
    end: Point;
}

interface CubicAbsoluteNode {
    type: "cubic-absolute";

    startControl: Point;
    endControl: Point;
    end: Point;
}