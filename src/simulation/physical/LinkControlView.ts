import { View } from "../../mvc/View";
import { LinkModel } from "./LinkModel";

interface Events {
    send: void;
    receive: void;
}

interface Options {
    send: HTMLButtonElement;
    receive: HTMLButtonElement;
}

export class LinkControlView extends View<LinkModel, Events> {
    private _send: HTMLButtonElement;
    private _receive: HTMLButtonElement;

    constructor(model: LinkModel, options: Options) {
        super(model);

        this._send = options.send;
        this._receive = options.receive;

        this._send.addEventListener("click", () => {
            this.dispatchEvent("send", undefined);
        });
        this._receive.addEventListener("click", () => {
            this.dispatchEvent("receive", undefined);
        });

        this.enableSend();
        this.disableReceive();

        this.model.addListener("send", () => {
            this.disableSend();
        });
        this.model.addListener("receive", () => {
            this.enableReceive();
        });
    }

    enableSend() {
        this._send.disabled = false;
    }

    disableSend() {
        this._send.disabled = true;
    }

    enableReceive() {
        this._receive.disabled = false;
    }

    disableReceive() {
        this._receive.disabled = true;
    }
}