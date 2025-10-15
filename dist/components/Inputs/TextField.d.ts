import React from 'react';
export interface TextfieldRef {
    element: HTMLInputElement | null;
    value: string;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'required' | 'checked'> {
    value?: string | number;
    defaultValue?: string | number;
    initialValue?: string | number;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: string) => void;
    helperText?: React.ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    inputRef?: React.RefObject<TextfieldRef | null> | React.RefCallback<TextfieldRef | null>;
    size?: 'default' | 'large';
    clearable?: boolean;
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    width?: number;
    required?: boolean;
}
/**
 * The Text Field component is used for collecting text from users.
 */
declare const TextField: {
    ({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, clearable, error: errorProp, success: successProp, loading, width, required, ...props }: TextFieldProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default TextField;
//# sourceMappingURL=TextField.d.ts.map