import React from 'react';
import { PickerType } from '../../const/datePicker';
export declare const CancelButton: ({ onClick, }: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => import("react/jsx-runtime").JSX.Element;
export type InputDateValue = Date | null;
export interface InputDatePickerRef {
    element: HTMLDivElement | null;
    value: InputDateValue;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'required' | 'checked'> {
    value?: InputDateValue;
    defaultValue?: InputDateValue;
    initialValue?: InputDateValue;
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
    picker?: PickerType;
    format?: string;
    required?: boolean;
}
/**
 * The Date Picker component lets users select a date. User can also set a time of the date.
 */
declare const DatePicker: {
    ({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, inputRef, size, clearable, error: errorProp, success: successProp, loading, disabledDate, width, showTime, format: formatProps, picker, required, ...props }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map