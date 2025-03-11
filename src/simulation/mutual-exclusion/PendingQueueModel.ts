import { Model } from "../../mvc/Model";
import { MessageModel } from "./MessageModel";

interface Events {
    "latest": {
        process: string;
        message: MessageModel | undefined;
    };
}

export class PendingQueueModel extends Model<Events> {
    private _queue: { [process: string]: MessageModel[] };

    constructor() {
        super();

        this._queue = {};
    }

    queue(item: MessageModel) {
        if (item.sender in this._queue) {
            this._queue[item.sender].push(item);
        } else {
            this._queue[item.sender] = [item];

            this.dispatchEvent("latest", {
                process: item.sender,
                message: item,
            });
        }
    }

    remove(item: MessageModel) {
        if (!(item.sender in this._queue)) {
            return;
        }

        const queue = this._queue[item.sender];

        const index = queue.findIndex(x => x === item);
        if (index < 0) {
            return;
        }

        queue.splice(index, 1);

        if (index === 0 && queue.length > 0) {
            this.dispatchEvent("latest", {
                process: item.sender,
                message: queue[0],
            });
        } else if (queue.length === 0) {
            this.dispatchEvent("latest", {
                process: item.sender,
                message: undefined,
            });

            delete this._queue[item.sender];
        }
    }

    clear() {
        for (const process in this._queue) {
            this.dispatchEvent("latest", {
                process,
                message: undefined,
            });

            delete this._queue[process];
        }
    }
}