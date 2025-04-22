import { Model } from "../../mvc/Model";
import { RequestModel } from "./RequestModel";

interface Events {
    "add": RequestModel;
    "remove": RequestModel[];
}

export class RequestQueueModel extends Model<Events> {
    private _messages: RequestModel[];

    constructor(message: RequestModel | undefined) {
        super();

        this._messages = [];

        if (message) {
            this._messages.push(message);
        }
    }

    get messages() {
        return this._messages;
    }

    add(message: RequestModel) {
        this._messages.push(message);
        this._sort();

        this.dispatchEvent("add", message);
    }

    remove(predicate: (message: RequestModel) => boolean) {
        const removed = this._messages.filter(predicate);

        this._messages = this._messages.filter(x => !predicate(x));
        this._sort();

        this.dispatchEvent("remove", removed);
    }

    _sort() {
        this._messages.sort((left, right) => {
            const timeDiff = left.timestamp - right.timestamp;
            if (timeDiff !== 0) {
                return timeDiff;
            }

            if (left.process < right.process) {
                return -1;
            } else if (left.process > right.process) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    min(): RequestModel | undefined {
        if (this._messages.length > 0) {
            return this._messages[0];
        }

        return undefined;
    }

    clear() {
        this.remove(() => true);
    }
}