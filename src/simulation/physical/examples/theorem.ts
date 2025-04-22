import Konva from "konva";
import { Controller } from "../../../mvc/Controller";
import { Model } from "../../../mvc/Model";
import { View } from "../../../mvc/View";
import { PhysicalClockModel } from "../PhysicalClockModel";
import { PhysicalClockView } from "../PhysicalClockView";
import { Direction, Point } from "../../../Point";
import { IFrame } from "konva/lib/types";
import { MessageModel } from "../../MessageModel";
import { LinkModel } from "../LinkModel";
import { LinkView } from "../LinkView";
import { LinkControlView } from "../LinkControlView";
import { NumberSliderView } from "../../NumberSliderView";
import { MathNumberView } from "../../MathNumberView";
import { NumberModel } from "../../NumberModel";
import { NumberSliderController } from "../../NumberSlideController";
import { PhysicalClockArmView } from "../PhysicalClockArmView";
import { MathNumberRangeView } from "../MathNumberRangeView";
import { PhysicalNodeModel } from "../PhysicalNodeModel";
import Chart from "chart.js/auto";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { calculateDiameter, random } from "../graph";
import { getPointsInRadius } from "../circle";
import { StringModel } from "../../StringModel";

Chart.register(annotationPlugin);

interface ModelEvents {
    play: void;
    pause: void;
    reset: void;

    randomize: void;
}

interface ModelOptions {
    nodes: number;
}

class SimulationModel extends Model<ModelEvents> {
    nodes: PhysicalNodeModel[];

    links: {
        from: PhysicalNodeModel,
        to: PhysicalNodeModel,
        link: LinkModel,
    }[];

    maxClockSpeedError: NumberModel;

    neighbourPeriod: NumberModel;

    minimumDelay: NumberModel;
    unpredictableDelay: NumberModel;

    diameter: NumberModel;

    physicalTime: NumberModel;

    maxClockDrift: NumberModel;
    expectedMaxClockDrift: NumberModel;

    convergenceTime: NumberModel;

    private _playing: boolean;

    private _numNodes: number;

    constructor(options: ModelOptions) {
        super();

        this.maxClockSpeedError = new NumberModel(0.20);

        this.neighbourPeriod = new NumberModel(1);
        this.minimumDelay = new NumberModel(0.20);

        this.unpredictableDelay = new NumberModel(1);

        this.physicalTime = new NumberModel(0);
        this._playing = true;

        this.maxClockDrift = new NumberModel(0);

        this.nodes = [];
        this.links = [];
        this.diameter = new NumberModel(0);
        this._numNodes = options.nodes;

        this.randomize();

        this.expectedMaxClockDrift = new NumberModel(0);
        const computeExpectedMaxClockDrift = () => {
            this.expectedMaxClockDrift.value = this.diameter.value * (2 * this.maxClockSpeedError.value * this.neighbourPeriod.value + this.unpredictableDelay.value);
        }
        computeExpectedMaxClockDrift();
        this.diameter.addListener("value", computeExpectedMaxClockDrift);
        this.maxClockSpeedError.addListener("value", computeExpectedMaxClockDrift);
        this.neighbourPeriod.addListener("value", computeExpectedMaxClockDrift);
        this.unpredictableDelay.addListener("value", computeExpectedMaxClockDrift);

        this.convergenceTime = new NumberModel(0);
        const computeConvergenceTime = () => {
            this.convergenceTime.value = this.neighbourPeriod.value * this.diameter.value;
        }
        computeConvergenceTime();
        this.neighbourPeriod.addListener("value", computeConvergenceTime);
        this.diameter.addListener("value", computeConvergenceTime);
    }

