import { __rest } from "tslib";
import React from 'react';
import cx from 'classnames';
import Tag from '../Displays/Tag';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
/**
 *
 * A multi-select input component that allows users to select multiple values from a list of options with autocomplete functionality.
 *
 * @property {SelectValue<T, D>[]} [value] - The controlled value of the multi-select input. An array of selected options.
 * @property {T[]} [defaultValue=[]] - The initial selected values in an uncontrolled state (defaults to empty array).
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
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
 * @property {boolean} [clearable=false] - Whether the input has a clear button to remove selected values.
 * @property {number} [width] - Optional custom width for the input field.
 *
 */
const AutoCompleteMultiple = (_a) => {
    var { id, value: valueProp, defaultValue = [], label, labelPosition = 'top', autoHideLabel = false, placeholder = '', options, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "placeholder", "options", "onChange", "className", "helperText", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "error", "success", "loading", "clearable", "width"]);
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [isDropdownOpen, setDropdownOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(options.filter((item) => defaultValue.includes(item.value)) || []);
    React.useEffect(() => {
        setInternalValue(options.filter((item) => defaultValue.includes(item.value)) || []);
    }, [options]);
    const isControlled = valueProp !== undefined;
    const value = valueProp !== null && valueProp !== void 0 ? valueProp : internalValue; // Default to internal state if undefined
    const [inputValue, setInputValue] = React.useState('');
    const helperMessage = errorProp || helperText;
    const isError = errorProp;
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
            return selected ? (React.createElement("div", { role: "button", key: String(option.value), onMouseDown: handleRemoveSelected(option), className: cx('cursor-pointer py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words flex items-center justify-between gap-2.5 bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark', {
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                }) },
                React.createElement("span", null, option.label),
                React.createElement(Icon, { name: "check", size: 10, strokeWidth: 3, className: "text-primary-main dark:text-primary-main-dark" }))) : (React.createElement("div", { role: "button", key: String(option.value), onMouseDown: handleOptionSelect(option), className: cx('cursor-pointer py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words text-neutral-100 dark:text-neutral-100-dark', {
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                }) }, option.label));
        }),
        filteredOptions.length === 0 && (React.createElement("div", { className: "flex flex-col items-center gap-4 text center text-neutral-60 text-16px dark:text-neutral-60-dark" },
            React.createElement("div", { className: "h-12 w-12 bg-neutral-60 dark:bg-neutral-60-dark flex items-center justify-center rounded-full text-neutral-10 dark:text-neutral-10-dark text-36px font-semibold mt-1" }, "!"),
            React.createElement("div", null, "Empty Option")))));
    return (React.createElement("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className) },
        ((autoHideLabel && focused) || !autoHideLabel) && label && (React.createElement("label", { htmlFor: id, className: cx('shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1', {
                'text-14px': size === 'default',
                'text-18px': size === 'large',
            }) }, label)),
        React.createElement("div", { className: cx('relative px-3 border rounded-md py-1 flex gap-2 items-center', {
                'w-full': fullWidth,
                'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
            }), style: width ? { width } : undefined, ref: elementRef },
            !!startIcon && (React.createElement("div", { className: "text-neutral-70 dark:text-neutral-70-dark" }, startIcon)),
            React.createElement("div", { className: cx('flex flex-wrap gap-2 items-center w-full', {
                    'w-full': fullWidth,
                }) }, value === null || value === void 0 ? void 0 :
                value.map((selected) => (React.createElement(Tag, { key: String(selected.value), color: "info" }, selected.label))),
                React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: inputValue, onChange: handleInputChange, placeholder: focused ? '' : placeholder, className: cx('flex-grow outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed', {
                        'text-14px py-1.5': size === 'default',
                        'text-18px py-3': size === 'large',
                    }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus }))),
            React.createElement("div", { className: cx('flex gap-1 items-center', {
                    'text-16px': size === 'default',
                    'text-20px': size === 'large',
                }) },
                clearable && focused && !!value && (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark p-0.5 text-neutral-70 dark:text-neutral-70-dark transition-color" },
                    React.createElement(Icon, { name: "x-mark", strokeWidth: 4 }))),
                React.createElement("div", { title: "Open", role: "button", onClick: handleDropdown, className: cx('rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark', {
                        'cursor-not-allowed': disabled,
                        'hover:bg-neutral-30 dark:hover:bg-neutral-30-dark cursor-pointer transition-color': !disabled,
                        'rotate-180': isDropdownOpen,
                    }) },
                    React.createElement(Icon, { name: "chevron-down", size: 16, strokeWidth: 2 })),
                loading && (React.createElement("div", { className: "text-neutral-70 dark:text-neutral-70-dark" },
                    React.createElement(Icon, { name: "loader", animation: "spin", strokeWidth: 2 }))),
                successProp && (React.createElement("div", { className: cx('shrink-0 rounded-full bg-success-main dark:bg-success-main-dark text-neutral-10 dark:text-neutral-10-dark flex items-center justify-center', {
                        'h-4 w-4 text-12px': size === 'default',
                        'h-5 w-5 text-16px': size === 'large',
                    }) },
                    React.createElement(Icon, { name: "check", strokeWidth: 3 }))),
                isError && (React.createElement("div", { className: cx('shrink-0 rounded-full bg-danger-main dark:bg-danger-main-dark text-neutral-10 dark:text-neutral-10-dark font-bold flex items-center justify-center', {
                        'h-4 w-4 text-12px': size === 'default',
                        'h-5 w-5 text-16px': size === 'large',
                    }) }, "!")),
                !!endIcon && (React.createElement("div", { className: cx('text-neutral-70 dark:text-neutral-70-dark') }, endIcon)))),
        helperMessage && (React.createElement("div", { className: cx('w-full text-left mt-1 ', {
                'text-danger-main dark:text-danger-main-dark': isError,
                'text-neutral-60 dark:text-neutral-60-dark': !isError,
                'text-12px': size === 'default',
                'text-16px': size === 'large',
            }) }, helperMessage)),
        React.createElement(InputDropdown, { open: isDropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true }, dropdownContent)));
};
export default AutoCompleteMultiple;
