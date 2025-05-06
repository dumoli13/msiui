import React from 'react';
export interface FormRef<T> {
    submit: () => void;
    reset: () => void;
    validate: () => boolean;
    getValues: () => T;
}
export type FormRule = {
    required?: boolean;
    email?: boolean;
    url?: boolean;
    pattern?: RegExp | string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    equal?: any;
    validate?: (value: any) => boolean | string;
    message?: string;
} | 'required' | 'email' | 'url';
export type FormRules = Record<string, FormRule[]>;
export interface FormProps<T> {
    onSubmit: (values: T) => void;
    onReset?: () => void;
    className?: string;
    children: React.ReactNode;
    rules?: FormRules;
    disabled?: boolean;
    formRef?: React.Ref<FormRef<T>>;
}
declare const Form: <T>({ onSubmit, onReset, className, children, rules, disabled, formRef, }: FormProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Form;
//# sourceMappingURL=Form.d.ts.map