import Konva from "konva";
import { Model } from "./mvc/Model";
import { View } from "./mvc/View";
import { Controller } from "./mvc/Controller";
import { LockView } from "./simulation/mutual-exclusion/LockView";
import { LockModel } from "./simulation/mutual-exclusion/LockModel";
import { Point } from "./Point";
import { LockController } from "./simulation/mutual-exclusion/LockController";
import { ProcessModel } from "./simulation/mutual-exclusion/ProcessModel";
import { MessageModel } from "./simulation/mutual-exclusion/MessageModel";
import { ProcessView } from "./simulation/mutual-exclusion/ProcessView";
import { ProcessController } from "./simulation/mutual-exclusion/ProcessController";
import { RequestModel } from "./simulation/mutual-exclusion/RequestModel";
import { LockShape } from "./simulation/LockShape";
import { IdentifierView } from "./simulation/mutual-exclusion/IdentifierView";
import { IdentifierModel } from "./simulation/mutual-exclusion/IdentifierModel";
import { MessageView } from "./simulation/MessageView";
import { PendingMessageView } from "./simulation/mutual-exclusion/PendingMessageView";
import { identifierViews, ViewStyles } from "./simulation/mutual-exclusion/rules/common";
import { attachPropertyValue } from "./simulation/css";

class SimulationModel extends Model {
    processes: ProcessModel[];

    private _initial_request: RequestModel;

    constructor() {
        super();

        const ids = [
            "a",
            "b",
            "c",
        ];

        this._initial_request = new RequestModel(-1, "a");

        this.processes = ids.map(id => {
            return new ProcessModel({
                identifier: id,
                locked: id === "a",
                others: ids.filter(x => x !== id),
                initialMessage: this._initial_request,
            });
        });

        this.processes.forEach(process => {
            process.addListener("send", message => {
                const receiver = this.processes.find(other => other.identifier === message.receiver);
                if (receiver) {
                    receiver.addPending(message.data);
                }
            });
        });
    }

    reset() {
        this.processes[0].reset({
            locked: true,
            initial_message: this._initial_request,
        });
        this.processes[1].reset({
            locked: false,
            initial_message: this._initial_request,
        });
        this.processes[2].reset({
            locked: false,
            initial_message: this._initial_request,
        });
    }
}

interface SimulationEvents {
    "reset": void;
}

interface ViewOptions {
    canvasId: string;
    controlsId: string;
}

class SimulationView extends View<SimulationModel, SimulationEvents> {
    private _canvas: HTMLDivElement;
    private _stage: Konva.Stage;
    private _layer: Konva.Layer;

    processes: ProcessView[];

    constructor(model: SimulationModel, options: ViewOptions) {
        super(model);

        this._canvas = document.getElementById(options.canvasId)! as HTMLDivElement;
        const styles = this._getStyle();

        this._stage = new Konva.Stage({
            container: this._canvas,
            width: 625,
            height: 310,
        });
        this._layer = new Konva.Layer();
        this._stage.add(this._layer);

        const centers = [
            new Point(5, 80),
            new Point(220, 80),
            new Point(430, 80),
        ];

        this.processes = model.processes.map((process, index) => {
            const view = new ProcessView(process, {
                container: this._layer,
                start: centers[index],
                styles: styles,
                getIdentifier: (process, container) => {
                    return identifierViews[process](container, styles.color);
                },
            });

            view.lock.addListener("pointerover", () => {
                this._stage.container().style.cursor = "pointer";
            });
            view.lock.addListener("pointerout", () => {
                this._stage.container().style.cursor = "auto";
            });

            return view;
        });

        const formControls = document.getElementById(options.controlsId)!;
        formControls.addEventListener("submit", event => {
            event.preventDefault(); // We're using JavaScript to respond
        });

        formControls.querySelector<HTMLButtonElement>("button[type='reset']")!.addEventListener("click", () => {
            this.dispatchEvent("reset", undefined);
        });
    }

    private _getStyle(): ViewStyles {
        return {
            color: attachPropertyValue(this._canvas, "--font-color"),
            highlightColor: attachPropertyValue(this._canvas, "--highlight-color"),
            backgroundColor: attachPropertyValue(this._canvas, "--background-color"),
            fontFamily: attachPropertyValue(this._canvas, "--font-family"),
        };
    }
}

class SimulationController extends Controller<SimulationModel, SimulationView> {
    processes: ProcessController[];

    constructor(model: SimulationModel, view: SimulationView) {
        super(model, view);

        this.processes = model.processes.map((model, index) => {
            return new ProcessController(model, view.processes[index]);
        });

        view.addListener("reset", () => {
            this.reset();
        })
    }

    reset() {
        this._model.reset();
    }
}

const model = new SimulationModel();
const view = new SimulationView(model, {
    canvasId: "mutual-exclusion-simulation",
    controlsId: "mutual-exclusion-simulation-controls",
});
const controller = new SimulationController(model, view);
