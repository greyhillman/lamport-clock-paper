export type Point = readonly [number, number];

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
            relative: (point: Point): SvgPathBuilder => {
                this.nodes.push({
                    type: "move-relative",
                    point,
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
            relative: (point: Point): SvgPathBuilder => {
                this.nodes.push({
                    type: "line-relative",
                    point,
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
                        return `L ${node.point[0]} ${node.point[1]}`;
                    case "line-relative":
                        return `l ${node.point[0]} ${node.point[1]}`;
                    case "move-absolute":
                        return `M ${node.point[0]} ${node.point[1]}`;
                    case "move-relative":
                        return `m ${node.point[0]} ${node.point[1]}`;
                    case "quadratic-absolute":
                        return `Q ${node.control[0]}, ${node.control[0]} ${node.end[0]} ${node.end[1]}`;
                    case "cubic-absolute":
                        return `C ${node.startControl[0]}, ${node.startControl[1]} ${node.endControl[0]},${node.endControl[1]} ${node.end[0]},${node.end[1]}`;
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

    point: Point;
}

interface LineAbsoluteNode {
    type: "line-absolute";

    point: Point;
}

interface LineRelativeNode {
    type: "line-relative";

    point: Point;
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