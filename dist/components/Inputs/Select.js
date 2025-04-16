import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
/**
 *
 * A customizable dropdown select component that allows users to choose an option from a list.
 *
 * @property {SelectValue<T, D> | null} [value] - The currently selected value, passed from the parent component.
 * @property {SelectValue<T, D> | null} [defaultValue] - The initial selected value when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
 * @property {string} [placeholder] - Placeholder text to show when no option is selected.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function when an option is selected or cleared.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<SelectRef<T>> | React.RefCallback<SelectRef<T>>} [inputRef] - A ref that allows direct access to the select element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {boolean} [clearable=false] - Whether the input has a clear button to remove selected values.
 * @property {number} [width] - Optional custom width for the input field.
 *
 */
const Select = ({ id, value: valueProp, defaultValue, label, labelPosition = 'top', autoHideLabel = false, placeholder = '', options, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width, }) => {
    var _a;
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
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
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
            setInternalValue(options.find((item) => item.value === defaultValue) || null);
        },
    }));
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
        options.map((option) => (React.createElement("div", { role: "button", key: String(option.value), onMouseDown: handleOptionSelect(option), className: cx('py-1.5 px-4 text-left break-words', {
                'bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark': option.value === (value === null || value === void 0 ? void 0 : value.value),
                'cursor-pointer hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': option.value !== (value === null || value === void 0 ? void 0 : value.value),
                'text-14px': size === 'default',
                'text-18px': size === 'large',
            }) }, option.label))),
        options.length === 0 && (React.createElement("div", { className: "flex flex-col items-center gap-4 text center text-neutral-60 dark:text-neutral-60-dark text-16px" },
            React.createElement("div", { className: "h-12 w-12 bg-neutral-60 dark:bg-neutral-60-dark flex items-center justify-center rounded-full text-neutral-10 dark:text-neutral-10-dark text-36px font-semibold mt-1" }, "!"),
            React.createElement("div", null, "Empty Option")))));
    return (React.createElement("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className) },
        ((autoHideLabel && focused) || !autoHideLabel) && label && (React.createElement("label", { htmlFor: id, className: cx('shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1 font-medium', {
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
            }), ref: elementRef, style: width ? { width } : undefined },
            !!startIcon && (React.createElement("div", { className: "text-neutral-70 dark:text-neutral-70-dark" }, startIcon)),
            React.createElement("div", { role: "button", tabIndex: !disabled ? 0 : -1, "aria-pressed": "true", className: cx('w-full outline-none truncate', {
                    'text-14px h-[32px]': size === 'default',
                    'text-18px h-[44px]': size === 'large',
                    'py-1.5': size === 'default',
                    'py-3': size === 'large',
                    'text-neutral-60 dark:text-neutral-60-dark': !value || !value.label,
                    '!bg-neutral-20 dark:!bg-neutral-30-dark cursor-not-allowed truncate': disabled,
                }), onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, ref: valueRef }, (_a = value === null || value === void 0 ? void 0 : value.label) !== null && _a !== void 0 ? _a : placeholder),
            React.createElement("div", { className: cx('flex gap-1 items-center', {
                    'text-16px': size === 'default',
                    'text-20px': size === 'large',
                }) },
                clearable && focused && !!value && (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark p-0.5 text-neutral-70 dark:text-neutral-70-dark transition-color" },
                    React.createElement(Icon, { name: "x-mark", strokeWidth: 4 }))),
                React.createElement("div", { title: "Open", role: "button", onClick: handleDropdown, className: cx('rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark', {
                        'cursor-not-allowed': disabled,
                        'hover:bg-neutral-30 dark:hover:bg-neutral-30-dark cursor-pointer transition-color': !disabled,
                        'rotate-180': dropdownOpen,
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
        helperMessage && (React.createElement("div", { className: cx('w-full text-left mt-1', {
                'text-danger-main dark:text-danger-main-dark': isError,
                'text-neutral-60 dark:text-neutral-60-dark': !isError,
                'text-12px': size === 'default',
                'text-16px': size === 'large',
            }) }, helperMessage)),
        React.createElement(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true }, dropdownContent)));
};
export default Select;
//# sourceMappingURL=Select.js.map