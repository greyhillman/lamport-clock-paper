import { Model } from "../mvc/Model";

export class MessageModel extends Model {
    private _timestamp: number;

    constructor(timestamp: number) {
        super();

        this._timestamp = timestamp;
    }

    get timestamp(): number {
        return this._timestamp;
    }
}