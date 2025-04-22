import { StringModel } from "./StringModel";

export function attachPropertyValue(element: HTMLElement, name: string): StringModel {
    const raw = window.getComputedStyle(element);

    const initialValue = raw.getPropertyValue(name);

    const model = new StringModel(initialValue);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        const raw = window.getComputedStyle(element);

        const value = raw.getPropertyValue(name);

        model.value = value;
    });

    return model;
}
