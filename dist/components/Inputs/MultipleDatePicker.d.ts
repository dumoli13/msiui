import React from 'react';
import { PickerType } from '../../const/datePicker';
export type InputMultipleDateValue = Date[];
export interface InputMultipleDatePickerRef {
    element: HTMLDivElement | null;
    value: InputMultipleDateValue;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface MultipleDatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'required'> {
    value?: InputMultipleDateValue;
    defaultValue?: InputMultipleDateValue;
    initialValue?: InputMultipleDateValue;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    onChange?: (value: InputMultipleDateValue) => void;
    helperText?: React.ReactNode;
    placeholder?: string;
    fullWidth?: boolean;
    inputRef?: React.RefObject<InputMultipleDatePickerRef | null> | React.RefCallback<InputMultipleDatePickerRef | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    disabledDate?: (date: Date, firstSelectedDate: InputMultipleDateValue) => boolean;
    width?: number;
    picker?: PickerType;
    format?: string;
    required?: boolean;
}
/**
 * The Multiple Date Picker component lets users select multiple date.
 * This component is similar to the Date Picker component but can not set a time of the date.
 *
 */
declare const MultipleDatePicker: {
    ({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, onChange, className, helperText, placeholder, disabled: disabledProp, fullWidth, inputRef, size, error: errorProp, success: successProp, loading, disabledDate, width, format, picker, required, }: MultipleDatePickerProps): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default MultipleDatePicker;
//# sourceMappingURL=MultipleDatePicker.d.ts.map