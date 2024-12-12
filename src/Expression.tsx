import { ComponentChild, ComponentChildren, createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { LinkData } from "./Link";
import { toClass } from "./misc";

type NotationView = "notation" | "description";

const RootExpressionContext = createContext<boolean>(true);

interface RootProps {
    display?: "inline" | "block";
    children: ComponentChildren;
}

function MathRoot(props: RootProps) {
    const isRoot = useContext(RootExpressionContext);

    if (isRoot) {
        return <math display={props.display}>
            <RootExpressionContext.Provider value={false}>
                {props.children}
            </RootExpressionContext.Provider>
        </math>
    } else {
        return props.children;
    }
}

interface NotationProps {
    view: NotationView;

    notation: ComponentChild;
    description: ComponentChild;
}

function NotationNode(props: NotationProps) {
    if (props.view === "notation") {
        return props.notation;
    } else {
        return props.description;
    }
}

interface Props {
    description?: string;
    display?: "inline" | "block";
    source?: LinkData;

    children: ComponentChildren;
}

export function Expression(props: Props) {
    const [view, setView] = useState<NotationView>("notation");

    const onClick = (value: NotationView) => {
        return (event: MouseEvent) => {
            if (!props.description) {
                return;
            }

            event.stopPropagation();
            setView(value);
        }
    }

    const onMouseOver = (event: MouseEvent) => {
        if (props.source) {
            event.stopPropagation();
            props.source[1]();
        }
    }
    const onMouseOut = (event: MouseEvent) => {
        if (props.source) {
            event.stopPropagation();
            props.source[2]();
        }
    }

    return <MathRoot display={props.display}>
        <NotationNode
            view={view}
            notation={<mrow
                title={props.description}
                onClick={onClick("description")}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                {props.children}
            </mrow>}
            description={<mtext
                class="description"
                onClick={onClick("notation")}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                {props.description}
            </mtext>}
        />
    </MathRoot>
}

interface IdentifierProps {
    description?: string;
    class?: string;

    children: string;
}

export function Identifier(props: IdentifierProps) {
    const [view, setView] = useState<NotationView>("notation");

    const updateView = (view: NotationView) => {
        if (!props.description) {
            return;
        }

        return (event: MouseEvent) => {
            event.stopPropagation();
            setView(view);
        }
    }

    const classes = toClass({
        [props.class ?? ""]: true,
        "description": view === "description",
    });

    let element = null;

    if (view === "notation") {
        element = <mi
            class={classes}
            title={props.description}
            onClick={updateView("description")}
        >
            {props.children}
        </mi>;
    } else {
        element = <mtext
            class={classes}
            onClick={updateView("notation")}
        >
            {props.description}
        </mtext>
    }

    return <MathRoot>
        {element}
    </MathRoot>
}

interface OperatorProps {
    description?: string;
    children: string;
}

export function Operator(props: OperatorProps) {
    const [view, setView] = useState<NotationView>("notation");

    const updateView = (view: NotationView) => {
        if (!props.description) {
            return;
        }

        return (event: MouseEvent) => {
            event.stopPropagation();
            setView(view);
        }
    }

    let element = null;

    if (view === "notation") {
        element = (
            <mo
                title={props.description}
                onClick={updateView("description")}
            >
                {props.children}
            </mo>
        )
    } else {
        element = (
            <mtext class="description" onClick={updateView("notation")}>
                {props.description}
            </mtext>
        )
    }

    return <MathRoot>
        {element}
    </MathRoot>
}

interface NumberProps {
    value: number;
    description?: string;
}

export function Number(props: NumberProps) {
    return (
        <mn title={props.description}>{props.value}</mn>
    )
}

interface SubscriptProps {
    description?: string;

    source?: LinkData;

    children: [ComponentChild, ComponentChild];
}

export function SubScript(props: SubscriptProps) {
    const [view, setView] = useState<NotationView>("notation");

    const updateView = (view: NotationView) => {
        if (!props.description) {
            return;
        }

        return (event: MouseEvent) => {
            event.stopPropagation();
            setView(view);
        }
    }

    const onMouseOver = (event: MouseEvent) => {
        if (props.source) {
            event.stopPropagation();
            props.source[1]();
        }
    }

    const onMouseOut = (event: MouseEvent) => {
        if (props.source) {
            event.stopPropagation();
            props.source[2]();
        }
    }

    return <MathRoot>
        <NotationNode
            view={view}
            notation={<msub
                title={props.description}
                onClick={updateView("description")}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                {props.children}
            </msub>}
            description={<mtext
                class="description"
                onClick={updateView("notation")}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                {props.description}
            </mtext>}
        />
    </MathRoot>
}

interface SuperScriptProps {
    description?: string;
    source?: LinkData;

    children: [ComponentChild, ComponentChild];
}

export function SuperScript(props: SuperScriptProps) {
    const [view, setView] = useState<NotationView>("notation");

    const updateView = (view: NotationView) => {
        if (!props.description) {
            return;
        }

        return (event: MouseEvent) => {
            event.stopPropagation();
            setView(view);
        }
    }

    return <MathRoot>
        <NotationNode
            view={view}
            notation={<msup
                title={props.description}
                onClick={updateView("description")}
            >
                {props.children}
            </msup>}
            description={<mtext
                class="description"
                onClick={updateView("notation")}
            >
                {props.description}
            </mtext>}
        />
    </MathRoot>
}

interface FractionProps {
    description?: string;
    source?: LinkData;

    children: [ComponentChild, ComponentChild];
}

export function Fraction(props: FractionProps) {
    const [view, setView] = useState<NotationView>("notation");

    const updateView = (view: NotationView) => {
        if (!props.description) {
            return;
        }

        return (event: MouseEvent) => {
            event.stopPropagation();
            setView(view);
        }
    }

    return <MathRoot>
        <NotationNode
            view={view}
            notation={<mfrac
                title={props.description}
                onClick={updateView("description")}
            >
                {props.children}
            </mfrac>}
            description={<mtext
                class="description"
                onClick={updateView("notation")}
            >
                {props.description}
            </mtext>}
        />
    </MathRoot>
}

interface UnderProps {
    description?: string;
    children: [ComponentChild, ComponentChild];
}

export function Under(props: UnderProps) {
    const [view, setView] = useState<NotationView>("notation");

    const updateView = (view: NotationView) => {
        if (!props.description) {
            return;
        }

        return (event: MouseEvent) => {
            event.stopPropagation();
            setView(view);
        }
    }

    return <MathRoot>
        <NotationNode
            view={view}
            notation={<munder
                title={props.description}
                onClick={updateView("description")}
            >
                {props.children}
            </munder>}
            description={<mtext
                class="description"
                onClick={updateView("notation")}
            >
                {props.description}
            </mtext>
            }
        />
    </MathRoot>
}