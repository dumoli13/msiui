import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 * The Text Area component is used for collecting large amounts of text from users.
 */
const TextArea = (_a) => {
    var { id, name, value: valueProp, defaultValue, initialValue = '', label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = '', disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, lines: minLines = 2, required, width } = _a, props = __rest(_a, ["id", "name", "value", "defaultValue", "initialValue", "label", "labelPosition", "autoHideLabel", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "error", "success", "loading", "lines", "required", "width"]);
    const parentRef = React.useRef(null);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || initialValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp.toString() : internalValue;
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => { var _a; return (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
        reset: () => setInternalValue(initialValue),
        disabled,
    }));
    const handleFocus = () => {
        if (disabled)
            return;
        setFocused(true);
    };
    const handleBlur = (event) => {
        var _a;
        const relatedTarget = event.relatedTarget;
        const selectElementContainsTarget = (_a = parentRef.current) === null || _a === void 0 ? void 0 : _a.contains(relatedTarget);
        if (selectElementContainsTarget) {
            return;
        }
        setFocused(false);
    };
    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
    };
    const inputId = `textarea-${id || name}-${React.useId()}`;
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: inputId, size: size, required: required, children: label })), _jsxs("div", { className: cx(' relative px-4 border rounded-md flex gap-2 items-start', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-hover dark:hover:border-primary-hover-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3': !disabled,
                    'py-[3px]': size === 'default',
                    'py-[9px]': size === 'large',
                }), style: width ? { width } : undefined, ref: parentRef, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsx("textarea", Object.assign({}, props, { tabIndex: disabled ? -1 : 0, id: inputId, name: name, value: value, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: handleFocus, onBlur: handleBlur, className: cx('w-full outline-none resize-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed', {
                            'text-14px py-0.5': size === 'default',
                            'text-18px py-0.5': size === 'large',
                        }), disabled: disabled, rows: minLines, style: {
                            minHeight: `${minLines * 24}px`,
                        }, "aria-label": label, ref: elementRef })), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, endIcon: endIcon })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
TextArea.isFormInput = true;
export default TextArea;
