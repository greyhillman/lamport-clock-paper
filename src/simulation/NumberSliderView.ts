import { View } from "../mvc/View";
import { NumberModel } from "./NumberModel";

interface Events {
    value: number;
}

interface Options {
    element: HTMLInputElement;
}

export class NumberSliderView extends View<NumberModel, Events> {
    private _element: HTMLInputElement;

    constructor(model: NumberModel, options: Options) {
        super(model);

        this._element = options.element;

        this._element.addEventListener("input", event => {
            const value = +(event.currentTarget as HTMLInputElement).value;

            this.dispatchEvent("value", value);
        });

        model.addListener("value", value => {
            this._element.value = `${value}`;
        });
    }

    set min(value: number) {
        this._element.min = `${value}`;
    }

    set max(value: number) {
        this._element.max = `${value}`;
    }

    enable() {
        this._element.disabled = false;
    }

    disable() {
        this._element.disabled = true;
    }
}