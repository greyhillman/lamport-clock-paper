import { Model } from "../mvc/Model";
import { NumberModel } from "./NumberModel";

interface Events {
    time: number;
}

export class MessageModel extends Model<Events> {
    private _timestamp: number;
    get timestamp(): number {
        return this._timestamp;
    }

    private _flightTime: NumberModel;
    get flightTime(): number {
        return this._flightTime.value;
    }

    private _latency: number;
    get latency(): number {
        return this._latency;
    }

    constructor(timestamp: number, latency: number) {
        super();

        this._timestamp = timestamp;
        this._latency = latency;

        this._flightTime = new NumberModel(0);
        this._flightTime.addListener("value", value => {
            this.dispatchEvent("time", value);
        });
    }

    increment(diff: number) {
        this._flightTime.value += diff;
    }
}