import Konva from "konva";
import { View } from "../mvc/View";
import { Direction, Point } from "../Point";
import { ClockModel } from "./ClockModel";

interface Styles {
    color: string;
    fontFamily: string;
}

interface Options {
    model: ClockModel;

    container: Konva.Container;
    center: Point;
    dimensions: Direction;
    styles: Styles;
}

export class RegisterClockView extends View<ClockModel> {
    private _group: Konva.Group;
    private _border: Konva.Rect;
    private _text: Konva.Text;

    constructor(options: Options) {
        super(options.model);

        this._group = new Konva.Group({
            x: options.center.x,
            y: options.center.y,
        });
        options.container.add(this._group);

        const borderStart = Point.zero.add(options.dimensions.scale(-0.5));

        this._border = new Konva.Rect({
            x: borderStart.x,
            y: borderStart.y,
            width: options.dimensions.dx,
            height: options.dimensions.dy,
            stroke: options.styles.color,
            strokeWidth: 3,
        });
        this._group.add(this._border);

        this._text = new Konva.Text({
            x: borderStart.x,
            y: borderStart.y,
            text: "0",
            fontSize: 25,
            fontFamily: options.styles.fontFamily,
            align: "center",
            verticalAlign: "middle",
            width: options.dimensions.dx,
            height: options.dimensions.dy,
            fill: options.styles.color,
        });
        this._group.add(this._text);

        this.model.addListener("update", register => {
            this._text.text(`${register}`);
        });
    }

    style(styles: Styles) {
        this._border.stroke(styles.color);
        this._text.fill(styles.color);
        this._text.fontFamily(styles.fontFamily);
    }
}