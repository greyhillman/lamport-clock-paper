import { createContext, JSX } from "preact";
import { SvgPathBuilder } from "./SvgPathBuilder";
import { useContext, useMemo, useState } from "preact/hooks";
import { toClass } from "./misc";
import { edge, Edge, getPaths, Graph, Path } from "./graph";
import { Point } from "./Point";
import { createWavyLine, Line, Polyline } from "./Svg";


export function StaticSpaceTimeDiagram(props: DiagramProps) {

}
