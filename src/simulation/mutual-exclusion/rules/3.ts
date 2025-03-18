import Konva from "konva";
import { Model } from "../../../mvc/Model";
import { View } from "../../../mvc/View";
import { MessageModel } from "../MessageModel";
import { ProcessModel } from "../ProcessModel";
import { ProcessView } from "../ProcessView";
import { Point } from "../../../Point";
import { PendingMessageView } from "../PendingMessageView";
import { Controller } from "../../../mvc/Controller";
import { identifierViews, ViewStyles } from "./common";

interface ModelEvents {
    "send": {
        receiver: string;
        data: MessageModel;
    }
}

class SimulationModel extends Model<ModelEvents> {
    process: ProcessModel;

    constructor() {
        super();

        this.process = new ProcessModel({
            identifier: "a",
            locked: false,
            initialMessage: undefined,
            others: ["b", "c"],
        });

        this.process.addListener("send", message => {
            this.dispatchEvent("send", message);
        });
    }

    init() {
        this.process.request();
        this.process.receive(new MessageModel(2, "b", "acknowledge"));
        this.process.receive(new MessageModel(2, "c", "acknowledge"));
    }

    reset() {
        this.process.reset({
            initial_message: undefined,
            locked: false,
        });

        this.init();
    }
}

interface ViewEvents {
    "reset": void;
}

interface ViewOptions {
    canvasId: string;
    controlsId: string;
}

class SimulationView extends View<SimulationModel, ViewEvents> {
    private _canvas: HTMLDivElement;

    private _stage: Konva.Stage;
    private _layer: Konva.Layer;

    private _styles: ViewStyles;

    process: ProcessView;

    constructor(model: SimulationModel, options: ViewOptions) {
        super(model);

        this._canvas = document.getElementById(options.canvasId)! as HTMLDivElement;
        this._styles = this._getStyle();

        this._stage = new Konva.Stage({
            container: this._canvas,
            width: 600,
            height: 250,
        });
        this._layer = new Konva.Layer();
        this._stage.add(this._layer);

        this.process = new ProcessView(model.process, {
            container: this._layer,
            start: new Point(200, 10),
            styles: this._styles,
            getIdentifier: (process, container) => {
                return identifierViews[process](container, this._styles.color);
            },
        });

        this.process.lock.addListener("pointerover", () => {
            if (this.process.lock.model.locked) {
                this._canvas.style.cursor = "pointer";
            }
        });
        this.process.lock.addListener("pointerout", () => {
            this._canvas.style.cursor = "auto";
        });

        const formControl = document.getElementById(options.controlsId)!;
        formControl.addEventListener("submit", event => {
            event.preventDefault();
        });

        formControl.querySelector<HTMLButtonElement>("button[type='reset']")?.addEventListener("click", () => {
            this.dispatchEvent("reset", undefined);
        });

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            this._updateStyle();
        });

        model.addListener("send", message => {
            if (message.data.request === "request") {
                return;
            }

            const view = new PendingMessageView(message.data, {
                container: this._layer,
                start: new Point(0, 0),
                styles: this._styles,
                getIdentifier: (process, container) => {
                    return identifierViews[process](container, this._styles.color);
                },
            });

            if (message.receiver === "b") {
                view.move(new Point(100, 100), new Point(-150, 100), () => {
                    view.destroy();
                });
            } else if (message.receiver === "c") {
                view.move(new Point(400, 100), new Point(650, 100), () => {
                    view.destroy();
                });
            } else {
                throw new Error();
            }
        });
    }

    private _getStyle(): ViewStyles {
        const raw = window.getComputedStyle(this._canvas);

        return {
            color: raw.getPropertyValue("--font-color"),
            highlightColor: raw.getPropertyValue("--highlight-color"),
            backgroundColor: raw.getPropertyValue("--background-color"),
            fontFamily: raw.getPropertyValue("--font-family"),
        };
    }

    private _updateStyle() {
        this._styles = this._getStyle();

        this.process.style(this._styles);
    }
}

class SimulationController extends Controller<SimulationModel, SimulationView> {
    constructor(model: SimulationModel, view: SimulationView) {
        super(model, view);

        view.addListener("reset", () => {
            model.reset();
        });

        view.process.lock.addListener("click", () => {
            if (model.process.lock.locked) {
                model.process.release();
            }
        });
    }
}

const model = new SimulationModel();
const view = new SimulationView(model, {
    canvasId: "mutual-exclusion-condition-3-simulation",
    controlsId: "mutual-exclusion-condition-3-simulation-controls",
});
const controller = new SimulationController(model, view);

model.init();