import { FormDisabledStore } from './FormDisabledStore';
import { FormErrorStore } from './FormErrorStore';
/**
 * Consolidated mutable store for the Form component.
 *
 * Replaces 8+ individual useRef calls with a single structured object.
 * All fields are plain mutable properties — no React state, no re-renders.
 */
export class FormStore {
    constructor() {
        /** Registered input refs grouped by field name */
        Object.defineProperty(this, "inputRefs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        /** Field names in registration order (for Tab/Enter navigation) */
        Object.defineProperty(this, "inputOrder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /** Per-field error state (useSyncExternalStore-compatible) */
        Object.defineProperty(this, "errorStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new FormErrorStore()
        });
        /** Global submitting/disabled state (useSyncExternalStore-compatible) */
        Object.defineProperty(this, "disabledStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new FormDisabledStore()
        });
        /** Which fields have been touched by the user */
        Object.defineProperty(this, "dirtyFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        /** Cached last-known values — survives unmount of dynamic fields */
        Object.defineProperty(this, "lastValues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        /** Maps a ref instance → its error key (for multi-instance fields) */
        Object.defineProperty(this, "refToErrorKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        /** Cached inputRef callbacks keyed by errorKey — stable across renders */
        Object.defineProperty(this, "inputRefCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        /** Forwarding targets for original inputRef props */
        Object.defineProperty(this, "originalInputRefMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        /** Per-render counter for generating unique error keys */
        Object.defineProperty(this, "renderCounters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
    }
    // ─── Ref registration ───────────────────────────────────────────────────
    registerRef(name, ref) {
        if (!this.inputRefs[name]) {
            this.inputRefs[name] = [];
        }
        if (!this.inputRefs[name].includes(ref)) {
            this.inputRefs[name].push(ref);
        }
    }
    unregisterRef(name, ref) {
        this.lastValues[name] = ref.value;
        this.refToErrorKey.delete(ref);
        if (this.inputRefs[name]) {
            this.inputRefs[name] = this.inputRefs[name].filter((r) => r !== ref);
            if (this.inputRefs[name].length === 0) {
                delete this.inputRefs[name];
            }
        }
    }
    // ─── Value collection ───────────────────────────────────────────────────
    getValues() {
        const result = { ...this.lastValues };
        for (const [key, refs] of Object.entries(this.inputRefs)) {
            const values = refs.map((r) => r?.value).filter((v) => v !== undefined);
            if (values.length === 1) {
                result[key] = values[0];
            }
            else if (values.length > 1) {
                result[key] = values;
            }
        }
        return result;
    }
    getValue(key) {
        const refs = this.inputRefs[key];
        if (!refs || refs.length === 0)
            return this.lastValues[key];
        if (refs.length === 1)
            return refs[0].value;
        return refs.map((r) => r?.value);
    }
    // ─── Reset ──────────────────────────────────────────────────────────────
    reset() {
        for (const refs of Object.values(this.inputRefs)) {
            for (const ref of refs) {
                if (ref && typeof ref.reset === 'function') {
                    ref.reset();
                }
            }
        }
        this.errorStore.clearErrors();
        this.dirtyFields = {};
        this.lastValues = {};
    }
    // ─── Ref callback factory ──────────────────────────────────────────────
    getOrCreateInputRef(errorKey, name, originalInputRef) {
        // Always update the forwarding target
        this.originalInputRefMap.set(errorKey, originalInputRef);
        const existing = this.inputRefCache.get(errorKey);
        if (existing)
            return existing;
        let lastRef = null;
        const callback = (ref) => {
            if (ref !== null) {
                lastRef = ref;
                this.refToErrorKey.set(ref, errorKey);
                this.registerRef(name, ref);
            }
            else if (lastRef !== null) {
                this.unregisterRef(name, lastRef);
                lastRef = null;
            }
            // Forward to original inputRef
            const origRef = this.originalInputRefMap.get(errorKey);
            if (typeof origRef === 'function') {
                origRef(ref);
            }
            else if (origRef &&
                typeof origRef === 'object' &&
                'current' in origRef) {
                origRef.current = ref;
            }
        };
        this.inputRefCache.set(errorKey, callback);
        return callback;
    }
}
