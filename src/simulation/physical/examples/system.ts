import Konva from "konva";
import { Controller } from "../../../mvc/Controller";
import { Model } from "../../../mvc/Model";
import { View } from "../../../mvc/View";
import { PhysicalClockModel } from "../PhysicalClockModel";
import { PhysicalClockView } from "../PhysicalClockView";
import { Point } from "../../../Point";
import { IFrame } from "konva/lib/types";
import { MessageModel } from "../../MessageModel";
import { LinkModel } from "../LinkModel";
import { LinkView } from "../LinkView";
import { LinkControlView } from "../LinkControlView";
import { NumberSliderView } from "../../NumberSliderView";
import { MathNumberView } from "../../MathNumberView";
import { NumberModel } from "../../NumberModel";
import { NumberSliderController } from "../../NumberSlideController";
import { PhysicalClockArmView } from "../PhysicalClockArmView";
import { StringModel } from "../../StringModel";
import { attachPropertyValue } from "../../css";

interface ModelEvents {
    play: void;
    pause: void;

    wait: void; // Wait to receive message
    unwait: void; // Good to play again

    "deliver to first": void;
    "deliver to second": void;
}

class SimulationModel extends Model<ModelEvents> {
    first: PhysicalClockModel;
    second: PhysicalClockModel;

    firstTimestamp: NumberModel;
    firstExpectedTimestamp: NumberModel;

    secondTimestamp: NumberModel;
    secondExpectedTimestamp: NumberModel;

    minMessageDelay: NumberModel;
    unpredictableDelay: NumberModel;

    private _playing: boolean;

    firstToSecondLink: LinkModel;
    firstToSecondMessage?: MessageModel;

    secondToFirstLink: LinkModel;
    secondToFirstMessage?: MessageModel;

    constructor() {
        super();

        this.minMessageDelay = new NumberModel(0.2);
        this.unpredictableDelay = new NumberModel(0.2);

        this.first = new PhysicalClockModel(new NumberModel(1));
        this.second = new PhysicalClockModel(new NumberModel(1));

        this.firstTimestamp = new NumberModel(0);
        this.firstExpectedTimestamp = new NumberModel(0);

        this.secondTimestamp = new NumberModel(0);
        this.secondExpectedTimestamp = new NumberModel(0);

        this.firstToSecondLink = new LinkModel({
            minDelay: this.minMessageDelay,
            maxUnpredictableDelay: this.unpredictableDelay,
        });
        this.secondToFirstLink = new LinkModel({
            minDelay: this.minMessageDelay,
            maxUnpredictableDelay: this.unpredictableDelay,
        });

        this._playing = true;

        this.firstToSecondLink.addListener("receive", message => {
            this.firstToSecondMessage = message;
            this.wait();
        });
        this.secondToFirstLink.addListener("receive", message => {
            this.secondToFirstMessage = message;
            this.wait();
        });

        this.secondToFirstLink.addListener("send", message => {
            this.secondTimestamp.value = message.timestamp;
        });
        this.secondToFirstLink.addListener("receive", message => {
            this.firstExpectedTimestamp.value = message.timestamp + this.minMessageDelay.value;
        });

        this.firstToSecondLink.addListener("send", message => {
            this.firstTimestamp.value = message.timestamp;
        });
        this.firstToSecondLink.addListener("receive", message => {
            this.secondExpectedTimestamp.value = message.timestamp + this.minMessageDelay.value;
        });
    }

    get playing() {
        return this._playing;
    }

    deliverToSecond() {
        this.second.receive(this.firstToSecondMessage!.timestamp, this.minMessageDelay.value);

        this.dispatchEvent("deliver to second", undefined);
    }

    deliverToFirst() {
        this.first.receive(this.secondToFirstMessage!.timestamp, this.minMessageDelay.value);

        this.dispatchEvent("deliver to first", undefined);
    }

    play() {
        this._playing = true;

        this.dispatchEvent("play", undefined);
    }

    pause() {
        this._playing = false;

        this.dispatchEvent("pause", undefined);
    }

