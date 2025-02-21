import React, { useEffect, useImperativeHandle, useRef, useState, } from 'react';
import cx from 'classnames';
import { Check, ChevronDown, Loader, X } from 'react-feather';
import InputDropdown from './InputDropdown';
/**
 * Select Component
 *
 * A customizable dropdown select component that allows users to choose an option from a list.
 * It supports various features including label positioning, loading state, validation feedback, and dropdown management.
 *
 * @property {SelectValue<T, D> | null} [value] - The currently selected value, passed from the parent component.
 * @property {SelectValue<T, D> | null} [defaultValue] - The initial selected value when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {string} [placeholder] - Placeholder text to show when no option is selected.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function when an option is selected or cleared.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [icon] - An optional icon displayed inside the dropdown.
 * @property {RefObject<SelectRef<T>> | RefCallback<SelectRef<T>>} [inputRef] - A ref that allows direct access to the select element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <Select
 *   value={selectedOption}
 *   onChange={handleSelectChange}
 *   options={options}
 *   label="Select a Country"
 *   placeholder="Choose an option"
 *   size="large"
 *   loading={isLoading}
 *   error="Something went wrong"
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered Select component.
 */
const Select = ({ id, value: valueProp, defaultValue, label, labelPosition = 'top', placeholder = '', options, onChange, className, helperText, disabled = false, fullWidth, icon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, width, }) => {
    const elementRef = useRef(null);
    const valueRef = useRef(null);
    const dropdownRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || null);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
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
        setDropdownOpen((prev) => !prev);
    };
    const handleOptionSelect = (option) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isControlled)
            setInternalValue(option);
        setDropdownOpen(false);
        if (onChange)
            onChange(option);
    };
    const handleClearValue = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDropdownOpen(true);
        onChange === null || onChange === void 0 ? void 0 : onChange(null);
        if (!isControlled)
            setInternalValue(null);
    };
    const dropdownContent = (React.createElement(React.Fragment, null,
        options.map((option) => (React.createElement("div", { role: "button", key: String(option.value), onMouseDown: handleOptionSelect(option), className: cx('cursor-pointer py-1.5 px-4 hover:bg-neutral-20 text-left break-words', {
                'bg-info-border text-neutral-90': option.value === (value === null || value === void 0 ? void 0 : value.value),
                'text-16px': size === 'default',
                'text-18px': size === 'large',
            }) }, option.label))),
        options.length === 0 && (React.createElement("div", { className: "flex flex-col items-center gap-4 text center text-neutral-60 text-16px" },
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
            }), ref: elementRef, style: width ? { width } : undefined },
            icon,
            React.createElement("div", { role: "button", tabIndex: !disabled ? 0 : -1, "aria-pressed": "true", className: cx('w-full outline-none truncate', {
                    'text-16px': size === 'default',
                    'text-18px': size === 'large',
                    'py-1.5': size === 'default',
                    'py-[12.5px]': size === 'large',
                    'text-neutral-60': !value || !value.label,
                    'bg-neutral-20 cursor-not-allowed truncate': disabled,
                }), onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, ref: valueRef }, (value === null || value === void 0 ? void 0 : value.label) || placeholder),
            React.createElement("div", { className: "flex gap-0.5 items-center" },
                focused && !!value && (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 p-0.5 text-neutral-70 transition-color" },
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
                isError && (React.createElement("div", { className: "rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center" }, "!")))),
        helperMessage && (React.createElement("div", { className: `w-full text-left mt-1 text-12px ${isError ? 'text-danger-main' : 'text-neutral-60'}` }, helperMessage)),
        React.createElement(InputDropdown, { open: isDropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true }, dropdownContent)));
};
export default Select;
//# sourceMappingURL=Select.js.map