import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import InputEndIconWrapper from '../Displays/InputEndIconWrapper';
import InputHelper from '../Displays/InputHelper';
/**
 *
 * @property {string} [value] - The value of the textarea. If provided, the textarea will be controlled.
 * @property {string} [defaultValue] - The initial value of the textarea for uncontrolled usage.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<TextAreaRef> | React.RefCallback<TextAreaRef>} [inputRef] - A reference to access the input field and its value programmatically.
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
 * @property {number} [lines=2] - The minimum number of lines (rows) visible in the textarea.
 *
 */
const TextArea = (_a) => {
    var _b;
    var { id, value: valueProp, defaultValue, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = '', disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, lines: minLines = 2, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "error", "success", "loading", "lines", "width"]);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState((_b = defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString()) !== null && _b !== void 0 ? _b : '');
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp.toString() : internalValue;
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
            setInternalValue((_a = defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString()) !== null && _a !== void 0 ? _a : '');
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
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx("label", { htmlFor: id, className: cx('shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1', {
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                }), children: label })), _jsxs("div", { className: cx(' relative px-4 border rounded-md py-1 flex gap-2 items-start', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3': !disabled,
                }), style: width ? { width } : undefined, children: [!!startIcon && (_jsx("div", { className: cx('text-neutral-70 dark:text-neutral-70-dark', {
                            'py-1.5': size === 'default',
                            'py-3': size === 'large',
                        }), children: startIcon })), _jsx("textarea", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: value, onChange: handleChange, placeholder: focused ? '' : placeholder, onFocus: () => setFocused(true), onBlur: () => setFocused(false), className: cx('w-full outline-none resize-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed', {
                            'text-14px py-1.5': size === 'default',
                            'text-18px py-3': size === 'large',
                        }), disabled: disabled, rows: minLines, ref: elementRef, style: {
                            minHeight: `${minLines * 24}px`,
                        }, "aria-label": label })), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, size: size, endIcon: endIcon })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
export default TextArea;
