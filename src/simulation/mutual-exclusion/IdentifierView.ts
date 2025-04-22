import Konva from "konva";
import { View } from "../../mvc/View";
import { IdentifierModel } from "./IdentifierModel";

interface Options {
    container: Konva.Container;
    shape: Konva.Shape;

    styles: Styles;
}

interface Styles {
    color: string;
}

export class IdentifierView extends View<IdentifierModel> {
    private _group: Konva.Group;
    private _shape: Konva.Shape;

    constructor(model: IdentifierModel, options: Options) {
        super(model);

        this._shape = options.shape;

        this._group = new Konva.Group();
        this._group.add(this._shape);

        options.container.add(this._group);
    }

    scale(scales: { x: number; y: number }) {
        this._group.scale(scales);
    }

    x(value: number): void {
        this._group.x(value);
    }

    y(value: number): void {
        this._group.y(value);
    }

    style(styles: Styles) {
        this._shape.fill(styles.color);
        this._shape.stroke(styles.color);
    }
}
