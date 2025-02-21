import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
export type SelectValue<T, D = undefined> = {
    value: T;
    label: string;
    detail?: D;
};
export interface SelectRef<T, D = undefined> {
    element: HTMLDivElement | null;
    value: SelectValue<T, D> | null;
    focus: () => void;
    reset: () => void;
}
export interface SelectProps<T, D = undefined> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'size'> {
    value?: SelectValue<T, D> | null;
    defaultValue?: SelectValue<T, D> | null;
    label?: string;
    labelPosition?: 'top' | 'left';
    placeholder?: string;
    options: SelectValue<T, D>[];
    onChange?: (value: SelectValue<T, D> | null) => void;
    helperText?: ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: ReactNode;
    inputRef?: RefObject<SelectRef<T> | null> | RefCallback<SelectRef<T> | null>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    loading?: boolean;
    width?: number;
}
/**
 * Select Component
 *
 * A customizable dropdown select component that allows users to choose an option from a list.
 * It supports various features including label positioning, loading state, validation feedback, and dropdown management.
 *
 * @property {SelectValue<T, D> | null} [value] - The currently selected value, passed from the parent component.
 * @property {SelectValue<T, D> | null} [defaultValue] - The initial selected value when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {string} [placeholder] - Placeholder text to show when no option is selected.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function when an option is selected or cleared.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [icon] - An optional icon displayed inside the dropdown.
 * @property {RefObject<SelectRef<T>> | RefCallback<SelectRef<T>>} [inputRef] - A ref that allows direct access to the select element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <Select
 *   value={selectedOption}
 *   onChange={handleSelectChange}
 *   options={options}
 *   label="Select a Country"
 *   placeholder="Choose an option"
 *   size="large"
 *   loading={isLoading}
 *   error="Something went wrong"
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered Select component.
 */
declare const Select: <T, D = undefined>({ id, value: valueProp, defaultValue, label, labelPosition, placeholder, options, onChange, className, helperText, disabled, fullWidth, icon, inputRef, size, error: errorProp, success: successProp, loading, width, }: SelectProps<T, D>) => React.JSX.Element;
export default Select;
