import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DAYS_OF_WEEK, MONTH_OF_YEAR, TimeUnit } from '../../const/datePicker';
import { areDatesEqual, getYearRange, isToday } from '../../libs';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
import { useDebouncedCallback } from 'use-debounce';
export const CancelButton = ({ onClick, }) => (_jsx("button", { type: "button", onClick: onClick, className: "text-14px py-0.5 px-2 rounded text-neutral-100 dark:text-neutral-100-dark bg-neutral-10 dark:bg-neutral-10-dark hover:bg-neutral-20 dark:hover:bg-neutral-20-dark active:bg-neutral-30 dark:active:bg-neutral-30-dark border focus:ring-3 border-neutral-40 dark:border-neutral-40-dark drop-shadow focus:ring-primary-focus dark:focus:ring-primary-focus-dark", children: "Cancel" }));
dayjs.extend(customParseFormat);
/**
 * The Date Picker component lets users select a date. User can also set a time of the date.
 */
const DatePicker = (_a) => {
    var _b, _c, _d;
    var { id, name, value: valueProp, defaultValue, initialValue = null, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder, disabled: disabledProp = false, fullWidth, inputRef, size = 'default', clearable = false, error: errorProp, success: successProp, loading = false, disabledDate, width, showTime = false, format: formatProps, picker = 'date', required, onKeyDown } = _a, props = __rest(_a, ["id", "name", "value", "defaultValue", "initialValue", "label", "labelPosition", "autoHideLabel", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "inputRef", "size", "clearable", "error", "success", "loading", "disabledDate", "width", "showTime", "format", "picker", "required", "onKeyDown"]);
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || initialValue);
    let format = formatProps;
    if (!format) {
        if (picker === 'year')
            format = 'YYYY';
        else if (picker === 'month')
            format = 'M/YYYY';
        else
            format = 'D/M/YYYY';
        if (showTime)
            format = `${format} HH:mm:ss`;
    }
    const isControlled = valueProp !== undefined;
    const value = isControlled && !dropdownOpen ? valueProp : internalValue;
    const [inputValue, setInputValue] = React.useState(dayjs(value).format(format));
    const [timeValue, setTimeValue] = React.useState({
        hours: (_b = value === null || value === void 0 ? void 0 : value.getHours()) !== null && _b !== void 0 ? _b : null,
        minutes: (_c = value === null || value === void 0 ? void 0 : value.getMinutes()) !== null && _c !== void 0 ? _c : null,
        seconds: (_d = value === null || value === void 0 ? void 0 : value.getSeconds()) !== null && _d !== void 0 ? _d : null,
    });
    const [calendarView, setCalendarView] = React.useState(picker);
    const [displayedDate, setDisplayedDate] = React.useState(value !== null && value !== void 0 ? value : new Date());
    const yearRange = getYearRange(displayedDate.getFullYear());
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const dateMatrix = useMemo(() => {
        const year = displayedDate.getFullYear();
        const month = displayedDate.getMonth();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const matrix = [];
        let currentDay = 1 - firstDayIndex;
        for (let week = 0; week < 6; week++) {
            const weekRow = [];
            for (let day = 0; day < 7; day++) {
                const date = new Date(year, month, currentDay);
                if (currentDay < 1 || currentDay > totalDays) {
                    weekRow.push(null);
                }
                else {
                    weekRow.push(date);
                }
                currentDay++;
            }
            matrix.push(weekRow);
        }
        return matrix;
    }, [displayedDate]);
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
    React.useEffect(() => {
        if (!dropdownOpen)
            return;
        // Delay to ensure dropdown is fully rendered before scrolling
        setTimeout(() => {
            var _a;
            for (const unit of Object.keys(timeValue)) {
                const value = timeValue[unit];
                const container = (_a = scrollRefs[unit]) === null || _a === void 0 ? void 0 : _a.current;
                const item = value === null ? null : itemRefs[unit].current[value];
                if (container && item) {
                    const containerTop = container.getBoundingClientRect().top;
                    const itemTop = item.getBoundingClientRect().top;
                    const offset = itemTop - containerTop - 8; // Adjust for 8px padding
                    container.scrollTo({
                        top: container.scrollTop + offset,
                        behavior: 'smooth',
                    });
                }
            }
        }, 50); // Small delay for rendering
    }, [dropdownOpen, timeValue]);
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => { var _a; return (_a = valueRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
        reset: () => setInternalValue(initialValue),
        disabled,
    }));
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
    const handleFocus = () => {
        if (disabled)
            return;
        handleChangeView(picker);
        setFocused(true);
        setDropdownOpen(true);
    };
    const handleBlur = (event) => {
        var _a, _b;
        const relatedTarget = event === null || event === void 0 ? void 0 : event.relatedTarget;
        const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(relatedTarget);
        const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(relatedTarget);
        if (dropdownContainsTarget || selectElementContainsTarget) {
            return;
        }
        setFocused(false);
        setDropdownOpen(false);
    };
    const handleDropdown = () => {
        if (disabled)
            return;
        setFocused(true);
        setDropdownOpen((prev) => {
            return !prev;
        });
    };
    const handleChangeView = (view) => {
        setCalendarView(view);
    };
    const handleJumpMonth = (month) => {
        if (picker === 'month') {
            handleSelectDate(new Date(displayedDate.getFullYear(), month));
        }
        else {
            setDisplayedDate(new Date(displayedDate.getFullYear(), month));
            handleChangeView('date');
        }
    };
    const handleJumpYear = (year) => {
        if (picker === 'year') {
            handleSelectDate(new Date(year, 0)); // january 1, <YEAR>
        }
        else {
            setDisplayedDate(new Date(year, displayedDate.getMonth()));
            setCalendarView('month');
        }
    };
    const handlePrevMonth = () => {
        const prevMonth = displayedDate.getMonth() === 0 ? 11 : displayedDate.getMonth() - 1;
        const prevYear = displayedDate.getMonth() === 0
            ? displayedDate.getFullYear() - 1
            : displayedDate.getFullYear();
        setDisplayedDate(new Date(prevYear, prevMonth));
    };
    const handleNextMonth = () => {
        const nextMonth = displayedDate.getMonth() === 11 ? 0 : displayedDate.getMonth() + 1;
        const nextYear = displayedDate.getMonth() === 11
            ? displayedDate.getFullYear() + 1
            : displayedDate.getFullYear();
        setDisplayedDate(new Date(nextYear, nextMonth));
    };
    const handleChangeYear = (jump) => {
        setDisplayedDate(new Date(displayedDate.getFullYear() + jump, displayedDate.getMonth()));
    };
    const debounceTextToDate = useDebouncedCallback((input) => {
        if (clearable && input.length === 0) {
            handleChangeValue(null);
            return;
        }
        const parsed = dayjs(inputValue, format, true);
        if (parsed.isValid()) {
            const newDate = parsed.toDate();
            handleChangeValue(newDate);
            if (showTime) {
                setTimeValue({
                    hours: newDate.getHours(),
                    minutes: newDate.getMinutes(),
                    seconds: newDate.getSeconds(),
                });
            }
        }
    }, 500);
    const handleChangeInput = (e) => {
        setInputValue(e.target.value);
        debounceTextToDate(e.target.value);
    };
    const handleChangeValue = (newValue) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
        setDisplayedDate(newValue || new Date());
        handleBlur();
    };
    const handleConfirmDateTime = () => {
        handleChangeValue(internalValue);
    };
    const handleSelectDate = (selectedDate) => {
        var _a, _b, _c;
        const selectedTime = {
            hours: (_a = timeValue.hours) !== null && _a !== void 0 ? _a : 0,
            minutes: (_b = timeValue.minutes) !== null && _b !== void 0 ? _b : 0,
            seconds: (_c = timeValue.seconds) !== null && _c !== void 0 ? _c : 0,
        };
        setTimeValue(selectedTime);
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime.hours, selectedTime.minutes, selectedTime.seconds);
        setDisplayedDate(newDate);
        if (showTime) {
            setInternalValue(newDate);
        }
        else {
            handleChangeValue(newDate);
        }
    };
    const handleSelectTime = (category, selected) => {
        var _a, _b, _c;
        const selectedDate = value || new Date();
        const selectedTime = {
            hours: (_a = timeValue.hours) !== null && _a !== void 0 ? _a : 0,
            minutes: (_b = timeValue.minutes) !== null && _b !== void 0 ? _b : 0,
            seconds: (_c = timeValue.seconds) !== null && _c !== void 0 ? _c : 0,
            [category]: selected,
        };
        setTimeValue(selectedTime);
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime.hours, selectedTime.minutes, selectedTime.seconds);
        setInternalValue(newDate);
    };
    const handleToday = () => {
        const today = new Date();
        const selectedTime = {
            hours: showTime ? today.getHours() : 0,
            minutes: showTime ? today.getMinutes() : 0,
            seconds: showTime ? today.getSeconds() : 0,
        };
        setTimeValue(selectedTime);
        handleChangeValue(new Date(today.getFullYear(), today.getMonth(), today.getDate(), selectedTime.hours, selectedTime.minutes, selectedTime.seconds));
    };
    const handleClearValue = () => {
        handleChangeValue(null);
        setTimeValue({
            hours: null,
            minutes: null,
            seconds: null,
        });
    };
    React.useEffect(() => {
        setInputValue(value ? dayjs(value).format(format) : '');
        setDisplayedDate(value || new Date());
        if (isControlled)
            setInternalValue(value);
    }, [value, dropdownOpen]);
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'arrowUp') {
            e.preventDefault();
            if (!dropdownOpen) {
                handleDropdown();
            }
        }
        else {
            onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
        }
    };
    const dropdownContent = (_jsxs("div", { className: "min-w-60", children: [calendarView === 'date' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2, onClick: () => handleChangeYear(-1), className: "p-1 rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx(Icon, { name: "chevron-left", size: 20, strokeWidth: 2, onClick: handlePrevMonth, className: "p-1 rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] }), _jsxs("div", { className: "flex items-center gap-4 text-16px font-semibold text-neutral-100 dark:text-neutral-100-dark", children: [_jsx("button", { type: "button", className: "shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-[84px]", onClick: () => handleChangeView('month'), children: monthFormatter.format(displayedDate) }), _jsx("button", { type: "button", className: "shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-10", onClick: () => handleChangeView('year'), children: displayedDate.getFullYear() })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Icon, { name: "chevron-right", size: 20, strokeWidth: 2, onClick: handleNextMonth, className: "p-1 rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2, onClick: () => handleChangeYear(1), className: "p-1 rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] })] }), _jsx("div", { className: "text-12px p-2", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsx("tr", { children: DAYS_OF_WEEK.map((day) => (_jsx("th", { children: _jsx("div", { className: "text-center p-1 font-normal w-8", children: day }) }, day))) }) }), _jsx("tbody", { children: dateMatrix.map((row, rowIdx) => (_jsx("tr", { className: "h-8", children: row.map((date, dateIdx) => {
                                                            const isDateDisabled = date === null || (disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date));
                                                            const isDateSelected = !!date && !!value && areDatesEqual(date, value);
                                                            return (_jsx("td", { "aria-label": date ? date.toDateString() : 'Disabled date', className: "px-0", children: _jsx("div", { className: "flex justify-center items-center", children: date && (_jsx("button", { type: "button", onClick: () => handleSelectDate(date), className: cx('rounded-md text-14px mt-0.5 transition-colors duration-200 ease-in w-7 h-7 flex items-center justify-center', {
                                                                            'cursor-not-allowed text-neutral-50 dark:text-neutral-50-dark': isDateDisabled,
                                                                            'cursor-pointer text-neutral-100 dark:text-neutral-100-dark': !isDateDisabled,
                                                                            'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateDisabled && !isDateSelected,
                                                                            'border border-primary-main': isToday(date) && !isDateSelected,
                                                                            'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark': isDateSelected,
                                                                        }), disabled: isDateDisabled, children: date === null || date === void 0 ? void 0 : date.getDate() })) }) }, dateIdx));
                                                        }) }, rowIdx))) })] }) })] }), showTime && (_jsxs("div", { className: "border-l border-neutral-40 dark:border-neutral-40-dark text-14px", children: [_jsx("div", { className: "h-[45px] border-b border-neutral-40 dark:border-neutral-40-dark" }), _jsx("div", { className: "flex", children: Object.keys(TimeUnit).map((key) => {
                                            const unit = key;
                                            const length = unit === TimeUnit.hours ? 24 : 60;
                                            return (_jsx("div", { ref: scrollRefs[unit], className: "text-neutral-100 dark:text-neutral-100-dark max-h-[234px] overflow-y-auto p-2 apple-scrollbar flex flex-col gap-1 border-l border-neutral-40 dark:border-neutral-40-dark first:border-none", children: Array.from({ length }).map((_, idx) => (_jsx("button", { type: "button", ref: (el) => {
                                                        itemRefs[unit].current[idx] = el;
                                                    }, className: cx('w-10 text-center rounded py-0.5', {
                                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark cursor-default': idx === timeValue[unit],
                                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': idx !== timeValue[unit],
                                                    }), onClick: () => handleSelectTime(unit, idx), children: idx.toString().padStart(2, '0') }, idx))) }, unit));
                                        }) })] }))] }), showTime ? (_jsxs("div", { className: "border-t border-neutral-40 dark:border-neutral-40-dark flex items-center justify-between py-2 px-3", children: [_jsx("button", { className: "text-14px text-primary-main dark:text-primary-main-dark hover:text-primary-hover dark:hover:text-primary-hover-dark", type: "button", onClick: handleToday, children: "Now" }), _jsx("button", { type: "button", onClick: handleConfirmDateTime, className: cx('text-14px py-0.5 px-2 rounded disabled:border', 'text-neutral-10 disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 bg-primary-main hover:bg-primary-hover active:bg-primary-pressed', 'dark:text-neutral-10-dark dark:disabled:border-neutral-40-dark dark:disabled:text-neutral-60-dark dark:disabled:bg-neutral-30-dark dark:bg-primary-main-dark dark:hover:bg-primary-hover-dark dark:active:bg-primary-pressed-dark'), disabled: disabled, children: "OK" })] })) : (_jsx("button", { className: "border-t border-neutral-40 dark:border-neutral-40-dark flex justify-center p-2.5 text-14px text-primary-main dark:text-primary-main-dark hover:text-primary-hover dark:hover:text-primary-hover-dark w-full", type: "button", onClick: handleToday, children: "Today" }))] })), calendarView === 'month' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2, onClick: () => handleChangeYear(-1), className: "p-1 rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx("button", { type: "button", className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark hover:text-primary-hover dark:hover:text-primary-hover-dark", onClick: () => handleChangeView('year'), children: displayedDate.getFullYear() }), _jsx(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2, onClick: () => handleChangeYear(1), className: "p-1 rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-y-1 text-14px", children: MONTH_OF_YEAR.map((item) => {
                            const isDateSelected = value &&
                                value.getFullYear() === displayedDate.getFullYear() &&
                                value.getMonth() === item.value;
                            return (_jsx("div", { className: "flex justify-center items-center h-12 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpMonth(item.value), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateSelected,
                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark rounded-md': isDateSelected,
                                    }), children: item.label }) }, item.value));
                        }) }), picker === 'date' && (_jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView(picker) }) }))] })), calendarView === 'year' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2, onClick: () => handleChangeYear(-12), className: "p-1 rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx("div", { className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark", children: `${yearRange[0]} - ${yearRange[yearRange.length - 1]}` }), _jsx(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2, onClick: () => handleChangeYear(12), className: "p-1 rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-y-1 text-14px", children: yearRange.map((item) => {
                            const isDateSelected = (value === null || value === void 0 ? void 0 : value.getFullYear()) === item;
                            return (_jsx("div", { className: "flex justify-center items-center h-12 w-20 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpYear(item), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateSelected,
                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 rounded-md dark:text-neutral-10-dark': isDateSelected,
                                    }), children: item }) }, item));
                        }) }), (picker === 'date' || picker === 'month') && (_jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView(picker) }) }))] }))] }));
    const inputId = `datepicker-${id || name}-${React.useId()}`;
    return (_jsxs("div", { className: cx('relative text-14px', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: inputId, size: size, required: required, children: label })), _jsxs("div", { className: cx('relative px-3 border rounded-md flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus dark:focus:ring-primary-focus-dark focus:!border-primary-main dark:focus:!border-primary-main-dark': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                    'py-[3px]': size === 'default',
                    'py-[9px]': size === 'large',
                }), style: width ? { width } : undefined, ref: elementRef, children: [_jsx("input", Object.assign({}, props, { tabIndex: disabled ? -1 : 0, id: inputId, name: name, value: inputValue, placeholder: focused ? '' : placeholder || format, className: cx('w-full outline-none py-0.5 bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed', {
                            'text-14px': size === 'default',
                            'text-18px': size === 'large',
                        }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, onChange: handleChangeInput, onKeyDown: handleKeyDown, ref: valueRef })), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && !!value, onClear: handleClearValue, children: (!clearable ||
                            (clearable && !focused) ||
                            (clearable && focused && !value)) && (_jsx(Icon, { name: "calendar", size: 20, strokeWidth: 2, onClick: disabled ? undefined : handleDropdown, className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color p-0.5" })) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, maxHeight: 336, children: dropdownContent })] }));
};
DatePicker.isFormInput = true;
export default DatePicker;
