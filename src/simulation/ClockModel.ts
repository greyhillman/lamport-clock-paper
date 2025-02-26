import { Model } from "../mvc/Model";

interface ClockEvents {
    "update": number;
}

export class ClockModel extends Model<ClockEvents> {
    private _register: number;

    constructor() {
        super();
        this._register = 0;
    }

    get register() {
        return this._register;
    }

    increment() {
        this._register++;

        this.dispatchEvent("update", this._register);
    }

    send(): number {
        this.increment();

        return this._register;
    }

    receive(timestamp: number) {
        this._register = Math.max(this._register, timestamp + 1);

        this.increment();
    }
}