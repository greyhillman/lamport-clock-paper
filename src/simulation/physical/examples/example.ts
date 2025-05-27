import Konva from "konva";
import { Controller } from "../../../mvc/Controller";
import { Model } from "../../../mvc/Model";
import { View } from "../../../mvc/View";
import { PhysicalClockModel } from "../PhysicalClockModel";
import { PhysicalClockView } from "../PhysicalClockView";
import { Point } from "../../../Point";
import { IFrame } from "konva/lib/types";
import { StringModel } from "../../StringModel";
import { NumberModel } from "../../NumberModel";
import { attachPropertyValue } from "../../css";

class SimulationModel extends Model<ModelEvents> {
    clock: PhysicalClockModel;
    speed: NumberModel;

    private _playing: boolean;

    constructor() {
        super();

        this.speed = new NumberModel(1);
        this.clock = new PhysicalClockModel(this.speed);
        this._playing = true;
    }

    get playing() {
        return this._playing;
    }

    play() {
        this._playing = true;

        this.dispatchEvent("play", undefined);
    }

    pause() {
        this._playing = false;

        this.dispatchEvent("pause", undefined);
    }

    reset() {
        this.pause();
        this.clock.reset();
    }
}

interface ViewOptions {
    id: string;

    width: number;
    height: number;
}

interface Styles {
    backgroundColor: StringModel;
    color: StringModel;
}

class SimulationView extends View<SimulationModel, ViewEvents> {
    private _stage: Konva.Stage;
    private _layer: Konva.Layer;

    private _animation: Konva.Animation;

    private _figure: HTMLElement;

    private _playButton: HTMLButtonElement;
    private _pauseButton: HTMLButtonElement;
    private _resetButton: HTMLButtonElement;

    clock: PhysicalClockView;

    constructor(model: SimulationModel, options: ViewOptions) {
        super(model);

        this._figure = document.getElementById(options.id)!;
        this._playButton = this._figure.querySelector<HTMLButtonElement>("button[name='play']")!;
        this._pauseButton = this._figure.querySelector<HTMLButtonElement>("button[name='pause']")!;
        this._resetButton = this._figure.querySelector<HTMLButtonElement>("button[type='reset']")!;

        const canvasContainer = this._figure.querySelector("div")!;

        this._stage = new Konva.Stage({
            container: canvasContainer,
            width: options.width,
            height: options.height,
        });

        this._layer = new Konva.Layer();
        this._stage.add(this._layer);

        this._animation = new Konva.Animation(frame => {
            if (frame) {
                this._render(frame);
            }
        }, this._layer);

        const styles = this._getStyles(this._stage.container());

        this.clock = new PhysicalClockView(model.clock, {
            container: this._layer,
            center: new Point(60, 60),
            radius: 50,
            styles: styles,
        });

        model.speed.addListener("value", speed => {
            const element = this._figure.querySelector<MathMLElement>("mn[data-var='speed']")!;

            element.textContent = `${speed.toFixed(2)}`;
        });

        this._figure.querySelector<HTMLInputElement>("input[name='speed']")?.addEventListener("input", event => {
            const value = +(event.target as HTMLInputElement).value;

            this.dispatchEvent("updateSpeed", value);
        });

        this._resetButton.addEventListener("click", event => {
            event.preventDefault(); // Don't reset the input elements

            this.dispatchEvent("reset", undefined);
        });
        this._playButton.addEventListener("click", () => {
            this.dispatchEvent("play", undefined);
        });
        this._pauseButton.addEventListener("click", () => {
            this.dispatchEvent("pause", undefined);
        });

        model.addListener("play", () => {
            this.play();
        });
        model.addListener("pause", () => {
            this.pause();
        });
    }

    private _render(frame: IFrame): void {
        const diff = frame!.timeDiff / 1000;

        this.dispatchEvent("updateFrame", diff);

        this._renderTime(frame!.time / 1000);
    }

    private _getStyles(element: HTMLElement): Styles {
        return {
            color: attachPropertyValue(element, "--font-color"),
            backgroundColor: attachPropertyValue(element, "--background-color"),
        };
    }

    private _renderTime(time: number): void {
        const element = this._figure.querySelector<MathMLElement>("mn[data-var='time']")!;

        element.textContent = `${time.toFixed(1)}s`;
    }

    play() {
        this._playButton.disabled = true;
        this._pauseButton.disabled = false;
        this._animation.start();
    }

    pause() {
        this._playButton.disabled = false;
        this._pauseButton.disabled = true;
        this._animation.stop();
    }

    reset() {
        this._animation = new Konva.Animation(frame => {
            if (frame) {
                this._render(frame);
            }
        }, this._layer);

        this._renderTime(0);
    }
}

interface ModelEvents {
    play: void;
    pause: void;
}

interface ViewEvents {
    updateFrame: number;

    updateSpeed: number;

    play: void;
    pause: void;
    reset: void;
}

class SimulationController extends Controller<SimulationModel, SimulationView> {
    constructor(model: SimulationModel, view: SimulationView) {
        super(model, view);

        view.addListener("updateFrame", diff => {
            this._model.clock.increment(diff);
        });

        view.addListener("updateSpeed", speed => {
            this._model.speed.value = speed;
        });

        view.addListener("play", () => {
            this._model.play();
        });
        view.addListener("pause", () => {
            this._model.pause();
        });
        view.addListener("reset", () => {
            this._model.reset();
            this._view.reset();
        });
    }
}

const model = new SimulationModel();
const view = new SimulationView(model, {
    id: "physical-clock-example",
    width: 120,
    height: 120,
});
const controller = new SimulationController(model, view);

// view.play();