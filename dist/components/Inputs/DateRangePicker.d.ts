import React from 'react';
import { PickerType } from '../../const/datePicker';
export type InputDateRangeValue = [Date, Date] | null;
export interface InputDateRangePickerRef {
    element: HTMLDivElement | null;
    value: InputDateRangeValue;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface DateRangePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'required' | 'checked'> {
    value?: InputDateRangeValue;
    defaultValue?: InputDateRangeValue;
    initialValue?: InputDateRangeValue;
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
    picker?: PickerType;
    format?: string;
    required?: boolean;
}
/**
 * The Date Range Picker lets the user select a range of dates.
 */
declare const DateRangePicker: {
    ({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, inputRef, size, clearable, error: errorProp, success: successProp, loading, disabledDate, width, showTime, format: formatProps, picker, required, ...props }: DateRangePickerProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default DateRangePicker;
//# sourceMappingURL=DateRangePicker.d.ts.map