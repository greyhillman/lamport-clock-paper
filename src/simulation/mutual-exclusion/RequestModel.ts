import { Model } from "../../mvc/Model";

interface Events {

}

export class RequestModel extends Model<Events> {
    private _timestamp: number;
    private _process: string;

    constructor(timestamp: number, process: string) {
        super();

        this._timestamp = timestamp;
        this._process = process;
    }

    get timestamp() {
        return this._timestamp;
    }

    get process() {
        return this._process;
    }
}