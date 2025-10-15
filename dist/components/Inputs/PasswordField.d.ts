import React from 'react';
export interface PasswordFieldRef {
    element: HTMLInputElement | null;
    value: string;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'required' | 'checked'> {
    value?: string;
    defaultValue?: string;
    initialValue?: string;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: string) => void;
    helperText?: React.ReactNode;
    placeholder?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    inputRef?: React.RefObject<PasswordFieldRef | null> | React.RefCallback<PasswordFieldRef | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    width?: number;
    required?: boolean;
}
/**
 * The Password Field component is used for collecting sensitive data from users.
 * This component will hide the password input. User can toggle the visibility of the password.
 */
declare const PasswordField: {
    ({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, type, error: errorProp, success: successProp, loading, width, required, ...props }: PasswordFieldProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default PasswordField;
//# sourceMappingURL=PasswordField.d.ts.map