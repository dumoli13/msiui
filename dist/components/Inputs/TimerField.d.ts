import React from 'react';
export interface TimerFieldRef {
    element: HTMLInputElement | null;
    value: number | null;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface TimerFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'required' | 'checked'> {
    value?: number | null;
    defaultValue?: number | null;
    initialValue?: number | null;
    clearable?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: number | null) => void;
    className?: string;
    helperText?: React.ReactNode;
    placeholder?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    inputRef?: React.RefObject<TimerFieldRef | null> | React.RefCallback<TimerFieldRef | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    width?: number;
    required?: boolean;
}
/**
 * The Timer Field component is used for collecting time value from users
 */
declare const TimerField: {
    ({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, clearable, error: errorProp, success: successProp, loading, width, required, ...props }: TimerFieldProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default TimerField;
//# sourceMappingURL=TimerField.d.ts.map