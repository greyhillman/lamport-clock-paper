import Konva from "konva";
import { Direction, Point } from "./Point";
import { Model } from "./mvc/Model";
import { View } from "./mvc/View";
import { Controller } from "./mvc/Controller";
import { AnalogClockView } from "./simulation/AnalogClockView";
import { ClockModel } from "./simulation/ClockModel";
import { RegisterClockView } from "./simulation/RegisterClockView";
import { MessageModel } from "./simulation/MessageModel";
import { MessageView } from "./simulation/MessageView";
import { ProcessClockView } from "./simulation/ProcessClockView";
import { attachPropertyValue } from "./simulation/css";
import { StringModel } from "./simulation/StringModel";


// Implementation Rule 1 Example
{
    const element = document.getElementById("implementation-rule-1-clock") as HTMLDivElement;

    const styles = {
        textColor: attachPropertyValue(element, "--font-color"),
        highlightColor: attachPropertyValue(element, "--highlight-color"),
        backgroundColor: attachPropertyValue(element, "--background-color"),
        fontFamily: attachPropertyValue(element, "--font-family"),
    };

    const stage = new Konva.Stage({
        container: element,
        width: 110,
        height: 175,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const model = new ClockModel();
    const analogView = new AnalogClockView({
        model,
        container: layer,
        center: new Point(55, 55),
        radius: 50,
        styles: {
            color: styles.textColor,
            backgroundColor: styles.backgroundColor,
        }
    });

    const digitalView = new RegisterClockView(model, {
        container: layer,
        start: new Point(15, 120),
        dimensions: new Direction(80, 40),
        styles: {
            color: styles.textColor,
            fontFamily: styles.fontFamily,
        }
    });

    const form = document.getElementById("implementation-rule-1-controls")!;
    form.addEventListener("submit", event => {
        event.preventDefault();
    });

    const addEventButton = form.querySelector<HTMLButtonElement>("button[name='event']")!;
    addEventButton.addEventListener("click", () => {
        model.increment();
    });
}

// Implementation Rule 2a example
{
    interface Styles {
        textColor: StringModel;
        highlightColor: StringModel;
        backgroundColor: StringModel;
        fontFamily: StringModel;
    }

    interface SimulationEvents {
        "send": MessageModel;
    }

    class SimulationModel extends Model<SimulationEvents> {
        clock: ClockModel;
        messages: MessageModel[];

        constructor() {
            super();

            this.clock = new ClockModel();
            this.messages = [];
        }

        event() {
            this.clock.increment();
        }

        send() {
            const timestamp = this.clock.send();

            const message = new MessageModel(timestamp, 0);
            this.messages.push(message);

            this.dispatchEvent("send", message);
        }
    }

    interface SimulationViewEvents {
        "event": void;
        "send": void;
    }

    class SimulationView extends View<SimulationModel, SimulationViewEvents> {
        private _layer: Konva.Layer;
        private _styles: Styles;

        analog: AnalogClockView;
        register: RegisterClockView;

        message: MessageView | undefined;

        constructor(stage: Konva.Stage, styles: Styles, model: SimulationModel) {
            super(model);

            this._styles = styles;

            this._layer = new Konva.Layer();
            stage.add(this._layer);

            this.analog = new AnalogClockView({
                model: model.clock,
                container: this._layer,
                center: new Point(55, 55),
                radius: 50,
                styles: {
                    color: styles.textColor,
                    backgroundColor: styles.backgroundColor,
                }
            });

            this.register = new RegisterClockView(model.clock, {
                container: this._layer,
                start: new Point(15, 120),
                dimensions: new Direction(80, 40),
                styles: {
                    color: styles.textColor,
                    fontFamily: styles.fontFamily,
                }
            });

            this.message = undefined;

            const form = document.getElementById("implementation-rule-2a-controls")!;
            form.addEventListener("submit", event => {
                event.preventDefault();
            });

            const addEventButton = form.querySelector<HTMLButtonElement>("button[name='event']")!;
            addEventButton.addEventListener("click", () => {
                this.dispatchEvent("event", undefined);
                if (this.message) {
                    this.message.destroy();
                    this.message = undefined;
                }
            });

            const sendMessageButton = form.querySelector<HTMLButtonElement>("button[name='send']")!;
            sendMessageButton.addEventListener("click", () => {
                this.dispatchEvent("send", undefined);
            });

            this.model.addListener("send", model => {
                this.addMessage(model);
            });
        }

        addMessage(model: MessageModel) {
            if (this.message) {
                this.message.destroy();
                this.message = undefined;
            }

            const start = new Point(130, 50);

            this.message = new MessageView({
                model: model,
                center: start,
                container: this._layer,
                styles: {
                    color: this._styles.textColor,
                    fontFamily: this._styles.fontFamily,
                },
            });
        }
    }

    class SimulationController extends Controller<SimulationModel, SimulationView> {
        constructor(model: SimulationModel, view: SimulationView) {
            super(model, view);

            view.addListener("event", () => {
                model.event();
            });
            view.addListener("send", () => {
                model.send();
            });
        }
    }

    const canvas = document.getElementById("implementation-rule-2a-canvas") as HTMLDivElement;

    const styles = {
        textColor: attachPropertyValue(canvas, "--font-color"),
        highlightColor: attachPropertyValue(canvas, "--highlight-color"),
        backgroundColor: attachPropertyValue(canvas, "--background-color"),
        fontFamily: attachPropertyValue(canvas, "--font-family"),
    };

    const stage = new Konva.Stage({
        container: canvas,
        width: 225,
        height: 175,
    });

    const model = new SimulationModel();
    const view = new SimulationView(stage, styles, model);
    const controller = new SimulationController(model, view);
}

// Implementation Rule 2b example
{
    interface Styles {
        textColor: StringModel;
        highlightColor: StringModel;
        backgroundColor: StringModel;
        fontFamily: StringModel;
    }

    interface SimulationEvents {
        "send": MessageModel;
        "receive": MessageModel;
    }

    class SimulationModel extends Model<SimulationEvents> {
        sender: ClockModel;
        receiver: ClockModel;

        message: MessageModel | undefined;

        constructor() {
            super();

            this.sender = new ClockModel();
            this.receiver = new ClockModel();

            this.message = undefined;
        }

        send() {
            const timestamp = this.sender.send();

            this.message = new MessageModel(timestamp, 0);

            this.dispatchEvent("send", this.message);
        }

        receive() {
            if (!this.message) {
                return;
            }

            const message = this.message;

            this.receiver.receive(message.timestamp);

            this.dispatchEvent("receive", message);

            this.message = undefined;
        }
    }

    interface SimulationViewEvents {
        "sender-event": void;
        "sender-send": void;
        "receiver-event": void;
        "receiver-receive": void;
    }

    class SimulationView extends View<SimulationModel, SimulationViewEvents> {
        private _layer: Konva.Layer;
        private _styles: Styles;

        sender: ProcessClockView;
        receiver: ProcessClockView;

        message: MessageView | undefined;

        private _sendButton: HTMLButtonElement;
        private _receiveButton: HTMLButtonElement;

        constructor(stage: Konva.Stage, styles: Styles, model: SimulationModel) {
            super(model);

            this._styles = styles;

            this._layer = new Konva.Layer();
            stage.add(this._layer);

            this.sender = new ProcessClockView({
                model: model.sender,
                container: this._layer,
                center: new Point(55, 55),
                label: "sender",
                styles: {
                    color: styles.textColor,
                    backgroundColor: styles.backgroundColor,
                    fontFamily: styles.fontFamily,
                },
            });
            this.receiver = new ProcessClockView({
                model: model.receiver,
                container: this._layer,
                center: new Point(275, 55),
                label: "receiver",
                styles: {
                    color: styles.textColor,
                    backgroundColor: styles.backgroundColor,
                    fontFamily: styles.fontFamily,
                },
            });

            this.message = undefined;

            const form = document.getElementById("implementation-rule-2b-controls")!;
            form.addEventListener("submit", event => {
                event.preventDefault();
            });

            form.querySelector<HTMLButtonElement>("fieldset[name='sender'] button[name='event']")?.addEventListener("click", () => {
                this.dispatchEvent("sender-event", undefined);
            });
            form.querySelector<HTMLButtonElement>("fieldset[name='receiver'] button[name='event']")?.addEventListener("click", () => {
                this.dispatchEvent("receiver-event", undefined);
            });

            this._sendButton = form.querySelector<HTMLButtonElement>("fieldset[name='sender'] button[name='send']")!;
            this._sendButton.addEventListener("click", () => {
                if (this.message) {
                    return;
                }

                this.dispatchEvent("sender-send", undefined);
            });

            this._receiveButton = form.querySelector<HTMLButtonElement>("fieldset[name='receiver'] button[name='receive']")!;
            this._receiveButton.addEventListener("click", () => {
                if (!this.message) {
                    return;
                }

                this.dispatchEvent("receiver-receive", undefined);
            });

            this.model.addListener("send", model => {
                this.addMessage(model);
                this._sendButton.disabled = true;
                this._receiveButton.disabled = false;
            });
            this.model.addListener("receive", model => {
                this.message?.destroy();
                this.message = undefined;

                this._sendButton.disabled = false;
                this._receiveButton.disabled = true;
            });
        }

        addMessage(model: MessageModel) {
            const start = new Point(130, 50);

            this.message = new MessageView({
                model: model,
                center: start,
                container: this._layer,
                styles: {
                    color: this._styles.textColor,
                    fontFamily: this._styles.fontFamily,
                },
            });
        }
    }

    class SimulationController extends Controller<SimulationModel, SimulationView> {
        constructor(model: SimulationModel, view: SimulationView) {
            super(model, view);

            view.addListener("sender-event", () => {
                model.sender.increment();
            });
            view.addListener("receiver-event", () => {
                model.receiver.increment();
            });

            view.addListener("sender-send", () => {
                model.send();
            });
            view.addListener("receiver-receive", () => {
                model.receive();
            });
        }
    }

    const canvas = document.getElementById("implementation-rule-2b-canvas") as HTMLDivElement;

    const styles = {
        textColor: attachPropertyValue(canvas, "--font-color"),
        highlightColor: attachPropertyValue(canvas, "--highlight-color"),
        backgroundColor: attachPropertyValue(canvas, "--background-color"),
        fontFamily: attachPropertyValue(canvas, "--font-family"),
    };

    const stage = new Konva.Stage({
        container: canvas,
        width: 330,
        height: 200,
    });

    const model = new SimulationModel();
    const view = new SimulationView(stage, styles, model);
    const controller = new SimulationController(model, view);
}