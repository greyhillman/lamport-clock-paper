import Konva from "konva";
import { View } from "../../mvc/View";
import { PhysicalClockModel } from "./PhysicalClockModel";
import { Point } from "../../Point";
import { PhysicalClockArmView } from "./PhysicalClockArmView";
import { StringModel } from "../StringModel";

interface Styles {
    color: StringModel;
    backgroundColor: StringModel;

    opacity?: number;
}

interface Options {
    container: Konva.Container;
    center: Point;
    radius: number;

    listening?: boolean;

    styles: Styles;
}

interface Events {
    pointerover: void;
    pointerout: void;
}

export class PhysicalClockView extends View<PhysicalClockModel, Events> {
    private _group: Konva.Group;

    private _arm: PhysicalClockArmView;

    private _pivot: Konva.Circle;
    private _ticks: Konva.Line[];
    private _ring: Konva.Circle;

    private _radius: number;
    private _center: Point;

    private _strokeWidth: number;

    private _opacity: number;
    private _listening: boolean;

    get strokeWidth() {
        return this._strokeWidth;
    }

    constructor(model: PhysicalClockModel, options: Options) {
        super(model);

        this._radius = options.radius;
        this._center = options.center;
        this._strokeWidth = options.radius > 75 ? 5 : 3;

        this._opacity = options.styles.opacity ?? 1;
        this._listening = options.listening ?? true;

        this._group = new Konva.Group({
            x: this._center.x,
            y: this._center.y,
            opacity: this._opacity,
        });
        options.container.add(this._group);

        this._ring = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this._radius,
            stroke: options.styles.color.value,
            strokeWidth: this._strokeWidth,
            fill: options.styles.backgroundColor.value,
            listening: this._listening,
        });
        this._group.add(this._ring);

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
                listening: false,
            });

            this._group.add(tick);
            this._ticks.push(tick);
        }

        this._arm = new PhysicalClockArmView(this.model.time, {
            container: this._group,
            radius: this._radius,
            center: new Point(0, 0),
            opacity: 1,
            strokeWidth: this._strokeWidth,
            styles: {
                color: options.styles.color,
            },
        });
        this._pivot = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this._strokeWidth,
            fill: options.styles.color.value,
            listening: false,
        });

        this._group.add(this._pivot);

        this._ring.on("pointerover", event => {
            this.dispatchEvent("pointerover", undefined);
        });
        this._ring.on("pointerout", event => {
            this.dispatchEvent("pointerout", undefined);
        });

        options.styles.color.addListener("value", color => {
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

    hide() {
        this._group.opacity(0);
        this._group.listening(false);
    }

    show() {
        this._group.opacity(this._opacity);
        this._group.listening(this._listening);
    }
}