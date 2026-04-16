import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import InputBase from './InputBase';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
const formatValue = (value) => {
    if (value === '' || value === null || value === undefined)
        return '';
    const str = value.toString();
    const [int, dec] = str.split('.');
    if (!int || int === '-')
        return str;
    const formattedInt = Number(int).toLocaleString('en-US');
    return dec !== undefined ? `${formattedInt}.${dec}` : formattedInt;
};
/**
 * The Number Text Field component is used for collecting numeric data from users.
 * Formats thousand separators on blur.
 */
const NumberTextField = ({ id, name, value: valueProp, defaultValue, initialValue = null, label, labelPosition = 'top', autoHideLabel = false, placeholder, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width, max, min, required, ...props }) => {
    const generatedId = React.useId();
    const containerRef = React.useRef(null);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(() => {
        let initialVal = defaultValue ?? initialValue;
        if (initialVal !== null) {
            if (min !== undefined && initialVal < min)
                initialVal = min;
            else if (max !== undefined && initialVal > max)
                initialVal = max;
        }
        return initialVal;
    });
    const [internalStringValue, setInternalStringValue] = React.useState(internalValue?.toString() ?? '');
    const [internalError, setInternalError] = React.useState('');
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    // Keep displayed string in sync with controlled value
    React.useEffect(() => {
        if (isControlled)
            setInternalStringValue(valueProp?.toString() ?? '');
    }, [valueProp, isControlled]);
    const formattedSource = isControlled ? value : internalStringValue;
    const displayValue = focused
        ? internalStringValue
        : formatValue(formattedSource);
    const isError = !!(errorProp || internalError);
    const disabled = loading || disabledProp;
    const inputId = id ?? `numbertextfield-${name ?? generatedId}`;
    const inputElementId = `${inputId}-input`;
    const helperId = `${inputId}-helper`;
    const helperMessage = isError && typeof errorProp === 'string'
        ? errorProp
        : internalError || helperText;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => elementRef.current?.focus(),
        reset: () => {
            setInternalValue(initialValue);
            setInternalStringValue(initialValue?.toString() ?? '');
        },
        disabled,
    }));
    const handleFocus = (event) => {
        if (isControlled)
            setInternalStringValue(valueProp?.toString() ?? '');
        setFocused(true);
        props.onFocus?.(event);
    };
    const handleBlur = (event) => {
        if (containerRef.current?.contains(event.relatedTarget))
            return;
        if (!isControlled) {
            let clamped = internalValue;
            if (internalValue !== null) {
                if (min !== undefined && internalValue < min) {
                    clamped = min;
                    setInternalStringValue(min.toString());
                }
                else if (max !== undefined && internalValue > max) {
                    clamped = max;
                    setInternalStringValue(max.toString());
                }
            }
            setInternalValue(clamped);
        }
        setFocused(false);
        props.onBlur?.(event);
    };
    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue !== '' && !/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(inputValue))
            return;
        setInternalStringValue(inputValue);
        let newValue = null;
        if (inputValue !== '' && inputValue !== '-' && inputValue !== '.') {
            const parsed = Number(inputValue);
            if (!Number.isNaN(parsed))
                newValue = parsed;
        }
        let constrained = newValue;
        if (newValue !== null) {
            if (min !== undefined && newValue < min) {
                constrained = min;
                setInternalError(`Must be at least ${min}`);
            }
            else if (max !== undefined && newValue > max) {
                constrained = max;
                setInternalError(`Must be no more than ${max}`);
            }
            else if (internalError) {
                setInternalError('');
            }
        }
        if (!isControlled)
            setInternalValue(constrained);
        onChange?.(constrained);
    };
    const handleClear = () => {
        onChange?.(null);
        if (!isControlled)
            setInternalValue(null);
        setInternalStringValue('');
        elementRef.current?.focus();
    };
    return (_jsxs("div", { id: inputId, className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [label && (!autoHideLabel || focused) && (_jsx(InputLabel, { id: inputElementId, size: size, required: required, children: label })), _jsx(InputBase, { focused: focused, error: isError, success: successProp, disabled: disabled, size: size, width: width, fullWidth: fullWidth, startIcon: startIcon, containerRef: containerRef, endIcons: _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && value !== null && value !== undefined, onClear: handleClear, endIcon: endIcon }), children: _jsx("input", { ...props, id: inputElementId, name: name, value: displayValue, placeholder: placeholder, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, disabled: disabled, "aria-invalid": isError || undefined, "aria-describedby": helperMessage ? helperId : undefined, autoComplete: "off", ref: elementRef, className: cx('w-full min-w-0 outline-none bg-transparent', 'text-neutral-90 dark:text-neutral-90-dark', 'placeholder:text-neutral-50 dark:placeholder:text-neutral-50-dark', 'disabled:cursor-not-allowed', {
                        'text-14px py-0.5': size === 'default',
                        'text-18px py-0.5': size === 'large',
                    }) }) }), _jsx(InputHelper, { id: helperMessage ? helperId : undefined, message: helperMessage, error: isError, size: size })] }));
};
NumberTextField.isFormInput = true;
export default NumberTextField;
