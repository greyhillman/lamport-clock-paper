import { View } from "../../mvc/View";
import { MathNumberView } from "../MathNumberView";
import { NumberModel } from "../NumberModel";
import { NumberSliderView } from "../NumberSliderView";

interface Events {

}

interface Options {
    elements: {
        number: MathMLElement;
        input: HTMLInputElement;
    };

    format: (value: number) => string;
}

export class MathNumberRangeView extends View<NumberModel, Events> {
    number: MathNumberView;
    input: NumberSliderView;

    constructor(model: NumberModel, options: Options) {
        super(model);

        this.number = new MathNumberView(this.model, {
            element: options.elements.number,
            format: options.format,
        });
        this.input = new NumberSliderView(this.model, {
            element: options.elements.input,
        });
    }
}