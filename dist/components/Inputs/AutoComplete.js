import { __rest } from "tslib";
import React, { useEffect, useImperativeHandle, useRef, useState, } from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
/**
 *
 * A customizable input component that allows users to search through a list of options and select one.
 * It supports both controlled and uncontrolled states, offers an interactive dropdown with filtering options,
 * and includes features like custom icons, error handling, and loading states.
 *
 * @property {SelectValue<T, D> | null} value - The currently selected value, if any. If controlled, this prop is required.
 * @property {T | null} defaultValue - The default value for the input. Used in uncontrolled mode.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {string} [placeholder=''] - Placeholder text displayed in the input when it’s empty.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function when an option is selected or cleared.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<AutoCompleteRef<T>> | RefCallback<AutoCompleteRef<T>>} [inputRef] - A ref to access the input field and its value programmatically.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 *
 */
const AutoComplete = (_a) => {
    var { id, value: valueProp, defaultValue, label, labelPosition = 'top', placeholder = '', options, onChange, className, helperText, disabled = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "placeholder", "options", "onChange", "className", "helperText", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "error", "success", "loading", "width"]);
    const elementRef = useRef(null);
    const valueRef = useRef(null);
    const dropdownRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(options.find((item) => item.value === defaultValue) || null);
    useEffect(() => {
        setInternalValue(options.find((item) => item.value === defaultValue) || null);
    }, [options]);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const [inputValue, setInputValue] = useState((value === null || value === void 0 ? void 0 : value.label) || '');
    const helperMessage = errorProp || helperText;
    const isError = errorProp;
    useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value: value,
        focus: () => {
            var _a;
            (_a = valueRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalValue(null);
        },
    }));
    const [filteredOptions, setFilteredOptions] = useState([]);
    useEffect(() => {
        setInputValue((value === null || value === void 0 ? void 0 : value.label) || '');
    }, [value]);
    useEffect(() => {
        const filtered = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredOptions(filtered);
    }, [inputValue, options]);
    useEffect(() => {
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
    const handleClearValue = (e) => {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        e === null || e === void 0 ? void 0 : e.stopPropagation();
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
    const handleOptionSelect = (option) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInputValue(option.label);
        if (!isControlled)
            setInternalValue(option);
        setDropdownOpen(false);
        if (onChange)
            onChange(option);
    };
    const dropdownContent = (React.createElement(React.Fragment, null,
        filteredOptions.map((option) => (React.createElement("div", { role: "button", key: String(option.value), onMouseDown: handleOptionSelect(option), className: cx('cursor-pointer p-4 hover:bg-neutral-20 text-left break-words', {
                'bg-info-border text-neutral-90': option.value === (value === null || value === void 0 ? void 0 : value.value),
                'text-16px': size === 'default',
                'text-18px': size === 'large',
            }) }, option.label))),
        filteredOptions.length === 0 && (React.createElement("div", { className: "flex flex-col items-center gap-4 text center text-neutral-60 text-16px" },
            React.createElement("div", { className: "h-12 w-12 bg-neutral-60 flex items-center justify-center rounded-full text-neutral-10 text-36px font-semibold mt-1" }, "!"),
            React.createElement("div", { className: "" }, "Empty Option")))));
    return (React.createElement("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className) },
        label && (React.createElement("label", { htmlFor: id, className: cx('block text-left text-12px text-neutral-80 mb-1', {
                'text-12px': size === 'default',
                'text-20px': size === 'large',
            }) }, label)),
        React.createElement("div", { className: cx('bg-neutral-10 relative px-4 border rounded-md py-1 flex gap-2 items-center', {
                'w-full': fullWidth,
                'border-danger-main focus:ring-danger-focus': isError,
                'border-success-main focus:ring-success-focus': !isError && successProp,
                'border-neutral-50 hover:border-primary-main focus:ring-neutral-focus': !isError && !successProp && !disabled,
                'bg-neutral-20 cursor-not-allowed text-neutral-60 hover:!border-neutral-50': disabled,
                'shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                'ring-3 ring-primary-focus !border-primary-main': focused,
            }), style: width ? { width } : undefined, ref: elementRef },
            startIcon && React.createElement("div", { className: "text-neutral-70" }, startIcon),
            React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: inputValue, onChange: handleInputChange, placeholder: focused ? '' : placeholder, className: cx('w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed', {
                    'text-16px': size === 'default',
                    'text-18px': size === 'large',
                    'py-1.5': size === 'default',
                    'py-[12.5px]': size === 'large',
                }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, ref: valueRef })),
            React.createElement("div", { className: "flex gap-0.5 items-center" },
                focused && !!value && (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 p-0.5 text-neutral-70 transition-color" },
                    React.createElement(Icon, { name: "x-mark", size: 16, strokeWidth: 2 }))),
                React.createElement("div", { title: "Open", role: "button", onClick: handleDropdown, className: cx('rounded-full p-0.5 text-neutral-70', {
                        'cursor-not-allowed': disabled,
                        'hover:bg-neutral-30 cursor-pointer transition-color': !disabled,
                        'rotate-180': isDropdownOpen,
                    }) },
                    React.createElement(Icon, { name: "chevron-down", size: 16, strokeWidth: 2 })),
                loading && (React.createElement("div", { className: "text-neutral-70" },
                    React.createElement(Icon, { name: "loader", size: 16, className: "animate-spin" }))),
                successProp && (React.createElement("div", { className: "rounded-full bg-success-main p-0.5 text-neutral-10" },
                    React.createElement(Icon, { name: "check", size: 10, strokeWidth: 3 }))),
                isError && (React.createElement("div", { className: "rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center" }, "!")),
                endIcon && React.createElement("div", { className: "text-neutral-70" }, endIcon))),
        helperMessage && (React.createElement("div", { className: `w-full text-left mt-1 text-12px ${isError ? 'text-danger-main' : 'text-neutral-60'}` }, helperMessage)),
        React.createElement(InputDropdown, { open: isDropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true }, dropdownContent)));
};
export default AutoComplete;
//# sourceMappingURL=AutoComplete.js.map