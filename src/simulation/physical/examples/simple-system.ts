import Konva from "konva";
import { Controller } from "../../../mvc/Controller";
import { Model } from "../../../mvc/Model";
import { View } from "../../../mvc/View";
import { PhysicalClockModel } from "../PhysicalClockModel";
import { PhysicalClockView } from "../PhysicalClockView";
import { Point } from "../../../Point";
import { IFrame } from "konva/lib/types";
import { NumberSliderView } from "../../NumberSliderView";
import { MathNumberView } from "../../MathNumberView";
import { NumberSliderController } from "../../NumberSlideController";
import { NumberModel } from "../../NumberModel";
import { StringModel } from "../../StringModel";
import { PhysicalClockArmView } from "../PhysicalClockArmView";
import { attachPropertyValue } from "../../css";

interface ModelEvents {
    play: void;
    pause: void;

    updateError: number;
}

class SimulationModel extends Model<ModelEvents> {
    first: PhysicalClockModel;
    second: PhysicalClockModel;

    private _error: number;

    private _playing: boolean;

    constructor() {
        super();

        this.first = new PhysicalClockModel(new NumberModel(1));
        this.second = new PhysicalClockModel(new NumberModel(1));
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

        this.first.clampSpeed(this._error);
        this.second.clampSpeed(this._error);

        this.dispatchEvent("updateError", this._error);
    }

    reset() {
        this.pause();
        this.first.reset();
        this.second.reset();
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
    highlightColor: StringModel;
}

interface ViewEvents {
    updateFrame: number;

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

    first: PhysicalClockView;
    firstOverlay: PhysicalClockArmView;
    second: PhysicalClockView;
    secondOverlay: PhysicalClockArmView;

    firstSpeedNumber: MathNumberView;
    firstSpeedInput: NumberSliderView;

    secondSpeedNumber: MathNumberView;
    secondSpeedInput: NumberSliderView;

    private _errorInput: HTMLInputElement;
    private _errorNumber: MathMLElement;

    constructor(model: SimulationModel, options: ViewOptions) {
        super(model);

        this._figure = document.getElementById(options.id)!;
        this._playButton = this._figure.querySelector<HTMLButtonElement>("button[name='play']")!;
        this._pauseButton = this._figure.querySelector<HTMLButtonElement>("button[name='pause']")!;
        this._resetButton = this._figure.querySelector<HTMLButtonElement>("button[type='reset']")!;

        this._errorNumber = this._figure.querySelector<MathMLElement>("mn[data-var='speed error']")!;
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

        this.first = new PhysicalClockView(model.first, {
            container: this._layer,
            center: new Point(60, 60),
            radius: 50,
            styles: this._styles,
        });
        this.secondOverlay = new PhysicalClockArmView(model.second.time, {
            container: this._layer,
            center: new Point(60, 60),
            radius: 50,
            strokeWidth: this.first.strokeWidth,
            opacity: 0,
            styles: {
                color: this._styles.highlightColor,
            },
        });

        this.second = new PhysicalClockView(model.second, {
            container: this._layer,
            center: new Point(170, 60),
            radius: 50,
            styles: this._styles,
        });
        this.firstOverlay = new PhysicalClockArmView(model.first.time, {
            container: this._layer,
            center: new Point(170, 60),
            radius: 50,
            strokeWidth: this.second.strokeWidth,
            opacity: 0,
            styles: {
                color: this._styles.highlightColor,
            },
        });

        this.secondOverlay.opacity = 0;
        this.firstOverlay.opacity = 0;

        this.firstSpeedInput = new NumberSliderView(model.first.speed, {
            element: this._figure.querySelector<HTMLInputElement>("input[name='speed-1']")!,
        });
        this.firstSpeedNumber = new MathNumberView(model.first.speed, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='speed-1']")!,
            format(value) {
                return `${value.toFixed(2)}`;
            },
        });

        this.secondSpeedInput = new NumberSliderView(model.second.speed, {
            element: this._figure.querySelector<HTMLInputElement>("input[name='speed-2']")!,
        });
        this.secondSpeedNumber = new MathNumberView(model.second.speed, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='speed-2']")!,
            format(value) {
                return `${value.toFixed(2)}`;
            },
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

        this.first.addListener("pointerover", () => {
            this.secondOverlay.opacity = 1;
        });
        this.first.addListener("pointerout", () => {
            this.secondOverlay.opacity = 0;
        });
        this.second.addListener("pointerover", () => {
            this.firstOverlay.opacity = 1;
        });
        this.second.addListener("pointerout", () => {
            this.firstOverlay.opacity = 0;
        });

        model.addListener("updateError", error => {
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
            highlightColor: attachPropertyValue(container, "--highlight-color"),
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
    firstSpeed: NumberSliderController;
    secondSpeed: NumberSliderController;

    constructor(model: SimulationModel, view: SimulationView) {
        super(model, view);

        this.firstSpeed = new NumberSliderController(model.first.speed, view.firstSpeedInput);
        this.secondSpeed = new NumberSliderController(model.second.speed, view.secondSpeedInput);

        view.addListener("updateFrame", diff => {
            this._model.first.increment(diff);
            this._model.second.increment(diff);
        });

        view.addListener("updateError", error => {
            this._model.setError(error);

            this._view.firstSpeedInput.min = 1 - error;
            this._view.firstSpeedInput.max = 1 + error;

            this._view.secondSpeedInput.min = 1 - error;
            this._view.secondSpeedInput.max = 1 + error;
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
    id: "physical-clock-simple-system",
    width: 230,
    height: 120,
});
const controller = new SimulationController(model, view);

// view.play();