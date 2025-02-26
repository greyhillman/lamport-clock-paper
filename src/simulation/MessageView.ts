import Konva from "konva";
import { View } from "../mvc/View";
import { MessageModel } from "./MessageModel";
import { Direction, Point } from "../Point";

interface Styles {
    color: string;
    fontFamily: string;
}

interface Options {
    model: MessageModel;

    container: Konva.Container;
    center: Point;
    styles: Styles;
}

const GOLDEN_RATIO = 1.618033989;

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
            stroke: options.styles.color,
            strokeWidth: 3,
            cornerRadius: 5,
            listening: false,
        });
        this._messageFold = new Konva.Line({
            points: [0, 0, width * 0.5, height * 0.5, width, 0],
            stroke: options.styles.color,
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
            fontFamily: options.styles.fontFamily,
            fontSize: 25,
            text: `${this.model.timestamp}`,
            fill: options.styles.color,
        });
        this._group.add(this._timestamp);
    }

    move(direction: Direction) {
        this._group.x(this._group.x() + direction.dx);
        this._group.y(this._group.y() + direction.dy);
    }

    style(styles: Styles) {
        this._messageBorder.stroke(styles.color);
        this._messageFold.stroke(styles.color);
        this._timestamp.fill(styles.color);
        this._timestamp.fontFamily(styles.fontFamily);
    }

    destroy() {
        this._group.destroy();
    }
}