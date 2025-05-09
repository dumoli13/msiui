import React from 'react';
export declare const CancelButton: ({ onClick, }: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => import("react/jsx-runtime").JSX.Element;
export type InputDateValue = Date | null;
export interface InputDatePickerRef {
    element: HTMLDivElement | null;
    value: InputDateValue;
    focus: () => void;
    reset: () => void;
}
export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'required'> {
    value?: InputDateValue;
    defaultValue?: InputDateValue;
    clearable?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: InputDateValue) => void;
    helperText?: React.ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    inputRef?: React.RefObject<InputDatePickerRef | null> | React.RefCallback<InputDatePickerRef | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    disabledDate?: (date: Date) => boolean;
    width?: number;
    showTime?: boolean;
}
/**
 *
 * @property {InputDateValue} value - The currently selected date. If provided, the component behaves as a controlled component.
 * @property {InputDateValue} [defaultValue=null] - The default date to display if no value is provided (used in uncontrolled mode).
 * @property {(value: InputDateValue) => void} [onChange] -Callback function to handle input changes.
 * @property {RefObject<InputDatePickerRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {string} [placeholder='Input date'] - Placeholder text displayed inside the input field when it is empty.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {boolean} [showTime=false] - Whether to show the time picker.
 * @property {function} [disabledDate] - A function to determine if a specific date is disabled (not selectable).
 * @property {boolean} [clearable=false] - If `true`, a clear button will appear when the field is focused and has a value.
 *
 */
declare const DatePicker: ({ id, value: valueProp, defaultValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, inputRef, size, clearable, error: errorProp, success: successProp, loading, disabledDate, width, showTime, ...props }: DatePickerProps) => import("react/jsx-runtime").JSX.Element;
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map