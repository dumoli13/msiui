import React from 'react';
import { DatePickerProps } from '../../types';
export declare const CancelButton: ({ onClick, }: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => import("react/jsx-runtime").JSX.Element;
/**
 * The Date Picker component lets users select a date. User can also set a time of the date.
 */
declare const DatePicker: {
    ({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, placeholder, onChange, className, helperText, disabled: disabledProp, fullWidth, inputRef, size, error: errorProp, success: successProp, loading, clearable, width, disabledDate, showTime, format: formatProps, picker, required, onKeyDown, ...props }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map