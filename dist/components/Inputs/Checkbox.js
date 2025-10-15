import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import InputHelper from './InputHelper';
/**
 * Checkboxes allow the user to turn an option on or off.
 */
const Checkbox = (_a) => {
    var { id, name, label = '', labelPosition = 'right', checked: valueProp, defaultChecked = false, initialChecked = false, indeterminate = false, onChange, helperText, disabled: disabledProp = false, className, inputRef, size = 'default', error: errorProp, loading = false, width, 'aria-label': ariaLabel } = _a, props = __rest(_a, ["id", "name", "label", "labelPosition", "checked", "defaultChecked", "initialChecked", "indeterminate", "onChange", "helperText", "disabled", "className", "inputRef", "size", "error", "loading", "width", 'aria-label']);
    const elementRef = React.useRef(null);
    const [internalValue, setInternalValue] = React.useState(defaultChecked || initialChecked);
    const [focused, setFocused] = React.useState(false);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => { var _a; return (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
        reset: () => setInternalValue(initialChecked),
        disabled,
    }));
    const handleChange = (e) => {
        if (!disabled) {
            const newChecked = e.target.checked;
            onChange === null || onChange === void 0 ? void 0 : onChange(newChecked);
            if (!isControlled) {
                setInternalValue(newChecked);
            }
        }
    };
    const handleFocus = () => {
        if (disabled)
            return;
        setFocused(true);
    };
    const handleBlur = () => setFocused(false);
    const inputId = `checkbox-${id || name}-${React.useId()}`;
    return (_jsxs("div", { className: className, style: width ? { width } : undefined, children: [_jsxs("label", { className: cx('flex w-fit', {
                    'cursor-not-allowed opacity-50': disabled,
                    'cursor-pointer': !disabled,
                    'gap-0.5 items-center': (labelPosition === 'top' || labelPosition === 'bottom') &&
                        size === 'default',
                    'gap-1.5 items-center': (labelPosition === 'top' || labelPosition === 'bottom') &&
                        size === 'large',
                    'flex-col-reverse': labelPosition === 'top',
                    'flex-col': labelPosition === 'bottom',
                    'gap-2 && h-8': (labelPosition === 'left' || labelPosition === 'right') &&
                        size === 'default',
                    'gap-2 && h-[50px]': (labelPosition === 'left' || labelPosition === 'right') &&
                        size === 'large',
                    'flex-row-reverse': labelPosition === 'left',
                    'flex-row': labelPosition === 'right',
                }), children: [_jsxs("div", { role: "checkbox", "aria-checked": "true", "aria-disabled": "false", "aria-label": ariaLabel, className: cx('shrink-0 rounded-md border flex justify-center items-center transition-all box-border relative', {
                            'w-5 h-5': size === 'default',
                            'w-7 h-7': size === 'large',
                            'bg-neutral-20 dark:bg-neutral-20-dark border-neutral-40 dark:border-neutral-40-dark': disabled,
                            'bg-neutral-10 dark:bg-neutral-10-dark border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark': !disabled,
                            'bg-primary-main dark:bg-primary-main-dark border-primary-main dark:border-primary-main-dark': !disabled && value && !indeterminate,
                            'ring-3 ring-primary-focus': focused,
                        }), onKeyDown: (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault(); // Prevent scrolling
                                handleChange({
                                    target: { checked: !value },
                                });
                            }
                        }, children: [_jsx("input", Object.assign({}, props, { id: inputId, tabIndex: !disabled ? 0 : -1, type: "checkbox", className: cx('absolute opacity-0', {
                                    'w-5 h-5': size === 'default',
                                    'w-7 h-7': size === 'large',
                                }), checked: value, onChange: handleChange, disabled: disabled, "aria-label": ariaLabel, onFocus: handleFocus, onBlur: handleBlur, ref: elementRef })), loading && (_jsx(Icon, { name: "loader", animation: "spin", strokeWidth: 2, className: "text-neutral-70 dark:text-neutral-70-dark" })), !loading && value && !indeterminate && (_jsx(Icon, { name: "check", strokeWidth: 4, size: size === 'default' ? 14 : 18, className: cx({
                                    'text-neutral-10 dark:text-neutral-10-dark': !disabled,
                                    'text-neutral-60 dark:text-neutral-60-dark': disabled,
                                }) })), !loading && !value && indeterminate && (_jsx("span", { className: "absolute w-2.5 h-2.5 rounded-sm bg-primary-main dark:bg-primary-main-dark" }))] }), !!label && (_jsx("span", { className: cx('text-neutral-90 dark:text-neutral-90-dark', {
                            'text-14px': size === 'default',
                            'text-18px': size === 'large',
                        }), children: label }))] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
Checkbox.isFormInput = true;
export default Checkbox;
