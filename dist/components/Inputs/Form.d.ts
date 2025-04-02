import React from 'react';
export interface FormRef {
    submit: () => void;
    reset: () => void;
    validate: () => boolean;
    getValues: () => Record<string, any>;
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
export interface FormProps {
    onSubmit: (values: Record<string, any>) => void;
    onReset?: () => void;
    className?: string;
    children: React.ReactNode;
    rules?: FormRules;
    disabled?: boolean;
    initialValues?: Record<string, any>;
    formRef?: React.Ref<FormRef>;
}
declare const Form: ({ onSubmit, onReset, className, children, rules, disabled, initialValues, formRef, }: FormProps) => React.JSX.Element;
export default Form;
//# sourceMappingURL=Form.d.ts.map