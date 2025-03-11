import { Model } from "../../mvc/Model";

export class IdentifierModel extends Model<{}> {
    private _value: string;

    constructor(value: string) {
        super();

        this._value = value;
    }

    get value() {
        return this._value;
    }
}