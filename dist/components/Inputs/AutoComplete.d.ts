import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
import { SelectValue } from './Select';
export interface AutoCompleteRef<T, D = undefined> {
    element: HTMLDivElement | null;
    value: SelectValue<T, D> | null;
    focus: () => void;
    reset: () => void;
}
export interface AutoCompleteProps<T, D = undefined> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'size'> {
    value?: SelectValue<T, D> | null;
    defaultValue?: T | null;
    label?: string;
    labelPosition?: 'top' | 'left';
    placeholder?: string;
    options: SelectValue<T, D>[];
    onChange?: (value: SelectValue<T, D> | null) => void;
    helperText?: ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    inputRef?: RefObject<AutoCompleteRef<T> | null> | RefCallback<AutoCompleteRef<T> | null>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    loading?: boolean;
    width?: number;
}
/**
 *
 * A customizable input component that allows users to search through a list of options and select one.
 * It supports both controlled and uncontrolled states, offers an interactive dropdown with filtering options,
 * and includes features like custom icons, error handling, and loading states.
 *
 * @property {SelectValue<T, D> | null} value - The currently selected value, if any. If controlled, this prop is required.
 * @property {T | null} defaultValue - The default value for the input. Used in uncontrolled mode.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {string} [placeholder=''] - Placeholder text displayed in the input when it’s empty.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function when an option is selected or cleared.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<AutoCompleteRef<T>> | RefCallback<AutoCompleteRef<T>>} [inputRef] - A ref to access the input field and its value programmatically.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 *
 */
declare const AutoComplete: <T, D = undefined>({ id, value: valueProp, defaultValue, label, labelPosition, placeholder, options, onChange, className, helperText, disabled, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, width, ...props }: AutoCompleteProps<T, D>) => React.JSX.Element;
export default AutoComplete;
