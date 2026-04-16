import type { InputProps, InputPropsRefType } from '../types/inputs/form';
import { FormDisabledStore } from './FormDisabledStore';
import { FormErrorStore } from './FormErrorStore';

/**
 * Consolidated mutable store for the Form component.
 *
 * Replaces 8+ individual useRef calls with a single structured object.
 * All fields are plain mutable properties — no React state, no re-renders.
 */
export class FormStore {
  /** Registered input refs grouped by field name */
  inputRefs: Record<string, InputPropsRefType[]> = {};

  /** Field names in registration order (for Tab/Enter navigation) */
  inputOrder: string[] = [];

  /** Per-field error state (useSyncExternalStore-compatible) */
  readonly errorStore = new FormErrorStore();

  /** Global submitting/disabled state (useSyncExternalStore-compatible) */
  readonly disabledStore = new FormDisabledStore();

  /** Which fields have been touched by the user */
  dirtyFields: Record<string, boolean> = {};

  /** Cached last-known values — survives unmount of dynamic fields */
  lastValues: Record<string, unknown> = {};

  /** Maps a ref instance → its error key (for multi-instance fields) */
  refToErrorKey: Map<InputPropsRefType, string> = new Map();

  /** Cached inputRef callbacks keyed by errorKey — stable across renders */
  inputRefCache: Map<string, (ref: InputPropsRefType | null) => void> =
    new Map();

  /** Forwarding targets for original inputRef props */
  originalInputRefMap: Map<string, InputProps<unknown>['inputRef']> = new Map();

  /** Per-render counter for generating unique error keys */
  renderCounters: Record<string, number> = {};

  // ─── Ref registration ───────────────────────────────────────────────────

  registerRef(name: string, ref: InputPropsRefType): void {
    if (!this.inputRefs[name]) {
      this.inputRefs[name] = [];
    }
    if (!this.inputRefs[name].includes(ref)) {
      this.inputRefs[name].push(ref);
    }
  }

  unregisterRef(name: string, ref: InputPropsRefType): void {
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

  getValues<T>(): T {
    const result: Record<string, unknown> = { ...this.lastValues };
    for (const [key, refs] of Object.entries(this.inputRefs)) {
      const values = refs.map((r) => r?.value).filter((v) => v !== undefined);
      if (values.length === 1) {
        result[key] = values[0];
      } else if (values.length > 1) {
        result[key] = values;
      }
    }
    return result as T;
  }

  getValue<T, K extends keyof T>(key: K): T[K] | undefined {
    const refs = this.inputRefs[key as string];
    if (!refs || refs.length === 0)
      return this.lastValues[key as string] as T[K] | undefined;
    if (refs.length === 1) return refs[0].value as T[K];
    return refs.map((r) => r?.value) as unknown as T[K];
  }

  // ─── Reset ──────────────────────────────────────────────────────────────

  reset(): void {
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

  getOrCreateInputRef(
    errorKey: string,
    name: string,
    originalInputRef: InputProps<unknown>['inputRef'],
  ): (ref: InputPropsRefType | null) => void {
    // Always update the forwarding target
    this.originalInputRefMap.set(errorKey, originalInputRef);

    const existing = this.inputRefCache.get(errorKey);
    if (existing) return existing;

    let lastRef: InputPropsRefType | null = null;
    const callback = (ref: InputPropsRefType | null) => {
      if (ref !== null) {
        lastRef = ref;
        this.refToErrorKey.set(ref, errorKey);
        this.registerRef(name, ref);
      } else if (lastRef !== null) {
        this.unregisterRef(name, lastRef);
        lastRef = null;
      }
      // Forward to original inputRef
      const origRef = this.originalInputRefMap.get(errorKey);
      if (typeof origRef === 'function') {
        origRef(ref);
      } else if (
        origRef &&
        typeof origRef === 'object' &&
        'current' in origRef
      ) {
        (origRef as { current: InputPropsRefType | null }).current = ref;
      }
    };

    this.inputRefCache.set(errorKey, callback);
    return callback;
  }
}
