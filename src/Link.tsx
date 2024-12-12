import { useState } from "preact/hooks";

export type LinkData = readonly [
    boolean,
    () => void,
    () => void,
];

interface LinkArgs {
    on: () => void;
    off: () => void;
}

export function useLink(args?: LinkArgs): LinkData {
    const [show, set] = useState(false);

    return [
        show,
        () => {
            set(true);
            if (args) {
                args.on();
            }
        },
        () => {
            set(false);
            if (args) {
                args.off();
            }
        }
    ] as const;
}
