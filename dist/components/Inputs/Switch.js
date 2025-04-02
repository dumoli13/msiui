import { __rest } from "tslib";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
/**
 *
 * A toggle switch component that allows users to switch between two states, typically used for on/off or yes/no selections.
 *
 * @param {boolean} [defaultChecked=false] - The initial state of the switch when uncontrolled. Defaults to `false` (off).
 * @param {boolean} [checked] - The current state of the switch when controlled by a parent component.
 * @param {string} [label] - The label text displayed above or beside the input field.
 * @param {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
 * @param {(checked: boolean) => void} [onChange] - Callback function to handle state changes when the switch is toggled.
 * @param {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @param {RefObject<SwitchRef> | React.RefCallback<SwitchRef>} [inputRef] - A ref to directly access the switch element.
 * @param {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @param {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @param {string} [error] - Error message to display when the input has an error.
 * @param {string} [trueLabel='Yes'] - The label to display when the switch is in the "on" or "checked" state.
 * @param {string} [falseLabel='No'] - The label to display when the switch is in the "off" or "unchecked" state.
 * @param {number} [width] - Optional custom width for the input field.
 * @param {boolean} [loading=false] - Whether the input is in a loading state.
 *
 */
const Switch = (_a) => {
    var { id, defaultChecked, checked: checkedProp, label, labelPosition = 'top', onChange, className, helperText, disabled = false, inputRef, size = 'default', fullWidth = false, error: errorProp, trueLabel = 'Yes', falseLabel = 'No', width, loading = false } = _a, props = __rest(_a, ["id", "defaultChecked", "checked", "label", "labelPosition", "onChange", "className", "helperText", "disabled", "inputRef", "size", "fullWidth", "error", "trueLabel", "falseLabel", "width", "loading"]);
    const elementRef = React.useRef(null);
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : internalChecked;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        checked,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalChecked(defaultChecked || false);
        },
    }));
    const helperMessage = errorProp || helperText;
    const isError = errorProp;
    const handleChange = () => {
        const newChecked = !checked;
        onChange === null || onChange === void 0 ? void 0 : onChange(newChecked);
        if (!isControlled) {
            setInternalChecked(newChecked);
        }
    };
    return (React.createElement("div", { className: cx('relative', {
            'w-full': fullWidth,
        }, className), style: width ? { width } : undefined },
        React.createElement("div", { className: cx('relative flex text-neutral-90 dark:text-neutral-90-dark', {
                'flex-col gap-0.5': labelPosition === 'top',
                'flex items-center gap-4': labelPosition === 'left',
            }) },
            label && (React.createElement("label", { htmlFor: id, className: cx('block text-left text-neutral-80 dark:text-neutral-100-dark', {
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                }) }, label)),
            React.createElement("div", { role: "button", tabIndex: !disabled ? 0 : -1, className: cx('w-fit flex items-center gap-2.5 border border-neutral-40 dark:border-neutral-40-dark rounded-md', {
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
                } },
                React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, type: "checkbox", className: "sr-only", checked: checked, readOnly: true, ref: elementRef })),
                loading ? (React.createElement("div", { className: cx('rounded-full transition-colors relative bg-neutral-50 dark:bg-neutral-50-dark', {
                        'w-7 h-4': size === 'default',
                        'w-8 h-5': size === 'large',
                    }) },
                    React.createElement("div", { className: "absolute left-0.5 top-0.5 transition-transform duration-500 translate-x-1.5 text-neutral-10 dark:text-neutral-10-dark" },
                        React.createElement(Icon, { name: "loader", size: size === 'default' ? 12 : 16, animation: "spin", strokeWidth: 4 })))) : (React.createElement("div", { className: cx('rounded-full transition-colors relative', {
                        'w-7 h-4': size === 'default',
                        'w-8 h-5': size === 'large',
                        'bg-neutral-40 dark:bg-neutral-40-dark': !checked && !disabled,
                        'bg-primary-main dark:bg-primary-main-dark': checked && !disabled,
                        'bg-neutral-60 dark:bg-neutral-60-dark cursor-not-allowed': disabled,
                    }) },
                    React.createElement("div", { className: cx('absolute left-0.5 top-0.5 rounded-full bg-neutral-10 dark:bg-neutral-10-dark transition-all duration-500', {
                            'translate-x-3': checked,
                            'w-3 h-3': size === 'default',
                            'w-4 h-4': size === 'large',
                        }) }))),
                React.createElement("div", { className: cx('min-w-5', {
                        'text-12px': size === 'default',
                        'text-16px': size === 'large',
                    }) }, checked ? trueLabel : falseLabel))),
        helperMessage && (React.createElement("div", { className: cx('w-full text-left mt-1', {
                'text-danger-main dark:text-danger-main-dark': isError,
                'text-neutral-60 dark:text-neutral-60-dark': !isError,
                'text-12px': size === 'default',
                'text-16px': size === 'large',
            }) }, helperMessage))));
};
export default Switch;
