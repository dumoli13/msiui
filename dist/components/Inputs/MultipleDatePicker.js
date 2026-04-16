import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useDebouncedCallback } from 'use-debounce';
import { DAYS_OF_WEEK, MONTH_OF_YEAR } from '../../const/datePicker';
import { areDatesEqual, getYearRange, isToday } from '../../libs';
import { Tag } from '../Displays';
import Icon from '../Icon';
import CalendarHeader from './CalendarHeader';
import { CancelButton } from './DatePicker';
import InputBase from './InputBase';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
import useClickOutside from './useClickOutside';
/**
 * The Multiple Date Picker component lets users select multiple date.
 * This component is similar to the Date Picker component but can not set a time of the date.
 *
 */
const MultipleDatePicker = ({ id, name, value: valueProp, defaultValue, initialValue = [], label, labelPosition = 'top', autoHideLabel = false, placeholder = 'Input date', onChange, className, helperText, disabled: disabledProp = false, fullWidth, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable, width, disabledDate = () => false, format = 'DD MMMYYYY', picker = 'date', required, onKeyDown, ...props }) => {
    const generatedId = React.useId();
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || initialValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const [inputValue, setInputValue] = React.useState('');
    const [tempValue, setTempValue] = React.useState([]);
    const [calendarView, setCalendarView] = React.useState(picker);
    const [displayedDate, setDisplayedDate] = React.useState(value.length === 0 ? new Date() : value[0]);
    const yearRange = getYearRange(displayedDate.getFullYear());
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const inputId = id ?? `multipledatepicker-${name ?? generatedId}`;
    const inputElementId = `${inputId}-input`;
    const helperId = `${inputId}-helper`;
    const helperMessage = isError && typeof errorProp === 'string' ? errorProp : helperText;
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
        const selectElementContainsTarget = elementRef.current?.contains(relatedTarget);
        if (dropdownContainsTarget || selectElementContainsTarget) {
            return;
        }
        setFocused(false);
        setDropdownOpen(false);
        if (event)
            props.onBlur?.(event);
    };
    const handleDropdown = () => {
        if (disabled)
            return;
        setFocused(true);
        setDropdownOpen((prev) => {
            return !prev;
        });
    };
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
    const handleChange = (newValue) => {
        onChange?.(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
    };
    const handleSelectDate = (selectedDate) => {
        const timestamp = selectedDate.getTime();
        const isDateSelected = value.some((date) => date.getTime() === timestamp);
        const newValue = isDateSelected
            ? value.filter((date) => date.getTime() !== timestamp)
            : [...value, selectedDate];
        handleChange(newValue);
    };
    const handleClearValue = () => {
        handleChange([]);
    };
    const debounceTextToDate = useDebouncedCallback((input) => {
        const parsed = dayjs(input, format, true);
        if (parsed.isValid()) {
            const newDate = parsed.toDate();
            handleSelectDate(newDate);
            setInputValue('');
        }
    }, 500);
    const handleChangeInput = (e) => {
        setInputValue(e.target.value);
        debounceTextToDate(e.target.value);
    };
    React.useEffect(() => {
        setTempValue(value);
        setDisplayedDate(value[value.length - 1] || new Date());
    }, [value, dropdownOpen]);
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!dropdownOpen) {
                handleDropdown();
            }
        }
        else {
            onKeyDown?.(e);
        }
    };
    // Show the calendar toggle when the clear button is NOT shown
    const showCalendarButton = !clearable || !focused || (clearable && focused && !value.length);
    const dropdownContent = (_jsxs("div", { className: "min-w-60", children: [calendarView === 'date' && (_jsxs(_Fragment, { children: [_jsx(CalendarHeader, { displayedDate: displayedDate, monthFormatter: monthFormatter, onPrevYear: () => handleChangeYear(-1), onPrevMonth: handlePrevMonth, onNextMonth: handleNextMonth, onNextYear: () => handleChangeYear(1), onClickMonth: () => handleChangeView('month'), onClickYear: () => handleChangeView('year') }), _jsx("div", { className: "text-12px p-2 border-neutral-40 dark:border-neutral-40-dark", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsx("tr", { children: DAYS_OF_WEEK.map((day) => (_jsx("th", { children: _jsx("div", { className: "text-center p-1 font-normal w-8", children: day }) }, day))) }) }), _jsx("tbody", { children: dateMatrix.map((row, rowIdx) => (_jsx("tr", { children: row.map((date, dateIdx) => {
                                            const isDateDisabled = date === null || disabledDate(date, tempValue);
                                            const isDateSelected = date
                                                ? tempValue !== null && areDatesEqual(date, tempValue)
                                                : false;
                                            return (_jsx("td", { "aria-label": date ? date.toDateString() : 'Disabled date', className: "px-0", children: _jsx("div", { className: "flex justify-center items-center", children: date && (_jsx("button", { type: "button", onClick: () => handleSelectDate(date), className: cx('rounded-md text-14px mt-0.5 transition-colors duration-200 ease-in w-7 h-7 flex items-center justify-center', {
                                                            'cursor-not-allowed text-neutral-50 dark:text-neutral-50-dark': isDateDisabled,
                                                            'cursor-pointer text-neutral-100 dark:text-neutral-100-dark': !isDateDisabled,
                                                            'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateDisabled && !isDateSelected,
                                                            'border border-primary-main dark:border-primary-main-dark': isToday(date) && !isDateSelected,
                                                            'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark': isDateSelected,
                                                        }), disabled: isDateDisabled, children: date.getDate() })) }) }, dateIdx));
                                        }) }, rowIdx))) })] }) })] })), calendarView === 'month' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx("button", { type: "button", "aria-label": "Previous year", onClick: () => handleChangeYear(-1), className: "p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2 }) }), _jsx("button", { type: "button", className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark hover:text-primary-hover dark:hover:text-primary-hover-dark", onClick: () => handleChangeView('year'), children: displayedDate.getFullYear() }), _jsx("button", { type: "button", "aria-label": "Next year", onClick: () => handleChangeYear(1), className: "p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2 }) })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-1 text-14px", children: MONTH_OF_YEAR.map((item) => {
                            const isDateDisabled = picker === 'month' &&
                                disabledDate(new Date(displayedDate.getFullYear(), item.value), tempValue);
                            const isDateSelected = value.some((dateItem) => dateItem.getFullYear() === displayedDate.getFullYear() &&
                                dateItem.getMonth() === item.value);
                            return (_jsx("div", { className: "flex justify-center items-center h-12 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpMonth(item.value), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'cursor-not-allowed text-neutral-50 dark:text-neutral-50-dark': isDateDisabled,
                                        'cursor-pointer text-neutral-100 dark:text-neutral-100-dark': !isDateDisabled,
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateDisabled && !isDateSelected,
                                        'bg-primary-main text-neutral-10 rounded-md': isDateSelected,
                                    }), disabled: isDateDisabled, children: item.label }) }, item.value));
                        }) }), picker === 'date' && (_jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView('date') }) }))] })), calendarView === 'year' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx("button", { type: "button", "aria-label": "Previous year range", onClick: () => handleChangeYear(-12), className: "p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2 }) }), _jsx("div", { className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark", children: `${yearRange[0]} - ${yearRange[yearRange.length - 1]}` }), _jsx("button", { type: "button", "aria-label": "Next year range", onClick: () => handleChangeYear(12), className: "p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2 }) })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-1 text-14px", children: yearRange.map((item) => {
                            const isDateDisabled = picker === 'year' &&
                                disabledDate(new Date(item, displayedDate.getMonth()), tempValue);
                            const dateList = value.map((v) => v.getFullYear());
                            const isDateSelected = dateList.includes(item);
                            return (_jsx("div", { className: "flex justify-center items-center h-12 w-20 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpYear(item), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'cursor-not-allowed text-neutral-50 dark:text-neutral-50-dark': isDateDisabled,
                                        'cursor-pointer text-neutral-100 dark:text-neutral-100-dark': !isDateDisabled,
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateDisabled && !isDateSelected,
                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark': isDateSelected,
                                    }), disabled: isDateDisabled, children: item }) }, item));
                        }) }), (picker === 'date' || picker === 'month') && (_jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView('date') }) }))] }))] }));
    return (_jsxs("div", { id: inputId, className: cx('relative text-14px', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: inputElementId, size: size, required: required, children: label })), _jsx(InputBase, { focused: focused, error: isError, success: successProp, disabled: disabled, size: size, width: width, fullWidth: fullWidth, containerRef: elementRef, align: "start", endIcons: _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && value.length > 0, onClear: handleClearValue, children: showCalendarButton && (_jsx("button", { type: "button", "aria-label": dropdownOpen ? 'Close date picker' : 'Open date picker', "aria-expanded": dropdownOpen, onMouseDown: (e) => e.preventDefault(), onClick: disabled ? undefined : handleDropdown, disabled: disabled, className: "rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark transition-colors duration-150 disabled:pointer-events-none", children: _jsx(Icon, { name: "calendar", size: 20, strokeWidth: 2 }) })) }), children: _jsxs("div", { role: "button", tabIndex: disabled ? -1 : 0, "aria-pressed": "true", className: cx('flex flex-1 gap-x-2 gap-y-1 items-center flex-wrap', {
                        'w-full': fullWidth,
                        'cursor-text': !disabled,
                        'cursor-not-allowed': disabled,
                    }), onFocus: handleFocus, onBlur: handleBlur, children: [value?.map((selected, index) => {
                            const tagValue = dayjs(selected).format(format);
                            return (_jsx("div", { className: "flex items-center py-[1px]", children: disabled ? (_jsx(Tag, { color: "neutral", children: tagValue })) : (_jsx(Tag, { color: "info", size: size, onRemove: isControlled
                                        ? undefined
                                        : () => handleChange(value.filter((_, i) => i !== index)), children: tagValue })) }, tagValue));
                        }), _jsx("input", { ...props, tabIndex: disabled ? -1 : 0, id: inputElementId, name: name, value: inputValue, placeholder: focused ? '' : placeholder || format, className: cx('outline-none bg-transparent disabled:bg-transparent text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed', {
                                'text-14px py-0.5': size === 'default',
                                'text-18px py-0.5': size === 'large',
                            }), disabled: disabled, "aria-invalid": isError || undefined, "aria-describedby": helperMessage ? helperId : undefined, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onChange: handleChangeInput, ref: valueRef, onKeyDown: handleKeyDown })] }) }), _jsx(InputHelper, { id: helperMessage ? helperId : undefined, message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, maxHeight: 320, children: dropdownContent })] }));
};
MultipleDatePicker.isFormInput = true;
export default MultipleDatePicker;
