import React from 'react';
export interface SwitchRef {
    element: HTMLInputElement | null;
    value: boolean;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultChecked' | 'onChange' | 'size' | 'required'> {
    defaultChecked?: boolean;
    initialChecked?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (checked: boolean) => void;
    helperText?: React.ReactNode;
    inputRef?: React.RefObject<SwitchRef | null> | React.RefCallback<SwitchRef | null>;
    size?: 'default' | 'large';
    fullWidth?: boolean;
    error?: boolean | string;
    trueLabel?: string;
    falseLabel?: string;
    width?: number;
    loading?: boolean;
    required?: boolean;
}
/**
 * The Switch component is used for toggling between two states. Most commonly used for setting on or off.
 */
declare const Switch: {
    ({ id, name, defaultChecked, initialChecked, checked: checkedProp, label, labelPosition, onChange, className, helperText, disabled: disabledProp, inputRef, size, fullWidth, error: errorProp, trueLabel, falseLabel, width, loading, required, ...props }: SwitchProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default Switch;
//# sourceMappingURL=Switch.d.ts.map