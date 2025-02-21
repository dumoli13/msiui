import React, { InputHTMLAttributes, ReactNode, RefCallback, RefObject } from 'react';
export type InputDateRangeValue = [Date, Date] | null;
export interface InputDateRangePickerRef {
    element: HTMLDivElement | null;
    value: InputDateRangeValue;
    focus: () => void;
    reset: () => void;
}
export interface DateRangePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size'> {
    value?: InputDateRangeValue;
    defaultValue?: InputDateRangeValue;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: InputDateRangeValue) => void;
    helperText?: ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    inputRef?: RefObject<InputDateRangePickerRef> | RefCallback<InputDateRangePickerRef>;
    size?: 'default' | 'large';
    error?: string;
    success?: boolean;
    disabledDate?: (date: Date, firstSelectedDate: Date | null) => boolean;
    width?: number;
}
declare const DateRangePicker: ({ id, value: valueProp, defaultValue, label, labelPosition, onChange, className, helperText, placeholder, disabled, fullWidth, inputRef, size, error: errorProp, success: successProp, disabledDate, width, ...props }: DateRangePickerProps) => React.JSX.Element;
export default DateRangePicker;
