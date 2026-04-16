import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import InputBase from './InputBase';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 * The Text Area component is used for collecting large amounts of text from users.
 */
const TextArea = ({ id, name, value: valueProp, defaultValue, initialValue = '', label, labelPosition = 'top', autoHideLabel = false, placeholder, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, lines: minLines = 2, required, width, ...props }) => {
    const generatedId = React.useId();
    const containerRef = React.useRef(null);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? initialValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? (valueProp ?? '') : internalValue;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const inputId = id ?? `textarea-${name ?? generatedId}`;
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
    return (_jsxs("div", { id: inputId, className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [label && (!autoHideLabel || focused) && (_jsx(InputLabel, { id: inputElementId, size: size, required: required, children: label })), _jsx(InputBase, { focused: focused, error: isError, success: successProp, disabled: disabled, size: size, width: width, fullWidth: fullWidth, startIcon: startIcon, align: "start", containerRef: containerRef, endIcons: _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, endIcon: endIcon }), children: _jsx("textarea", { ...props, id: inputElementId, name: name, value: value, placeholder: placeholder, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, disabled: disabled, "aria-invalid": isError || undefined, "aria-describedby": helperMessage ? helperId : undefined, rows: minLines, style: { minHeight: `${minLines * 24}px` }, ref: elementRef, className: cx('w-full min-w-0 outline-none resize-none bg-transparent', 'text-neutral-90 dark:text-neutral-90-dark', 'placeholder:text-neutral-50 dark:placeholder:text-neutral-50-dark', 'disabled:cursor-not-allowed', {
                        'text-14px py-0.5': size === 'default',
                        'text-18px py-0.5': size === 'large',
                    }) }) }), _jsx(InputHelper, { id: helperMessage ? helperId : undefined, message: helperMessage, error: isError, size: size })] }));
};
TextArea.isFormInput = true;
export default TextArea;
