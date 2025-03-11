import { Controller } from "../../mvc/Controller";
import { LockController } from "./LockController";
import { ProcessModel } from "./ProcessModel";
import { ProcessView } from "./ProcessView";

export class ProcessController extends Controller<ProcessModel, ProcessView> {
    lock: LockController;

    constructor(model: ProcessModel, view: ProcessView) {
        super(model, view);

        this.lock = new LockController(model.lock, view.lock);

        view.lock.addListener("click", () => {
            if (model.lock.locked) {
                model.release();
            } else {
                model.request();
            }
        });
        view.addListener("click-pending", view => {
            const message = view.model;

            model.receive(message);
        });
    }
}