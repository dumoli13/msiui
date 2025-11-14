import { AutoCompleteMultipleProps } from '../../types';
/**
 * An autocomplete where multiple options can be selected
 */
declare const AutoCompleteMultiple: {
    <T, D>({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, placeholder, options: optionsProp, onChange, className, helperText, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, clearable, width, appendIfNotFound, onAppend, required, renderOption, async, fetchOptions, onKeyDown, onPaste, ...props }: AutoCompleteMultipleProps<T, D>): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default AutoCompleteMultiple;
//# sourceMappingURL=AutoCompleteMultiple.d.ts.map