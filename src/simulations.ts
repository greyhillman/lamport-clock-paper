import { Process, Tick } from "./SpaceTime";

const listItem = document.getElementById("implementation-rule-1")!;
const diagram = listItem.querySelector("space-time")!;
const form = listItem.querySelector("form")!;

const addEvent = form.querySelector<HTMLButtonElement>("button[name='event']")!;
const incrementCounter = form.querySelector<HTMLButtonElement>("button[name='counter']")!;

const register = form.querySelector<MathMLElement>("math mn")!;

let time = 0;
let timeLength = 7;
let counter = 0;
register.textContent = `${counter}`;

const process: Process = {
    events: [],
    label: "a process",
};
diagram.processes = [process];

addEvent.addEventListener("click", event => {
    time += 1;

    addEvent.disabled = true;

    process.events = [...process.events.filter(event => event.time >= time - timeLength), {
        time: time,
    }];
    diagram.processes = [process];
    diagram.ticks = [...diagram.ticks.filter(tick => tick.times[0] >= time - timeLength)];
});
incrementCounter.addEventListener("click", event => {
    time += 1;

    process.events = [...process.events.filter(event => event.time >= time - timeLength)];
    diagram.processes = [process];
    diagram.ticks = [...diagram.ticks.filter(tick => tick.times[0] >= time - timeLength), {
        times: [time],
    }];

    addEvent.disabled = false;

    counter++;
    register.textContent = `${counter}`;
});
