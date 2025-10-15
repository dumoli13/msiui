import React from 'react';
export interface CheckboxRef {
    element: HTMLInputElement | null;
    value: boolean;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'placeholder' | 'required' | 'value'> {
    label?: string;
    labelPosition?: 'top' | 'bottom' | 'left' | 'right';
    checked?: boolean;
    defaultChecked?: boolean;
    initialChecked?: boolean;
    indeterminate?: boolean;
    onChange?: (checked: boolean) => void;
    helperText?: React.ReactNode;
    disabled?: boolean;
    inputRef?: React.RefObject<CheckboxRef | null> | React.RefCallback<CheckboxRef | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    loading?: boolean;
    width?: number;
}
/**
 * Checkboxes allow the user to turn an option on or off.
 */
declare const Checkbox: {
    ({ id, name, label, labelPosition, checked: valueProp, defaultChecked, initialChecked, indeterminate, onChange, helperText, disabled: disabledProp, className, inputRef, size, error: errorProp, loading, width, "aria-label": ariaLabel, ...props }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map