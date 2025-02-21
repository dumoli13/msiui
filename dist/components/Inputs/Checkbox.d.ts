import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
export interface CheckboxRef {
    element: HTMLInputElement | null;
    value: boolean;
    focus: () => void;
}
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
    label?: string;
    labelPosition?: 'top' | 'left';
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    onChange?: (checked: boolean) => void;
    helperText?: ReactNode;
    disabled?: boolean;
    inputRef?: RefObject<CheckboxRef | null> | RefCallback<CheckboxRef | null>;
    error?: string;
    width?: number;
}
/**
 * Checkbox Component
 *
 * A customizable checkbox input that allows users to select or deselect an option. It supports both controlled
 * and uncontrolled modes, provides an indeterminate state, and handles accessibility features like `aria-label`.
 * The component is also highly customizable with props for labels, error messages, and helper text.
 *
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [checked] - The controlled value of the checkbox. If provided, the component acts as a controlled component.
 * @property {boolean} [defaultChecked=false] - The default checked state if `checked` is not provided. Used in uncontrolled mode.
 * @property {boolean} [indeterminate=false] - If true, the checkbox will appear in an indeterminate state.
 * @property {function} [onChange] - Callback function invoked when the checkbox value changes. Provides the new `checked` state.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {RefObject<CheckboxRef>} [inputRef] - A reference to the checkbox element.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {number} [width] - Optional custom width for the input field.
 * @property {string} [aria-label] - The ARIA label for accessibility purposes.
 *
 * @returns {JSX.Element} The rendered Checkbox component.
 *
 * @example Basic Usage:
 * ```tsx
 * const [isChecked, setIsChecked] = useState(false);
 *
 * <Checkbox
 *   label="Accept terms and conditions"
 *   checked={isChecked}
 *   onChange={(checked) => setIsChecked(checked)}
 * />
 * ```
 *
 */
declare const Checkbox: ({ label, labelPosition, checked: valueProp, defaultChecked, indeterminate, onChange, helperText, disabled, className, inputRef, error: errorProp, width, "aria-label": ariaLabel, ...props }: CheckboxProps) => React.JSX.Element;
export default Checkbox;
