import { Model } from "../../mvc/Model";
import { ClockModel } from "../ClockModel";
import { MessageModel } from "./MessageModel";
import { LockModel } from "./LockModel";
import { RequestQueueModel } from "./RequestQueueModel";
import { PendingQueueModel } from "./PendingQueueModel";
import { RequestModel } from "./RequestModel";

interface Events {
    "send": {
        receiver: string;
        data: MessageModel;
    }

    "receive": MessageModel;
    "deliver": MessageModel;
}

interface Options {
    identifier: string;
    locked: boolean;

    others: string[];

    initialMessage: RequestModel;
}

export class ProcessModel extends Model<Events> {
    private _identifier: string;

    clock: ClockModel;
    lock: LockModel;

    requests: RequestQueueModel;

    pending: PendingQueueModel;

    timestamps: { [process: string]: number | undefined };

    others: string[];

    constructor(options: Options) {
        super();

        this._identifier = options.identifier;

        this.clock = new ClockModel();
        this.lock = new LockModel(options.locked);
        this.requests = new RequestQueueModel(options.initialMessage);

        this.pending = new PendingQueueModel();
        this.timestamps = {};
        this.others = options.others;
    }

    get identifier() {
        return this._identifier;
    }

    request() {
        const message = new MessageModel(this.clock.send(), this._identifier, "request");

        this.requests.add(new RequestModel(message.timestamp, this._identifier));

        for (const other of this.others) {
            this.dispatchEvent("send", {
                receiver: other,
                data: message,
            });
        }

        this.grant();
    }

    release() {
        this.lock.unlock();

        const message = new MessageModel(this.clock.send(), this._identifier, "release");

        this.requests.remove(request => request.process === this._identifier);

        for (const other of this.others) {
            this.dispatchEvent("send", {
                receiver: other,
                data: message,
            });
        }

        this.grant();
    }

    addPending(message: MessageModel) {
        this.pending.queue(message);

        this.dispatchEvent("receive", message);
    }

    receive(message: MessageModel) {
        this.clock.receive(message.timestamp);

        this.pending.remove(message);

        this.dispatchEvent("deliver", message);

        this.timestamps[message.sender] = message.timestamp;

        switch (message.request) {
            case "request":
                this.requests.add(new RequestModel(message.timestamp, message.sender));

                const acknowledge = new MessageModel(this.clock.send(), this._identifier, "acknowledge");

                this.dispatchEvent("send", {
                    receiver: message.sender,
                    data: acknowledge,
                });

                break;
            case "release":
                this.requests.remove(request => request.process === message.sender);

                break;
            case "acknowledge":
                break;
        }

        this.grant();
    }

    grant() {
        const min = this.requests.min();
        if (!min) {
            return;
        } else if (min.process !== this._identifier) {
            return;
        }

        let isFirst = true;
        for (const other of this.others) {
            if (other in this.timestamps) {
                const latestReceivedTimestamp = this.timestamps[other];

                if (latestReceivedTimestamp === undefined) {
                    isFirst = false;
                    break;
                }

                if (latestReceivedTimestamp <= min.timestamp) {
                    isFirst = false;
                    break;
                }
            } else {
                isFirst = false;
                break;
            }
        }

        if (isFirst && !this.lock.locked) {
            this.lock.lock();
        }
    }

    reset(options: { locked: boolean, initial_message: RequestModel }) {
        this.clock.reset();

        if (options.locked) {
            this.lock.lock();
        } else {
            this.lock.unlock();
        }

        this.requests.clear();
        this.requests.add(options.initial_message);

        this.pending.clear();

        this.timestamps = {};
    }
}