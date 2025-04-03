import { Model } from "../../mvc/Model";
import { MessageModel } from "../MessageModel";
import { NumberModel } from "../NumberModel";

interface Events {
    send: MessageModel;
    receive: MessageModel;
}

interface Options {
    minDelay: NumberModel;
    maxUnpredictableDelay: NumberModel;
}

export class LinkModel extends Model<Events> {
    private _messages: MessageModel[];

    minDelay: NumberModel;

    maxUnpredictableDelay: NumberModel;

    constructor(options: Options) {
        super();

        this.minDelay = options.minDelay;
        this.maxUnpredictableDelay = options.maxUnpredictableDelay;

        this._messages = [];
    }

    send(timestamp: number) {
        const latency = this.minDelay.value + Math.random() * this.maxUnpredictableDelay.value;
        const message = new MessageModel(timestamp, latency);

        this._messages.push(message);

        this.dispatchEvent("send", message);
    }

    increment(diff: number) {
        const received: MessageModel[] = [];

        for (const message of this._messages) {
            message.increment(diff);

            if (message.flightTime >= message.latency) {
                this.dispatchEvent("receive", message);

                received.push(message);
            }
        }

        this._messages = this._messages.filter(message => !received.some(received => received === message));
    }

    reset() {
        for (const message of this._messages) {
            this.dispatchEvent("receive", message);
        }

        this._messages = [];
    }
}