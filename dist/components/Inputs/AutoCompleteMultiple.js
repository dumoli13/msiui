import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Tag from '../Displays/Tag';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 *
 * @property {SelectValue<T, D>[]} [value] - The controlled value of the multi-select input. An array of selected options.
 * @property {T[]} [defaultValue=[]] - The initial selected values in an uncontrolled state (defaults to empty array).
 * @property {(value: SelectValue<T, D>[]) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<AutoCompleteMultipleRef<T>>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
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
 *
 */
const AutoCompleteMultiple = (_a) => {
    var { id, value: valueProp, defaultValue = [], label, labelPosition = 'top', autoHideLabel = false, placeholder = '', options, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "placeholder", "options", "onChange", "className", "helperText", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "error", "success", "loading", "clearable", "width"]);
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(options.filter((item) => defaultValue.includes(item.value)) || []);
    React.useEffect(() => {
        setInternalValue(options.filter((item) => defaultValue.includes(item.value)) || []);
    }, [options]);
    const isControlled = valueProp !== undefined;
    const value = valueProp !== null && valueProp !== void 0 ? valueProp : internalValue; // Default to internal state if undefined
    const [inputValue, setInputValue] = React.useState('');
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
            setInternalValue(options.filter((item) => defaultValue.includes(item.value)) || []);
        },
    }));
    const [filteredOptions, setFilteredOptions] = React.useState([]);
    React.useEffect(() => {
        const filtered = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredOptions(filtered);
    }, [inputValue, options, value]);
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            var _a, _b;
            const target = event.target;
            const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(target);
            const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(target);
            if (!dropdownContainsTarget && !selectElementContainsTarget) {
                setDropdownOpen(false);
                setFocused(false); // Add this line to ensure 'focused' is set to false
            }
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
    };
    const handleClearValue = () => {
        setDropdownOpen(true);
        onChange === null || onChange === void 0 ? void 0 : onChange([]); // Clear with an empty array
        if (!isControlled)
            setInternalValue([]); // Update internal state if uncontrolled
    };
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };
    const handleOptionSelect = (option) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newValue = [...(value || []), option];
        setInputValue('');
        if (!isControlled)
            setInternalValue(newValue); // Update internal state if uncontrolled
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    const handleRemoveSelected = (option) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newValue = value.filter((v) => v.value !== option.value);
        if (!isControlled)
            setInternalValue(newValue);
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    const dropdownContent = (_jsxs(_Fragment, { children: [filteredOptions.map((option) => {
                const selected = value === null || value === void 0 ? void 0 : value.some((v) => v.value === option.value);
                return selected ? (_jsxs("div", { role: "button", onMouseDown: handleRemoveSelected(option), className: cx('cursor-pointer py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words flex items-center justify-between gap-2.5 bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark', {
                        'text-14px': size === 'default',
                        'text-18px': size === 'large',
                    }), children: [_jsx("span", { children: option.label }), _jsx(Icon, { name: "check", size: 10, strokeWidth: 3, className: "text-primary-main dark:text-primary-main-dark" })] }, String(option.value))) : (_jsx("div", { role: "button", onMouseDown: handleOptionSelect(option), className: cx('cursor-pointer py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words text-neutral-100 dark:text-neutral-100-dark', {
                        'text-14px': size === 'default',
                        'text-18px': size === 'large',
                    }), children: option.label }, String(option.value)));
            }), filteredOptions.length === 0 && (_jsxs("div", { className: "flex flex-col items-center gap-4 text center text-neutral-60 text-16px dark:text-neutral-60-dark", children: [_jsx("div", { className: "h-12 w-12 bg-neutral-60 dark:bg-neutral-60-dark flex items-center justify-center rounded-full text-neutral-10 dark:text-neutral-10-dark text-36px font-semibold mt-1", children: "!" }), _jsx("div", { children: "Empty Option" })] }))] }));
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: id, size: size, children: label })), _jsxs("div", { className: cx('relative px-3 border rounded-md py-1 flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                }), style: width ? { width } : undefined, ref: elementRef, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsxs("div", { className: cx('flex flex-1 gap-x-2 gap-y-1 items-center flex-wrap', {
                            'w-full': fullWidth,
                        }), children: [value === null || value === void 0 ? void 0 : value.map((selected) => (_jsx(Tag, { color: "info", children: selected.label }, String(selected.value)))), _jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: inputValue, onChange: handleInputChange, placeholder: focused ? '' : placeholder, className: cx('flex-grow outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed', {
                                    'text-14px py-1.5</CookiesProvider>': size === 'default',
                                    'text-18px py-3': size === 'large',
                                }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus }))] }), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, size: size, clearable: clearable && focused && !!value, onClear: handleClearValue, endIcon: endIcon, children: _jsx(Icon, { name: "chevron-down", size: 20, strokeWidth: 2, onClick: handleDropdown, className: cx('rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark', {
                                'cursor-not-allowed': disabled,
                                'hover:bg-neutral-30 dark:hover:bg-neutral-30-dark cursor-pointer transition-color': !disabled,
                                'rotate-180': dropdownOpen,
                            }) }) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true, children: dropdownContent })] }));
};
export default AutoCompleteMultiple;
