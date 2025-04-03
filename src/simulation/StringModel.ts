import { Model } from "../mvc/Model";

interface Events {
    value: string;
}

export class StringModel extends Model<Events> {
    private _value: string;

    constructor(value: string) {
        super();

        this._value = value;
    }

    get value() {
        return this._value;
    }

    set value(value: string) {
        this._value = value;

        this.dispatchEvent("value", value);
    }
}
