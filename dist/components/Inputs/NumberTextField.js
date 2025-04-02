import { __rest } from "tslib";
import React from 'react';
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
 * @property {RefObject<NumberTextfieldRef> | React.RefCallback<NumberTextfieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 */
const NumberTextField = (_a) => {
    var { id, value: valueProp, defaultValue = valueProp, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = '', disabled: disabledProp = false, fullWidth, startIcon, endIcon, clearable = false, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "startIcon", "endIcon", "clearable", "inputRef", "size", "error", "success", "loading", "width"]);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue !== undefined ? defaultValue : null);
    const [internalStringValue, setInternalStringValue] = React.useState((defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString()) || '');
    const isControlled = valueProp !== undefined;
    // Sync `internalStringValue` with `valueProp` when `valueProp` changes
    React.useEffect(() => {
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
    const disabled = loading || disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalValue(defaultValue !== undefined ? defaultValue : null);
            setInternalStringValue((defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString()) || '');
            onChange === null || onChange === void 0 ? void 0 : onChange(defaultValue !== undefined ? defaultValue : null);
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
        onChange === null || onChange === void 0 ? void 0 : onChange(null);
        if (!isControlled) {
            setInternalValue(null);
        }
        setInternalStringValue('');
    };
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
            }), style: width ? { width } : undefined },
            !!startIcon && (React.createElement("div", { className: "text-neutral-70 dark:text-neutral-70-dark" }, startIcon)),
            React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: displayValue, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: handleFocus, onBlur: () => setFocused(false), ref: elementRef, className: cx('w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed', {
                    'text-14px py-1.5': size === 'default',
                    'text-18px py-3': size === 'large',
                }), disabled: disabled, autoComplete: "off" })),
            React.createElement("div", { className: cx('flex gap-1 items-center', {
                    'text-16px': size === 'default',
                    'text-20px': size === 'large',
                }) },
                clearable && focused && !!value && (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark p-0.5 text-neutral-70 dark:text-neutral-70-dark transition-color" },
                    React.createElement(Icon, { name: "x-mark", strokeWidth: 4 }))),
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
            }) }, helperMessage))));
};
export default NumberTextField;