    wait() {
        this._playing = false;

        this.dispatchEvent("wait", undefined);
    }

    unwait() {
        this._playing = false;
        this.dispatchEvent("unwait", undefined);
    }

    increment(diff: number) {
        this.first.increment(diff);
        this.second.increment(diff);

        this.firstToSecondLink.increment(diff);
        this.secondToFirstLink.increment(diff);
    }

    reset() {
        this.pause();
        this.first.reset();
        this.second.reset();

        this.firstToSecondLink.reset();
        this.secondToFirstLink.reset();
    }
}

interface ViewOptions {
    id: string;

    width: number;
    height: number;
}

interface Styles {
    color: {
        text: StringModel;
        background: StringModel;

        timestamp: StringModel;
        minFuture: StringModel;
        current: StringModel;
    };

    fontFamily: StringModel;
}

interface ViewEvents {
    updateFrame: number;

    updateError: number;
    "min delay": number;
    "unpredictable delay": number;

    play: void;
    pause: void;
    reset: void;
}

class SimulationView extends View<SimulationModel, ViewEvents> {
    private _stage: Konva.Stage;
    private _layer: Konva.Layer;

    private _animation: Konva.Animation;

    private _figure: HTMLElement;

    private _playButton: HTMLButtonElement;
    private _pauseButton: HTMLButtonElement;
    private _resetButton: HTMLButtonElement;

    first: PhysicalClockView;
    _firstSpeed: MathNumberView;
    firstSpeedInput: NumberSliderView;
    firstTimestamp: PhysicalClockArmView;
    firstExpectedTimestamp: PhysicalClockArmView;
    secondOverlay: PhysicalClockArmView;

    second: PhysicalClockView;
    _secondSpeed: MathNumberView;
    secondSpeedInput: NumberSliderView;
    secondTimestamp: PhysicalClockArmView;
    secondExpectedTimestamp: PhysicalClockArmView;
    firstOverlay: PhysicalClockArmView;


    firstToSecondLink: LinkView;
    firstLinkControl: LinkControlView;

    secondToFirstLink: LinkView;
    secondLinkControl: LinkControlView;

    minMessageDelayInput: NumberSliderView;
    minMessageDelayNumber: MathNumberView;

    unpredictableDelayInput: NumberSliderView;
    unpredictableDelayNumber: MathNumberView;

