import Konva from "konva";
import { View } from "../mvc/View";
import { Direction, Point } from "../Point";
import { AnalogClockView } from "./AnalogClockView";
import { ClockModel } from "./ClockModel";
import { RegisterClockView } from "./RegisterClockView";

interface Styles {
    color: string;
    backgroundColor: string;
    fontFamily: string;
}

interface Options {
    model: ClockModel;

    container: Konva.Container;

    center: Point;
    label: string;

    styles: Styles;
}

export class ProcessClockView extends View<ClockModel, {}> {
    private _group: Konva.Group;
    private _label: Konva.Text;

    analog: AnalogClockView;
    register: RegisterClockView;

    constructor(options: Options) {
        super(options.model);

        this._group = new Konva.Group({
            x: options.center.x,
            y: options.center.y,
        });
        options.container.add(this._group);

        this.analog = new AnalogClockView({
            model: this.model,
            container: this._group,
            center: new Point(0, 0),
            radius: 50,
            styles: {
                color: options.styles.color,
                backgroundColor: options.styles.backgroundColor,
            }
        });

        this.register = new RegisterClockView(this.model, {
            container: this._group,
            start: new Point(-40, 60),
            dimensions: new Direction(80, 40),
            styles: {
                color: options.styles.color,
                fontFamily: options.styles.fontFamily,
            }
        });

        this._label = new Konva.Text({
            x: -50,
            y: 115,
            width: 100,
            height: 30,
            fontFamily: options.styles.fontFamily,
            fontSize: 25,
            align: "center",
            verticalAlign: "middle",
            text: options.label,
        });
        this._group.add(this._label);
    }

    restyle(styles: Styles) {
        this.analog.style({
            color: styles.color,
            backgroundColor: styles.backgroundColor,
        });
        this.register.style({
            color: styles.color,
            fontFamily: styles.fontFamily,
        });
        this._label.fill(styles.color);
    }
}