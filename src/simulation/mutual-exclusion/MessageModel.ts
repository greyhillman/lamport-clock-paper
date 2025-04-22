import { Model } from "../../mvc/Model";
import { ProcessModel } from "./ProcessModel";

type Request = "request" | "release" | "acknowledge";

export class MessageModel extends Model {
    private _timestamp: number;
    private _sender: string;
    private _request: Request;

    constructor(timestamp: number, process: string, request: Request) {
        super();

        this._timestamp = timestamp;
        this._sender = process;
        this._request = request;
    }

    get timestamp() {
        return this._timestamp;
    }

    get sender() {
        return this._sender;
    }

    get request() {
        return this._request;
    }
}