    constructor(model: SimulationModel, options: ViewOptions) {
        super(model);

        this._figure = document.getElementById(options.id)!;
        this._playButton = this._figure.querySelector<HTMLButtonElement>("button[name='play']")!;
        this._pauseButton = this._figure.querySelector<HTMLButtonElement>("button[name='pause']")!;
        this._resetButton = this._figure.querySelector<HTMLButtonElement>("button[type='reset']")!;

        this._firstSpeed = new MathNumberView(model.first.speed, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='speed 1']")!,
            format(value) {
                return `${value.toFixed(2)}`;
            },
        });
        this.firstSpeedInput = new NumberSliderView(model.first.speed, {
            element: this._figure.querySelector<HTMLInputElement>("input[name='speed-1']")!,
        });

        this._secondSpeed = new MathNumberView(model.second.speed, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='speed 2']")!,
            format(value) {
                return `${value.toFixed(2)}`;
            },
        });
        this.secondSpeedInput = new NumberSliderView(model.second.speed, {
            element: this._figure.querySelector<HTMLInputElement>("input[name='speed-2']")!,
        });

        this.minMessageDelayInput = new NumberSliderView(model.minMessageDelay, {
            element: this._figure.querySelector<HTMLInputElement>("input[name='min delay']")!,
        });
        this.minMessageDelayNumber = new MathNumberView(model.minMessageDelay, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='min delay']")!,
            format(value) {
                return `${value.toFixed(2)}s`;
            },
        });

        this.unpredictableDelayInput = new NumberSliderView(model.unpredictableDelay, {
            element: this._figure.querySelector<HTMLInputElement>("input[name='unpredictable delay']")!,
        });
        this.unpredictableDelayNumber = new MathNumberView(model.unpredictableDelay, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='unpredictable delay']")!,
            format(value) {
                return `${value.toFixed(2)}s`;
            },
        });

        this._figure.querySelector<HTMLFormElement>("form")?.addEventListener("submit", event => {
            event.preventDefault();
        });

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

        this.firstToSecondLink = new LinkView(model.firstToSecondLink, {
            containers: {
                link: this._layer,
                message: this._layer,
                tooltip: this._layer,
            },
            start: new Point(100, 30),
            end: new Point(200, 30),
            offset: 0,
            styles: {
                backgroundColor: styles.color.background,
                color: styles.color.text,
                fontFamily: styles.fontFamily,
            },
        });
        this.secondToFirstLink = new LinkView(model.secondToFirstLink, {
            containers: {
                link: this._layer,
                message: this._layer,
                tooltip: this._layer,
            },
            start: new Point(200, 90),
            end: new Point(100, 90),
            offset: 0,
            styles: {
                backgroundColor: styles.color.background,
                color: styles.color.text,
                fontFamily: styles.fontFamily,
            },
        });
        this.firstLinkControl = new LinkControlView(model.firstToSecondLink, {
            send: this._figure.querySelector<HTMLButtonElement>("button[name='send 1']")!,
            receive: this._figure.querySelector<HTMLButtonElement>("button[name='receive 2']")!,
        });
        this.secondLinkControl = new LinkControlView(model.secondToFirstLink, {
            send: this._figure.querySelector<HTMLButtonElement>("button[name='send 2']")!,
            receive: this._figure.querySelector<HTMLButtonElement>("button[name='receive 1']")!,
        });

        this.first = new PhysicalClockView(model.first, {
            container: this._layer,
            center: new Point(60, 60),
            radius: 50,
            styles: {
                color: styles.color.text,
                backgroundColor: styles.color.background,
            },
        });
        this.second = new PhysicalClockView(model.second, {
            container: this._layer,
            center: new Point(240, 60),
            radius: 50,
            styles: {
                color: styles.color.text,
                backgroundColor: styles.color.background,
            },
        });

        this.firstTimestamp = new PhysicalClockArmView(this.model.firstTimestamp, {
            container: this._layer,
            center: new Point(60, 60),
            radius: 50,
            opacity: 0,
            strokeWidth: this.first.strokeWidth,
            styles: {
                color: styles.color.timestamp,
            },
        });
        this.firstExpectedTimestamp = new PhysicalClockArmView(this.model.firstExpectedTimestamp, {
            container: this._layer,
            center: new Point(60, 60),
            radius: 50,
            opacity: 0,
            strokeWidth: this.first.strokeWidth,
            styles: {
                color: styles.color.minFuture,
            },
        });
        this.firstOverlay = new PhysicalClockArmView(this.model.second.time, {
            container: this._layer,
            center: new Point(60, 60),
            radius: 50,
            opacity: 0,
            strokeWidth: this.second.strokeWidth,
            styles: {
                color: styles.color.current,
            },
        });

        this.secondTimestamp = new PhysicalClockArmView(this.model.secondTimestamp, {
            container: this._layer,
            center: new Point(240, 60),
            radius: 50,
            opacity: 0,
            strokeWidth: this.second.strokeWidth,
            styles: {
                color: styles.color.timestamp,
            },
        });
        this.secondExpectedTimestamp = new PhysicalClockArmView(this.model.secondExpectedTimestamp, {
            container: this._layer,
            center: new Point(240, 60),
            radius: 50,
            opacity: 0,
            strokeWidth: this.second.strokeWidth,
            styles: {
                color: styles.color.minFuture,
            },
        });
        this.secondOverlay = new PhysicalClockArmView(this.model.first.time, {
            container: this._layer,
            center: new Point(240, 60),
            radius: 50,
            opacity: 0,
            strokeWidth: this.first.strokeWidth,
            styles: {
                color: styles.color.current,
            },
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

        this.minMessageDelayInput.addListener("value", value => {
            this.dispatchEvent("min delay", value);
        });

        this.unpredictableDelayInput.addListener("value", value => {
            this.dispatchEvent("unpredictable delay", value);
        });

        model.secondToFirstLink.addListener("send", message => {
            this.secondTimestamp.opacity = 1;
        });

        model.secondToFirstLink.addListener("receive", message => {
            this.firstExpectedTimestamp.opacity = 1;
        });
        model.addListener("deliver to first", message => {
            this.secondTimestamp.opacity = 0;
            this.firstExpectedTimestamp.opacity = 0;

            this.secondLinkControl.enableSend();
            this.secondLinkControl.disableReceive();
        });

        model.firstToSecondLink.addListener("send", message => {
            this.firstTimestamp.opacity = 1;
        });
        model.firstToSecondLink.addListener("receive", message => {
            this.secondExpectedTimestamp.opacity = 1;
        });
        model.addListener("deliver to second", message => {
            this.firstTimestamp.opacity = 0;
            this.secondExpectedTimestamp.opacity = 0;

            this.firstLinkControl.enableSend();
            this.firstLinkControl.disableReceive();
        });

        this.first.addListener("pointerover", () => {
            this.firstOverlay.opacity = 1;
        });
        this.first.addListener("pointerout", () => {
            this.firstOverlay.opacity = 0;
        });

        this.second.addListener("pointerover", () => {
            this.secondOverlay.opacity = 1;
        });
        this.second.addListener("pointerout", () => {
            this.secondOverlay.opacity = 0;
        });

        model.addListener("play", () => {
            this.play();
        });
        model.addListener("pause", () => {
            this.pause();
        });
        model.addListener("wait", () => {
            this.wait();
        });
        model.addListener("unwait", () => {
            this.unwait();
        });
    }

    private _render(frame: IFrame): void {
        const diff = frame!.timeDiff / 1000;

        this.dispatchEvent("updateFrame", diff);

        this._renderTime(frame!.time / 1000);
    }

    private _getStyles(element: HTMLElement): Styles {
        return {
            color: {
                text: attachPropertyValue(element, "--font-color"),
                background: attachPropertyValue(element, "--background-color"),
                timestamp: attachPropertyValue(element, "--timestamp-color"),
                minFuture: attachPropertyValue(element, "--min-future-color"),
                current: attachPropertyValue(element, "--current-color"),
            },
            fontFamily: attachPropertyValue(element, "--font-family"),
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

    wait() {
        this._playButton.disabled = true;
        this._pauseButton.disabled = true;
        this._animation.stop();
    }

    unwait() {
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
    minMessageDelay: NumberSliderController;
    unpredictableDelay: NumberSliderController;

    firstSpeed: NumberSliderController;
    secondSpeed: NumberSliderController;

    constructor(model: SimulationModel, view: SimulationView) {
        super(model, view);

        this.minMessageDelay = new NumberSliderController(model.minMessageDelay, view.minMessageDelayInput);
        this.unpredictableDelay = new NumberSliderController(model.unpredictableDelay, view.unpredictableDelayInput);

        this.firstSpeed = new NumberSliderController(model.first.speed, view.firstSpeedInput);
        this.secondSpeed = new NumberSliderController(model.second.speed, view.secondSpeedInput);

        view.addListener("updateFrame", diff => {
            this._model.increment(diff);
        });

        view.firstLinkControl.addListener("send", () => {
            this._model.firstToSecondLink.send(this._model.first.time.value);
        });
        view.secondLinkControl.addListener("send", () => {
            this._model.secondToFirstLink.send(this._model.second.time.value);
        });

        view.firstLinkControl.addListener("receive", () => {
            this._model.deliverToSecond();
            this._model.unwait();
        });
        view.secondLinkControl.addListener("receive", () => {
            this._model.deliverToFirst();
            this._model.unwait();
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
    id: "physical-clock-system",
    width: 300,
    height: 120,
});
const controller = new SimulationController(model, view);
