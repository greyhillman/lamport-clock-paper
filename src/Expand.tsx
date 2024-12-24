import { ComponentChild } from "preact";
import { useState } from "preact/hooks";
import { toClass } from "./misc";

interface Props {
    open?: () => void;
    close?: () => void;
    children: [ComponentChild, ...ComponentChild[]];
}

export function Expand(props: Props) {
    const [summary, ...details] = props.children;

    const [isOpen, setOpen] = useState(false);

    const summaryClass = toClass({
        "summary": true,
        open: isOpen,
    });
    const detailsClass = toClass({
        "details": true,
        "open": isOpen,
    });

    const onClick = (event: MouseEvent) => {
        if (isOpen) {
            setOpen(false);

            if (props.close) {
                props.close();
            }
        } else {
            setOpen(true);

            if (props.open) {
                props.open();
            }
        }
    }

    // <details> won't work as the top element as the summary needs to be inline
    // but the details should be a block; they can't be both under a single
    // element that's both.

    return (
        <>
            <span class={summaryClass} onClick={onClick}>{summary}</span>
            {isOpen ?
                <div class={detailsClass}>
                    {details}
                </div>
                : null}
        </>
    )
}
