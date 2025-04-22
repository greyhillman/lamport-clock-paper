import Konva from "konva";
import { View } from "../../mvc/View";
import { LinkModel } from "./LinkModel";
import { Point } from "../../Point";
import { MessageView } from "./MessageView";
import { SvgPathBuilder } from "../../SvgPathBuilder";
import { getSamplePoints, quadraticBezier, quadraticBezierTanget } from "./curves";
import { StringModel } from "../StringModel";

interface Events {

}

interface Options {
    containers: {
        link: Konva.Container;
        message: Konva.Container;
        tooltip: Konva.Container;
    };

    start: Point;
    end: Point;
    offset: number;

    styles: Styles;
}

interface Styles {
    color: StringModel;
    backgroundColor: StringModel;
    fontFamily: StringModel;
}

export class LinkView extends View<LinkModel, Events> {
    private _linkGroup: Konva.Group;
    private _line: Konva.Shape;
    private _arrow: Konva.Shape;

    private _messageGroup: Konva.Group;
    private messages: MessageView[];

    private _tooltip: Konva.Label;
    private _tooltipText: Konva.Text;
    private _tooltipPointer: Konva.Tag;

    constructor(model: LinkModel, options: Options) {
        super(model);

        this._linkGroup = new Konva.Group();
        options.containers.link.add(this._linkGroup);

        this._messageGroup = new Konva.Group();
        options.containers.message.add(this._messageGroup);

        const start = options.start;
        const end = options.end;

        const direction = end.minus(start);
        const normalDirection = direction.normal.normalize();

        const mid = start.add(direction.scale(0.5));
        const midOffset = mid.add(normalDirection.scale(options.offset));

        const curve = quadraticBezier(start, midOffset, end);
        const curveTangent = quadraticBezierTanget(start, midOffset, end);

        this._line = new Konva.Line({
            // There's probably a better way of drawing a quadratic bezier
            points: getSamplePoints(10)
                .map(t => curve(t))
                .flatMap(point => [point.x, point.y]),
            stroke: options.styles.color.value,
            strokeWidth: 3,
            dash: [8, 8],
            hitStrokeWidth: 6,
        });

        this._tooltip = new Konva.Label({
            x: curve(0.5).x,
            y: curve(0.5).y,
            opacity: 0,
            listening: false,
        });
        this._tooltipPointer = new Konva.Tag({
            pointerWidth: 10,
            pointerHeight: 10,
            fill: options.styles.color.value,
            listening: false,
        });
        this._tooltipText = new Konva.Text({
            text: this._getTooltipText(),
            fontFamily: options.styles.fontFamily.value,
            fontSize: 20,
            padding: 5,
            fill: options.styles.backgroundColor.value,
            listening: false,
        });

        this._tooltip.add(this._tooltipPointer);
        this._tooltip.add(this._tooltipText);

        options.containers.tooltip.add(this._tooltip);

        this._line.on("pointerover", () => {
            this._tooltip.opacity(1);
        });
        this._line.on("pointerout", () => {
            this._tooltip.opacity(0);
        });

        this._arrow = new Konva.RegularPolygon({
            x: curve(0.5).x,
            y: curve(0.5).y,
            sides: 3,
            radius: 10,
            fill: options.styles.color.value,
            rotation: 90 + end.minus(start).angleDegrees,
            listening: false,
        });

        this._linkGroup.add(this._line);
        this._linkGroup.add(this._arrow);

        this.messages = [];

        model.addListener("send", message => {
            const view = new MessageView(message, {
                container: this._messageGroup,
                center: start,
                width: 25,
                styles: options.styles,
            });

            message.addListener("time", time => {
                const percent = Math.min(time / message.latency, 1);

                const position = curve(percent);
                const direction = curveTangent(percent);

                view.moveTo(position);
                view.setRotation(direction.angleDegrees);
            });

            this.messages.push(view);
        });

        model.addListener("receive", message => {
            const view = this.messages.find(view => view.model === message);

            if (view) {
                view.destroy();
            }
        });

        this.model.minDelay.addListener("value", () => {
            this._tooltipText.text(this._getTooltipText());
        });
        this.model.maxUnpredictableDelay.addListener("value", () => {
            this._tooltipText.text(this._getTooltipText());
        });

        options.styles.color.addListener("value", color => {
            this._line.stroke(color);
            this._tooltipPointer.fill(color);
            this._arrow.fill(color);
        });
        options.styles.backgroundColor.addListener("value", color => {
            this._tooltipText.fill(color);
        });
        options.styles.fontFamily.addListener("value", fontFamily => {
            this._tooltipText.fontFamily(fontFamily);
        });
    }

    private _getTooltipText(): string {
        const min = this.model.minDelay.value;
        const max = min + this.model.maxUnpredictableDelay.value;

        return `[${min.toFixed(2)}s, ${max.toFixed(2)}s]`;
    }
}