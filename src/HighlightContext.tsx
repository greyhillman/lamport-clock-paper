import { ComponentChildren, createContext } from "preact";
import { useContext } from "preact/hooks";

const Context = createContext<boolean>(false);

export function useHighlightContext() {
    return useContext(Context);
}

interface Props {
    value: boolean;

    children: ComponentChildren;
}

export function HighlightContext(props: Props) {
    return (
        <Context.Provider value={props.value}>
            {props.children}
        </Context.Provider>
    )
}