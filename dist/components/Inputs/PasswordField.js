import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 * The Password Field component is used for collecting sensitive data from users.
 * This component will hide the password input. User can toggle the visibility of the password.
 */
const PasswordField = ({ id, name, value: valueProp, defaultValue, initialValue = '', label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = '', disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', clearable = false, type, error: errorProp, success: successProp, loading = false, width, required, ...props }) => {
    const parentRef = React.useRef(null);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || initialValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const [showPassword, setShowPassword] = React.useState(false);
    const helperMessage = errorProp ?? helperText;
    const isError = !!errorProp;
    const disabled = loading ?? disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => elementRef.current?.focus(),
        reset: () => setInternalValue(initialValue),
        disabled,
    }));
    const handleFocus = () => {
        if (disabled)
            return;
        setFocused(true);
    };
    const handleBlur = (event) => {
        const relatedTarget = event.relatedTarget;
        const selectElementContainsTarget = parentRef.current?.contains(relatedTarget);
        if (selectElementContainsTarget) {
            return;
        }
        setFocused(false);
    };
    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange?.(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
    };
    const handleClearValue = () => {
        onChange?.('');
        if (!isControlled) {
            setInternalValue('');
        }
    };
    const inputId = `passwordfield-${id || name}-${React.useId()}`;
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: inputId, size: size, required: required, children: label })), _jsxs("div", { className: cx('relative px-4 border rounded-md flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-hover dark:hover:border-primary-hover-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                    'py-[3px]': size === 'default',
                    'py-[9px]': size === 'large',
                }), style: width ? { width } : undefined, ref: parentRef, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsx("input", { ...props, tabIndex: disabled ? -1 : 0, id: inputId, name: name, value: value, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: handleFocus, onBlur: handleBlur, className: cx('w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed', {
                            'text-14px py-0.5': size === 'default',
                            'text-18px py-0.5': size === 'large',
                        }), disabled: disabled, "aria-label": label, type: showPassword ? type : 'password', ref: elementRef }), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && !!value, onClear: handleClearValue, endIcon: endIcon, children: _jsx(Icon, { name: showPassword ? 'eye' : 'eye-slash', size: 20, strokeWidth: 2, onClick: () => setShowPassword(!showPassword), className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color" }) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
PasswordField.isFormInput = true;
export default PasswordField;
