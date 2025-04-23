import Konva from "konva";
import { Observable } from "../mvc/Observable";
import { Point } from "../Point";
import { StringModel } from "./StringModel";

interface Events {
    "click": void;
    "pointerover": void;
    "pointerout": void;
}

interface Options {
    container: Konva.Container;

    start: Point;
    scale?: number;

    styles: Styles;
}

interface Styles {
    color: StringModel;
    backgroundColor: StringModel;
}

export class LockShape extends Observable<Events> {
    private _group: Konva.Group;

    private _pad: Konva.Rect;
    private _hole: Konva.Shape;
    private _lowerHole: Konva.Circle;
    private _ring: Konva.Arc;
    private _ringArm: Konva.Rect;
    private _ringHook: Konva.Rect;

    constructor(options: Options) {
        super();

        this._group = new Konva.Group({
            x: options.start.x,
            y: options.start.y,
            scaleX: options.scale ?? 1,
            scaleY: options.scale ?? 1,
        });
        options.container.add(this._group);

        this._pad = new Konva.Rect({
            x: 0,
            y: 50,
            width: 50,
            height: 50,
            fill: options.styles.color.value,
            cornerRadius: 5,
        });
        this._group.add(this._pad);

        this._hole = new Konva.Circle({
            x: 25,
            y: 72,
            radius: 8,
            fill: options.styles.backgroundColor.value,
        });
        this._group.add(this._hole);
        this._lowerHole = new Konva.Circle({
            x: 25,
            y: 72 + 8,
            radius: 5,
            fill: options.styles.backgroundColor.value,
        });
        this._group.add(this._lowerHole);

        this._ring = new Konva.Arc({
            x: 25,
            y: 30,
            innerRadius: 10,
            outerRadius: 20,
            angle: 180,
            rotation: 180,
            fill: options.styles.color.value,
        });
        this._ringArm = new Konva.Rect({
            x: 35,
            y: 30,
            width: 10,
            height: 20,
            fill: options.styles.color.value,
        });
        this._ringHook = new Konva.Rect({
            x: 5,
            y: 30,
            width: 10,
            height: 5,
            fill: options.styles.color.value,
        });
        this._group.add(this._ringHook);
        this._group.add(this._ringArm);
        this._group.add(this._ring);

        this._group.on("pointerover", () => {
            this.dispatchEvent("pointerover", undefined);
        });
        this._group.on("pointerout", () => {
            this.dispatchEvent("pointerout", undefined);
        });
        this._group.on("click", () => {
            this.dispatchEvent("click", undefined);
        });

        options.styles.color.addListener("value", color => {
            this._pad.fill(color);
            this._ring.fill(color);
            this._ringArm.fill(color);
            this._ringHook.fill(color);
        });
        options.styles.backgroundColor.addListener("value", color => {
            this._hole.fill(color);
            this._lowerHole.fill(color);
        });
    }

    lock() {
        this._ring.y(45);
        this._ringHook.y(45);
        this._ringArm.y(45);
    }

    unlock() {
        this._ring.y(30);
        this._ringHook.y(30);
        this._ringArm.y(30);
    }
}