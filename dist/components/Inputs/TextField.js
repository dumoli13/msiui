var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useImperativeHandle, useRef, useState, } from 'react';
import cx from 'classnames';
import { Check, X } from 'react-feather';
/**
 * TextField Component
 *
 * A customizable input field component that supports various features such as labels, icons, error/success states,
 * placeholder text, and the ability to clear the input value. It can be used for both controlled and uncontrolled form inputs.
 *
 * @property {string | number} [value] - The value of the input. If provided, the input will be controlled.
 * @property {string | number} [defaultValue] - The initial value of the input for uncontrolled usage.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed inside the input when it is empty.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<TextfieldRef> | RefCallback<TextfieldRef>} [inputRef] - A ref to access the input element directly.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {boolean} [clearable=false] - Whether the input field should have a clear button to reset its value.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success] - Whether the input field is in a success state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <TextField
 *   label="Username"
 *   value={username}
 *   onChange={(value) => setUsername(value)}
 *   placeholder="Enter your username"
 *   size="large"
 *   success={isValidUsername}
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered TextField component.
 */
const TextField = (_a) => {
    var { id, value: valueProp, defaultValue, label, labelPosition = 'top', onChange, className, helperText, placeholder = '', disabled = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', clearable = false, error: errorProp, success: successProp, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "clearable", "error", "success", "width"]);
    const elementRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState((defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString()) || '');
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp.toString() : internalValue;
    const helperMessage = errorProp || helperText;
    const isError = errorProp;
    useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
    }));
    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
    };
    const handleClearValue = (e) => {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        onChange === null || onChange === void 0 ? void 0 : onChange('');
        if (!isControlled) {
            setInternalValue('');
        }
    };
    return (React.createElement("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className) },
        label && (React.createElement("label", { htmlFor: id, className: cx('block text-left text-12px text-neutral-80 mb-1', {
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
            !!startIcon && React.createElement("div", { className: "text-neutral-70" }, startIcon),
            React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: value, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: () => setFocused(true), onBlur: () => setFocused(false), className: cx('w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed', {
                    'text-16px': size === 'default',
                    'text-18px': size === 'large',
                    'py-1.5': size === 'default',
                    'py-[12.5px]': size === 'large',
                }), disabled: disabled, "aria-label": label, ref: elementRef })),
            clearable && focused && !!value && (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 p-0.5 text-neutral-70 transition-color" },
                React.createElement(X, { width: 16, height: 16, strokeWidth: 2 }))),
            !!endIcon && React.createElement("div", { className: "text-neutral-70" }, endIcon),
            successProp && (React.createElement("div", { className: "rounded-full bg-success-main p-0.5 text-neutral-10" },
                React.createElement(Check, { width: 10, height: 10, strokeWidth: 3 }))),
            isError && (React.createElement("div", { className: "rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center" }, "!"))),
        helperMessage && (React.createElement("div", { className: `w-full text-left mt-1 text-12px ${isError ? 'text-danger-main' : 'text-neutral-60'}` }, helperMessage))));
};
export default TextField;
//# sourceMappingURL=TextField.js.map