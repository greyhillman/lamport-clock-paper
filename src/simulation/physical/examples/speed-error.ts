import Konva from "konva";
import { Controller } from "../../../mvc/Controller";
import { Model } from "../../../mvc/Model";
import { View } from "../../../mvc/View";
import { PhysicalClockModel } from "../PhysicalClockModel";
import { PhysicalClockView } from "../PhysicalClockView";
import { Point } from "../../../Point";
import { IFrame } from "konva/lib/types";
import { NumberModel } from "../../NumberModel";
import { StringModel } from "../../StringModel";
import { attachPropertyValue } from "../../css";

interface ModelEvents {
    play: void;
    pause: void;

    updateError: number;
}

class SimulationModel extends Model<ModelEvents> {
    clock: PhysicalClockModel;

    private _error: number;

    private _playing: boolean;

    constructor() {
        super();

        this.clock = new PhysicalClockModel(new NumberModel(1));
        this._playing = true;
        this._error = 0.2;
    }

    get playing() {
        return this._playing;
    }

    get error() {
        return this._error;
    }

    play() {
        this._playing = true;

        this.dispatchEvent("play", undefined);
    }

    pause() {
        this._playing = false;

        this.dispatchEvent("pause", undefined);
    }

    setError(value: number) {
        this._error = value;

        const speedDiff = this.clock.speed.value - 1;
        if (speedDiff > this._error) {
            this.clock.speed.value = 1 + this._error;
        } else if (speedDiff < -this._error) {
            this.clock.speed.value = 1 - this._error;
        }

        this.dispatchEvent("updateError", this._error);
    }

    reset() {
        this.pause();
        this.clock.reset();
        this.setError(0.2);
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

interface ViewEvents {
    updateFrame: number;

    updateSpeed: number;
    updateError: number;

    play: void;
    pause: void;
    reset: void;
}

class SimulationView extends View<SimulationModel, ViewEvents> {
    private _stage: Konva.Stage;
    private _layer: Konva.Layer;

    private _animation: Konva.Animation;

    private _styles: Styles;

    private _figure: HTMLElement;

    private _playButton: HTMLButtonElement;
    private _pauseButton: HTMLButtonElement;
    private _resetButton: HTMLButtonElement;

    clock: PhysicalClockView;

    private _speedNumber: MathMLElement;
    private _speedInput: HTMLInputElement;

    private _errorNumber: MathMLElement;
    private _errorInput: HTMLInputElement;

    constructor(model: SimulationModel, options: ViewOptions) {
        super(model);

        this._figure = document.getElementById(options.id)!;
        this._playButton = this._figure.querySelector<HTMLButtonElement>("button[name='play']")!;
        this._pauseButton = this._figure.querySelector<HTMLButtonElement>("button[name='pause']")!;
        this._resetButton = this._figure.querySelector<HTMLButtonElement>("button[type='reset']")!;

        this._speedNumber = this._figure.querySelector<MathMLElement>("mn[data-var='speed']")!;
        this._errorNumber = this._figure.querySelector<MathMLElement>("mn[data-var='speed error']")!;

        this._speedInput = this._figure.querySelector<HTMLInputElement>("input[name='speed']")!;
        this._errorInput = this._figure.querySelector<HTMLInputElement>("input[name='speed error']")!;

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

        this._styles = this.getStyles();

        this.clock = new PhysicalClockView(model.clock, {
            container: this._layer,
            center: new Point(60, 60),
            radius: 50,
            styles: this._styles,
        });

        this._speedInput.addEventListener("input", event => {
            const value = +(event.target as HTMLInputElement).value;

            this.dispatchEvent("updateSpeed", value);
        });

        this._errorInput.addEventListener("input", event => {
            const value = +(event.currentTarget as HTMLInputElement).value;

            this.dispatchEvent("updateError", value);
        });

        this._resetButton.addEventListener("click", () => {
            this.dispatchEvent("reset", undefined);
        });
        this._playButton.addEventListener("click", () => {
            this.dispatchEvent("play", undefined);
        });
        this._pauseButton.addEventListener("click", () => {
            this.dispatchEvent("pause", undefined);
        });

        model.clock.speed.addListener("value", speed => {
            this._speedNumber.textContent = `${speed.toFixed(2)}`;
        });
        model.addListener("updateError", error => {
            const min = 1 - error;
            const max = 1 + error;

            this._speedInput.min = `${min}`;
            this._speedInput.max = `${max}`;

            this._errorNumber.textContent = `${error.toFixed(2)}`;
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

    getStyles(): Styles {
        const container = this._stage.container();

        return {
            color: attachPropertyValue(container, "--font-color"),
            backgroundColor: attachPropertyValue(container, "--background-color"),
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


class SimulationController extends Controller<SimulationModel, SimulationView> {
    constructor(model: SimulationModel, view: SimulationView) {
        super(model, view);

        view.addListener("updateFrame", diff => {
            this._model.clock.increment(diff);
        });

        view.addListener("updateSpeed", speed => {
            this._model.clock.speed.value = speed;
        });
        view.addListener("updateError", error => {
            this._model.setError(error);
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
    id: "physical-clock-speed-error",
    width: 120,
    height: 120,
});
const controller = new SimulationController(model, view);

// view.play();