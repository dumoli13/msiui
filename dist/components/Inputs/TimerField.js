import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { TimeUnit } from '../../const/datePicker';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 *
 * @property {number | null} [value] - The current value of the input, passed from the parent component.
 * @property {number | null} [defaultValue] - The initial value of the number field when the component is uncontrolled.
 * @property {(value: number | null) => void} [onChange] - Callback function when the number value changes.
 * @property {RefObject<TimerFieldRef> | React.RefCallback<TimerFieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should hide when the user starts typing.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {string} [placeholder='hh:mm:ss'] - Placeholder text displayed inside the input field when it is empty.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {number} [width] - Optional custom width for the input field.
 * @property {boolean} [clearable=false] - If `true`, a clear button will appear when the field is focused and has a value.
 *
 */
const TimerField = (_a) => {
    var { id, value: valueProp, defaultValue = valueProp, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = 'hh:mm:ss', disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', clearable = false, error: errorProp, success: successProp, loading = false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "clearable", "error", "success", "loading", "width"]);
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(null);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue !== undefined ? defaultValue : null);
    const isControlled = valueProp !== undefined;
    // Sync `internalStringValue` with `valueProp` when `valueProp` changes
    const value = isControlled ? valueProp : internalValue;
    const [timeValue, setTimeValue] = React.useState({
        hours: value ? Math.floor(value / 3600) : null,
        minutes: value ? Math.floor((value % 3600) / 60) : null,
        seconds: value ? value % 60 : null,
    });
    const displayValue = dropdownOpen || !isControlled ? internalValue : value;
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const scrollRefs = {
        hours: React.useRef(null),
        minutes: React.useRef(null),
        seconds: React.useRef(null),
    };
    const itemRefs = {
        hours: React.useRef([]),
        minutes: React.useRef([]),
        seconds: React.useRef([]),
    };
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = valueRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalValue(defaultValue !== undefined ? defaultValue : null);
        },
    }));
    const handleSelectTime = (category, selected) => {
        var _a, _b, _c;
        const selectedTime = {
            hours: (_a = timeValue.hours) !== null && _a !== void 0 ? _a : 0,
            minutes: (_b = timeValue.minutes) !== null && _b !== void 0 ? _b : 0,
            seconds: (_c = timeValue.seconds) !== null && _c !== void 0 ? _c : 0,
            [category]: selected,
        };
        setTimeValue(selectedTime);
        setInternalValue(selectedTime.hours * 3600 +
            selectedTime.minutes * 60 +
            selectedTime.seconds);
    };
    const handleFocus = (component = 'hour') => {
        if (disabled)
            return;
        setFocused(component);
        setDropdownOpen(true);
    };
    const handleBlur = () => {
        setFocused(null);
        setDropdownOpen(false);
    };
    const handleClearValue = (e) => {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        if (onChange) {
            onChange(null);
        }
        if (!isControlled) {
            setInternalValue(null);
        }
    };
    const handleDropdown = () => {
        if (disabled)
            return;
        setFocused('hour');
        setDropdownOpen((prev) => {
            return !prev;
        });
    };
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            var _a, _b, _c;
            const target = event.target;
            const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(target);
            const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(target);
            if (dropdownContainsTarget || selectElementContainsTarget) {
                (_c = elementRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                return;
            }
            handleBlur();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    React.useEffect(() => {
        if (!dropdownOpen)
            return;
        // Delay to ensure dropdown is fully rendered before scrolling
        setTimeout(() => {
            Object.keys(timeValue).forEach((unit) => {
                var _a;
                const value = timeValue[unit];
                const container = (_a = scrollRefs[unit]) === null || _a === void 0 ? void 0 : _a.current;
                const item = value !== null ? itemRefs[unit].current[value] : null;
                if (container && item) {
                    const containerTop = container.getBoundingClientRect().top;
                    const itemTop = item.getBoundingClientRect().top;
                    const offset = itemTop - containerTop - 8; // Adjust for 8px padding
                    container.scrollTo({
                        top: container.scrollTop + offset,
                        behavior: 'smooth',
                    });
                }
            });
        }, 50); // Small delay for rendering
    }, [dropdownOpen, timeValue]);
    const dropdownContent = (_jsxs("div", { className: "border-l border-neutral-40 dark:border-neutral-40-dark text-14px", children: [_jsx("div", { className: "flex", children: Object.keys(timeValue).map((key) => {
                    const unit = key;
                    const length = unit === TimeUnit.hours ? 24 : 60;
                    return (_jsx("div", { ref: scrollRefs[unit], className: "text-neutral-100 dark:text-neutral-100-dark max-h-[234px] overflow-y-auto p-2 apple-scrollbar flex flex-col gap-1 border-l border-neutral-40 dark:border-neutral-40-dark first:border-none", children: Array.from({ length }).map((_, idx) => (_jsx("button", { type: "button", ref: (el) => {
                                itemRefs[unit].current[idx] = el;
                            }, className: cx('w-10 text-center rounded py-0.5', {
                                'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark cursor-default': idx === timeValue[unit],
                                'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': idx !== timeValue[unit],
                            }), onClick: () => handleSelectTime(unit, idx), children: idx.toString().padStart(2, '0') }, idx))) }, unit));
                }) }), _jsx("div", { className: "border-t border-neutral-40 dark:border-neutral-40-dark flex items-center justify-end py-2 px-3", children: _jsx("button", { type: "button", onClick: handleBlur, className: cx('text-14px py-0.5 px-2 rounded disabled:border', 'text-neutral-10 disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 bg-primary-main hover:bg-primary-hover active:bg-primary-pressed', 'dark:text-neutral-10-dark dark:disabled:border-neutral-40-dark dark:disabled:text-neutral-60-dark dark:disabled:bg-neutral-30-dark dark:bg-primary-main-dark dark:hover:bg-primary-hover-dark dark:active:bg-primary-pressed-dark'), disabled: disabled, children: "OK" }) })] }));
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: id, size: size, children: label })), _jsxs("div", { className: cx('relative px-3 border rounded-md py-1 flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                }), style: width ? { width } : undefined, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsx("div", { className: cx('flex items-center w-full', {
                            'text-14px': size === 'default',
                            'text-18px': size === 'large',
                        }), children: _jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: displayValue
                                ? `${Math.floor(displayValue / 3600)
                                    .toLocaleString('en-US')
                                    .padStart(2, '0')}:${Math.floor((displayValue % 3600) / 60)
                                    .toLocaleString('en-US')
                                    .padStart(2, '0')}:${(displayValue % 60).toLocaleString('en-US').padStart(2, '0')}`
                                : '', placeholder: focused ? '' : placeholder, onFocus: () => handleFocus('hour'), onChange: () => { }, ref: elementRef, className: cx('w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed', {
                                'py-1.5': size === 'default',
                                'py-3': size === 'large',
                            }), disabled: disabled, autoComplete: "off" })) }), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, size: size, clearable: clearable && !!focused && !!value, onClear: handleClearValue, endIcon: endIcon, children: (!clearable ||
                            (clearable && !focused) ||
                            (clearable && focused && !value)) && (_jsx(Icon, { name: "clock", strokeWidth: 2, onClick: handleDropdown, disabled: disabled, className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color p-0.5" })) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, maxHeight: 336, children: dropdownContent })] }));
};
export default TimerField;
