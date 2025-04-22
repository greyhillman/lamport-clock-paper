import Konva from "konva";
import { View } from "../../mvc/View";
import { LockModel } from "./LockModel";
import { Point } from "../../Point";
import { LockShape } from "../LockShape";

interface Events {
    "click": void;
    "pointerover": void;
    "pointerout": void;
}

interface Styles {
    color: string;
    backgroundColor: string;
}

interface Options {
    model: LockModel;

    container: Konva.Container;
    start: Point;

    styles: Styles;
}

export class LockView extends View<LockModel, Events> {
    private _group: Konva.Group;

    private _lock: LockShape;

    constructor(options: Options) {
        super(options.model);

        this._group = new Konva.Group({
            x: options.start.x,
            y: options.start.y,
        });
        options.container.add(this._group);

        this._lock = new LockShape({
            container: this._group,
            start: new Point(0, 0),
            styles: options.styles,
        });

        this._lock.addListener("click", () => {
            this.dispatchEvent("click", undefined);
        });
        this._lock.addListener("pointerout", () => {
            this.dispatchEvent("pointerout", undefined);
        });
        this._lock.addListener("pointerover", () => {
            this.dispatchEvent("pointerover", undefined);
        });

        this.model.addListener("lock", () => {
            this._lock.lock();
        });
        this.model.addListener("unlock", () => {
            this._lock.unlock();
        });

        if (this.model.locked) {
            this._lock.lock();
        } else {
            this._lock.unlock();
        }
    }

    style(styles: Styles) {
        this._lock.style({
            color: styles.color,
            backgroundColor: styles.backgroundColor,
        });
    }
}