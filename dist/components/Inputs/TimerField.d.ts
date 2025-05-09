import React from 'react';
export interface TimerFieldRef {
    element: HTMLInputElement | null;
    value: number | null;
    focus: () => void;
    reset: () => void;
}
export interface TimerFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'required'> {
    id?: string;
    value?: number | null;
    defaultValue?: number | null;
    clearable?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: number | null) => void;
    className?: string;
    helperText?: React.ReactNode;
    placeholder?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    inputRef?: React.RefObject<TimerFieldRef | null> | React.RefCallback<TimerFieldRef | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    width?: number;
}
/**
 *
 * @property {number | null} [value] - The current value of the input, passed from the parent component.
 * @property {number | null} [defaultValue] - The initial value of the number field when the component is uncontrolled.
 * @property {(value: number | null) => void} [onChange] - Callback function when the number value changes.
 * @property {RefObject<TimerFieldRef> | React.RefCallback<TimerFieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should hide when the user starts typing.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {string} [placeholder='hh:mm:ss'] - Placeholder text displayed inside the input field when it is empty.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {number} [width] - Optional custom width for the input field.
 * @property {boolean} [clearable=false] - If `true`, a clear button will appear when the field is focused and has a value.
 *
 */
declare const TimerField: ({ id, value: valueProp, defaultValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, clearable, error: errorProp, success: successProp, loading, width, ...props }: TimerFieldProps) => import("react/jsx-runtime").JSX.Element;
export default TimerField;
//# sourceMappingURL=TimerField.d.ts.map