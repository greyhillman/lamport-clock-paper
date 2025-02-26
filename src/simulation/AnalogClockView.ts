import Konva from "konva";
import { View } from "../mvc/View";
import { Direction, Point } from "../Point";
import { ClockModel } from "./ClockModel";

interface Options {
    model: ClockModel;

    container: Konva.Container;
    center: Point;
    radius: number;
    styles: {
        color: string;
        backgroundColor: string;
    };
}

export class AnalogClockView extends View<ClockModel> {
    private _secondHand: Konva.Shape;
    private _minuteHand: Konva.Shape;
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
            stroke: options.styles.color,
            strokeWidth: this._strokeWidth,
            fill: options.styles.backgroundColor,
        });
        group.add(this._ring);

        for (let i = 0; i < 12; i++) {
            const start = i % 3 === 0
                ? 0.70
                : 0.85;
            group.add(new Konva.Line({
                points: [0, start * this._radius, 0, this._radius],
                stroke: options.styles.color,
                strokeWidth: this._strokeWidth,
                rotation: i * 30,
            }));
        }

        this._secondHand = new Konva.Line({
            points: [0, 0, 0, -0.65 * this._radius],
            stroke: options.styles.color,
            strokeWidth: this._strokeWidth,
            rotation: 0,
        });
        this._minuteHand = new Konva.Line({
            points: [0, 0, 0, -0.35 * this._radius],
            stroke: options.styles.color,
            strokeWidth: this._strokeWidth,
            rotation: 0,
        });

        group.add(this._secondHand);
        group.add(this._minuteHand);

        group.add(new Konva.Circle({
            x: 0,
            y: 0,
            radius: this._strokeWidth,
            fill: options.styles.color,
        }));

        this.model.addListener("update", register => {
            this.update(register);
        })
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