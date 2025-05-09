import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// TODO: Remove this file after implement mis-design
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 *
 * @property {SelectValue<T, D> | null} value - The value of the input. If provided, the input will be controlled.
 * @property {T | null} defaultValue - The default value for the input. Used in uncontrolled mode.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<AutoCompleteRef<T>> | React.RefCallback<AutoCompleteRef<T>>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {string} [placeholder] - Placeholder text displayed inside the input field when it is empty.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {boolean} [clearable=false] - A flag that show clear button of input field if set to true.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 */
const AutoComplete = (_a) => {
    var _b;
    var { id, value: valueProp, defaultValue, label, labelPosition = 'top', autoHideLabel = false, placeholder, options, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "placeholder", "options", "onChange", "className", "helperText", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "error", "success", "loading", "clearable", "width"]);
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(options.find((item) => item.value === defaultValue) || null);
    React.useEffect(() => {
        setInternalValue(options.find((item) => item.value === defaultValue) || null);
    }, [options]);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const [inputValue, setInputValue] = React.useState((_b = value === null || value === void 0 ? void 0 : value.label) !== null && _b !== void 0 ? _b : '');
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value: value,
        focus: () => {
            var _a;
            (_a = valueRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalValue(options.find((item) => item.value === defaultValue) || null);
        },
    }));
    const [filteredOptions, setFilteredOptions] = React.useState([]);
    React.useEffect(() => {
        var _a;
        setInputValue((_a = value === null || value === void 0 ? void 0 : value.label) !== null && _a !== void 0 ? _a : '');
    }, [value]);
    React.useEffect(() => {
        const filtered = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredOptions(filtered);
    }, [inputValue, options]);
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            var _a, _b, _c;
            const target = event.target;
            const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(target);
            const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(target);
            if (dropdownContainsTarget || selectElementContainsTarget) {
                (_c = elementRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                return;
            }
            setDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleFocus = () => {
        if (disabled)
            return;
        setFocused(true);
        setDropdownOpen(true);
        setFilteredOptions(options);
    };
    const handleBlur = (event) => {
        var _a, _b;
        const relatedTarget = event.relatedTarget;
        const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(relatedTarget);
        const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(relatedTarget);
        if (dropdownContainsTarget || selectElementContainsTarget) {
            return;
        }
        setFocused(false);
        setDropdownOpen(false);
    };
    const handleDropdown = () => {
        if (disabled)
            return;
        setFocused(true);
        setDropdownOpen((prev) => !prev);
        setFilteredOptions(options);
    };
    const handleClearValue = () => {
        setDropdownOpen(true);
        onChange === null || onChange === void 0 ? void 0 : onChange(null);
        if (!isControlled)
            setInternalValue(null);
    };
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (newValue.length === 0) {
            handleClearValue();
        }
    };
    const handleOptionSelect = (option) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(option);
        if (!isControlled) {
            setInternalValue(option);
            setInputValue(option.label);
        }
        setDropdownOpen(false);
    };
    const dropdownContent = (_jsxs(_Fragment, { children: [filteredOptions.map((option) => (_jsx("div", { role: "button", onClick: () => handleOptionSelect(option), className: cx('py-1.5 px-4 text-left break-words', {
                    'bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark': option.value === (value === null || value === void 0 ? void 0 : value.value),
                    'cursor-pointer hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': option.value !== (value === null || value === void 0 ? void 0 : value.value),
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                }), children: option.label }, String(option.value)))), filteredOptions.length === 0 && (_jsxs("div", { className: "flex flex-col items-center gap-4 text center text-neutral-60 dark:text-neutral-60-dark text-16px", children: [_jsx("div", { className: "h-12 w-12 bg-neutral-60 dark:bg-neutral-60-dark flex items-center justify-center rounded-full text-neutral-10 dark:text-neutral-10-dark text-36px font-semibold mt-1", children: "!" }), _jsx("div", { children: "Empty Option" })] }))] }));
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: id, size: size, children: label })), _jsxs("div", { className: cx(' relative px-3 border rounded-md py-1 flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                }), style: width ? { width } : undefined, ref: elementRef, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: inputValue, onChange: handleInputChange, placeholder: focused ? '' : placeholder, className: cx('w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed', {
                            'text-14px': size === 'default',
                            'text-18px': size === 'large',
                            'py-1.5': size === 'default',
                            'py-3': size === 'large',
                        }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, ref: valueRef })), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, size: size, clearable: clearable && focused && !!value, onClear: handleClearValue, endIcon: endIcon, children: _jsx(Icon, { name: "chevron-down", size: 20, strokeWidth: 2, onClick: handleDropdown, className: cx('rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark', {
                                'cursor-not-allowed': disabled,
                                'hover:bg-neutral-30 dark:hover:bg-neutral-30-dark cursor-pointer transition-color': !disabled,
                                'rotate-180': dropdownOpen,
                            }) }) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true, children: dropdownContent })] }));
};
export default AutoComplete;
