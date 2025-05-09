import React from 'react';
export interface CheckboxRef {
    element: HTMLInputElement | null;
    value: boolean;
    focus: () => void;
    reset: () => void;
}
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'placeholder' | 'required' | 'value'> {
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
    error?: boolean | string;
    loading?: boolean;
    width?: number;
}
/**
 *
 * @property {boolean} [checked] - The controlled value of the checkbox. If provided, the component acts as a controlled component.
 * @property {boolean} [defaultChecked=false] - The default checked state if `checked` is not provided. Used in uncontrolled mode.
 * @property {(checked: boolean) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<CheckboxRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'bottom' | 'left' | 'right'} [labelPosition='right'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {boolean} [indeterminate=false] - If true, the checkbox will appear in an indeterminate state.
 * @property {string} [aria-label] - The ARIA label for accessibility purposes.
 */
declare const Checkbox: ({ label, labelPosition, checked: valueProp, defaultChecked, indeterminate, onChange, helperText, disabled: disabledProp, className, inputRef, size, error: errorProp, loading, width, "aria-label": ariaLabel, ...props }: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map