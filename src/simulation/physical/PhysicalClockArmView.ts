import Konva from "konva";
import { View } from "../../mvc/View";
import { NumberModel } from "../NumberModel";
import { Point } from "../../Point";
import { StringModel } from "../StringModel";

interface Events {

}

interface Options {
    container: Konva.Container;

    center: Point;
    radius: number;

    strokeWidth: number;
    opacity: number;

    styles: Styles;
}

interface Styles {
    color: StringModel;
}

export class PhysicalClockArmView extends View<NumberModel, Events> {
    private _group: Konva.Group;

    private _secondHand: Konva.Line;
    private _minuteHand: Konva.Line;

    private _radius: number;
    private _strokeWidth: number;

    constructor(model: NumberModel, options: Options) {
        super(model);

        this._radius = options.radius;
        this._strokeWidth = options.strokeWidth;

        this._group = new Konva.Group({
            x: options.center.x,
            y: options.center.y,
            opacity: options.opacity,
        });

        options.container.add(this._group);

        this._secondHand = new Konva.Line({
            points: [0, 0, 0, -0.65 * this._radius],
            stroke: options.styles.color.value,
            strokeWidth: this._strokeWidth,
            rotation: 0,
            listening: false,
        });
        this._minuteHand = new Konva.Line({
            points: [0, 0, 0, -0.35 * this._radius],
            stroke: options.styles.color.value,
            strokeWidth: this._strokeWidth,
            rotation: 0,
            listening: false,
        });

        this._group.add(this._secondHand);
        this._group.add(this._minuteHand);

        options.styles.color.addListener("value", color => {
            this._secondHand.stroke(color);
            this._minuteHand.stroke(color);
        });

        this._update(this.model.value);
        this.model.addListener("value", value => {
            this._update(value);
        });
    }

    private _update(register: number) {
        const second = register % 12;
        const minute = register / 12;

        const secondDeg = second * (360 / 12);
        const minuteDeg = minute * (360 / 12);

        this._secondHand.rotation(secondDeg);
        this._minuteHand.rotation(minuteDeg);
    }

    set opacity(value: number) {
        this._group.opacity(value);
    }
}