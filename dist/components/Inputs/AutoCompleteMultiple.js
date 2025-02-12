var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useImperativeHandle, useRef, useState, } from 'react';
import cx from 'classnames';
import { Check, ChevronDown, Loader, X } from 'react-feather';
import Tag from '../Displays/Tag';
import InputDropdown from './InputDropdown';
/**
 * AutoCompleteMultiple Component
 *
 * A multi-select input component that allows users to select multiple values from a list of options with autocomplete functionality.
 * It supports both controlled and uncontrolled states, displaying selected options as tags, and allows filtering options as users type.
 * The component includes support for custom icons, clearable values, loading state, and error messages.
 *
 * @property {SelectValue<T, D>[]} [value] - The controlled value of the multi-select input. An array of selected options.
 * @property {T[]} [defaultValue=[]] - The initial selected values in an uncontrolled state (defaults to empty array).
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {string} [placeholder=''] - Placeholder text displayed in the input when it’s empty.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D>[]) => void} [onChange] - Callback function invoked when the selected values change.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<AutoCompleteMultipleRef<T>>} [inputRef] - A reference to the input element for imperative actions like focusing.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {boolean} [isClearable=false] - Whether the input has a clear button to remove selected values.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @returns {JSX.Element} The rendered AutoCompleteMultiple component.
 *
 * @example Basic Usage:
 * ```tsx
 * const [selectedValues, setSelectedValues] = useState([]);
 *
 * <AutoCompleteMultiple
 *   label="Select Options"
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 * />
 * ```
 *
 */
const AutoCompleteMultiple = (_a) => {
    var { id, value: valueProp, defaultValue = [], label, labelPosition = 'top', placeholder = '', options, onChange, className, helperText, disabled = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, isClearable = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "placeholder", "options", "onChange", "className", "helperText", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "error", "success", "loading", "isClearable", "width"]);
    const elementRef = useRef(null);
    const valueRef = useRef(null);
    const dropdownRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(options.filter((item) => defaultValue.includes(item.value)) || []);
    useEffect(() => {
        setInternalValue(options.filter((item) => defaultValue.includes(item.value)) || []);
    }, [options]);
    const isControlled = valueProp !== undefined;
    const value = valueProp !== null && valueProp !== void 0 ? valueProp : internalValue; // Default to internal state if undefined
    const [inputValue, setInputValue] = useState('');
    const helperMessage = errorProp || helperText;
    const isError = errorProp;
    useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value: value,
        focus: () => {
            var _a;
            (_a = valueRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
    }));
    const [filteredOptions, setFilteredOptions] = useState([]);
    useEffect(() => {
        const filtered = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredOptions(filtered);
    }, [inputValue, options, value]);
    useEffect(() => {
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
    const handleClearValue = (e) => {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        e === null || e === void 0 ? void 0 : e.stopPropagation();
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
        setDropdownOpen(false);
    };
    const handleRemoveSelected = (option) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newValue = value.filter((v) => v.value !== option.value);
        if (!isControlled)
            setInternalValue(newValue);
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    const dropdownContent = (React.createElement(React.Fragment, null,
        filteredOptions.map((option) => {
            const selected = value === null || value === void 0 ? void 0 : value.some((v) => v.value === option.value);
            return selected ? (React.createElement("div", { role: "button", key: String(option.value), onMouseDown: handleRemoveSelected(option), className: cx('cursor-pointer p-4 hover:bg-neutral-20 text-left break-words flex items-center justify-between gap-2.5 bg-primary-surface text-primary-main', { 'text-14x': size === 'default', 'text-16px': size === 'large' }) },
                React.createElement("span", null, option.label),
                React.createElement(Check, { width: 10, height: 10, strokeWidth: 3, className: "text-primary-main" }))) : (React.createElement("div", { role: "button", key: String(option.value), onMouseDown: handleOptionSelect(option), className: cx('cursor-pointer p-4 hover:bg-neutral-20 text-left break-words text-neutral-100', { 'text-14x': size === 'default', 'text-16px': size === 'large' }) }, option.label));
        }),
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
            React.createElement("div", { className: cx('flex flex-wrap gap-2 items-center', {
                    'w-full': fullWidth,
                }) }, value === null || value === void 0 ? void 0 :
                value.map((selected) => (React.createElement(Tag, { key: String(selected.value), color: "info", onRemove: isControlled ? undefined : () => handleRemoveSelected(selected) }, selected.label))),
                React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: inputValue, onChange: handleInputChange, placeholder: focused ? '' : placeholder, className: cx('flex-grow outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed', {
                        'text-16px': size === 'default',
                        'text-18px': size === 'large',
                        'py-1.5': size === 'default',
                        'py-[12.5px]': size === 'large',
                    }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus }))),
            React.createElement("div", { className: "flex gap-0.5 items-center" },
                isClearable && focused && !!value && (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 p-0.5 text-neutral-70 transition-color" },
                    React.createElement(X, { width: 16, height: 16, strokeWidth: 2 }))),
                React.createElement("div", { title: "Open", role: "button", onClick: handleDropdown, className: cx('rounded-full p-0.5 text-neutral-70', {
                        'cursor-not-allowed': disabled,
                        'hover:bg-neutral-30 cursor-pointer transition-color': !disabled,
                        'rotate-180': isDropdownOpen,
                    }) },
                    React.createElement(ChevronDown, { width: 16, height: 16, strokeWidth: 2 })),
                loading && (React.createElement("div", { className: "text-neutral-70" },
                    React.createElement(Loader, { width: 16, height: 16, className: "animate-spin" }))),
                successProp && (React.createElement("div", { className: "rounded-full bg-success-main p-0.5 text-neutral-10" },
                    React.createElement(Check, { width: 10, height: 10, strokeWidth: 3 }))),
                isError && (React.createElement("div", { className: "rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center" }, "!")),
                endIcon && React.createElement("div", { className: "text-neutral-70" }, endIcon))),
        helperMessage && (React.createElement("div", { className: cx('text-left', {
                'text-danger-main': isError,
                'text-primary-main': successProp,
                'text-12px': size === 'default',
                'text-14px': size === 'large',
            }) }, helperMessage)),
        React.createElement(InputDropdown, { open: isDropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true }, dropdownContent)));
};
export default AutoCompleteMultiple;
//# sourceMappingURL=AutoCompleteMultiple.js.map