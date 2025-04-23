import Konva from "konva";
import { View } from "../../mvc/View";
import { ProcessModel } from "./ProcessModel";
import { Direction, Point } from "../../Point";
import { LockView } from "./LockView";
import { AnalogClockView } from "../AnalogClockView";
import { RegisterClockView } from "../RegisterClockView";
import { RequestQueueView } from "./RequestQueueView";
import { PendingMessageView } from "./PendingMessageView";
import { PendingQueueView } from "./PendingQueueView";
import { IdentifierView } from "./IdentifierView";
import { StringModel } from "../StringModel";

interface Events {
    "click-pending": PendingMessageView,
}

interface Options {
    container: Konva.Container;
    start: Point;

    getIdentifier: (process: string, container: Konva.Container) => IdentifierView;

    styles: Styles;
}

interface Styles {
    color: StringModel;
    backgroundColor: StringModel;
    fontFamily: StringModel;
}

export class ProcessView extends View<ProcessModel, Events> {
    private _group: Konva.Group;

    private _identifier: IdentifierView;

    lock: LockView;
    clockRegister: RegisterClockView;

    requestQueue: RequestQueueView;

    pending: PendingQueueView;

    constructor(model: ProcessModel, options: Options) {
        super(model);

        this._group = new Konva.Group({
            x: options.start.x,
            y: options.start.y,
        });
        options.container.add(this._group);

        this._identifier = options.getIdentifier(model.identifier, this._group);
        this._identifier.x(25);
        this._identifier.y(0);

        this.pending = new PendingQueueView(model.pending, {
            container: this._group,
            end: new Point(40, 0),
            styles: options.styles,
            getIdentifier: options.getIdentifier,
        });

        this.lock = new LockView({
            model: model.lock,
            start: new Point(15, 30),
            container: this._group,
            styles: {
                color: options.styles.color,
                backgroundColor: options.styles.backgroundColor,
            },
        });
        this.clockRegister = new RegisterClockView(model.clock, {
            container: this._group,
            start: new Point(0, 140),
            dimensions: new Direction(80, 40),
            styles: {
                color: options.styles.color,
                fontFamily: options.styles.fontFamily,
            },
        });

        this.requestQueue = new RequestQueueView(model.requests, {
            container: this._group,
            start: new Point(90, 0),
            getIdentifier: options.getIdentifier,
            styles: {
                color: options.styles.color,
                backgroundColor: options.styles.backgroundColor,
                fontFamily: options.styles.fontFamily,
            },
        });

        this.pending.addListener("update", view => {
            view.addListener("click", () => {
                this.dispatchEvent("click-pending", view);
            });

            view.addListener("pointerover", () => {
                this._group.getStage()!.container().style.cursor = "pointer";
            });

            view.addListener("pointerout", () => {
                this._group.getStage()!.container().style.cursor = "auto";
            });
        });
    }
}