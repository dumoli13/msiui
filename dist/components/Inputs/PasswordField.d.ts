import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
export interface PasswordFieldRef {
    element: HTMLInputElement | null;
    value: string;
    focus: () => void;
}
interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
    value?: string;
    defaultValue?: string;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: string) => void;
    helperText?: ReactNode;
    placeholder?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    inputRef?: RefObject<PasswordFieldRef | null> | RefCallback<PasswordFieldRef | null>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    width?: number;
}
/**
 * PasswordField Component
 *
 * A customizable password input field that allows users to enter a password with the option to show/hide it.
 * It supports various features including label positioning, password visibility toggling, loading state, and validation feedback.
 *
 * @property {string} [value] - The current value of the password field, passed from the parent component.
 * @property {string} [defaultValue] - The initial value of the password field when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should hide when the user starts typing.
 * @property {(value: string) => void} [onChange] - Callback function when the password value changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed when no value is entered.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<PasswordFieldRef> | RefCallback<PasswordFieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <PasswordField
 *   value={password}
 *   onChange={handlePasswordChange}
 *   label="Password"
 *   placeholder="Enter your password"
 *   error="Password is too weak"
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered PasswordField component.
 */
declare const PasswordField: ({ id, value: valueProp, defaultValue, label, labelPosition, onChange, className, helperText, placeholder, disabled, fullWidth, startIcon, endIcon, inputRef, size, type, error: errorProp, success: successProp, width, ...props }: PasswordFieldProps) => React.JSX.Element;
export default PasswordField;
