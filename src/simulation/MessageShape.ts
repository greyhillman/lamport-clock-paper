import Konva from "konva";
import { Point } from "../Point";
import { GOLDEN_RATIO } from "../constants";
import { Observable } from "../mvc/Observable";

interface Events {
    "pointerover": void;
    "pointerout": void;
    "click": void;
}

interface Options {
    container: Konva.Container;

    start: Point;

    width: number;
    height: number;

    strokeWidth?: number;

    styles: Styles
}

interface Styles {
    color: string;
    backgroundColor: string;
}

export class MessageShape extends Observable<Events> {
    private _group: Konva.Group;

    private _messageBorder: Konva.Shape;
    private _messageFold: Konva.Line;
    private _messageCutout: Konva.Line;

    private _width: number;
    private _height: number;

    constructor(options: Options) {
        super();

        this._group = new Konva.Group({
            x: options.start.x,
            y: options.start.y,
        });
        options.container.add(this._group);

        this._width = options.width;
        this._height = options.height;

        this._messageBorder = new Konva.Rect({
            width: this._width,
            height: this._height,
            stroke: options.styles.color,
            fill: options.styles.backgroundColor,
            strokeWidth: options.strokeWidth ?? 3,
        });

        this._messageFold = new Konva.Line({
            points: [0, 0, this._width * 0.5, this._height * 0.5, this._width, 0],
            stroke: options.styles.color,
            strokeWidth: options.strokeWidth ?? 3,
        });
        this._messageCutout = new Konva.Line({
            points: [0, 0, this._width * 0.5, this._height * 0.5, this._width, 0],
            // stroke: options.styles.color,
            fill: options.styles.color,
            // strokeWidth: options.strokeWidth ?? 3,
            closed: true,
            opacity: 0,
        });

        this._group.add(this._messageBorder);
        this._group.add(this._messageFold);
        this._group.add(this._messageCutout);

        this._group.on("pointerover", () => {
            this.dispatchEvent("pointerover", undefined);
        });
        this._group.on("pointerout", () => {
            this.dispatchEvent("pointerout", undefined);
        });
        this._group.on("click", () => {
            this.dispatchEvent("click", undefined);
        });
    }

    open() {
        this._messageFold.points([
            0, 0,
            this._width * 0.5, -this._height * 0.5,
            this._width, 0,
        ]);
        this._messageCutout.opacity(1);
    }

    close() {
        this._messageFold.points([
            0, 0,
            this._width * 0.5, this._height * 0.5,
            this._width, 0,
        ]);
        this._messageCutout.opacity(0);
    }

    style(styles: Styles) {
        this._messageBorder.stroke(styles.color);
        this._messageBorder.fill(styles.backgroundColor);
        this._messageFold.stroke(styles.color);
        this._messageCutout.fill(styles.color);
    }
}