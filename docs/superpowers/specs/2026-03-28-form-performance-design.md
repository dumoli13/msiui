# Form.tsx Performance Optimization Design

**Date:** 2026-03-28
**Status:** Draft
**Goal:** Minimize re-renders in the Form component for smooth performance on low-spec devices (Smart TVs, Electron apps) with forms of any size (5–200+ fields).
**Constraint:** Zero breaking changes to existing Form APIs.

---

## Problem

The Form component re-renders entirely on every `handleSubmit()` call because `isSubmitting` is React state. Each re-render:

1. Recreates `enhanceChild` closure with new callback identities
2. Runs `React.Children.map(children, enhanceChild)` unconditionally
3. Creates new `onChange`, `onKeyDown`, `inputRef` callbacks per field
4. New `inputRef` identity triggers React's ref cleanup cycle (null → new ref) per field
5. Invalidates `renderTemplate` via `formDisabled` in its dependency array

For a 200-field form, a single submit = 2 Form re-renders × 200 fields = 400 ref cleanup/re-attach cycles.

Additional bug: `handleSubmit` is `async` but does not `await onSubmit()`, so `isSubmitting` flips true→false in the same microtask (two renders for no benefit).

---

## Solution: Targeted Closure Stabilization (5 Optimizations)

### Optimization 1: Replace `isSubmitting` State with FormDisabledStore

**What:** Create `FormDisabledStore` class (modeled on `FormErrorStore`) that tracks a single boolean via `useSyncExternalStore`.

**Why:** Removing `isSubmitting` state eliminates the Form re-render on submit. Individual `FormFieldWrapper` instances subscribe to the store and toggle their own `disabled` prop.

**How:**

- New file: `src/libs/FormDisabledStore.ts` (~25 lines)
- Class with `get()`, `set(value)`, `subscribe(cb)`, `getSnapshot()` methods
- Arrow properties for `subscribe` and `getSnapshot` to ensure referential stability
- `FormFieldWrapper` extended with `disabledStore`, `propDisabled`, `externalDisabled` props
- Uses `useSyncExternalStore(disabledStore.subscribe, disabledStore.getSnapshot)` alongside existing error subscription
- `handleSubmit` updated to `await onSubmit()` (fixes the fire-and-forget bug)

**Disabled merge logic (three-way precedence):**

```typescript
// Inside FormFieldWrapper:
const storeDisabled = useSyncExternalStore(
  disabledStore.subscribe,
  disabledStore.getSnapshot,
);
const disabled = propDisabled || externalDisabled || storeDisabled;
// Where:
//   propDisabled  = the individual field's own disabled prop (childProps.disabled)
//   externalDisabled = the Form's `disabled` prop
//   storeDisabled = isSubmitting from FormDisabledStore
// Any source being true → field is disabled. Field's own disabled=false does NOT override Form-level disabled.
```

This preserves the current `childProps.disabled ?? formDisabled` semantics: if the child has an explicit `disabled` prop it takes precedence, otherwise Form-level disabled applies. Translated: `propDisabled !== undefined ? propDisabled : (externalDisabled || storeDisabled)`.

**Files:** `src/libs/FormDisabledStore.ts` (new), `src/components/Inputs/Form.tsx` (lines 107-117, 144-145, 363-372, 425-435, 479-487)

### Optimization 2: Stabilize `enhanceChild` via Refs

**What:** Move remaining closure dependencies (`handleFormKeyDown`, `focusOnLastFieldEnter`, `handleSubmit`) to refs so `enhanceChild` reads from stable references.

**Why:** After Opt 1 removes `formDisabled` from the closure, only a few values remain. Moving them to refs makes `enhanceChild` effectively stable across renders.

**How:**

- `handleSubmitRef`, `focusOnLastFieldEnterRef` refs updated at render time
- `submitOnChangeRef`, `debounceSubmitRef` refs for `handleChange` closure stability
- `handleFormKeyDown` reads from refs instead of closure variables
- `enhanceChild` wrapped in `useCallback` with empty deps — all mutable values read from refs

**Full ref list:** `handleSubmitRef`, `focusOnLastFieldEnterRef`, `submitOnChangeRef`, `debounceSubmitRef` (all updated at render time via `ref.current = value`)

**Files:** `src/components/Inputs/Form.tsx` (lines 280-337, 384-500)

### Optimization 3: Cache `inputRef` Callbacks

**What:** Replace the IIFE that creates a new ref closure on every `enhanceChild` call with a `Map<errorKey, callback>` cache.

**Why:** Same `errorKey` → same function reference → React skips ref cleanup/re-attach cycle. Eliminates N × `useImperativeHandle` re-executions per Form re-render.

**How:**

- `inputRefCacheRef = useRef(new Map())`
- `originalInputRefMapRef = useRef(new Map())` for forwarding
- Factory function `getOrCreateInputRef(errorKey, name, originalInputRef)` checks cache before creating
- Cache entries cleaned up when React calls ref with `null` on unmount

