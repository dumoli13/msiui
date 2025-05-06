import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import { MONTH_LIST, TimeUnit } from '../../const/datePicker';
import { SUNDAY_DATE, areDatesEqual, getYearRange, isDateABeforeDateB, isDateBetween, isToday, } from '../../libs';
import { formatDate, isValidDate } from '../../libs/inputDate';
import InputEndIconWrapper from '../Displays/InputEndIconWrapper';
import InputHelper from '../Displays/InputHelper';
import Icon from '../Icon';
import { CancelButton } from './DatePicker';
import InputDropdown from './InputDropdown';
/**
 *
 * @property {InputDateRangeValue} [value] - The selected date range. If provided, the component will be controlled.
 * @property {InputDateRangeValue} [defaultValue] - The initial date range for uncontrolled usage.
 * @property {(value: InputDateRangeValue) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<InputDateRangePickerRef> | React.RefCallback<InputDateRangePickerRef>} [inputRef] - A reference to access the input field and its value programmatically.*
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {string} [placeholder='Input date'] - Placeholder text displayed inside the input field when it is empty.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {boolean} [showTime=false] - Whether time selection should be enabled in the date range picker.
 * @property {(date: Date, firstSelectedDate: Date | null) => boolean} [disabledDate] - A function to disable specific dates based on custom logic.
 *
 */
