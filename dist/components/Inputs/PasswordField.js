import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import InputBase from './InputBase';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 * The Password Field component is used for collecting sensitive data from users.
 * The user can toggle password visibility.
 */
const PasswordField = ({ id, name, value: valueProp, defaultValue, initialValue = '', label, labelPosition = 'top', autoHideLabel = false, placeholder, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width, required, ...props }) => {
    const generatedId = React.useId();
    const containerRef = React.useRef(null);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    // ?? so a falsy-but-valid defaultValue (e.g. empty string) is preserved
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? initialValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const inputId = id ?? `passwordfield-${name ?? generatedId}`;
    const inputElementId = `${inputId}-input`;
    const helperId = `${inputId}-helper`;
    const helperMessage = isError && typeof errorProp === 'string' ? errorProp : helperText;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => elementRef.current?.focus(),
        reset: () => setInternalValue(initialValue),
        disabled,
    }));
    const handleFocus = (event) => {
        setFocused(true);
        props.onFocus?.(event);
    };
    const handleBlur = (event) => {
        if (containerRef.current?.contains(event.relatedTarget))
            return;
        setFocused(false);
        props.onBlur?.(event);
    };
    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange?.(newValue);
        if (!isControlled)
            setInternalValue(newValue);
    };
    const handleClear = () => {
        onChange?.('');
        if (!isControlled)
            setInternalValue('');
        elementRef.current?.focus();
    };
    return (_jsxs("div", { id: inputId, className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [label && (!autoHideLabel || focused) && (_jsx(InputLabel, { id: inputElementId, size: size, required: required, children: label })), _jsx(InputBase, { focused: focused, error: isError, success: successProp, disabled: disabled, size: size, width: width, fullWidth: fullWidth, startIcon: startIcon, containerRef: containerRef, endIcons: _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && !!value, onClear: handleClear, endIcon: endIcon, children: _jsx("button", { type: "button", "aria-label": showPassword ? 'Hide password' : 'Show password', onMouseDown: (e) => e.preventDefault(), onClick: () => setShowPassword((prev) => !prev), className: "rounded-full p-1 text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark transition-colors duration-150", children: _jsx(Icon, { name: showPassword ? 'eye' : 'eye-slash', size: 18, strokeWidth: 2 }) }) }), children: _jsx("input", { ...props, id: inputElementId, name: name, value: value, placeholder: placeholder, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, disabled: disabled, "aria-invalid": isError || undefined, "aria-describedby": helperMessage ? helperId : undefined, type: showPassword ? 'text' : 'password', ref: elementRef, className: cx('w-full min-w-0 outline-none bg-transparent', 'text-neutral-90 dark:text-neutral-90-dark', 'placeholder:text-neutral-50 dark:placeholder:text-neutral-50-dark', 'disabled:cursor-not-allowed', {
                        'text-14px py-0.5': size === 'default',
                        'text-18px py-0.5': size === 'large',
                    }) }) }), _jsx(InputHelper, { id: helperMessage ? helperId : undefined, message: helperMessage, error: isError, size: size })] }));
};
PasswordField.isFormInput = true;
export default PasswordField;
