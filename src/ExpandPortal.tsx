import { ComponentChildren } from "preact";
import { Portal } from "./Portal";
import { Expand } from "./Expand";

interface PortalExpandProps {
    portal: Portal;

    children: ComponentChildren;
}

export function PortalExpand(props: PortalExpandProps) {
    return (
        <Expand>
            {props.children}
            <props.portal.Exit />
        </Expand>
    )
}