export class FormDisabledStore {
    constructor() {
        Object.defineProperty(this, "disabled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        Object.defineProperty(this, "get", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.disabled;
            }
        });
        Object.defineProperty(this, "set", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (value) => {
                if (this.disabled === value)
                    return;
                this.disabled = value;
                for (const cb of this.listeners)
                    cb();
            }
        });
        Object.defineProperty(this, "subscribe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (cb) => {
                this.listeners.add(cb);
                return () => this.listeners.delete(cb);
            }
        });
        Object.defineProperty(this, "getSnapshot", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.disabled;
            }
        });
    }
}
