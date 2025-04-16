import { __rest } from "tslib";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
/**
 * A customizable password input field that allows users to enter a password with the option to show/hide it.
 * It supports various features including label positioning, password visibility toggling, loading state, and validation feedback.
 *
 * @property {string} [value] - The current value of the password field, passed from the parent component.
 * @property {string} [defaultValue] - The initial value of the password field when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should hide when the user starts typing.
 * @property {(value: string) => void} [onChange] - Callback function when the password value changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed when no value is entered.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<PasswordFieldRef> | React.RefCallback<PasswordFieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 */
const PasswordField = (_a) => {
    var { id, value: valueProp, defaultValue, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = '', disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', type, error: errorProp, success: successProp, loading = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "type", "error", "success", "loading", "width"]);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : '');
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const [showPassword, setShowPassword] = React.useState(false);
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = errorProp;
    const disabled = loading !== null && loading !== void 0 ? loading : disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalValue(defaultValue !== null && defaultValue !== void 0 ? defaultValue : '');
        },
    }));
    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
    };
    return (React.createElement("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className) },
        ((autoHideLabel && focused) || !autoHideLabel) && label && (React.createElement("label", { htmlFor: id, className: cx('shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1', {
                'text-14px': size === 'default',
                'text-18px': size === 'large',
            }) }, label)),
        React.createElement("div", { className: cx('relative px-4 border rounded-md py-1 flex gap-2 items-center', {
                'w-full': fullWidth,
                'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
            }), style: width ? { width } : undefined },
            !!startIcon && (React.createElement("div", { className: "text-neutral-70 dark:text-neutral-70-dark" }, startIcon)),
            React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: value, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: () => setFocused(true), onBlur: () => setFocused(false), ref: elementRef, className: cx('w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed', {
                    'text-14px py-1.5': size === 'default',
                    'text-18px py-3': size === 'large',
                }), disabled: disabled, "aria-label": label, type: showPassword ? type : 'password' })),
            React.createElement("div", { className: cx('flex gap-1 items-center', {
                    'text-16px': size === 'default',
                    'text-20px': size === 'large',
                }) },
                React.createElement("div", { className: "p-1.5 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark rounded-full text-neutral-50", role: "button", onClick: () => setShowPassword(!showPassword), "aria-label": "Toggle Password Visibility" },
                    React.createElement(Icon, { name: showPassword ? 'eye' : 'eye-slash', size: 16 })),
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
export default PasswordField;
//# sourceMappingURL=PasswordField.js.map