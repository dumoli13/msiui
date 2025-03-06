import { __rest } from "tslib";
import React, { useEffect, useImperativeHandle, useRef, useState, } from 'react';
import cx from 'classnames';
import Icon from '../Icon';
const formatValue = (value) => {
    if (value === '' || value === null || value === undefined) {
        return '';
    }
    const numberValue = Number(value);
    if (isNaN(numberValue))
        return value.toString(); // In case it's not a valid number
    // Format number with thousand separators
    return numberValue.toLocaleString('en-US');
};
/**
 * NumberTextField Component
 *
 * A customizable input field designed for numeric values. This component formats and displays numbers with thousand separators, and it supports various features including label positioning, value clearing, validation feedback, and more.
 *
 * @property {number | null} [value] - The current value of the number field, passed from the parent component.
 * @property {number | null} [defaultValue] - The initial value of the number field when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should hide when the user starts typing.
 * @property {(value: number | null) => void} [onChange] - Callback function when the number value changes.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed when no value is entered.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {boolean} [clearable=false] - If `true`, a clear button will appear when the field is focused and has a value.
 * @property {RefObject<NumberTextfieldRef> | RefCallback<NumberTextfieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 */
const NumberTextField = (_a) => {
    var { id, value: valueProp, defaultValue = valueProp, label, labelPosition = 'top', onChange, className, helperText, placeholder = '', disabled = false, fullWidth, startIcon, endIcon, clearable = false, inputRef, size = 'default', error: errorProp, success: successProp, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "startIcon", "endIcon", "clearable", "inputRef", "size", "error", "success", "width"]);
    const elementRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue !== undefined ? defaultValue : null);
    const [internalStringValue, setInternalStringValue] = useState((defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString()) || '');
    const isControlled = valueProp !== undefined;
    // Sync `internalStringValue` with `valueProp` when `valueProp` changes
    useEffect(() => {
        if (isControlled) {
            setInternalStringValue((valueProp === null || valueProp === void 0 ? void 0 : valueProp.toString()) || '');
        }
    }, [valueProp, isControlled]);
    const value = isControlled ? valueProp : internalValue;
    const displayValue = focused
        ? internalStringValue
        : isControlled
            ? value === null
                ? ''
                : value
            : formatValue(internalStringValue);
    const helperMessage = errorProp || helperText;
    const isError = errorProp;
    useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalValue(null);
        },
    }));
    const handleFocus = () => {
        if (isControlled) {
            setInternalStringValue((valueProp === null || valueProp === void 0 ? void 0 : valueProp.toString()) || '');
        }
        setFocused(true);
    };
    const handleChange = (e) => {
        const inputValue = e.target.value;
        const decimalRegex = /^-?\d*\.?\d*$/;
        // Allow decimal numbers and dot input
        if (decimalRegex.test(inputValue)) {
            setInternalStringValue(inputValue);
            // Only convert to number if input is not "-" or "."
            const newValue = inputValue === '' || inputValue === '.' || inputValue === '-'
                ? null
                : Number(inputValue);
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
            if (!isControlled) {
                setInternalValue(newValue);
            }
        }
    };
    const handleClearValue = (e) => {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        if (onChange) {
            onChange(null);
        }
        if (!isControlled) {
            setInternalValue(null);
        }
        setInternalStringValue('');
    };
    return (React.createElement("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className) },
        label && (React.createElement("label", { htmlFor: id, className: cx('block text-left text-neutral-80 mb-1', {
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
            }), style: width ? { width } : undefined },
            startIcon && React.createElement("div", { className: "text-neutral-70" }, startIcon),
            React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: displayValue, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: handleFocus, onBlur: () => setFocused(false), ref: elementRef, className: cx('w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed', {
                    'text-16px': size === 'default',
                    'text-18px': size === 'large',
                    'py-1.5': size === 'default',
                    'py-[12.5px]': size === 'large',
                }), disabled: disabled, autoComplete: "off" })),
            clearable && focused && !!value && (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 p-0.5 text-neutral-70 transition-color" },
                React.createElement(Icon, { name: "x-mark", size: 16, strokeWidth: 2 }))),
            successProp && (React.createElement("div", { className: "rounded-full bg-success-main p-0.5 text-neutral-10" },
                React.createElement(Icon, { name: "check", size: 10, strokeWidth: 3 }))),
            isError && (React.createElement("div", { className: "rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center shrink-0" }, "!")),
            endIcon && React.createElement("div", { className: "text-neutral-70" }, endIcon)),
        helperMessage && (React.createElement("div", { className: `w-full text-left mt-1 text-12px ${isError ? 'text-danger-main' : 'text-neutral-60'}` }, helperMessage))));
};
export default NumberTextField;
//# sourceMappingURL=NumberTextField.js.map