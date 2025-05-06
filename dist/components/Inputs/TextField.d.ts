import React from 'react';
export interface TextfieldRef {
    element: HTMLInputElement | null;
    value: string;
    focus: () => void;
    reset: () => void;
}
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'required'> {
    value?: string | number;
    defaultValue?: string | number;
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
}
/**
 *
 * @property {string | number} [value] - The value of the input. If provided, the input will be controlled.
 * @property {string | number} [defaultValue] - The initial value of the input for uncontrolled usage.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<TextfieldRef> | React.RefCallback<TextfieldRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {string} [placeholder] - Placeholder text displayed inside the input field when it is empty.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] -
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {boolean} [clearable=false] - Whether the input field should have a clear button to reset its value.
 *
 */
declare const TextField: ({ id, value: valueProp, defaultValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, clearable, error: errorProp, success: successProp, loading, width, ...props }: TextFieldProps) => import("react/jsx-runtime").JSX.Element;
export default TextField;
//# sourceMappingURL=TextField.d.ts.map