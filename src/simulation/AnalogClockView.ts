import Konva from "konva";
import { View } from "../mvc/View";
import { Direction, Point } from "../Point";
import { ClockModel } from "./ClockModel";
import { StringModel } from "./StringModel";

interface Styles {
    color: StringModel;
    backgroundColor: StringModel;
}

interface Options {
    model: ClockModel;

    container: Konva.Container;
    center: Point;
    radius: number;
    styles: Styles;
}

export class AnalogClockView extends View<ClockModel> {
    private _secondHand: Konva.Line;
    private _minuteHand: Konva.Line;
    private _pivot: Konva.Circle;
    private _ticks: Konva.Line[];
    private _ring: Konva.Circle;

    private _radius: number;
    private _center: Point;

    private _strokeWidth: number;

    constructor(options: Options) {
        super(options.model);

        this._radius = options.radius;
        this._center = options.center;
        this._strokeWidth = options.radius > 75 ? 5 : 3;

        const group = new Konva.Group({
            x: this._center.x,
            y: this._center.y,
        });
        options.container.add(group);

        this._ring = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this._radius,
            stroke: options.styles.color.value,
            strokeWidth: this._strokeWidth,
            fill: options.styles.backgroundColor.value,
        });
        group.add(this._ring);

        this._ticks = [];
        for (let i = 0; i < 12; i++) {
            const start = i % 3 === 0
                ? 0.70
                : 0.85;

            const tick = new Konva.Line({
                points: [0, start * this._radius, 0, this._radius],
                stroke: options.styles.color.value,
                strokeWidth: this._strokeWidth,
                rotation: i * 30,
            });

            group.add(tick);
            this._ticks.push(tick);
        }

        this._secondHand = new Konva.Line({
            points: [0, 0, 0, -0.65 * this._radius],
            stroke: options.styles.color.value,
            strokeWidth: this._strokeWidth,
            rotation: 0,
        });
        this._minuteHand = new Konva.Line({
            points: [0, 0, 0, -0.35 * this._radius],
            stroke: options.styles.color.value,
            strokeWidth: this._strokeWidth,
            rotation: 0,
        });
        this._pivot = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this._strokeWidth,
            fill: options.styles.color.value,
        });

        group.add(this._secondHand);
        group.add(this._minuteHand);
        group.add(this._pivot);

        this.model.addListener("update", register => {
            this.update(register);
        });

        options.styles.color.addListener("value", color => {
            this._secondHand.stroke(color);
            this._minuteHand.stroke(color);
            this._ring.stroke(color);
            this._pivot.fill(color);

            for (const tick of this._ticks) {
                tick.stroke(color);
            }
        });

        options.styles.backgroundColor.addListener("value", color => {
            this._ring.fill(color);
        });
    }

    update(register: number) {
        const second = register % 12;
        const minute = Math.floor(register / 12);

        const secondDeg = second * 30;
        const minuteDeg = minute * 30;

        this._secondHand.rotation(secondDeg);
        this._minuteHand.rotation(minuteDeg);
    }
}