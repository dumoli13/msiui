import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import InputEndIconWrapper from '../Displays/InputEndIconWrapper';
import InputHelper from '../Displays/InputHelper';
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
 *
 * @property {number | null} [value] - The current value of the number field, passed from the parent component.
 * @property {number | null} [defaultValue] - The initial value of the number field when the component is uncontrolled.
 * @property {(value: number | null) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<NumberTextfieldRef> | React.RefCallback<NumberTextfieldRef>} [inputRef] - A reference to access the input field and its value programmatically.
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
 *
 */
const NumberTextField = (_a) => {
    var _b;
    var { id, value: valueProp, defaultValue = valueProp, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = '', disabled: disabledProp = false, fullWidth, startIcon, endIcon, clearable = false, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "startIcon", "endIcon", "clearable", "inputRef", "size", "error", "success", "loading", "width"]);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue !== undefined ? defaultValue : null);
    const [internalStringValue, setInternalStringValue] = React.useState((_b = defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString()) !== null && _b !== void 0 ? _b : '');
    const isControlled = valueProp !== undefined;
    // Sync `internalStringValue` with `valueProp` when `valueProp` changes
    React.useEffect(() => {
        var _a;
        if (isControlled) {
            setInternalStringValue((_a = valueProp === null || valueProp === void 0 ? void 0 : valueProp.toString()) !== null && _a !== void 0 ? _a : '');
        }
    }, [valueProp, isControlled]);
    const value = isControlled ? valueProp : internalValue;
    const displayValue = focused
        ? internalStringValue
        : isControlled
            ? value || ''
            : formatValue(internalStringValue);
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            var _a;
            setInternalValue(defaultValue !== undefined ? defaultValue : null);
            setInternalStringValue((_a = defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString()) !== null && _a !== void 0 ? _a : '');
            onChange === null || onChange === void 0 ? void 0 : onChange(defaultValue !== undefined ? defaultValue : null);
        },
    }));
    const handleFocus = () => {
        var _a;
        if (isControlled) {
            setInternalStringValue((_a = valueProp === null || valueProp === void 0 ? void 0 : valueProp.toString()) !== null && _a !== void 0 ? _a : '');
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
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx("label", { htmlFor: id, className: cx('shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1', {
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                }), children: label })), _jsxs("div", { className: cx('relative px-3 border rounded-md py-1 flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                }), style: width ? { width } : undefined, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: displayValue, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: handleFocus, onBlur: () => setFocused(false), ref: elementRef, className: cx('w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed', {
                            'text-14px py-1.5': size === 'default',
                            'text-18px py-3': size === 'large',
                        }), disabled: disabled, autoComplete: "off" })), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, size: size, clearable: clearable && focused && !!value, onClear: handleClearValue, endIcon: endIcon })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
export default NumberTextField;
