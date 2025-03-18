import Konva from "konva";
import { IdentifierModel } from "../IdentifierModel";
import { IdentifierView } from "../IdentifierView";

export interface ViewStyles {
    color: string;
    highlightColor: string;
    backgroundColor: string;
    fontFamily: string;
}

export const identifierModels = {
    "a": new IdentifierModel("a"),
    "b": new IdentifierModel("b"),
    "c": new IdentifierModel("c"),
}

export const identifierViews: { [process: string]: (container: Konva.Container, color: string) => IdentifierView } = {
    "a": (container: Konva.Container, color: string) => {
        return new IdentifierView(identifierModels.a, {
            container,
            shape: new Konva.Circle({
                x: 15,
                y: 15,
                radius: 15,
                fill: color,
            }),
            styles: {
                color: color,
            },
        });
    },
    "b": (container: Konva.Container, color: string) => {
        return new IdentifierView(identifierModels.b, {
            container,
            shape: new Konva.RegularPolygon({
                x: 15,
                y: 15,
                sides: 3,
                radius: 15,
                fill: color,
            }),
            styles: {
                color: color,
            },
        });
    },
    "c": (container: Konva.Container, color: string) => {
        return new IdentifierView(identifierModels.c, {
            container,
            shape: new Konva.Rect({
                width: 30,
                height: 30,
                fill: color,
            }),
            styles: {
                color: color,
            },
        });
    }
}