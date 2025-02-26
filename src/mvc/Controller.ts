import { Model } from "./Model";
import { View } from "./View";

export abstract class Controller<M extends Model, V extends View<any>> {
    protected _model: M;
    protected _view: V;

    constructor(model: M, view: V) {
        this._model = model;
        this._view = view;
    }
}