    randomize() {
        const graph = random(this._numNodes);
        console.log(graph);

        this.nodes = graph.vertices.map(() => {
            const amplitude = new NumberModel(Math.random() * this.maxClockSpeedError.value);

            const shift = Math.random() * 10;
            const period = Math.random() * 10;

            this.maxClockSpeedError.addListener("value", maxClockSpeedError => {
                amplitude.value = Math.random() * maxClockSpeedError;
            });

            const getSpeed = (time: number): number => {
                return 1 + amplitude.value * Math.sin(period * time + shift);
            }
            const speed = new NumberModel(getSpeed(0));

            this.physicalTime.addListener("value", time => {
                speed.value = getSpeed(time);
            });

            return new PhysicalNodeModel({
                speed: speed,
                neighbourPeriod: this.neighbourPeriod,
            });
        });
        this.links = graph.vertices.flatMap(start => {
            if (!(start in graph.neighbours)) {
                return [];
            }

            return graph.neighbours[start].map(neighbour => {
                const fromIndex = start;
                const toIndex = neighbour;

                const minDelay = new NumberModel(Math.random() * this.minimumDelay.value);
                this.minimumDelay.addListener("value", value => {
                    minDelay.value = Math.random() * value;
                });

                const model = new LinkModel({
                    minDelay: minDelay,
                    maxUnpredictableDelay: this.unpredictableDelay,
                });

                const from = this.nodes[fromIndex];
                const to = this.nodes[toIndex];

                from.addLink(model);

                model.addListener("receive", message => {
                    to.receive(message, minDelay.value);
                });

                return {
                    from: from,
                    to: to,
                    link: model,
                };
            });
        });

        this.diameter.value = calculateDiameter(graph);

        this.dispatchEvent("randomize", undefined);
    }

    get playing() {
        return this._playing;
    }

    play() {
        this._playing = true;

        this.dispatchEvent("play", undefined);
    }

    pause() {
        this._playing = false;

        this.dispatchEvent("pause", undefined);
    }

    reset() {
        this.pause();

        this.physicalTime.value = 0;

        for (const link of this.links) {
            link.link.reset();
        }

        for (const node of this.nodes) {
            node.reset();
        }

        this.maxClockDrift.value = 0;

        this.dispatchEvent("reset", undefined);
    }

    increment(diff: number) {
        this.physicalTime.value = this.physicalTime.value + diff;

        for (const node of this.nodes) {
            node.increment(diff);
        }

        for (const link of this.links) {
            link.link.increment(diff);
        }

        this.maxClockDrift.value = this.nodes.reduce((prevClockDrift, left, index, nodes) => {
            const clockDrift = nodes.reduce((prev, right) => {
                const drift = Math.abs(left.clock.time.value - right.clock.time.value);

                return Math.max(prev, drift);
            }, 0);

            return Math.max(prevClockDrift, clockDrift);
        }, 0);
    }
}

interface ViewOptions {
    id: string;

    width: number;
    height: number;
}

interface Styles {
    color: {
        text: StringModel;
        mutedText: StringModel;
        clockDrift: StringModel;
        background: StringModel;
    };

    fontFamily: StringModel;
}

interface ViewEvents {
    updateFrame: number;

    play: void;
    pause: void;
    reset: void;

    randomize: void;
}

class SimulationView extends View<SimulationModel, ViewEvents> {
    private _stage: Konva.Stage;
    private _layer: Konva.Layer;

    private _linkGroup: Konva.Group;
    private _messageGroup: Konva.Group;
    private _nodeGroup: Konva.Group;
    private _tooltipGroup: Konva.Group;

    private _animation: Konva.Animation;

    private _styles: Styles;

    private _figure: HTMLElement;

    private _playButton: HTMLButtonElement;
    private _pauseButton: HTMLButtonElement;
    private _resetButton: HTMLButtonElement;

    private _randomizeButton: HTMLButtonElement;

    diameter: MathNumberView;
    convergenceTime: MathNumberView;

    minimumMessageDelay: MathNumberRangeView;
    unpredictableMessageDelay: MathNumberRangeView;
    maxClockSpeedError: MathNumberRangeView;
    neighbourPeriod: MathNumberRangeView;

    physicalTime: MathNumberView;

    maxClockDrift: MathNumberView;

    nodes: PhysicalClockView[];
    links: LinkView[];

    driftChart: Chart;

