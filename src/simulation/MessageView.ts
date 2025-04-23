import Konva from "konva";
import { View } from "../mvc/View";
import { MessageModel } from "./MessageModel";
import { Direction, Point } from "../Point";
import { GOLDEN_RATIO } from "../constants";
import { StringModel } from "./StringModel";

interface Styles {
    color: StringModel;
    fontFamily: StringModel;
}

interface Options {
    model: MessageModel;

    container: Konva.Container;
    center: Point;
    styles: Styles;
}

export class MessageView extends View<MessageModel> {
    private _group: Konva.Group;

    private _timestamp: Konva.Text;
    private _messageBorder: Konva.Rect;
    private _messageFold: Konva.Line;

    constructor(options: Options) {
        super(options.model);

        this._group = new Konva.Group({
            x: options.center.x,
            y: options.center.y - 10,
        });
        options.container.add(this._group);

        const width = 50;
        const height = width / GOLDEN_RATIO;

        this._messageBorder = new Konva.Rect({
            width: width,
            height: height,
            stroke: options.styles.color.value,
            strokeWidth: 3,
            cornerRadius: 5,
            listening: false,
        });
        this._messageFold = new Konva.Line({
            points: [0, 0, width * 0.5, height * 0.5, width, 0],
            stroke: options.styles.color.value,
            strokeWidth: 3,
            listening: false,
        });

        this._group.add(this._messageBorder);
        this._group.add(this._messageFold);

        this._timestamp = new Konva.Text({
            x: width + 5,
            y: 0,
            width: 30,
            height: height,
            align: "left",
            verticalAlign: "middle",
            fontFamily: options.styles.fontFamily.value,
            fontSize: 25,
            text: `${this.model.timestamp}`,
            fill: options.styles.color.value,
        });
        this._group.add(this._timestamp);

        options.styles.color.addListener("value", color => {
            this._messageBorder.stroke(color);
            this._messageFold.stroke(color);
            this._timestamp.fill(color);
        });
        options.styles.fontFamily.addListener("value", fontFamily => {
            this._timestamp.fontFamily(fontFamily);
        })
    }

    move(direction: Direction) {
        this._group.x(this._group.x() + direction.dx);
        this._group.y(this._group.y() + direction.dy);
    }

    destroy() {
        this._group.destroy();
    }
}