import { AnyComponent, ComponentChild, ComponentChildren } from "preact";

interface Props {
    entrance: (children: ComponentChildren) => ComponentChild,
    exit: (children: ComponentChildren) => ComponentChild,

    content: ComponentChild;
}

export interface Portal {
    Entrance: () => ComponentChild;
    Exit: () => ComponentChild;
}

export function createPortal(props: Props): Portal {
    return {
        Entrance: () => props.entrance(props.content),
        Exit: () => props.exit(props.content),
    }
}