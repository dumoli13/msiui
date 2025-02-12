import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
export interface TextfieldRef {
    element: HTMLInputElement | null;
    value: string;
    focus: () => void;
}
interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
    value?: string | number;
    defaultValue?: string | number;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: string) => void;
    helperText?: ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    inputRef?: RefObject<TextfieldRef | null> | RefCallback<TextfieldRef | null>;
    size?: 'default' | 'large';
    clearable?: boolean;
    error?: string;
    success?: boolean;
    width?: number;
}
/**
 * TextField Component
 *
 * A customizable input field component that supports various features such as labels, icons, error/success states,
 * placeholder text, and the ability to clear the input value. It can be used for both controlled and uncontrolled form inputs.
 *
 * @property {string | number} [value] - The value of the input. If provided, the input will be controlled.
 * @property {string | number} [defaultValue] - The initial value of the input for uncontrolled usage.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed inside the input when it is empty.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<TextfieldRef> | RefCallback<TextfieldRef>} [inputRef] - A ref to access the input element directly.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {boolean} [clearable=false] - Whether the input field should have a clear button to reset its value.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success] - Whether the input field is in a success state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <TextField
 *   label="Username"
 *   value={username}
 *   onChange={(value) => setUsername(value)}
 *   placeholder="Enter your username"
 *   size="large"
 *   success={isValidUsername}
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered TextField component.
 */
declare const TextField: ({ id, value: valueProp, defaultValue, label, labelPosition, onChange, className, helperText, placeholder, disabled, fullWidth, startIcon, endIcon, inputRef, size, clearable, error: errorProp, success: successProp, width, ...props }: TextFieldProps) => React.JSX.Element;
export default TextField;
