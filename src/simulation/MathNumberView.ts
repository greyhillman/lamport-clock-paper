import { View } from "../mvc/View";
import { NumberModel } from "./NumberModel";

interface Events {

}

interface Options {
    element: MathMLElement;

    format: (value: number) => string;
}

export class MathNumberView extends View<NumberModel, Events> {
    private _element: MathMLElement;

    constructor(model: NumberModel, options: Options) {
        super(model);

        this._element = options.element;

        const update = (value: number) => {
            this._element.textContent = options.format(value);
        }

        model.addListener("value", value => {
            update(value);
        });

        update(model.value);
    }
}