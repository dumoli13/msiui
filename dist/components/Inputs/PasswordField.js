import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 *
 * @property {string} [value] - The current value of the password field, passed from the parent component.
 * @property {string} [defaultValue] - The initial value of the password field when the component is uncontrolled.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<PasswordFieldRef> | React.RefCallback<PasswordFieldRef>} [inputRef] - A reference to access the input field and its value programmatically.
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
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
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
    const isError = !!errorProp;
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
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: id, size: size, children: label })), _jsxs("div", { className: cx('relative px-4 border rounded-md py-1 flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                }), style: width ? { width } : undefined, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: value, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: () => setFocused(true), onBlur: () => setFocused(false), ref: elementRef, className: cx('w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed', {
                            'text-14px py-1.5': size === 'default',
                            'text-18px py-3': size === 'large',
                        }), disabled: disabled, "aria-label": label, type: showPassword ? type : 'password' })), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, size: size, endIcon: endIcon, children: _jsx(Icon, { name: showPassword ? 'eye' : 'eye-slash', strokeWidth: 2, onClick: () => setShowPassword(!showPassword), className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color" }) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
export default PasswordField;
