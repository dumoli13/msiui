import React from 'react';
import { SelectValue } from '../../types/input';
export interface SelectRef<T, D = undefined> {
    element: HTMLDivElement | null;
    value: SelectValue<T, D> | null;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
interface BaseProps<T, D = undefined> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'size' | 'required' | 'checked'> {
    value?: SelectValue<T, D> | null;
    defaultValue?: T | null;
    initialValue?: SelectValue<T, D> | null;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    placeholder?: string;
    onChange?: (value: SelectValue<T, D> | null) => void;
    helperText?: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    inputRef?: React.RefObject<SelectRef<T> | null> | React.RefCallback<SelectRef<T> | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    clearable?: boolean;
    width?: number;
    required?: boolean;
    renderOption?: (option: Array<SelectValue<T, D>>, onClick: (value: SelectValue<T, D>) => void, selected: SelectValue<T, D> | null) => React.ReactNode;
}
interface AsyncProps<T, D> {
    async: true;
    fetchOptions: (page: number, limit: number) => Promise<SelectValue<T, D>[]>;
    options?: never;
    loading?: never;
}
interface NonAsyncProps<T, D> {
    async?: false;
    fetchOptions?: never;
    options: SelectValue<T, D>[];
    loading?: boolean;
}
export type SelectProps<T, D = undefined> = (BaseProps<T, D> & AsyncProps<T, D>) | (BaseProps<T, D> & NonAsyncProps<T, D>);
/**
 * Select components are used for collecting user provided information from a list of options.
 */
declare const Select: {
    <T, D = undefined>({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, placeholder, options: optionsProp, onChange, className, helperText, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, clearable, width, required, renderOption, async, fetchOptions, }: SelectProps<T, D>): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default Select;
//# sourceMappingURL=Select.d.ts.map