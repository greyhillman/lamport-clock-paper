import Konva from "konva";
import { View } from "../../mvc/View";
import { PendingQueueModel } from "./PendingQueueModel";
import { Direction, Point } from "../../Point";
import { PendingMessageView } from "./PendingMessageView";
import { IdentifierView } from "./IdentifierView";
import { StringModel } from "../StringModel";

interface Events {
    "update": PendingMessageView;
}

interface Options {
    container: Konva.Container;
    end: Point;

    getIdentifier: (process: string, container: Konva.Container) => IdentifierView;

    styles: Styles;
}

interface Styles {
    color: StringModel;
    backgroundColor: StringModel;
    fontFamily: StringModel;
}

export class PendingQueueView extends View<PendingQueueModel, Events> {
    private _group: Konva.Group;

    messages: { [process: string]: PendingMessageView };

    constructor(model: PendingQueueModel, options: Options) {
        super(model);

        this._group = new Konva.Group({
            x: options.end.x,
            y: options.end.y,
        });
        options.container.add(this._group);

        this.messages = {};

        model.addListener("latest", data => {
            if (data.message) {
                const view = new PendingMessageView(data.message, {
                    container: this._group,
                    start: new Point(0, 0),
                    styles: options.styles,
                    getIdentifier: options.getIdentifier,
                });

                if (data.process in this.messages) {
                    const currentView = this.messages[data.process];
                    currentView.destroy();
                }

                this.messages[data.process] = view;

                this.dispatchEvent("update", view);
            } else {
                if (data.process in this.messages) {
                    const currentView = this.messages[data.process];
                    currentView.destroy();
                }

                delete this.messages[data.process];
            }

            this._reorder();
        });
    }

    _reorder() {
        let currentCenter = new Point(0, -30);
        const diff = new Direction(0, -35);

        for (const process in this.messages) {
            const view = this.messages[process];

            view.moveTo(currentCenter);

            currentCenter = currentCenter.add(diff);
        }
    }
}