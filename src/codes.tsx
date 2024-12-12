// https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols
// https://shapecatcher.com/
// https://www.compart.com/en/unicode/

export const greek = {
    delta: "\u{3B4}",
    epsilon: "\u{3B5}",
    zeta: "\u{3B6}",
    kappa: "\u{3BA}",
    mu: "\u{3BC}",
    xi: "\u{3BE}",
    tau: "\u{1D70F}",
}

export const codes = {
    operators: {
        equals: "=",
        precedes: "\u{227A}",
        less_than: "\u{3C}",
        much_less_than: "\u{226A}",
        less_than_equal: "\u{2264}",
        greater_than: "\u{003E}",
        greater_than_equal: "\u{2265}",
        cross: "\u{2A09}",
        prime: "\u{2032}",
        approx: "\u{2248}",
        absolute: "\u{7C}",
        angle: {
            left: "\u{27E8}",
            right: "\u{27E9}",
        },
        paren: {
            left: "\u{28}",
            right: "\u{29}",
        },
        arrows: {
            right: {
                single: "\u{2192}",
                not_single: "\u{219b}",
                double: "\u{21D2}",
                thick: "\u{27A1}",
            },
        },
    },
    letters: {
        capital: {
            a: {
                monospace: "\u{1D670}",
            },
            b: {
                monospace: "\u{1D671}",
            }
        },
    },
    greek: greek,
};