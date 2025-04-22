import { Model } from "../../mvc/Model";
import { NumberModel } from "../NumberModel";

interface Events {
    reset: void;
    receive: void;
}

export class PhysicalClockModel extends Model<Events> {
    time: NumberModel;
    speed: NumberModel;

    constructor(speed: NumberModel) {
        super();

        this.time = new NumberModel(0);
        this.speed = speed;
    }

    clampSpeed(maxDiff: number) {
        const speedDiff = this.speed.value - 1;

        if (speedDiff > maxDiff) {
            this.speed.value = 1 + maxDiff;
        } else if (speedDiff < -maxDiff) {
            this.speed.value = 1 - maxDiff;
        }
    }

    increment(diff: number) {
        this.time.value += diff * this.speed.value;
    }

    receive(timestamp: number, minMessageDelay: number) {
        this.time.value = Math.max(this.time.value, timestamp + minMessageDelay);

        this.dispatchEvent("receive", undefined);
    }

    reset() {
        this.time.value = 0;
        this.speed.value = 1;

        this.dispatchEvent("reset", undefined);
    }
}