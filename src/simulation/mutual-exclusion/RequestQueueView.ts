import Konva from "konva";
import { View } from "../../mvc/View";
import { RequestQueueModel } from "./RequestQueueModel";
import { Direction, Point } from "../../Point";
import { RequestView } from "./RequestView";
import { IdentifierView } from "./IdentifierView";
import { StringModel } from "../StringModel";

interface Options {
    container: Konva.Container;

    start: Point;
    getIdentifier: (process: string, container: Konva.Container) => IdentifierView;

    styles: Styles;
}

interface Styles {
    color: StringModel;
    backgroundColor: StringModel;
    fontFamily: StringModel;
}

export class RequestQueueView extends View<RequestQueueModel> {
    private _styles: Styles;
    private _getIdentifier: (process: string, container: Konva.Container) => IdentifierView;

    private _group: Konva.Group;

    private _messages: RequestView[];

    private _border: Konva.Rect;
    private _label: Konva.Text;

    private _messageStart: Point;

    constructor(model: RequestQueueModel, options: Options) {
        super(model);

        this._styles = options.styles;
        this._getIdentifier = options.getIdentifier;

        this._group = new Konva.Group({
            x: options.start.x,
            y: options.start.y,
        });
        options.container.add(this._group);

        this._border = new Konva.Rect({
            width: 100,
            height: 200,
            stroke: options.styles.color.value,
            strokeWidth: 2,
        });

        this._label = new Konva.Text({
            x: 0,
            y: 205,
            width: 100,
            height: 40,
            fontFamily: options.styles.fontFamily.value,
            fontSize: 25,
            text: "Requests",
            fill: options.styles.color.value,
        });

        this._group.add(this._border);
        this._group.add(this._label);

        this._messageStart = new Point(5, 170);

        this._messages = [];

        this._updateView();

        model.addListener("add", () => {
            this._updateView();
        });
        model.addListener("remove", () => {
            this._updateView();
        });

        options.styles.color.addListener("value", color => {
            this._border.stroke(color);
            this._label.fill(color);
        });
    }

    _updateView() {
        for (const view of this._messages) {
            view.destroy();
        }

        this._messages = [];
        let currentCenter = this._messageStart;
        const diff = new Direction(0, -30);

        for (const message of this.model.messages) {
            const view = new RequestView(message, {
                container: this._group,
                start: currentCenter,
                styles: this._styles,
                getIdentifier: (process, container) => this._getIdentifier(process, container),
            });

            this._messages.push(view);

            currentCenter = currentCenter.add(diff);
        }
    }
}
