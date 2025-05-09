import React from 'react';
export type InputDateRangeValue = [Date, Date] | null;
export interface InputDateRangePickerRef {
    element: HTMLDivElement | null;
    value: InputDateRangeValue;
    focus: () => void;
    reset: () => void;
}
export interface DateRangePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'required'> {
    value?: InputDateRangeValue;
    defaultValue?: InputDateRangeValue;
    clearable?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: InputDateRangeValue) => void;
    helperText?: React.ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    inputRef?: React.RefObject<InputDateRangePickerRef | null> | React.RefCallback<InputDateRangePickerRef | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    disabledDate?: (date: Date, firstSelectedDate: Date | null) => boolean;
    width?: number;
    showTime?: boolean;
}
/**
 *
 * @property {InputDateRangeValue} [value] - The selected date range. If provided, the component will be controlled.
 * @property {InputDateRangeValue} [defaultValue] - The initial date range for uncontrolled usage.
 * @property {(value: InputDateRangeValue) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<InputDateRangePickerRef> | React.RefCallback<InputDateRangePickerRef>} [inputRef] - A reference to access the input field and its value programmatically.*
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {string} [placeholder='Input date'] - Placeholder text displayed inside the input field when it is empty.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {boolean} [showTime=false] - Whether time selection should be enabled in the date range picker.
 * @property {(date: Date, firstSelectedDate: Date | null) => boolean} [disabledDate] - A function to disable specific dates based on custom logic.
 *
 */
declare const DateRangePicker: ({ id, value: valueProp, defaultValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, inputRef, size, clearable, error: errorProp, success: successProp, loading, disabledDate, width, showTime, ...props }: DateRangePickerProps) => import("react/jsx-runtime").JSX.Element;
export default DateRangePicker;
//# sourceMappingURL=DateRangePicker.d.ts.map