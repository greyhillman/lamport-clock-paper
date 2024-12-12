import { ComponentChildren } from "preact";

interface Props {
    id: string;

    children: ComponentChildren;
}

export function Reference(props: Props) {
    return (
        <section id={props.id} class="reference">
            {props.children}
        </section>
    )
}

interface LinkProps {
    href: string;

    children: ComponentChildren;
}

export function ReferenceAnchor(props: LinkProps) {
    return (
        <a href={`#${props.href}`}>
            {props.children}
        </a>
    )
}