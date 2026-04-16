export class FormErrorStore {
    constructor() {
        Object.defineProperty(this, "errors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    getError(name) {
        return this.errors[name];
    }
    getErrors() {
        return { ...this.errors };
    }
    setError(name, error) {
        if (this.errors[name] === error)
            return;
        this.errors[name] = error;
        for (const cb of this.listeners.get(name) ?? [])
            cb();
    }
    setErrors(newErrors) {
        const changed = new Set();
        for (const [name, error] of Object.entries(newErrors)) {
            if (this.errors[name] !== error) {
                this.errors[name] = error;
                changed.add(name);
            }
        }
        for (const name of Object.keys(this.errors)) {
            if (!(name in newErrors) && this.errors[name] !== undefined) {
                this.errors[name] = undefined;
                changed.add(name);
            }
        }
        for (const name of changed) {
            for (const cb of this.listeners.get(name) ?? [])
                cb();
        }
    }
    clearErrors() {
        const names = Object.keys(this.errors);
        this.errors = {};
        for (const name of names) {
            for (const cb of this.listeners.get(name) ?? [])
                cb();
        }
    }
    makeSubscribe(name) {
        return (cb) => {
            if (!this.listeners.has(name))
                this.listeners.set(name, new Set());
            this.listeners.get(name)?.add(cb);
            return () => this.listeners.get(name)?.delete(cb);
        };
    }
    makeSnapshot(name) {
        return () => this.errors[name];
    }
}
