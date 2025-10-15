import React from 'react';
import { SelectValue } from '../../types';
export interface AutoCompleteRef<T, D = undefined> {
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
    inputRef?: React.RefObject<AutoCompleteRef<T> | null> | React.RefCallback<AutoCompleteRef<T> | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    clearable?: boolean;
    width?: number;
    required?: boolean;
    renderOption?: (option: Array<SelectValue<T, D>>, onClick: (value: SelectValue<T, D>) => void, selected: SelectValue<T, D> | null) => React.ReactNode;
}
interface WithoutAppendProps<T, D = undefined> {
    appendIfNotFound?: false;
    onAppend?: (input: SelectValue<T, D>) => never;
}
interface WithAppendProps<T, D = undefined> extends BaseProps<T, D> {
    appendIfNotFound: true;
    onAppend: (input: SelectValue<T, D>) => void;
}
interface AsyncProps<T, D> {
    async: true;
    fetchOptions: (keyword: string, page: number, limit: number) => Promise<SelectValue<T, D>[]>;
    options?: never;
    loading?: never;
}
interface NonAsyncProps<T, D> {
    async?: false;
    fetchOptions?: never;
    options: SelectValue<T, D>[];
    loading?: boolean;
}
export type AutoCompleteProps<T, D = undefined> = (BaseProps<T, D> & WithoutAppendProps<T, D> & AsyncProps<T, D>) | (BaseProps<T, D> & WithoutAppendProps<T, D> & NonAsyncProps<T, D>) | (BaseProps<T, D> & WithAppendProps<T, D> & AsyncProps<T, D>) | (BaseProps<T, D> & WithAppendProps<T, D> & NonAsyncProps<T, D>);
/**
 * The autocomplete is a normal text input enhanced by a panel of suggested options.
 */
declare const AutoComplete: {
    <T, D = undefined>({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, placeholder, options: optionsProp, onChange, className, helperText, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, clearable, width, appendIfNotFound, onAppend, required, renderOption, async, fetchOptions, ...props }: AutoCompleteProps<T, D>): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default AutoComplete;
//# sourceMappingURL=AutoComplete.d.ts.map