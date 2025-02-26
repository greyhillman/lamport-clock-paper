type Listener<T> = (event: T) => void;

type EventListeners<EventMap> = {
    [K in keyof EventMap]: Listener<EventMap[K]>[];
}

export class Observable<Events = {}> {
    private _listeners: EventListeners<Events> = {} as EventListeners<Events>;

    addListener<K extends keyof Events>(eventName: K, func: (event: Events[K]) => void): void {
        if (!(eventName in this._listeners)) {
            this._listeners[eventName] = [];
        }

        this._listeners[eventName].push(func);
    }

    removeListener<K extends keyof Events>(eventName: K, func: (event: Events[K]) => void): void {
        this._listeners[eventName].filter(f => f !== func);
    }

    protected dispatchEvent<K extends keyof Events>(name: K, event: Events[K]) {
        if (!(name in this._listeners)) {
            return;
        }

        for (const listener of this._listeners[name]) {
            listener(event);
        }
    }
}