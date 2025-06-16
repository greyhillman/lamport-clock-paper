import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
    interface HTMLElementTagNameMap {
        "inline-details": InlineDetails;
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#a_more_involved_example
@customElement("inline-details")
export class InlineDetails extends LitElement {
    @property({ type: Boolean, attribute: "open", reflect: true })
    open: boolean = false;

    _toggle() {
        this.open = !this.open;
    }

    _close() {
        this.open = false;
    }

    _open() {
        this.open = true;
    }

    render() {
        if (this.open) {
            return html`<span class="open" @click=${this._close}>
                <slot name="summary"></slot></span>
            <div>
                <slot name="content"></slot>
            </div>`;
        } else {
            return html`<span class="closed" @click=${this._open}>
                <slot name="summary"></slot></span>`;
        }
    }

    static styles = css`
    span {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        
        text-decoration: underline dotted;
        cursor: pointer;
    }
    span.open::before {
        content: "\u{25BE}";
    }
    span.closed::before {
        content: "\u{25B8}";
    }

    div {
        padding: 0em 1em;
        border: solid var(--font-color) 2px;
        border-radius: 0.5em;
    }
    `;
}