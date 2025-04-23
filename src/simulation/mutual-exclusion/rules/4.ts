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
import { attachPropertyValue } from "../../css";

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
        this.process.receive(new MessageModel(4, "b", "request"));
        this.process.addPending(new MessageModel(10, "b", "release"));
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

    process: ProcessView;

    constructor(model: SimulationModel, options: ViewOptions) {
        super(model);

        this._canvas = document.getElementById(options.canvasId)! as HTMLDivElement;
        const styles = this._getStyle(this._canvas);

        this._stage = new Konva.Stage({
            container: this._canvas,
            width: 600,
            height: 280,
        });
        this._layer = new Konva.Layer();
        this._stage.add(this._layer);

        this.process = new ProcessView(model.process, {
            container: this._layer,
            start: new Point(200, 45),
            styles: styles,
            getIdentifier: (process, container) => {
                return identifierViews[process](container, styles.color);
            },
        });

        const formControl = document.getElementById(options.controlsId)!;
        formControl.addEventListener("submit", event => {
            event.preventDefault();
        });

        formControl.querySelector<HTMLButtonElement>("button[type='reset']")?.addEventListener("click", () => {
            this.dispatchEvent("reset", undefined);
        });

        model.addListener("send", message => {
            if (message.data.request === "acknowledge") {
                return;
            }

            const view = new PendingMessageView(message.data, {
                container: this._layer,
                start: new Point(0, 0),
                styles: styles,
                getIdentifier: (process, container) => {
                    return identifierViews[process](container, styles.color);
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

    private _getStyle(element: HTMLElement): ViewStyles {
        return {
            color: attachPropertyValue(element, "--font-color"),
            highlightColor: attachPropertyValue(element, "--highlight-color"),
            backgroundColor: attachPropertyValue(element, "--background-color"),
            fontFamily: attachPropertyValue(element, "--font-family"),
        };
    }
}

class SimulationController extends Controller<SimulationModel, SimulationView> {
    constructor(model: SimulationModel, view: SimulationView) {
        super(model, view);

        view.addListener("reset", () => {
            model.reset();
        });

        view.process.addListener("click-pending", view => {
            const model = view.model;

            this._model.process.receive(model);
        });
    }
}

const model = new SimulationModel();
const view = new SimulationView(model, {
    canvasId: "mutual-exclusion-condition-4-simulation",
    controlsId: "mutual-exclusion-condition-4-simulation-controls",
});
const controller = new SimulationController(model, view);

model.init();
