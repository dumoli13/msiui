import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import InputHelper from '../Displays/InputHelper';
import Icon from '../Icon';
/**
 *
 * @property {boolean} [checked] - The current state of the switch when controlled by a parent component.
 * @property {boolean} [defaultChecked=false] - The initial value of the input for uncontrolled usage.
 * @property {(checked: boolean) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<SwitchRef> | React.RefCallback<SwitchRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {string} [trueLabel='Yes'] - The label to display when the switch is in the "on" or "checked" state.
 * @property {string} [falseLabel='No'] - The label to display when the switch is in the "off" or "unchecked" state.
 *
 */
const Switch = (_a) => {
    var { id, defaultChecked, checked: checkedProp, label, labelPosition = 'top', onChange, className, helperText, disabled: disabledProp = false, inputRef, size = 'default', fullWidth = false, error: errorProp, trueLabel = 'Yes', falseLabel = 'No', width, loading = false } = _a, props = __rest(_a, ["id", "defaultChecked", "checked", "label", "labelPosition", "onChange", "className", "helperText", "disabled", "inputRef", "size", "fullWidth", "error", "trueLabel", "falseLabel", "width", "loading"]);
    const elementRef = React.useRef(null);
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
    const isControlled = checkedProp !== undefined;
    const value = isControlled ? checkedProp : internalChecked;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalChecked(defaultChecked || false);
        },
    }));
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const handleChange = () => {
        const newChecked = !value;
        onChange === null || onChange === void 0 ? void 0 : onChange(newChecked);
        if (!isControlled) {
            setInternalChecked(newChecked);
        }
    };
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
        }, className), style: width ? { width } : undefined, children: [_jsxs("div", { className: cx('relative flex text-neutral-90 dark:text-neutral-90-dark', {
                    'flex-col gap-0.5': labelPosition === 'top',
                    'flex items-center gap-4': labelPosition === 'left',
                }), children: [label && (_jsx("label", { htmlFor: id, className: cx('block text-left text-neutral-80 dark:text-neutral-100-dark', {
                            'text-14px': size === 'default',
                            'text-18px': size === 'large',
                        }), children: label })), _jsxs("div", { role: "button", tabIndex: !disabled ? 0 : -1, className: cx('w-fit flex items-center gap-2.5 border border-neutral-40 dark:border-neutral-40-dark rounded-md', {
                            'bg-neutral-20 dark:bg-neutral-20-dark opacity-50': loading || disabled,
                            'cursor-default': loading,
                            'cursor-not-allowed': disabled,
                            'p-2': size === 'default',
                            'p-3': size === 'large',
                            'bg-neutral-10 dark:bg-neutral-10-dark cursor-pointer hover:border-primary-hover dark:hover:border-primary-hover-dark focus:ring-3 focus:ring-primary-focus dark:focus:ring-primary-focus-dark': !loading && !disabled,
                        }), onMouseDown: !loading && !disabled ? handleChange : undefined, onKeyDown: (e) => {
                            if (!loading && !disabled && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault(); // Prevent default scroll on Space key
                                handleChange();
                            }
                        }, children: [_jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, type: "checkbox", className: "sr-only", checked: value, readOnly: true, ref: elementRef })), loading ? (_jsx("div", { className: cx('rounded-full transition-colors relative bg-neutral-50 dark:bg-neutral-50-dark', {
                                    'w-7 h-4': size === 'default',
                                    'w-8 h-5': size === 'large',
                                }), children: _jsx("div", { className: "absolute left-0.5 top-0.5 transition-transform duration-500 translate-x-1.5 text-neutral-10 dark:text-neutral-10-dark", children: _jsx(Icon, { name: "loader", size: size === 'default' ? 12 : 16, animation: "spin", strokeWidth: 4 }) }) })) : (_jsx("div", { className: cx('rounded-full transition-colors relative', {
                                    'w-7 h-4': size === 'default',
                                    'w-8 h-5': size === 'large',
                                    'bg-neutral-40 dark:bg-neutral-40-dark': !value && !disabled,
                                    'bg-primary-main dark:bg-primary-main-dark': value && !disabled,
                                    'bg-neutral-60 dark:bg-neutral-60-dark cursor-not-allowed': disabled,
                                }), children: _jsx("div", { className: cx('absolute left-0.5 top-0.5 rounded-full bg-neutral-10 dark:bg-neutral-10-dark transition-all duration-500', {
                                        'translate-x-3': value,
                                        'w-3 h-3': size === 'default',
                                        'w-4 h-4': size === 'large',
                                    }) }) })), _jsx("div", { className: cx('min-w-5', {
                                    'text-12px': size === 'default',
                                    'text-16px': size === 'large',
                                }), children: value ? trueLabel : falseLabel })] })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
export default Switch;
