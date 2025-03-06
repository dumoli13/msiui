import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
import { SelectValue } from './Select';
export interface AutoCompleteMultipleRef<T, D = undefined> {
    element: HTMLDivElement | null;
    value: SelectValue<T, D>[];
    focus: () => void;
    reset: () => void;
}
export interface AutoCompleteMultipleProps<T, D = undefined> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'size'> {
    value?: SelectValue<T, D>[];
    defaultValue?: T[];
    label?: string;
    labelPosition?: 'top' | 'left';
    placeholder?: string;
    options: SelectValue<T, D>[];
    onChange?: (value: SelectValue<T, D>[]) => void;
    helperText?: ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    inputRef?: RefObject<AutoCompleteMultipleRef<T> | null> | RefCallback<AutoCompleteMultipleRef<T> | null>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    loading?: boolean;
    isClearable?: boolean;
    width?: number;
}
/**
 *
 * A multi-select input component that allows users to select multiple values from a list of options with autocomplete functionality.
 * It supports both controlled and uncontrolled states, displaying selected options as tags, and allows filtering options as users type.
 * The component includes support for custom icons, clearable values, loading state, and error messages.
 *
 * @property {SelectValue<T, D>[]} [value] - The controlled value of the multi-select input. An array of selected options.
 * @property {T[]} [defaultValue=[]] - The initial selected values in an uncontrolled state (defaults to empty array).
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {string} [placeholder=''] - Placeholder text displayed in the input when it’s empty.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D>[]) => void} [onChange] - Callback function invoked when the selected values change.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<AutoCompleteMultipleRef<T>>} [inputRef] - A reference to the input element for imperative actions like focusing.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {boolean} [isClearable=false] - Whether the input has a clear button to remove selected values.
 * @property {number} [width] - Optional custom width for the input field.
 *
 */
declare const AutoCompleteMultiple: <T, D = undefined>({ id, value: valueProp, defaultValue, label, labelPosition, placeholder, options, onChange, className, helperText, disabled, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, isClearable, width, ...props }: AutoCompleteMultipleProps<T, D>) => React.JSX.Element;
export default AutoCompleteMultiple;
