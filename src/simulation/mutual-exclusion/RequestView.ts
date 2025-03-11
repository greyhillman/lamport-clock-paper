import Konva from "konva";
import { View } from "../../mvc/View";
import { MessageModel } from "./MessageModel";
import { Point } from "../../Point";
import { GOLDEN_RATIO } from "../../constants";
import { MessageShape } from "../MessageShape";
import { LockShape } from "../LockShape";
import { RequestModel } from "./RequestModel";
import { IdentifierView } from "./IdentifierView";

interface Options {
    container: Konva.Container;

    start: Point;
    getIdentifier: (process: string, container: Konva.Container) => IdentifierView;

    styles: Styles;
}

interface Styles {
    color: string;
    backgroundColor: string;
    fontFamily: string;
}

export class RequestView extends View<RequestModel> {
    private _group: Konva.Group;

    private _timestamp: Konva.Text;
    private _identifier: IdentifierView;
    private _lock: LockShape;

    constructor(model: RequestModel, options: Options) {
        super(model);

        this._group = new Konva.Group({
            x: options.start.x,
            y: options.start.y,
        });
        options.container.add(this._group);

        this._timestamp = new Konva.Text({
            width: 40,
            height: 20,
            align: "right",
            verticalAlign: "middle",
            fontFamily: options.styles.fontFamily,
            fontSize: 25,
            text: `${this.model.timestamp}:`,
            fill: options.styles.color,
        });
        this._group.add(this._timestamp);

        this._identifier = options.getIdentifier(model.process, this._group);
        this._identifier.scale({
            x: 20 / 30,
            y: 20 / 30,
        });
        this._identifier.x(45);
        this._identifier.y(0);

        this._lock = new LockShape({
            container: this._group,
            start: new Point(70, -5),
            scale: 0.25,
            styles: options.styles,
        });
        this._lock.lock();
    }

    moveTo(point: Point) {
        this._group.x(point.x);
        this._group.y(point.y);
    }

    destroy() {
        this._group.destroy();
    }

    style(styles: Styles) {
        this._timestamp.fill(styles.color);
        this._lock.style(styles);
        this._identifier.style(styles);
    }
}