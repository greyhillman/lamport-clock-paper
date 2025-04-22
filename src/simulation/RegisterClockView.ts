import Konva from "konva";
import { View } from "../mvc/View";
import { Direction, Point } from "../Point";
import { ClockModel } from "./ClockModel";

interface Styles {
    color: string;
    fontFamily: string;
}

interface Options {
    container: Konva.Container;
    start: Point;
    dimensions: Direction;

    styles: Styles;
}

export class RegisterClockView extends View<ClockModel> {
    private _group: Konva.Group;
    private _border: Konva.Rect;
    private _text: Konva.Text;

    constructor(model: ClockModel, options: Options) {
        super(model);

        this._group = new Konva.Group({
            x: options.start.x,
            y: options.start.y,
        });
        options.container.add(this._group);

        this._border = new Konva.Rect({
            width: options.dimensions.dx,
            height: options.dimensions.dy,
            stroke: options.styles.color,
            strokeWidth: 3,
        });
        this._group.add(this._border);

        this._text = new Konva.Text({
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
    }
}