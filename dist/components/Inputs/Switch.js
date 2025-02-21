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
import { Loader } from 'react-feather';
/**
 * Switch Component
 *
 * A toggle switch component that allows users to switch between two states, typically used for on/off or yes/no selections.
 * It can be customized with various features such as labels, loading state, error messages, and more.
 *
 * @param {boolean} [defaultChecked=false] - The initial state of the switch when uncontrolled. Defaults to `false` (off).
 * @param {boolean} [checked] - The current state of the switch when controlled by a parent component.
 * @param {string} [label] - The label text displayed above or beside the input field.
 * @param {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @param {(checked: boolean) => void} [onChange] - Callback function to handle state changes when the switch is toggled.
 * @param {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @param {RefObject<SwitchRef> | RefCallback<SwitchRef>} [inputRef] - A ref to directly access the switch element.
 * @param {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @param {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @param {string} [error] - Error message to display when the input has an error.
 * @param {string} [trueLabel='Yes'] - The label to display when the switch is in the "on" or "checked" state.
 * @param {string} [falseLabel='No'] - The label to display when the switch is in the "off" or "unchecked" state.
 * @param {number} [width] - Optional custom width for the input field.
 * @param {boolean} [loading=false] - Whether the input is in a loading state.
 *
 * @example Basic Usage:
 * ```tsx
 * <Switch
 *   checked={isActive}
 *   onChange={(checked) => setIsActive(checked)}
 *   label="Activate Feature"
 *   size="large"
 *   loading={isLoading}
 *   error="Failed to update"
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered Switch component.
 */
const Switch = (_a) => {
    var { id, defaultChecked, checked: checkedProp, label, labelPosition = 'top', onChange, className, helperText, disabled = false, inputRef, size = 'default', fullWidth = false, error: errorProp, trueLabel = 'Yes', falseLabel = 'No', width, loading = false } = _a, props = __rest(_a, ["id", "defaultChecked", "checked", "label", "labelPosition", "onChange", "className", "helperText", "disabled", "inputRef", "size", "fullWidth", "error", "trueLabel", "falseLabel", "width", "loading"]);
    const elementRef = useRef(null);
    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : internalChecked;
    useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        checked,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalChecked(false);
        },
    }));
    const helperMessage = errorProp || helperText;
    const handleChange = () => {
        const newChecked = !checked;
        onChange === null || onChange === void 0 ? void 0 : onChange(newChecked);
        if (!isControlled) {
            setInternalChecked(newChecked);
        }
    };
    return (React.createElement("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), style: width ? { width } : undefined },
        React.createElement("div", { className: "relative flex items-center gap-2 text-neutral-90" },
            React.createElement("div", { role: "button", tabIndex: !disabled ? 0 : -1, className: cx('flex items-center gap-2.5 border border-neutral-40 rounded-md p-2', {
                    'opacity-50 cursor-not-allowed bg-neutral-20': disabled,
                    'bg-neutral-10 cursor-pointer hover:border-primary-hover focus:ring-3 focus:ring-primary-focus': !disabled,
                }), onMouseDown: !disabled ? handleChange : undefined, onKeyDown: (e) => {
                    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault(); // Prevent default scroll on Space key
                        handleChange();
                    }
                } },
                React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, type: "checkbox", className: "sr-only", checked: checked, readOnly: true, ref: elementRef })),
                loading ? (React.createElement("div", { className: "w-7 h-4 rounded-full transition-colors relative bg-neutral-50" },
                    React.createElement("div", { className: "absolute left-0.5 top-0.5 transition-transform duration-500 translate-x-1.5 text-neutral-10" },
                        React.createElement(Loader, { className: "animate-spin", width: 12, height: 12 })))) : (React.createElement("div", { className: cx('w-7 h-4 rounded-full transition-colors relative', {
                        'bg-neutral-40': !checked && !disabled,
                        'bg-primary-main': checked && !disabled,
                        'bg-neutral-60 cursor-not-allowed': disabled,
                    }) },
                    React.createElement("div", { className: cx('absolute left-0.5 top-0.5 w-3 h-3 rounded-full bg-neutral-10 transition-all duration-500', { 'translate-x-3': checked }) }))),
                React.createElement("div", { className: "text-12px min-w-5" }, checked ? trueLabel : falseLabel)),
            label && (React.createElement("label", { htmlFor: id, className: cx('', {
                    'text-12px': size === 'default',
                    'text-20px': size === 'large',
                }) }, label))),
        helperMessage && (React.createElement("div", { className: `w-full text-left mt-1 text-12px ${errorProp ? 'text-danger-main' : 'text-neutral-60'}` }, helperMessage))));
};
export default Switch;
//# sourceMappingURL=Switch.js.map