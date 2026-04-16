import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { useDebouncedCallback } from 'use-debounce';
import { TimeUnit } from '../../const/datePicker';
import Icon from '../Icon';
import InputBase from './InputBase';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
import TimeColumn from './TimeColumn';
import useClickOutside from './useClickOutside';
const convertTime = (time) => {
    if (!time)
        return '';
    const days = Math.floor(time / 86400)
        .toString()
        .padStart(2, '0');
    const hours = Math.floor((time % 86400) / 3600)
        .toString()
        .padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${days}:${hours}:${minutes}:${seconds}`;
};
/**
 * The Timer Field component is used for collecting time value from users.
 */
const TimerField = ({ id, name, value: valueProp, defaultValue, initialValue = null, label, labelPosition = 'top', autoHideLabel = false, placeholder = 'dd:hh:mm:ss', onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width, required, ...props }) => {
    const generatedId = React.useId();
    const elementRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(null);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? initialValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const [inputValue, setInputValue] = React.useState(convertTime(value));
    const [timeValue, setTimeValue] = React.useState({
        days: value ? Math.floor(value / 86400) : null,
        hours: value ? Math.floor((value % 86400) / 3600) : null,
        minutes: value ? Math.floor((value % 3600) / 60) : null,
        seconds: value ? value % 60 : null,
    });
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const inputId = id ?? `timerfield-${name ?? generatedId}`;
    const inputElementId = `${inputId}-input`;
    const helperId = `${inputId}-helper`;
    const helperMessage = isError && typeof errorProp === 'string' ? errorProp : helperText;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => elementRef.current?.focus(),
        reset: () => setInternalValue(initialValue),
        disabled,
    }));
    const handleBlur = React.useCallback(() => {
        const allFilled = timeValue.days != null &&
            timeValue.hours != null &&
            timeValue.minutes != null &&
            timeValue.seconds != null;
        if (allFilled) {
            const newDuration = (timeValue.days ?? 0) * 86400 +
                (timeValue.hours ?? 0) * 3600 +
                (timeValue.minutes ?? 0) * 60 +
                (timeValue.seconds ?? 0);
            onChange?.(newDuration);
            if (!isControlled)
                setInternalValue(newDuration);
        }
        setFocused(null);
        setDropdownOpen(false);
    }, [timeValue, onChange, isControlled]);
    useClickOutside([containerRef, dropdownRef], handleBlur);
    const handleFocus = (component = 'hour') => {
        if (disabled)
            return;
        setFocused(component);
        setDropdownOpen(true);
    };
    const handleSelectTime = (category, selected) => {
        setTimeValue((prev) => ({ ...prev, [category]: selected }));
    };
    const handleClear = () => {
        onChange?.(null);
        if (!isControlled)
            setInternalValue(null);
    };
    const handleConfirmTime = () => {
        const newDuration = timeValue
            ? (timeValue.days ?? 0) * 86400 +
                (timeValue.hours ?? 0) * 3600 +
                (timeValue.minutes ?? 0) * 60 +
                (timeValue.seconds ?? 0)
            : null;
        onChange?.(newDuration);
        if (!isControlled)
            setInternalValue(newDuration);
        setFocused(null);
        setDropdownOpen(false);
    };
    const handleDropdown = () => {
        if (disabled)
            return;
        setFocused('hour');
        setDropdownOpen((prev) => !prev);
    };
    const debounceTextToValue = useDebouncedCallback((input) => {
        if (clearable && input.length === 0) {
            setTimeValue({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            onChange?.(null);
            if (!isControlled)
                setInternalValue(null);
            return;
        }
        if (/^\d{1,3}:(0?\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(input)) {
            const [d, h, m, s] = input.split(':').map(Number);
            setTimeValue({ days: d, hours: h, minutes: m, seconds: s });
            const newDuration = d * 86400 + h * 3600 + m * 60 + s;
            onChange?.(newDuration);
            if (!isControlled)
                setInternalValue(newDuration);
            setFocused(null);
            setDropdownOpen(false);
        }
    }, 500);
    const handleChangeInput = (e) => {
        setInputValue(e.target.value);
        debounceTextToValue(e.target.value);
    };
    React.useEffect(() => {
        setInputValue(convertTime(value));
        if (!dropdownOpen) {
            setTimeValue({
                days: value ? Math.floor(value / 86400) : null,
                hours: value ? Math.floor((value % 86400) / 3600) : null,
                minutes: value ? Math.floor((value % 3600) / 60) : null,
                seconds: value ? value % 60 : null,
            });
        }
    }, [value, dropdownOpen]);
    // Show the clock toggle when the clear button is NOT shown
    const showClockButton = !clearable || !focused || (clearable && focused && !value);
    const dropdownContent = (_jsxs("div", { className: "border-l border-neutral-40 dark:border-neutral-40-dark text-14px", children: [_jsx("div", { className: "flex", children: Object.keys(timeValue).map((unit) => {
                    const tuUnit = unit;
                    let length;
                    if (tuUnit === TimeUnit.days)
                        length = 1000;
                    else if (tuUnit === TimeUnit.hours)
                        length = 24;
                    else
                        length = 60;
                    return (_jsx(TimeColumn, { unit: tuUnit, length: length, buttonWidth: tuUnit === TimeUnit.days ? 'w-12' : undefined, selected: timeValue[unit], onSelect: (val) => handleSelectTime(tuUnit, val), open: dropdownOpen }, unit));
                }) }), _jsx("div", { className: "border-t border-neutral-40 dark:border-neutral-40-dark flex items-center justify-end py-2 px-3", children: _jsx("button", { type: "button", onClick: handleConfirmTime, disabled: disabled, className: cx('text-14px py-0.5 px-2 rounded disabled:border', 'text-neutral-10 disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 bg-primary-main hover:bg-primary-hover active:bg-primary-pressed', 'dark:text-neutral-10-dark dark:disabled:border-neutral-40-dark dark:disabled:text-neutral-60-dark dark:disabled:bg-neutral-30-dark dark:bg-primary-main-dark dark:hover:bg-primary-hover-dark dark:active:bg-primary-pressed-dark'), children: "OK" }) })] }));
    return (_jsxs("div", { id: inputId, className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [label && (!autoHideLabel || focused) && (_jsx(InputLabel, { id: inputElementId, size: size, required: required, children: label })), _jsx(InputBase, { focused: !!focused, error: isError, success: successProp, disabled: disabled, size: size, width: width, fullWidth: fullWidth, startIcon: startIcon, containerRef: containerRef, endIcons: _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && !!focused && !!value, onClear: handleClear, endIcon: endIcon, children: showClockButton && (_jsx("button", { type: "button", "aria-label": dropdownOpen ? 'Close time picker' : 'Open time picker', "aria-expanded": dropdownOpen, onMouseDown: (e) => e.preventDefault(), onClick: handleDropdown, disabled: disabled, className: "rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark transition-colors duration-150 disabled:pointer-events-none", children: _jsx(Icon, { name: "clock", size: 20, strokeWidth: 2 }) })) }), children: _jsx("div", { className: cx('flex items-center w-full', {
                        'text-14px py-0.5': size === 'default',
                        'text-18px py-0.5': size === 'large',
                    }), children: _jsx("input", { ...props, id: inputElementId, name: name, value: inputValue, placeholder: placeholder, onFocus: () => handleFocus('hour'), onChange: handleChangeInput, disabled: disabled, "aria-invalid": isError || undefined, "aria-describedby": helperMessage ? helperId : undefined, autoComplete: "off", ref: elementRef, className: cx('w-full min-w-0 outline-none bg-transparent', 'text-neutral-90 dark:text-neutral-90-dark', 'placeholder:text-neutral-50 dark:placeholder:text-neutral-50-dark', 'disabled:cursor-not-allowed') }) }) }), _jsx(InputHelper, { id: helperMessage ? helperId : undefined, message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: containerRef, dropdownRef: dropdownRef, maxHeight: 336, children: dropdownContent })] }));
};
TimerField.isFormInput = true;
export default TimerField;
