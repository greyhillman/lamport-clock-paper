import Konva from "konva";
import { View } from "../../mvc/View";
import { MessageModel } from "../MessageModel";
import { Point } from "../../Point";
import { StringModel } from "../StringModel";

interface Events {

}

interface Options {
    container: Konva.Container;

    center: Point;
    width?: number;

    styles: Styles;
}

interface Styles {
    color: StringModel;
    backgroundColor: StringModel;
}

const GOLDEN_RATIO = 1.618033989;

export class MessageView extends View<MessageModel, Events> {
    private _group: Konva.Group;

    private _messageBorder: Konva.Rect;
    private _messageFold: Konva.Line;

    private _width: number;
    private _height: number;

    constructor(model: MessageModel, options: Options) {
        super(model);

        this._width = options.width ?? 50;
        this._height = this._width / GOLDEN_RATIO;

        this._group = new Konva.Group({
            x: options.center.x,
            y: options.center.y,
        });
        options.container.add(this._group);

        this._messageBorder = new Konva.Rect({
            x: -this._width / 2,
            y: -this._height / 2,
            width: this._width,
            height: this._height,
            stroke: options.styles.color.value,
            strokeWidth: 3,
            fill: options.styles.backgroundColor.value,
            listening: false,
        });
        this._messageFold = new Konva.Line({
            x: -this._width / 2,
            y: -this._height / 2,
            points: [0, 0, this._width * 0.5, this._height * 0.5, this._width, 0],
            stroke: options.styles.color.value,
            strokeWidth: 3,
            listening: false,
        });

        this._group.add(this._messageBorder);
        this._group.add(this._messageFold);

        options.styles.color.addListener("value", color => {
            this._messageBorder.stroke(color);
            this._messageFold.stroke(color);
        });
        options.styles.backgroundColor.addListener("value", color => {
            this._messageBorder.fill(color);
        });
    }

    moveTo(point: Point) {
        this._group.x(point.x);
        this._group.y(point.y);
    }

    setRotation(degrees: number) {
        this._group.rotation(degrees);
    }

    destroy() {
        this._group.destroy();
    }
}