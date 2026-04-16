import type { InputProps, InputPropsRefType } from '../types/inputs/form';
import { FormDisabledStore } from './FormDisabledStore';
import { FormErrorStore } from './FormErrorStore';
/**
 * Consolidated mutable store for the Form component.
 *
 * Replaces 8+ individual useRef calls with a single structured object.
 * All fields are plain mutable properties — no React state, no re-renders.
 */
export declare class FormStore {
    /** Registered input refs grouped by field name */
    inputRefs: Record<string, InputPropsRefType[]>;
    /** Field names in registration order (for Tab/Enter navigation) */
    inputOrder: string[];
    /** Per-field error state (useSyncExternalStore-compatible) */
    readonly errorStore: FormErrorStore;
    /** Global submitting/disabled state (useSyncExternalStore-compatible) */
    readonly disabledStore: FormDisabledStore;
    /** Which fields have been touched by the user */
    dirtyFields: Record<string, boolean>;
    /** Cached last-known values — survives unmount of dynamic fields */
    lastValues: Record<string, unknown>;
    /** Maps a ref instance → its error key (for multi-instance fields) */
    refToErrorKey: Map<InputPropsRefType, string>;
    /** Cached inputRef callbacks keyed by errorKey — stable across renders */
    inputRefCache: Map<string, (ref: InputPropsRefType | null) => void>;
    /** Forwarding targets for original inputRef props */
    originalInputRefMap: Map<string, InputProps<unknown>['inputRef']>;
    /** Per-render counter for generating unique error keys */
    renderCounters: Record<string, number>;
    registerRef(name: string, ref: InputPropsRefType): void;
    unregisterRef(name: string, ref: InputPropsRefType): void;
    getValues<T>(): T;
    getValue<T, K extends keyof T>(key: K): T[K] | undefined;
    reset(): void;
    getOrCreateInputRef(errorKey: string, name: string, originalInputRef: InputProps<unknown>['inputRef']): (ref: InputPropsRefType | null) => void;
}
//# sourceMappingURL=FormStore.d.ts.map