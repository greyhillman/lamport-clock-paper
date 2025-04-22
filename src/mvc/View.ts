import { Model } from "./Model";
import { Observable } from "./Observable";

export abstract class View<M extends Model, Events = {}> extends Observable<Events> {
    model: M;

    constructor(model: M) {
        super();

        this.model = model;
    }
}
