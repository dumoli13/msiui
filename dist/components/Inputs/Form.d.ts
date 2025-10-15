import React from 'react';
export interface FormRef<T> {
    submit: () => Promise<void>;
    reset: () => void;
    validate: () => string[];
    getValues: () => Partial<T>;
    getErrors: () => Record<string, string | undefined>;
    setErrors: (errors: Record<string, string | undefined>) => void;
}
export type FormRule = {
    required?: boolean;
    email?: boolean;
    url?: boolean;
    pattern?: RegExp | string;
    minLength?: number;
    maxLength?: number;
    exactLength?: number;
    min?: number;
    max?: number;
    equal?: any;
    validate?: (value: any) => string[];
    message?: string;
} | 'required' | 'email' | 'url';
export type FormRules = Record<string, FormRule[]>;
export interface FormProps<T> {
    onSubmit?: (values: T) => Promise<void> | void;
    onReset?: () => void;
    className?: string;
    children: React.ReactNode;
    rules?: FormRules;
    disabled?: boolean;
    formRef?: React.Ref<FormRef<T>>;
    submitOnChange?: boolean;
    focusOnLastFieldEnter?: boolean;
}
/**
 * High-performance form component with data domain management. Includes data entry and validation.
 */
declare const Form: <T>({ onSubmit, onReset, className, children, rules, disabled, formRef, submitOnChange, focusOnLastFieldEnter, }: FormProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Form;
//# sourceMappingURL=Form.d.ts.map