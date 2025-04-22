import { Observable } from "./Observable";

export abstract class Model<Events = {}> extends Observable<Events> { }
