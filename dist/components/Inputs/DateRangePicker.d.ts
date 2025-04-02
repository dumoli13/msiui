import React from 'react';
export type InputDateRangeValue = [Date, Date] | null;
export interface InputDateRangePickerRef {
    element: HTMLDivElement | null;
    value: InputDateRangeValue;
    focus: () => void;
    reset: () => void;
}
export interface DateRangePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size'> {
    value?: InputDateRangeValue;
    defaultValue?: InputDateRangeValue;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: InputDateRangeValue) => void;
    helperText?: React.ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    inputRef?: React.RefObject<InputDateRangePickerRef> | React.RefCallback<InputDateRangePickerRef>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    loading?: boolean;
    disabledDate?: (date: Date, firstSelectedDate: Date | null) => boolean;
    width?: number;
    showTime?: boolean;
}
/**
 * A date range picker component that allows users to select a start and end date.
 * It supports customization options such as labels, helper text, validation, and disabled dates.
 *
 * @property {InputDateRangeValue} [value] - The selected date range. If provided, the component will be controlled.
 * @property {InputDateRangeValue} [defaultValue] - The initial date range for uncontrolled usage.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the input ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
 * @property {(value: InputDateRangeValue) => void} [onChange] - Callback function triggered when the selected date range changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder='Input date'] - Placeholder text displayed inside the input field when it is empty.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {RefObject<InputDateRangePickerRef> | React.RefCallback<InputDateRangePickerRef>} [inputRef] - A ref to access the date range picker element directly.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message displayed when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {(date: Date, firstSelectedDate: Date | null) => boolean} [disabledDate] - A function to disable specific dates based on custom logic.
 * @property {number} [width] - Optional custom width for the input field.
 * @property {boolean} [showTime=false] - Whether time selection should be enabled in the date range picker.
 */
declare const DateRangePicker: ({ id, value: valueProp, defaultValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, inputRef, size, error: errorProp, success: successProp, loading, disabledDate, width, showTime, ...props }: DateRangePickerProps) => React.JSX.Element;
export default DateRangePicker;
//# sourceMappingURL=DateRangePicker.d.ts.map