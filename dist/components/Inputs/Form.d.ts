import React from 'react';
import type { FormProps } from '../../types';
/**
 * Returns the Form's `enhanceChild` function so that inputs rendered inside a
 * custom component (not direct JSX children of `<Form>`) can still be wired up
 * to the form's error store, dirty tracking, and ref collection.
 *
 * Must be called inside a component that is rendered within a `<Form>`.
 */
export declare function useFormEnhanceChild(): ((child: React.ReactNode) => React.ReactNode) | null;
/**
 * Wrapper that connects a single input to the nearest `<Form>`.
 * Use this inside custom components that own their inputs internally
 * (i.e. the inputs are not direct JSX children of `<Form>`).
 *
 * @example
 * function MyRow({ defaultValue }) {
 *   return (
 *     <div className="flex gap-4">
 *       <FormField><TextField name="name" defaultValue={defaultValue.name} /></FormField>
 *       <FormField><Select name="status" defaultValue={defaultValue.status} /></FormField>
 *     </div>
 *   );
 * }
 */
export declare function FormField({ children }: {
    children: React.ReactElement;
}): React.ReactElement;
/**
 * High-performance form component with data domain management. Includes data entry and validation.
 */
declare const Form: <T>({ onSubmit, onError, onReset, className, rules, disabled, formRef, submitOnChange, focusOnLastFieldEnter, children, template, }: FormProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Form;
//# sourceMappingURL=Form.d.ts.map