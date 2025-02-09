import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
    interface HTMLElementTagNameMap {
        "template-use": TemplateUse;
    }
}

@customElement("template-use")
export class TemplateUse extends LitElement {
    @property({ type: String, attribute: "template-id" })
    templateId?: string;

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render() {
        if (!this.templateId) {
            throw new Error("'template-use' requires setting 'template-id'");
        }

        const element = document.getElementById(this.templateId);
        if (!element) {
            throw new Error(`'template-use' could not find '#${this.templateId}'`);
        }

        if (element.tagName !== "TEMPLATE") {
            throw new Error(`'template-use': '#${this.templateId}' is not a template element`);
        }

        const template = element as HTMLTemplateElement;

        const node = document.importNode(template.content, true);

        return node;
    }
}
