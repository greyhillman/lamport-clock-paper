import { Model } from "../../mvc/Model";

interface Events {
    "lock": void;
    "unlock": void;
}

export class LockModel extends Model<Events> {
    private _locked: boolean;

    constructor(locked: boolean) {
        super();

        this._locked = locked;
    }

    get locked() {
        return this._locked;
    }

    lock() {
        this._locked = true;

        this.dispatchEvent("lock", undefined);
    }

    unlock() {
        this._locked = false;

        this.dispatchEvent("unlock", undefined);
    }
}