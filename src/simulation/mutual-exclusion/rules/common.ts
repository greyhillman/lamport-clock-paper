import Konva from "konva";
import { IdentifierModel } from "../IdentifierModel";
import { IdentifierView } from "../IdentifierView";
import { StringModel } from "../../StringModel";

export interface ViewStyles {
    color: StringModel;
    highlightColor: StringModel;
    backgroundColor: StringModel;
    fontFamily: StringModel;
}

export const identifierModels = {
    "a": new IdentifierModel("a"),
    "b": new IdentifierModel("b"),
    "c": new IdentifierModel("c"),
}

export const identifierViews: { [process: string]: (container: Konva.Container, color: StringModel) => IdentifierView } = {
    "a": (container: Konva.Container, color: StringModel) => {
        return new IdentifierView(identifierModels.a, {
            container,
            shape: new Konva.Circle({
                x: 15,
                y: 15,
                radius: 15,
                fill: color.value,
            }),
            styles: {
                color: color,
            },
        });
    },
    "b": (container: Konva.Container, color: StringModel) => {
        return new IdentifierView(identifierModels.b, {
            container,
            shape: new Konva.RegularPolygon({
                x: 15,
                y: 15,
                sides: 3,
                radius: 15,
                fill: color.value,
            }),
            styles: {
                color: color,
            },
        });
    },
    "c": (container: Konva.Container, color: StringModel) => {
        return new IdentifierView(identifierModels.c, {
            container,
            shape: new Konva.Rect({
                width: 30,
                height: 30,
                fill: color.value,
            }),
            styles: {
                color: color,
            },
        });
    }
}