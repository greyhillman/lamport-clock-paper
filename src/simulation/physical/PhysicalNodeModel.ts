import { Model } from "../../mvc/Model";
import { MessageModel } from "../MessageModel";
import { NumberModel } from "../NumberModel";
import { LinkModel } from "./LinkModel";
import { PhysicalClockModel } from "./PhysicalClockModel";

interface Events {

}

interface Options {
    speed: NumberModel;

    neighbourPeriod: NumberModel;
}

export class PhysicalNodeModel extends Model<Events> {
    clock: PhysicalClockModel;

    links: LinkModel[];

    private _heartbeatTime: number;
    private _neighbourPeriod: NumberModel;

    constructor(options: Options) {
        super();

        this.clock = new PhysicalClockModel(options.speed);

        this.links = [];

        this._heartbeatTime = options.neighbourPeriod.value;
        this._neighbourPeriod = options.neighbourPeriod;

        this._neighbourPeriod.addListener("value", value => {
            // This really shouldn't happen unless we're reset
            this._heartbeatTime = value;
        });
    }

    increment(diff: number) {
        this.clock.increment(diff);

        this._heartbeatTime -= diff;
        if (this._heartbeatTime <= 0) {
            this.sendHeartbeat();

            this._heartbeatTime = this._neighbourPeriod.value;
        }
    }

    receive(message: MessageModel, minDelay: number) {
        this.clock.receive(message.timestamp, minDelay);
    }

    addLink(link: LinkModel) {
        this.links.push(link);
    }

    private sendHeartbeat() {
        for (const link of this.links) {
            link.send(this.clock.time.value);
        }
    }

    reset() {
        this.clock.reset();
        this._heartbeatTime = this._neighbourPeriod.value;
    }
}