import { Controller } from "../../mvc/Controller";
import { LockModel } from "./LockModel";
import { LockView } from "./LockView";

export class LockController extends Controller<LockModel, LockView> {
    constructor(model: LockModel, view: LockView) {
        super(model, view);
    }
}