import React from 'react';
export declare const CancelButton: ({ onClick, }: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => React.JSX.Element;
export type InputDateValue = Date | null;
export interface InputDatePickerRef {
    element: HTMLDivElement | null;
    value: InputDateValue;
    focus: () => void;
    reset: () => void;
}
export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size'> {
    value?: InputDateValue;
    defaultValue?: InputDateValue;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: InputDateValue) => void;
    helperText?: React.ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    inputRef?: React.RefObject<InputDatePickerRef | null> | React.RefCallback<InputDatePickerRef | null>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    loading?: boolean;
    disabledDate?: (date: Date, firstSelectedDate: InputDateValue) => boolean;
    width?: number;
    showTime?: boolean;
}
/**
 *
 * A date picker input component that allows users to select a date, month, or year.
 * The component provides a calendar view with the option to select a date, switch to month or year views,
 * and also supports clearing the selected value, selecting today's date, and disabling specific dates.
 * It is highly customizable, supporting error messages, success states, and additional helper text.
 *
 * @property {InputDateValue} value - The currently selected date. If provided, the component behaves as a controlled component.
 * @property {InputDateValue} [defaultValue=null] - The default date to display if no value is provided (used in uncontrolled mode).
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether to hide the label when the input is focused.
 * @property {function} [onChange] - Callback function invoked when the date changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder='Input date'] - Placeholder text for the input field.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {RefObject<InputDatePickerRef>} [inputRef] - A reference to the date picker input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {function} [disabledDate] - A function to determine if a specific date is disabled (not selectable).
 * @property {number} [width] - Optional custom width for the input field.
 * @property {boolean} [showTime=false] - Whether to show the time picker.
 *
 */
declare const DatePicker: ({ id, value: valueProp, defaultValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, inputRef, size, error: errorProp, success: successProp, loading, disabledDate, width, showTime, ...props }: DatePickerProps) => React.JSX.Element;
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map