const DateRangePicker = (_a) => {
    var _b, _c, _d, _e, _f, _g;
    var { id, value: valueProp, defaultValue, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = 'Input date', disabled: disabledProp = false, fullWidth, inputRef, size = 'default', clearable = false, error: errorProp, success: successProp, loading = false, disabledDate = () => false, width, showTime = false } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "autoHideLabel", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "inputRef", "size", "clearable", "error", "success", "loading", "disabledDate", "width", "showTime"]);
    const elementRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [pointer, setPointer] = React.useState(0);
    const [internalValue, setInternalValue] = React.useState(defaultValue || null);
    const isControlled = typeof valueProp !== 'undefined';
    const value = isControlled ? valueProp : internalValue;
    const [tempValue, setTempValue] = React.useState(value || [null, null]);
    const [timeValue, setTimeValue] = React.useState({
        hours: (_c = (_b = (tempValue[0] ? value === null || value === void 0 ? void 0 : value[1] : value === null || value === void 0 ? void 0 : value[0])) === null || _b === void 0 ? void 0 : _b.getHours()) !== null && _c !== void 0 ? _c : null, // if
        minutes: (_e = (_d = (tempValue[0] ? value === null || value === void 0 ? void 0 : value[1] : value === null || value === void 0 ? void 0 : value[0])) === null || _d === void 0 ? void 0 : _d.getMinutes()) !== null && _e !== void 0 ? _e : null,
        seconds: (_g = (_f = (tempValue[0] ? value === null || value === void 0 ? void 0 : value[1] : value === null || value === void 0 ? void 0 : value[0])) === null || _f === void 0 ? void 0 : _f.getSeconds()) !== null && _g !== void 0 ? _g : null,
    });
    const [calendarView, setCalendarView] = React.useState('date');
    const [displayedDate, setDisplayedDate] = React.useState(value === null ? new Date() : value[0]);
    const yearRange = getYearRange(displayedDate.getFullYear());
    const firstDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1);
    const lastDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 0);
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
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
    }, [dropdownOpen, timeValue.hours, timeValue.minutes, timeValue.seconds]);
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setTempValue([null, null]);
            setInternalValue(defaultValue || null);
        },
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
    const handleFocus = (target) => {
        if (disabled)
            return;
        handleChangeView('date');
        setFocused(true);
        setDropdownOpen(true);
        setPointer(target);
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
    const days = Array.from({ length: 7 }).map((_, idx) => dayFormatter.format(new Date(SUNDAY_DATE.getFullYear(), SUNDAY_DATE.getMonth(), SUNDAY_DATE.getDate() + idx)));
    const dates = Array.from({ length: lastDate.getDate() }).map((_, idx) => new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + idx));
    const dateMatrix = Array(days.length).fill([]);
    while (dates.length > 0) {
        const dateRow = days.map((_, idx) => {
            if (dates.length > 0 && dates[0].getDay() === idx) {
                const currentDate = dates.shift();
                return currentDate !== null && currentDate !== void 0 ? currentDate : null;
            }
            return null;
        });
        dateMatrix.push(dateRow);
    }
    const handleChangeView = (view) => {
        setCalendarView(view);
    };
    const handleJumpMonth = (month) => {
        if (tempValue[0] !== null && tempValue[1] !== null) {
            setTempValue([null, null]);
        }
        setDisplayedDate(new Date(displayedDate.getFullYear(), month));
        handleChangeView('date');
    };
    const handleJumpYear = (year) => {
        if (tempValue[0] !== null && tempValue[1] !== null) {
            setTempValue([null, null]);
        }
        setDisplayedDate(new Date(year, displayedDate.getMonth()));
        setCalendarView('month');
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
    /**
     * when pointer changed, change selected time based on tempValue[pointer]
     */
    React.useEffect(() => {
        if (showTime) {
            const selectedTime = {
                hours: tempValue[pointer] ? tempValue[pointer].getHours() : null,
                minutes: tempValue[pointer] ? tempValue[pointer].getMinutes() : null,
                seconds: tempValue[pointer] ? tempValue[pointer].getSeconds() : null,
            };
            setTimeValue(selectedTime);
        }
    }, [pointer]);
    const convertDateOnly = (start, end) => {
        let newDate = [start, end];
        if (start !== null && end !== null) {
            if (isDateABeforeDateB(start, end)) {
                /**
                 * use start of the day and end of the day to cover full day
                 *
                 * if position start and end is correct, and not null,
                 * close dropdown when pointer is 1
                 */
                const startDate = new Date(start);
                startDate.setHours(0, 0, 0, 0);
                const endDate = new Date(end);
                endDate.setHours(23, 59, 59, 999);
                newDate = [startDate, endDate];
                if (pointer === 1)
                    handleBlur();
            }
            else {
                /**
                 * if end < start, swap start and end.
                 * if this happen, do not close dropdown,
                 * even when pointer is 1 so use can check or select new end date
                 */
                const startDate = new Date(end);
                startDate.setHours(0, 0, 0, 0);
                const endDate = new Date(start);
                endDate.setHours(23, 59, 59, 999);
                newDate = [startDate, endDate];
            }
            handleChange(newDate);
        }
        setTempValue(newDate);
    };
    const convertDateTime = () => {
        const start = tempValue[0];
        const end = tempValue[1];
        const newDate = [start, end];
        if (start !== null && end !== null) {
            /**
             * use selected time instead of start of the day or end of the day
             */
            if (isDateABeforeDateB(start, end)) {
                newDate[0] = start;
                newDate[1] = end;
            }
            else {
                newDate[0] = end;
                newDate[1] = start;
            }
            handleChange(newDate);
        }
        setTempValue(newDate);
    };
    const handleSelectDate = (date) => {
        var _a, _b, _c;
        if (showTime) {
            const selectedTime = {
                hours: (_a = timeValue.hours) !== null && _a !== void 0 ? _a : 0,
                minutes: (_b = timeValue.minutes) !== null && _b !== void 0 ? _b : 0,
                seconds: (_c = timeValue.seconds) !== null && _c !== void 0 ? _c : 0,
            };
            setTimeValue(selectedTime);
            const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), selectedTime.hours, selectedTime.minutes, selectedTime.seconds);
            setTempValue((prev) => prev[pointer] === newDate
                ? prev
                : prev.map((v, i) => (i === pointer ? newDate : v)));
        }
        else {
            if (pointer === 0) {
                convertDateOnly(date, tempValue[1]);
                setPointer(1);
            }
            else if (pointer === 1) {
                // Do not close dropdown in here in case end value < start value
                convertDateOnly(tempValue[0], date);
            }
        }
    };
    const handleSelectTime = (category, selected) => {
        var _a, _b, _c;
        const selectedDate = (tempValue === null || tempValue === void 0 ? void 0 : tempValue[pointer]) || new Date();
        const selectedTime = {
            hours: (_a = timeValue.hours) !== null && _a !== void 0 ? _a : 0,
            minutes: (_b = timeValue.minutes) !== null && _b !== void 0 ? _b : 0,
            seconds: (_c = timeValue.seconds) !== null && _c !== void 0 ? _c : 0,
            [category]: selected,
        };
        setTimeValue(selectedTime);
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime.hours, selectedTime.minutes, selectedTime.seconds);
        setTempValue((prev) => prev[pointer] === newDate
            ? prev
            : prev.map((v, i) => (i === pointer ? newDate : v)));
    };
    const handleConfirmDateTime = () => {
        convertDateTime();
        if (pointer === 0) {
            setPointer(1);
        }
        else if (pointer === 1) {
            handleBlur();
        }
    };
    const handleChange = (newValue) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
    };
    const handleClearValue = () => {
        handleChange(null);
        handleBlur();
    };
    React.useEffect(() => {
        if (value === null) {
            setTempValue([null, null]);
            setDisplayedDate(new Date());
        }
        else {
            setTempValue(value);
            setDisplayedDate(value[0] || new Date());
        }
    }, [value, dropdownOpen]);
    const dropdownContent = (_jsxs("div", { className: "min-w-60", children: [calendarView === 'date' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "px-4 flex flex-col gap-4 border-b border-neutral-40 dark:border-neutral-40-dark", children: _jsxs("div", { className: "flex items-center gap-10 text-neutral-100 dark:text-neutral-100-dark font-medium mb-1", children: [_jsxs("button", { type: "button", className: cx('flex-1 border-b-2', {
                                        ' border-primary-main dark:border-primary-main-dark': pointer === 0,
                                        'border-transparent': pointer !== 0,
                                    }), onClick: () => handleFocus(0), disabled: pointer === 0, children: [_jsx("div", { className: "text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark", children: "Start Date" }), _jsx("div", { children: tempValue[0] ? formatDate(tempValue[0], showTime) : '-' })] }), _jsxs("button", { type: "button", className: cx('flex-1 border-b-2', {
                                        'border-primary-main dark:border-primary-main-dark': pointer === 1,
                                        'border-transparent': pointer !== 1,
                                    }), onClick: () => handleFocus(1), disabled: pointer === 1 || tempValue[0] === null, children: [_jsx("div", { className: "text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark", children: "End Date" }), _jsx("div", { children: tempValue[1] ? formatDate(tempValue[1], showTime) : '-' })] })] }) }), _jsxs("div", { className: "flex", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Icon, { name: "chevron-double-left", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(-1), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx(Icon, { name: "chevron-left", size: 32, strokeWidth: 2, onClick: handlePrevMonth, className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] }), _jsxs("div", { className: "flex items-center gap-4 text-16px font-semibold text-neutral-100 dark:text-neutral-100-dark", children: [_jsx("button", { type: "button", className: "shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-[84px]", onClick: () => handleChangeView('month'), children: monthFormatter.format(displayedDate) }), _jsx("button", { type: "button", className: "shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-10", onClick: () => handleChangeView('year'), children: displayedDate.getFullYear() })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Icon, { name: "chevron-right", size: 32, strokeWidth: 2, onClick: handleNextMonth, className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx(Icon, { name: "chevron-double-right", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(1), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] })] }), _jsx("div", { className: "text-12px p-2", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsx("tr", { children: days.map((day) => (_jsx("th", { children: _jsx("div", { className: "text-center p-1 font-normal w-8", children: day }) }, day))) }) }), _jsx("tbody", { children: dateMatrix.map((row, rowIdx) => (_jsx("tr", { children: row.map((date, dateIdx) => {
                                                            const isDateDisabled = date === null || disabledDate(date, tempValue[0]);
                                                            const isStartSelected = date
                                                                ? tempValue[0] !== null &&
                                                                    areDatesEqual(date, tempValue[0])
                                                                : false;
                                                            const isEndSelected = date
                                                                ? tempValue[1] !== null &&
                                                                    areDatesEqual(date, tempValue[1])
                                                                : false;
                                                            const isBetween = date !== null &&
                                                                tempValue[0] !== null &&
                                                                tempValue[1] !== null &&
                                                                isDateBetween({
                                                                    date,
                                                                    startDate: tempValue[0],
                                                                    endDate: tempValue[1],
                                                                });
                                                            const handleChooseDate = (date) => {
                                                                if (!date || isDateDisabled)
                                                                    return;
                                                                handleSelectDate(date);
                                                            };
                                                            return (_jsx("td", { "aria-label": date ? date.toDateString() : 'Disabled date', className: "px-0", children: _jsx("button", { type: "button", onClick: () => handleChooseDate(date), className: cx('w-full text-14px mt-0.5 h-7 transition-colors duration-200 ease-in flex items-center justify-center', {
                                                                        'cursor-default text-neutral-30 dark:text-neutral-30-dark': isDateDisabled,
                                                                        'cursor-pointer text-neutral-100 dark:text-neutral-100-dark': !isDateDisabled,
                                                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateDisabled &&
                                                                            !(isStartSelected || isEndSelected),
                                                                        'border border-primary-main dark:border-primary-main-dark': isToday(date) &&
                                                                            !(isStartSelected || isEndSelected),
                                                                        'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark': isStartSelected || isEndSelected,
                                                                        'rounded-tl-md rounded-bl-md': isStartSelected,
                                                                        'rounded-tr-md rounded-br-md': isEndSelected,
                                                                        'bg-primary-surface dark:bg-primary-surface-dark': isBetween,
                                                                    }), children: date === null || date === void 0 ? void 0 : date.getDate() }) }, dateIdx));
                                                        }) }, rowIdx))) })] }) })] }), showTime && (_jsxs("div", { className: "border-l border-neutral-40 dark:border-neutral-40-dark text-14px", children: [_jsx("div", { className: "h-[49px] border-b border-neutral-40 dark:border-neutral-40-dark" }), _jsx("div", { className: "flex", children: Object.keys(TimeUnit).map((key) => {
                                            const unit = key;
                                            const length = unit === TimeUnit.hours ? 24 : 60;
                                            return (_jsx("div", { ref: scrollRefs[unit], className: "text-neutral-100 dark:text-neutral-100-dark max-h-[234px] overflow-y-auto p-2 apple-scrollbar flex flex-col gap-1 border-l border-neutral-40 dark:border-neutral-40-dark first:border-none", children: Array.from({ length }).map((_, idx) => (_jsx("button", { type: "button", ref: (el) => {
                                                        itemRefs[unit].current[idx] = el;
                                                    }, className: cx('w-10 text-center rounded py-0.5', {
                                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark cursor-default': idx === timeValue[unit],
                                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': idx !== timeValue[unit],
                                                    }), onClick: () => handleSelectTime(unit, idx), children: idx.toString().padStart(2, '0') }, idx))) }, unit));
                                        }) })] }))] }), showTime && (_jsx("div", { className: "border-t border-neutral-40 dark:border-neutral-40-dark flex items-center justify-end py-2 px-3", children: _jsx("button", { type: "button", onClick: handleConfirmDateTime, className: cx('text-14px py-0.5 px-2 rounded disabled:border', 'text-neutral-10 disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 bg-primary-main hover:bg-primary-hover active:bg-primary-pressed', 'dark:text-neutral-10-dark dark:disabled:border-neutral-40-dark dark:disabled:text-neutral-60-dark dark:disabled:bg-neutral-30-dark dark:bg-primary-main-dark dark:hover:bg-primary-hover-dark dark:active:bg-primary-pressed-dark'), disabled: disabled, children: "OK" }) }))] })), calendarView === 'month' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx(Icon, { name: "chevron-double-left", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(-1), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx("button", { type: "button", className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark hover:text-primary-hover dark:hover:text-primary-hover-dark", onClick: () => handleChangeView('year'), children: displayedDate.getFullYear() }), _jsx(Icon, { name: "chevron-double-right", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(1), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-y-1 text-14px", children: MONTH_LIST.map((item) => {
                            const currentMonth = displayedDate.getFullYear() * 100 + item.value;
                            const [start, end] = (tempValue === null || tempValue === void 0 ? void 0 : tempValue.map((v) => v ? v.getFullYear() * 100 + v.getMonth() : null)) || [null, null];
                            const isStartSelected = start !== null && currentMonth === start;
                            const isEndSelected = end !== null && currentMonth === end;
                            const isBetween = start !== null &&
                                end !== null &&
                                currentMonth > start &&
                                currentMonth < end;
                            return (_jsx("div", { className: "flex justify-center items-center h-12 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpMonth(item.value), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center', {
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isStartSelected,
                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark': isStartSelected || isEndSelected,
                                        'rounded-tl-md rounded-bl-md': isStartSelected,
                                        'rounded-tr-md rounded-br-md': isEndSelected,
                                        'bg-primary-surface dark:bg-primary-surface-dark': isBetween,
                                    }), children: item.label }) }, item.value));
                        }) }), _jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView('date') }) })] })), calendarView === 'year' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx(Icon, { name: "chevron-double-left", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(-12), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx("div", { className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark", children: `${yearRange[0]} - ${yearRange[yearRange.length - 1]}` }), _jsx(Icon, { name: "chevron-double-right", size: 32, onClick: () => handleChangeYear(12), strokeWidth: 2, className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-y-1 text-14px", children: yearRange.map((item) => {
                            var _a;
                            const isDateSelected = displayedDate.getMonth() === item;
                            const [start, end] = (_a = tempValue === null || tempValue === void 0 ? void 0 : tempValue.map((v) => { var _a; return (_a = v === null || v === void 0 ? void 0 : v.getFullYear()) !== null && _a !== void 0 ? _a : null; })) !== null && _a !== void 0 ? _a : [null, null];
                            const isStartSelected = start !== null && item === start;
                            const isEndSelected = end !== null && item === end;
                            const isBetween = start !== null && end !== null && item > start && item < end;
                            return (_jsx("div", { className: "flex justify-center items-center h-12 w-20 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpYear(item), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateSelected,
                                        'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark': isStartSelected || isEndSelected,
                                        'rounded-tl-md rounded-bl-md': isStartSelected,
                                        'rounded-tr-md rounded-br-md': isEndSelected,
                                        'bg-primary-surface dark:bg-primary-surface-dark': isBetween,
                                    }), children: item }) }, item));
                        }) }), _jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView('date') }) })] }))] }));
    return (_jsxs("div", { className: cx('relative text-14px', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx("label", { htmlFor: id, className: cx('shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1', {
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                }), children: label })), _jsxs("div", { className: cx('relative px-3 border rounded-md py-1 flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                }), ref: elementRef, style: width ? { width } : undefined, children: [_jsx("div", { className: cx('flex gap-2 items-center truncate flex-1 text-neutral-90 dark:text-neutral-90-dark', {
                            'text-14px py-1.5': size === 'default',
                            'text-18px py-3': size === 'large',
                        }), children: value ? (_jsxs(_Fragment, { children: [_jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: isValidDate(value[0]) ? formatDate(value[0], showTime) : '', placeholder: focused ? '' : placeholder, className: "truncate outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed", disabled: disabled, "aria-label": label, autoComplete: "off", onBlur: handleBlur, onFocus: () => handleFocus(0), onClick: () => handleFocus(0), onChange: () => { } })), _jsx("div", { children: "-" }), _jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: isValidDate(value[1]) ? formatDate(value[1], showTime) : '', placeholder: focused ? '' : placeholder, className: "truncate outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed", disabled: disabled, "aria-label": label, autoComplete: "off", onBlur: handleBlur, onFocus: () => handleFocus(1), onClick: () => handleFocus(1), onChange: () => { } }))] })) : (_jsx("input", Object.assign({}, props, { value: '', tabIndex: !disabled ? 0 : -1, id: id, placeholder: focused ? '' : placeholder, className: "flex-1 truncate outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed", disabled: disabled, "aria-label": label, autoComplete: "off", onBlur: handleBlur, onFocus: () => handleFocus(0), onClick: () => handleFocus(0), onChange: () => { } }))) }), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, size: size, clearable: clearable && focused && !!value, onClear: handleClearValue, children: (!clearable ||
                            (clearable && !focused) ||
                            (clearable && focused && !value)) && (_jsx(Icon, { name: "calendar", strokeWidth: 2, onClick: disabled ? undefined : () => handleFocus(0), className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color" })) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, maxHeight: 400, children: dropdownContent })] }));
};
export default DateRangePicker;
