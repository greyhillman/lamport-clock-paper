import { View } from "../../mvc/View";
import { PhysicalClockModel } from "./PhysicalClockModel";

interface Events {

}

interface Options {
    speed: MathMLElement;

    send: HTMLButtonElement;
    receive: HTMLButtonElement;
}

export class ClockControlView extends View<PhysicalClockModel, Events> {
    constructor(model: PhysicalClockModel, options: Options) {
        super(model);
    }
}