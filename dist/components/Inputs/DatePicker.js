import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDebouncedCallback } from 'use-debounce';
import { DAYS_OF_WEEK, MONTH_OF_YEAR, TimeUnit } from '../../const/datePicker';
import { areDatesEqual, getYearRange, isToday } from '../../libs';
import Icon from '../Icon';
import CalendarHeader from './CalendarHeader';
import InputBase from './InputBase';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
import TimeColumn from './TimeColumn';
import useClickOutside from './useClickOutside';
export const CancelButton = ({ onClick, }) => (_jsx("button", { type: "button", onClick: onClick, className: "text-14px py-0.5 px-2 rounded text-neutral-100 dark:text-neutral-100-dark bg-neutral-10 dark:bg-neutral-10-dark hover:bg-neutral-20 dark:hover:bg-neutral-20-dark active:bg-neutral-30 dark:active:bg-neutral-30-dark border focus:ring-3 border-neutral-40 dark:border-neutral-40-dark drop-shadow focus:ring-primary-focus dark:focus:ring-primary-focus-dark", children: "Cancel" }));
dayjs.extend(customParseFormat);
/**
 * The Date Picker component lets users select a date. User can also set a time of the date.
 */
const DatePicker = ({ id, name, value: valueProp, defaultValue, initialValue = null, label, labelPosition = 'top', autoHideLabel = false, placeholder, onChange, className, helperText, disabled: disabledProp = false, fullWidth, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width, disabledDate, showTime = false, format: formatProps, picker = 'date', required, onKeyDown, ...props }) => {
    const generatedId = React.useId();
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
            format = 'MMM YYYY';
        else
            format = 'DD MMM YYYY';
        if (showTime)
            format = `${format} HH:mm:ss`;
    }
    const isControlled = valueProp !== undefined;
    const value = isControlled && !dropdownOpen ? valueProp : internalValue;
    const [inputValue, setInputValue] = React.useState(dayjs(value).format(format));
    const [timeValue, setTimeValue] = React.useState({
        hours: value?.getHours() ?? null,
        minutes: value?.getMinutes() ?? null,
        seconds: value?.getSeconds() ?? null,
    });
    const [calendarView, setCalendarView] = React.useState(picker);
    const [displayedDate, setDisplayedDate] = React.useState(value ?? new Date());
    const yearRange = getYearRange(displayedDate.getFullYear());
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const inputId = id ?? `datepicker-${name ?? generatedId}`;
    const inputElementId = `${inputId}-input`;
    const helperId = `${inputId}-helper`;
    const helperMessage = isError && typeof errorProp === 'string' ? errorProp : helperText;
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
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => valueRef.current?.focus(),
        reset: () => setInternalValue(initialValue),
        disabled,
    }));
    const handleClose = React.useCallback(() => {
        setFocused(false);
        setDropdownOpen(false);
    }, []);
    useClickOutside([elementRef, dropdownRef], handleClose);
    const handleFocus = (event) => {
        if (disabled)
            return;
        handleChangeView(picker);
        setFocused(true);
        setDropdownOpen(true);
        props.onFocus?.(event);
    };
    const handleBlur = (event) => {
        const relatedTarget = event?.relatedTarget;
        const dropdownContainsTarget = dropdownRef.current?.contains(relatedTarget);
        const elementContainsTarget = elementRef.current?.contains(relatedTarget);
        if (dropdownContainsTarget || elementContainsTarget)
            return;
        setFocused(false);
        setDropdownOpen(false);
        if (event)
            props.onBlur?.(event);
    };
    const handleDropdown = () => {
        if (disabled)
            return;
        setFocused(true);
        setDropdownOpen((prev) => !prev);
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
            handleSelectDate(new Date(year, 0));
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
        onChange?.(newValue);
        if (!isControlled)
            setInternalValue(newValue);
        setDisplayedDate(newValue || new Date());
        handleBlur();
    };
    const handleConfirmDateTime = () => {
        handleChangeValue(internalValue);
    };
    const handleSelectDate = (selectedDate) => {
        const selectedTime = {
            hours: timeValue.hours ?? 0,
            minutes: timeValue.minutes ?? 0,
            seconds: timeValue.seconds ?? 0,
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
        const selectedDate = value || new Date();
        const selectedTime = {
            hours: timeValue.hours ?? 0,
            minutes: timeValue.minutes ?? 0,
            seconds: timeValue.seconds ?? 0,
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
        setTimeValue({ hours: null, minutes: null, seconds: null });
    };
    React.useEffect(() => {
        setInputValue(value ? dayjs(value).format(format) : '');
        setDisplayedDate(value || new Date());
        if (isControlled)
            setInternalValue(value);
    }, [value, dropdownOpen, format, isControlled]);
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!dropdownOpen)
                handleDropdown();
        }
        else {
            onKeyDown?.(e);
        }
    };
    // Show the calendar toggle when the clear button is NOT shown
    const showCalendarButton = !clearable || !focused || (clearable && focused && !value);
    const dropdownContent = (_jsxs("div", { className: "min-w-60", children: [calendarView === 'date' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex", children: [_jsxs("div", { children: [_jsx(CalendarHeader, { displayedDate: displayedDate, monthFormatter: monthFormatter, onPrevYear: () => handleChangeYear(-1), onPrevMonth: handlePrevMonth, onNextMonth: handleNextMonth, onNextYear: () => handleChangeYear(1), onClickMonth: () => handleChangeView('month'), onClickYear: () => handleChangeView('year') }), _jsx("div", { className: "text-12px p-2", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsx("tr", { children: DAYS_OF_WEEK.map((day) => (_jsx("th", { children: _jsx("div", { className: "text-center p-1 font-normal w-8", children: day }) }, day))) }) }), _jsx("tbody", { children: dateMatrix.map((row, rowIdx) => (_jsx("tr", { className: "h-8", children: row.map((date, dateIdx) => {
                                                            const isDateDisabled = date === null || disabledDate?.(date);
                                                            const isDateSelected = !!date && !!value && areDatesEqual(date, value);
                                                            return (_jsx("td", { "aria-label": date ? date.toDateString() : 'Disabled date', className: "px-0", children: _jsx("div", { className: "flex justify-center items-center", children: date && (_jsx("button", { type: "button", onClick: () => handleSelectDate(date), className: cx('rounded-md text-14px mt-0.5 transition-colors duration-200 ease-in w-7 h-7 flex items-center justify-center', {
                                                                            'cursor-not-allowed text-neutral-50 dark:text-neutral-50-dark': isDateDisabled,
                                                                            'cursor-pointer text-neutral-100 dark:text-neutral-100-dark': !isDateDisabled,
                                                                            'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateDisabled && !isDateSelected,
                                                                            'border border-primary-main': isToday(date) && !isDateSelected,
                                                                            'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark': isDateSelected,
                                                                        }), disabled: isDateDisabled, children: date?.getDate() })) }) }, dateIdx));
                                                        }) }, rowIdx))) })] }) })] }), showTime && (_jsxs("div", { className: "border-l border-neutral-40 dark:border-neutral-40-dark text-14px", children: [_jsx("div", { className: "h-[45px] border-b border-neutral-40 dark:border-neutral-40-dark" }), _jsx("div", { className: "flex", children: Object.keys(timeValue).map((unit) => {
                                            const tuUnit = unit;
                                            return (_jsx(TimeColumn, { unit: tuUnit, length: tuUnit === TimeUnit.hours ? 24 : 60, selected: timeValue[unit], onSelect: (val) => handleSelectTime(tuUnit, val), open: dropdownOpen }, unit));
                                        }) })] }))] }), showTime ? (_jsxs("div", { className: "border-t border-neutral-40 dark:border-neutral-40-dark flex items-center justify-between py-2 px-3", children: [_jsx("button", { className: "text-14px text-primary-main dark:text-primary-main-dark hover:text-primary-hover dark:hover:text-primary-hover-dark", type: "button", onClick: handleToday, children: "Now" }), _jsx("button", { type: "button", onClick: handleConfirmDateTime, className: cx('text-14px py-0.5 px-2 rounded disabled:border', 'text-neutral-10 disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 bg-primary-main hover:bg-primary-hover active:bg-primary-pressed', 'dark:text-neutral-10-dark dark:disabled:border-neutral-40-dark dark:disabled:text-neutral-60-dark dark:disabled:bg-neutral-30-dark dark:bg-primary-main-dark dark:hover:bg-primary-hover-dark dark:active:bg-primary-pressed-dark'), disabled: disabled, children: "OK" })] })) : (_jsx("button", { className: "border-t border-neutral-40 dark:border-neutral-40-dark flex justify-center p-2.5 text-14px text-primary-main dark:text-primary-main-dark hover:text-primary-hover dark:hover:text-primary-hover-dark w-full", type: "button", onClick: handleToday, children: "Today" }))] })), calendarView === 'month' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx("button", { type: "button", "aria-label": "Previous year", onClick: () => handleChangeYear(-1), className: "p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2 }) }), _jsx("button", { type: "button", className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark hover:text-primary-hover dark:hover:text-primary-hover-dark", onClick: () => handleChangeView('year'), children: displayedDate.getFullYear() }), _jsx("button", { type: "button", "aria-label": "Next year", onClick: () => handleChangeYear(1), className: "p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2 }) })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-y-1 text-14px", children: MONTH_OF_YEAR.map((item) => {
                            const isDateSelected = value &&
                                value.getFullYear() === displayedDate.getFullYear() &&
                                value.getMonth() === item.value;
                            return (_jsx("div", { className: "flex justify-center items-center h-12 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpMonth(item.value), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateSelected,
                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark rounded-md': isDateSelected,
                                    }), children: item.label }) }, item.value));
                        }) }), picker === 'date' && (_jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView(picker) }) }))] })), calendarView === 'year' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx("button", { type: "button", "aria-label": "Previous year range", onClick: () => handleChangeYear(-12), className: "p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2 }) }), _jsx("div", { className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark", children: `${yearRange[0]} - ${yearRange[yearRange.length - 1]}` }), _jsx("button", { type: "button", "aria-label": "Next year range", onClick: () => handleChangeYear(12), className: "p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2 }) })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-y-1 text-14px", children: yearRange.map((item) => {
                            const isDateSelected = value?.getFullYear() === item;
                            return (_jsx("div", { className: "flex justify-center items-center h-12 w-20 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpYear(item), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateSelected,
                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 rounded-md dark:text-neutral-10-dark': isDateSelected,
                                    }), children: item }) }, item));
                        }) }), (picker === 'date' || picker === 'month') && (_jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView(picker) }) }))] }))] }));
    return (_jsxs("div", { id: inputId, className: cx('relative text-14px', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [label && (!autoHideLabel || focused) && (_jsx(InputLabel, { id: inputElementId, size: size, required: required, children: label })), _jsx(InputBase, { focused: focused, error: isError, success: successProp, disabled: disabled, size: size, width: width, fullWidth: fullWidth, containerRef: elementRef, endIcons: _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && !!value, onClear: handleClearValue, children: showCalendarButton && (_jsx("button", { type: "button", "aria-label": dropdownOpen ? 'Close date picker' : 'Open date picker', "aria-expanded": dropdownOpen, onMouseDown: (e) => e.preventDefault(), onClick: handleDropdown, disabled: disabled, className: "rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark transition-colors duration-150 disabled:pointer-events-none", children: _jsx(Icon, { name: "calendar", size: 20, strokeWidth: 2 }) })) }), children: _jsx("input", { ...props, id: inputElementId, name: name, value: inputValue, placeholder: focused ? '' : placeholder || format, disabled: disabled, required: required, "aria-required": required, "aria-invalid": isError || undefined, "aria-describedby": helperMessage ? helperId : undefined, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onChange: handleChangeInput, onKeyDown: handleKeyDown, ref: valueRef, className: cx('w-full min-w-0 outline-none bg-transparent disabled:cursor-not-allowed', 'text-neutral-90 dark:text-neutral-90-dark', 'placeholder:text-neutral-50 dark:placeholder:text-neutral-50-dark', {
                        'text-14px py-0.5': size === 'default',
                        'text-18px py-0.5': size === 'large',
                    }) }) }), _jsx(InputHelper, { id: helperMessage ? helperId : undefined, message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, maxHeight: 336, children: dropdownContent })] }));
};
DatePicker.isFormInput = true;
export default DatePicker;
