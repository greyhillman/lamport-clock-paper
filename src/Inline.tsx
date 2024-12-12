import { ComponentChildren } from "preact";
import { LinkData } from "./Link";
import { toClass } from "./misc";

interface InlineLinkProps {
    source: LinkData;

    children: ComponentChildren;
}

export function Inline(props: InlineLinkProps) {
    const classes = toClass({
        "link": true,
    });

    const onMouseEnter = (event: MouseEvent) => {
        props.source[1]();
    }

    const onMouseLeave = (event: MouseEvent) => {
        props.source[2]();
    }

    return (
        <span
            class={classes}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {props.children}
        </span>
    )
}