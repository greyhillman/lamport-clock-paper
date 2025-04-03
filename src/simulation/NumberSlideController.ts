import { Controller } from "../mvc/Controller";
import { NumberModel } from "./NumberModel";
import { NumberSliderView } from "./NumberSliderView";

export class NumberSliderController extends Controller<NumberModel, NumberSliderView> {
    constructor(model: NumberModel, view: NumberSliderView) {
        super(model, view);

        this._view.addListener("value", value => {
            model.value = value;
        });
    }
}