    constructor(model: SimulationModel, options: ViewOptions) {
        super(model);

        this._figure = document.getElementById(options.id)!;
        this._figure.querySelector<HTMLFormElement>("form")?.addEventListener("submit", event => {
            event.preventDefault();
        });

        this._playButton = this._figure.querySelector<HTMLButtonElement>("button[name='play']")!;
        this._pauseButton = this._figure.querySelector<HTMLButtonElement>("button[name='pause']")!;
        this._resetButton = this._figure.querySelector<HTMLButtonElement>("button[type='reset']")!;
        this._randomizeButton = this._figure.querySelector<HTMLButtonElement>("button[name='randomize']")!;

        this.diameter = new MathNumberView(this.model.diameter, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='diameter']")!,
            format(value) {
                return `${value.toFixed(0)}`;
            },
        });
        this.convergenceTime = new MathNumberView(this.model.convergenceTime, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='convergence time']")!,
            format(value) {
                return `${value.toFixed(2)}s`;
            },
        });

        this.minimumMessageDelay = new MathNumberRangeView(this.model.minimumDelay, {
            elements: {
                number: this._figure.querySelector<MathMLElement>("mn[data-var='maximum minimum message delay']")!,
                input: this._figure.querySelector<HTMLInputElement>("input[name='minimum delay']")!,
            },
            format(value) {
                return `${value.toFixed(2)}s`;
            },
        });
        this.unpredictableMessageDelay = new MathNumberRangeView(this.model.unpredictableDelay, {
            elements: {
                number: this._figure.querySelector<MathMLElement>("mn[data-var='unpredictable delay']")!,
                input: this._figure.querySelector<HTMLInputElement>("input[name='unpredictable delay']")!,
            },
            format(value) {
                return `${value.toFixed(1)}s`;
            },
        });
        this.maxClockSpeedError = new MathNumberRangeView(this.model.maxClockSpeedError, {
            elements: {
                number: this._figure.querySelector<MathMLElement>("mn[data-var='maximum clock speed error']")!,
                input: this._figure.querySelector<HTMLInputElement>("input[name='maximum clock speed error']")!,
            },
            format(value) {
                return `${value.toFixed(2)}`;
            },
        });
        this.neighbourPeriod = new MathNumberRangeView(this.model.neighbourPeriod, {
            elements: {
                number: this._figure.querySelector<MathMLElement>("mn[data-var='neighbour period']")!,
                input: this._figure.querySelector<HTMLInputElement>("input[name='neighbour period']")!,
            },
            format(value) {
                return `${value.toFixed(1)}s`;
            },
        });

        this.maxClockDrift = new MathNumberView(this.model.expectedMaxClockDrift, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='expected clock drift']")!,
            format(value) {
                return `${value.toFixed(2)}s`;
            },
        });

        this.physicalTime = new MathNumberView(this.model.physicalTime, {
            element: this._figure.querySelector<MathMLElement>("mn[data-var='time']")!,
            format(value) {
                return `${value.toFixed(1)}s`;
            },
        });

        const canvasContainer = this._figure.querySelector("div")!;

        this._stage = new Konva.Stage({
            container: canvasContainer,
            width: options.width,
            height: options.height,
        });

        this._layer = new Konva.Layer();
        this._stage.add(this._layer);

        this._linkGroup = new Konva.Group();
        this._messageGroup = new Konva.Group();
        this._nodeGroup = new Konva.Group();
        this._tooltipGroup = new Konva.Group();

        this._layer.add(this._linkGroup);
        this._layer.add(this._messageGroup);
        this._layer.add(this._nodeGroup);
        this._layer.add(this._tooltipGroup);

        this._styles = this.getStyles();

        this.nodes = [];
        this.links = [];

        this.randomize();

        this.model.addListener("randomize", () => {
            this._linkGroup.destroyChildren();
            this._messageGroup.destroyChildren();
            this._nodeGroup.destroyChildren();
            this._tooltipGroup.destroyChildren();

            this.randomize();
        });

        this._animation = new Konva.Animation(frame => {
            if (frame) {
                this._render(frame);
            }
        }, this._layer);

        this.driftChart = new Chart(this._figure.querySelector<HTMLCanvasElement>("#real-clock-theorem-drift")!, {
            type: "line",
            data: {
                datasets: [{
                    label: "Clock Drift",
                    data: [{ x: 0, y: 0 }],
                    pointStyle: false,
                    borderColor: this._styles.color.clockDrift.value,
                    backgroundColor: this._styles.color.clockDrift.value,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: "linear",
                        min: 0,
                        grid: {
                            color: this._styles.color.mutedText.value,
                        },
                        ticks: {
                            color: this._styles.color.text.value,
                        },
                    },
                    y: {
                        type: "linear",
                        min: 0,
                        grid: {
                            color: this._styles.color.mutedText.value,
                        },
                        ticks: {
                            color: this._styles.color.text.value,
                        },
                    }
                },
                animation: false,
                plugins: {
                    legend: {
                        labels: {
                            color: this._styles.color.text.value,
                        },
                        onClick(e, legendItem, legend) {
                            e.native?.stopPropagation();
                        },
                    },
                    annotation: {
                        annotations: [
                            {
                                type: "line",
                                yMin: this.model.expectedMaxClockDrift.value,
                                yMax: this.model.expectedMaxClockDrift.value,
                                label: {
                                    content: "Maximum Clock Drift",
                                    display: true,
                                    color: this._styles.color.background.value,
                                    backgroundColor: this._styles.color.text.value,
                                },
                                borderColor: this._styles.color.text.value,
                            },
                            {
                                type: "line",
                                xMin: this.model.convergenceTime.value,
                                xMax: this.model.convergenceTime.value,
                                label: {
                                    content: "Convergence Time",
                                    display: true,
                                    color: this._styles.color.background.value,
                                    backgroundColor: this._styles.color.text.value,
                                },
                                borderColor: this._styles.color.text.value,
                            }
                        ],
                    },
                },
            },
        });
        this._styles.color.mutedText.addListener("value", color => {
            this.driftChart.options.scales!.x!.grid!.color = color;
            this.driftChart.options.scales!.y!.grid!.color = color;

            this.driftChart.update();
        });
        this._styles.color.text.addListener("value", color => {
            this.driftChart.options.scales!.x!.ticks!.color = color;
            this.driftChart.options.scales!.y!.ticks!.color = color;

            const annotations = this.driftChart.options.plugins!.annotation!.annotations! as AnnotationOptions<"line">[];

            annotations[0].label!.backgroundColor = color;
            annotations[0].borderColor = color;

            annotations[1].label!.backgroundColor = color;
            annotations[1].borderColor = color;

            this.driftChart.options.plugins!.legend!.labels!.color = color;

            this.driftChart.update();
        });
        this._styles.color.clockDrift.addListener("value", color => {
            this.driftChart.data.datasets[0].borderColor = color;
            this.driftChart.data.datasets[0].backgroundColor = color;

            this.driftChart.update();
        });
        this._styles.color.background.addListener("value", color => {
            const annotations = this.driftChart.options.plugins!.annotation!.annotations! as AnnotationOptions<"line">[];

            annotations[0].label!.color = color;
            annotations[1].label!.color = color;

            this.driftChart.update();
        });

        this.model.expectedMaxClockDrift.addListener("value", maxClockDrift => {
            const annotations = this.driftChart.options.plugins!.annotation!.annotations! as AnnotationOptions<"line">[];
            const options = annotations[0];

            options.yMin = maxClockDrift;
            options.yMax = maxClockDrift;

            this.driftChart.update();
        });
        this.model.convergenceTime.addListener("value", convergenceTime => {
            const annotations = this.driftChart.options.plugins!.annotation!.annotations! as AnnotationOptions<"line">[];
            const options = annotations[1];

            options.xMin = convergenceTime;
            options.xMax = convergenceTime;

            this.driftChart.update();
        });

        this.model.maxClockDrift.addListener("value", maxClockDrift => {
            const time = this.model.physicalTime.value;

            this.driftChart.data.datasets[0].data.push({ x: time, y: maxClockDrift });

            this.driftChart.update();
        });

        this._resetButton.addEventListener("click", event => {
            // I think this is resetting the inputs
            event.preventDefault();

            this.dispatchEvent("reset", undefined);
        });
        this._playButton.addEventListener("click", () => {
            this.dispatchEvent("play", undefined);
        });
        this._pauseButton.addEventListener("click", () => {
            this.dispatchEvent("pause", undefined);
        });

        this._randomizeButton.addEventListener("click", () => {
            this.dispatchEvent("randomize", undefined);
        });

        model.addListener("play", () => {
            this.play();
        });
        model.addListener("pause", () => {
            this.pause();
        });
        model.addListener("reset", () => {
            this.reset();
        });
    }

    randomize() {
        const nodeCenters = getPointsInRadius(new Point(250, 250), 200, this.model.nodes.length);

        this.links = this.model.links.map(link => {
            const startIndex = this.model.nodes.findIndex(node => node === link.from);
            const endIndex = this.model.nodes.findIndex(node => node === link.to);

            const start = nodeCenters[startIndex];
            const end = nodeCenters[endIndex];

            return new LinkView(link.link, {
                containers: {
                    link: this._linkGroup,
                    message: this._messageGroup,
                    tooltip: this._tooltipGroup,
                },
                start: start,
                end: end,
                offset: this.model.links.some(other => other !== link && other.to === link.from && other.from === link.to)
                    ? 50
                    : 0,
                styles: {
                    color: this._styles.color.text,
                    backgroundColor: this._styles.color.background,
                    fontFamily: this._styles.fontFamily,
                },
            });
        });
        this.nodes = this.model.nodes.map((node, index) => {
            const center = nodeCenters[index];

            return new PhysicalClockView(node.clock, {
                container: this._nodeGroup,
                center: center,
                radius: 25,
                listening: true,
                styles: {
                    color: this._styles.color.text,
                    backgroundColor: this._styles.color.background,
                },
            });
        });
    }

    private _render(frame: IFrame): void {
        const diff = frame!.timeDiff / 1000;

        this.dispatchEvent("updateFrame", diff);
    }

    getStyles(): Styles {
        const container = this._stage.container();

        const raw = window.getComputedStyle(container);

        const getValues = (raw: CSSStyleDeclaration) => {
            return {
                color: {
                    text: raw.getPropertyValue("--font-color"),
                    background: raw.getPropertyValue("--background-color"),
                    mutedText: raw.getPropertyValue("--muted-font-color"),
                    clockDrift: raw.getPropertyValue("--clock-drift-color"),
                },
                fontFamily: raw.getPropertyValue("--font-family"),
            }
        }

        const values = getValues(raw);

        const textColor = new StringModel(values.color.text);
        const backgroundColor = new StringModel(values.color.background);
        const mutedTextColor = new StringModel(values.color.mutedText);
        const clockDrift = new StringModel(values.color.clockDrift);

        const fontFamily = new StringModel(values.fontFamily);

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            const container = this._stage.container();

            const raw = window.getComputedStyle(container);

            const values = getValues(raw);

            textColor.value = values.color.text;
            backgroundColor.value = values.color.background;
            mutedTextColor.value = values.color.mutedText;
            clockDrift.value = values.color.clockDrift;

            fontFamily.value = values.fontFamily;
        });

        return {
            color: {
                text: textColor,
                background: backgroundColor,
                mutedText: mutedTextColor,
                clockDrift: clockDrift,
            },
            fontFamily: fontFamily,
        };
    }

    play() {
        this._playButton.disabled = true;
        this._pauseButton.disabled = false;
        this._randomizeButton.disabled = true;

        this.minimumMessageDelay.input.disable();
        this.neighbourPeriod.input.disable();
        this.unpredictableMessageDelay.input.disable();
        this.maxClockSpeedError.input.disable();

        this._animation.start();
    }

    pause() {
        this._playButton.disabled = false;
        this._pauseButton.disabled = true;
        this._animation.stop();
    }

    reset() {
        this._animation = new Konva.Animation(frame => {
            if (frame) {
                this._render(frame);
            }
        }, this._layer);

        this._randomizeButton.disabled = false;

        this.minimumMessageDelay.input.enable();
        this.neighbourPeriod.input.enable();
        this.unpredictableMessageDelay.input.enable();
        this.maxClockSpeedError.input.enable();

        this.driftChart.data.datasets[0].data = [
            { x: 0, y: 0 },
        ];
        this.driftChart.update();
    }
}


