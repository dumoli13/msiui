import React from 'react';
import { SelectValue } from './Select';
export interface AutoCompleteRef<T, D = undefined> {
    element: HTMLDivElement | null;
    value: SelectValue<T, D> | null;
    focus: () => void;
    reset: () => void;
}
export interface AutoCompleteProps<T, D = undefined> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'size' | 'required'> {
    value?: SelectValue<T, D> | null;
    defaultValue?: T | null;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    placeholder?: string;
    options: SelectValue<T, D>[];
    onChange?: (value: SelectValue<T, D> | null) => void;
    helperText?: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    inputRef?: React.RefObject<AutoCompleteRef<T> | null> | React.RefCallback<AutoCompleteRef<T> | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    clearable?: boolean;
    width?: number;
}
/**
 *
 * @property {SelectValue<T, D> | null} value - The value of the input. If provided, the input will be controlled.
 * @property {T | null} defaultValue - The default value for the input. Used in uncontrolled mode.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<AutoCompleteRef<T>> | React.RefCallback<AutoCompleteRef<T>>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {string} [placeholder] - Placeholder text displayed inside the input field when it is empty.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {boolean} [clearable=false] - A flag that show clear button of input field if set to true.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 */
declare const AutoComplete: <T, D = undefined>({ id, value: valueProp, defaultValue, label, labelPosition, autoHideLabel, placeholder, options, onChange, className, helperText, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, clearable, width, ...props }: AutoCompleteProps<T, D>) => import("react/jsx-runtime").JSX.Element;
export default AutoComplete;
//# sourceMappingURL=AutoComplete.d.ts.map