import { SelectProps } from '../../types/inputs';
/**
 * Select components are used for collecting user provided information from a list of options.
 */
declare const Select: {
    <T, D = undefined>({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, placeholder, options: optionsProp, onChange, className, helperText, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, clearable, width, required, renderOption, async, fetchOptions, onKeyDown, }: SelectProps<T, D>): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default Select;
//# sourceMappingURL=Select.d.ts.map