class SimulationController extends Controller<SimulationModel, SimulationView> {
    minimumMessageDelay: NumberSliderController;
    neighbourPeriod: NumberSliderController;
    unpredictableDelay: NumberSliderController;
    maxClockSpeedError: NumberSliderController;

    constructor(model: SimulationModel, view: SimulationView) {
        super(model, view);

        this.minimumMessageDelay = new NumberSliderController(model.minimumDelay, view.minimumMessageDelay.input);
        this.neighbourPeriod = new NumberSliderController(model.neighbourPeriod, view.neighbourPeriod.input);
        this.unpredictableDelay = new NumberSliderController(model.unpredictableDelay, view.unpredictableMessageDelay.input);
        this.maxClockSpeedError = new NumberSliderController(model.maxClockSpeedError, view.maxClockSpeedError.input);

        view.addListener("updateFrame", diff => {
            this._model.increment(diff);
        });

        view.addListener("play", () => {
            this._model.play();
        });
        view.addListener("pause", () => {
            this._model.pause();
        });
        view.addListener("reset", () => {
            this._model.reset();
        });

        view.addListener("randomize", () => {
            this._model.randomize();
        });
    }
}

const model = new SimulationModel({
    nodes: 6,
});
const view = new SimulationView(model, {
    id: "real-clock-theorem",
    width: 500,
    height: 500,
});
const controller = new SimulationController(model, view);
