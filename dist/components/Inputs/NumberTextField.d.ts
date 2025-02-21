import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
export interface NumberTextfieldRef {
    element: HTMLInputElement | null;
    value: number | null;
    focus: () => void;
    reset: () => void;
}
export interface NumberTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size'> {
    id?: string;
    value?: number | null;
    defaultValue?: number | null;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: number | null) => void;
    className?: string;
    helperText?: ReactNode;
    placeholder?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    clearable?: boolean;
    inputRef?: RefObject<NumberTextfieldRef | null> | RefCallback<NumberTextfieldRef | null>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    width?: number;
}
/**
 * NumberTextField Component
 *
 * A customizable input field designed for numeric values. This component formats and displays numbers with thousand separators, and it supports various features including label positioning, value clearing, validation feedback, and more.
 *
 * @property {number | null} [value] - The current value of the number field, passed from the parent component.
 * @property {number | null} [defaultValue] - The initial value of the number field when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should hide when the user starts typing.
 * @property {(value: number | null) => void} [onChange] - Callback function when the number value changes.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed when no value is entered.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {boolean} [clearable=false] - If `true`, a clear button will appear when the field is focused and has a value.
 * @property {RefObject<NumberTextfieldRef> | RefCallback<NumberTextfieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <NumberTextField
 *   value={amount}
 *   onChange={handleAmountChange}
 *   label="Amount"
 *   placeholder="Enter the amount"
 *   error="Invalid amount"
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered NumberTextField component.
 */
declare const NumberTextField: ({ id, value: valueProp, defaultValue, label, labelPosition, onChange, className, helperText, placeholder, disabled, fullWidth, startIcon, endIcon, clearable, inputRef, size, error: errorProp, success: successProp, width, ...props }: NumberTextFieldProps) => React.JSX.Element;
export default NumberTextField;
