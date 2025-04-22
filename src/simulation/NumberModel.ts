import { Model } from "../mvc/Model";

interface Events {
    value: number;
}

export class NumberModel extends Model<Events> {
    private _value: number;

    constructor(value: number) {
        super();

        this._value = value;
    }

    get value() {
        return this._value;
    }

    set value(value: number) {
        this._value = value;

        this.dispatchEvent("value", value);
    }
}
