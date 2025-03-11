import Konva from "konva";
import { View } from "../../mvc/View";
import { MessageModel } from "./MessageModel";
import { Point } from "../../Point";
import { GOLDEN_RATIO } from "../../constants";
import { MessageShape } from "../MessageShape";
import { LockShape } from "../LockShape";
import { IdentifierView } from "./IdentifierView";

interface Events {
    "pointerover": void;
    "pointerout": void;
    "click": void;
}

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

export class PendingMessageView extends View<MessageModel, Events> {
    private _group: Konva.Group;

    private _timestamp: Konva.Text;
    private _message: MessageShape;

    private _identifier: IdentifierView;
    private _lock: LockShape | undefined;
    private _check: Konva.Line | undefined;

    constructor(model: MessageModel, options: Options) {
        super(model);

        this._group = new Konva.Group({
            x: options.start.x,
            y: options.start.y,
        });
        options.container.add(this._group);

        this._message = new MessageShape({
            start: new Point(0, 0),
            container: this._group,
            width: 20 * GOLDEN_RATIO,
            height: 20,
            styles: {
                color: options.styles.color,
                backgroundColor: options.styles.backgroundColor,
            },
        });

        this._message.addListener("pointerover", () => {
            this._message.open();

            this.dispatchEvent("pointerover", undefined);
        });
        this._message.addListener("pointerout", () => {
            this._message.close();

            this.dispatchEvent("pointerout", undefined);
        });
        this._message.addListener("click", () => {
            this.dispatchEvent("click", undefined);
        });

        this._timestamp = new Konva.Text({
            x: 20 * GOLDEN_RATIO + 5,
            y: 0,
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

        this._identifier = options.getIdentifier(model.sender, this._group);
        this._identifier.x(80);
        this._identifier.y(0);
        this._identifier.scale({
            x: 0.7,
            y: 0.7,
        });

        this._lock = new LockShape({
            container: this._group,
            start: new Point(105, 0),
            scale: 0.2,
            styles: options.styles,
        });

        if (model.request === "release") {
            this._lock.unlock();
        } else if (model.request === "request" || model.request === "acknowledge") {
            this._lock.lock();
        }

        if (model.request === "acknowledge") {
            this._check = new Konva.Line({
                points: [125, 10, 130, 17, 135, 0],
                stroke: options.styles.color,
                strokeWidth: 3,
            });
            this._group.add(this._check);
        }
    }

    moveTo(point: Point) {
        this._group.x(point.x);
        this._group.y(point.y);
    }

    destroy() {
        this._group.destroy();
    }

    style(styles: Styles) {
        this._message.style({
            color: styles.color,
            backgroundColor: styles.backgroundColor,
        });
        this._timestamp.fill(styles.color);
        this._lock?.style({
            color: styles.color,
            backgroundColor: styles.backgroundColor,
        });
        this._check?.stroke(styles.color);
        this._identifier.style(styles);
    }
}