**Files:** `src/components/Inputs/Form.tsx` (lines 437-476)

### Optimization 4: Memoize Children Mapping

**What:** Wrap `React.Children.map(children, enhanceChild)` in `useMemo`.

**Why:** Defense-in-depth — if parent re-renders Form without changing `children`, the entire mapping is skipped.

**How:**

- `const enhancedChildren = useMemo(() => React.Children.map(children, enhanceChild), [children, enhanceChild])`
- `renderCounters` kept as a render-scoped ref (not inside useMemo) so both the `useMemo` path and the `FormContext.enhanceChild` path share the same counter instance per render. Reset at top of render via `renderCountersRef.current = {}`.

**Note:** This optimization provides **marginal benefit** in practice since JSX `children` are typically new objects every parent render. It serves as defense-in-depth, not a primary win. The main performance gains come from Optimizations 1-3.

**Files:** `src/components/Inputs/Form.tsx` (lines 382, 770)

### Optimization 5: Stabilize `renderTemplate` Dependencies

**What:** Remove `formDisabled` from `renderTemplate`'s `useCallback` dependency array.

**Why:** Template-mode equivalent of Opt 1's benefit. `disabled` is now injected by `FormFieldWrapper`, not by `commonInputProps`.

**How:**

- Remove `disabled: formDisabled` from `commonInputProps` (line 582)
- Pass `disabledStore` to `wrapWithErrorStore` for template-mode fields
- Dependency array becomes `[submitOnChange, debounceSubmit]` (both stable)

**Files:** `src/components/Inputs/Form.tsx` (lines 527-753)

---

## Implementation Sequence

Order matters due to dependencies:

1. Create `FormDisabledStore` (new file, independent)
2. Optimization 1 — Replace `isSubmitting` state, update `FormFieldWrapper`
3. Optimization 5 — Remove `formDisabled` from `renderTemplate` deps (trivial after #2)
4. Optimization 2 — Stabilize `enhanceChild` refs
5. Optimization 3 — Implement `inputRef` factory cache
6. Optimization 4 — Wrap children mapping in `useMemo`

---

## Expected Impact

| Scenario                         | Before                                                            | After                                                                     |
| -------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Submit with 100 fields           | 2 full Form re-renders = 200 enhanceChild calls, 200 ref cleanups | 0 Form re-renders, 100 FormFieldWrapper re-renders (disabled toggle only) |
| Parent re-renders, same children | 1 full Form re-render = 100 enhanceChild calls                    | useMemo skips mapping if children ref-stable                              |
| Single field onChange            | 0 Form re-renders (already optimized)                             | 0 Form re-renders (unchanged)                                             |

---

## Risks and Mitigations

| Risk                                                           | Mitigation                                                                                                             |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `await onSubmit()` changes submit timing                       | Matches existing `FormProps` type signature (`Promise<void> \| void`). Existing sync onSubmit handlers are unaffected. |
| `disabledStore.subscribe` referential stability                | Use arrow properties in class definition                                                                               |
| `inputRef` cache growing unbounded                             | Entries auto-removed when React calls ref with `null` on unmount                                                       |
| `renderCounters` sharing between useMemo and FormContext paths | Use render-scoped ref shared by both paths, reset at top of each render                                                |
| `handleChange` stale closure after useCallback([])             | `submitOnChangeRef` and `debounceSubmitRef` refs ensure fresh reads                                                    |
| `externalDisabled` prop staleness in FormFieldWrapper          | Passed as prop from Form's render scope — updates when Form re-renders from `disabled` prop change                     |

---

## Verification

1. Run existing test suite: `npm run test` — all 26 Form tests must pass
2. Run linter: `npm run lint`
3. Run type check: `npm run type:check`
4. Manual verification via Storybook (`npm run storybook`):
   - BasicForm story: submit, validate, reset
   - AllInputType story: verify all input types work
   - AutoSubmit story: verify debounced submit still works
   - ConditionalFieldForm: verify dynamic field add/remove
   - GeneratedFieldForm: verify multiple same-name fields
5. Add new tests for:
   - Disabled state propagation via store (submit disables inputs, un-submit re-enables)
   - Ref identity stability across re-renders
   - Async onSubmit awaiting behavior (isSubmitting stays true during async handler)
   - Template mode with `disabled` prop
   - Concurrent submit prevention (second submit blocked while first is in-flight)
   - FormField + same-name fields (renderCounters sharing)
   - Runtime `disabled` prop toggle propagation

---

## Files Summary

| File                                   | Action | Description                             |
| -------------------------------------- | ------ | --------------------------------------- |
| `src/libs/FormDisabledStore.ts`        | Create | Subscription-based disabled state store |
| `src/components/Inputs/Form.tsx`       | Modify | All 5 optimizations                     |
| `test/components/Inputs/Form.test.tsx` | Modify | Add performance-related tests           |
