import React from 'react';
import { SelectValue } from '../../types/input';
export interface RadioGroupRef<T, D = undefined> {
    element: HTMLDivElement | null;
    value: SelectValue<T, D> | null;
    focus: () => void;
    reset: () => void;
    disabled: boolean;
}
export interface RadioGroupProps<T, D = undefined> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    value?: T | null;
    defaultValue?: T | null;
    initialValue?: T | null;
    name?: string;
    label?: string;
    labelPosition?: 'top' | 'left';
    autoHideLabel?: boolean;
    options: SelectValue<T, D>[];
    direction?: 'row' | 'column';
    onChange?: (value: SelectValue<T, D>) => void;
    helperText?: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    inputRef?: React.RefObject<RadioGroupRef<T, D> | null> | React.RefCallback<RadioGroupRef<T, D> | null>;
    size?: 'default' | 'large';
    error?: boolean | string;
    success?: boolean;
    loading?: boolean;
    width?: number;
    required?: boolean;
}
/**
 * RadioGroup components allow users to select one option from a set.
 */
declare const RadioGroup: {
    <T, D = undefined>({ value: valueProp, defaultValue, initialValue, id, name, label, labelPosition, autoHideLabel, options, direction, onChange, helperText, disabled: disabledProp, fullWidth, inputRef, size, error: errorProp, success: successProp, loading, width, className, required, ...props }: RadioGroupProps<T, D>): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default RadioGroup;
//# sourceMappingURL=RadioGroup.d.ts.map