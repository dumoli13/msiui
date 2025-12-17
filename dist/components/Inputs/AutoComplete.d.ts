import { AutoCompleteProps } from '../../types';
/**
 * The autocomplete is a normal text input enhanced by a panel of suggested options.
 */
declare const AutoComplete: {
    <T, D = undefined>({ id, name, value: valueProp, defaultValue, initialValue, label, labelPosition, autoHideLabel, placeholder, options: optionsProp, onChange, className, helperText, disabled: disabledProp, fullWidth, startIcon, endIcon, inputRef, size, error: errorProp, success: successProp, loading, clearable, width, appendIfNotFound, onAppend, required, renderOption, async, fetchOptions, onKeyDown, ...props }: AutoCompleteProps<T, D>): import("react/jsx-runtime").JSX.Element;
    isFormInput: boolean;
};
export default AutoComplete;
//# sourceMappingURL=AutoComplete.d.ts.map