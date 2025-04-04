import React from 'react';
export interface CheckboxRef {
    element: HTMLInputElement | null;
    value: boolean;
    focus: () => void;
    reset: () => void;
}
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'placeholder'> {
    label?: string;
    labelPosition?: 'top' | 'bottom' | 'left' | 'right';
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    onChange?: (checked: boolean) => void;
    helperText?: React.ReactNode;
    disabled?: boolean;
    inputRef?: React.RefObject<CheckboxRef | null> | React.RefCallback<CheckboxRef | null>;
    size?: 'default' | 'large';
    error?: string;
    loading?: boolean;
    width?: number;
}
/**
 *
 * A customizable checkbox input that allows users to select or deselect an option. It supports both controlled
 * and uncontrolled modes, provides an indeterminate state, and handles accessibility features like `aria-label`.
 *
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'bottom' | 'left' | 'right'} [labelPosition='right'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [checked] - The controlled value of the checkbox. If provided, the component acts as a controlled component.
 * @property {boolean} [defaultChecked=false] - The default checked state if `checked` is not provided. Used in uncontrolled mode.
 * @property {boolean} [indeterminate=false] - If true, the checkbox will appear in an indeterminate state.
 * @property {function} [onChange] - Callback function invoked when the checkbox value changes. Provides the new `checked` state.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {RefObject<CheckboxRef>} [inputRef] - A reference to the checkbox element.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 * @property {string} [aria-label] - The ARIA label for accessibility purposes.
 *
 */
declare const Checkbox: ({ label, labelPosition, checked: valueProp, defaultChecked, indeterminate, onChange, helperText, disabled: disabledProp, className, inputRef, size, error: errorProp, loading, width, "aria-label": ariaLabel, ...props }: CheckboxProps) => React.JSX.Element;
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map