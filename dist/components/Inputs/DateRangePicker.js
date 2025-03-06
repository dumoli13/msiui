import { __rest } from "tslib";
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useImperativeHandle, useRef, useState, } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { MONTH_LIST } from '../../const/datePicker';
import { SUNDAY_DATE, areDatesEqual, getYearRange, isDateABeforeDateB, isDateBetween, isToday, } from '../../libs';
import Icon from '../Icon';
import Button from './Button';
import InputDropdown from './InputDropdown';
const formatDate = (date) => date ? dayjs(date).format('D/M/YYYY') : '';
const DateRangePicker = (_a) => {
    var { id, value: valueProp, defaultValue, label, labelPosition = 'top', onChange, className, helperText, placeholder = 'input date', disabled = false, fullWidth, inputRef, size = 'default', error: errorProp, success: successProp, disabledDate = () => false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "inputRef", "size", "error", "success", "disabledDate", "width"]);
    const elementRef = useRef(null);
    const dropdownRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || null);
    const isControlled = typeof valueProp !== 'undefined';
    const value = isControlled ? valueProp : internalValue;
    const [tempValue, setTempValue] = useState(value || [null, null]);
    const [calendarView, setCalendarView] = useState('date');
    const [displayedDate, setDisplayedDate] = useState(value === null ? new Date() : value[0]);
    const yearRange = getYearRange(displayedDate.getFullYear());
    const firstDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1);
    const lastDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 0);
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const helperMessage = errorProp || helperText;
    const isError = errorProp;
    useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setTempValue([null, null]);
            setInternalValue(null);
        },
    }));
    useEffect(() => {
        const handleClickOutside = (event) => {
            var _a, _b, _c;
            const target = event.target;
            const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(target);
            const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(target);
            if (dropdownContainsTarget || selectElementContainsTarget) {
                (_c = elementRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                return;
            }
            setDropdownOpen(false);
            handleCancel();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleFocus = () => {
        if (disabled)
            return;
        setCalendarView('date');
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
    const handleViewDate = () => {
        setCalendarView('date');
    };
    const handleViewMonth = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCalendarView('month');
    };
    const handleViewYear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCalendarView('year');
    };
    const handleJumpMonth = (month) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (tempValue[0] !== null && tempValue[1] !== null) {
            setTempValue([null, null]);
        }
        setDisplayedDate(new Date(displayedDate.getFullYear(), month));
        setCalendarView('date');
    };
    const handleJumpYear = (year) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (tempValue[0] !== null && tempValue[1] !== null) {
            setTempValue([null, null]);
        }
        setDisplayedDate(new Date(year, displayedDate.getMonth()));
        setCalendarView('month');
    };
    const handlePrevMonth = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const prevMonth = displayedDate.getMonth() === 0 ? 11 : displayedDate.getMonth() - 1;
        const prevYear = displayedDate.getMonth() === 0
            ? displayedDate.getFullYear() - 1
            : displayedDate.getFullYear();
        setDisplayedDate(new Date(prevYear, prevMonth));
    };
    const handleNextMonth = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nextMonth = displayedDate.getMonth() === 11 ? 0 : displayedDate.getMonth() + 1;
        const nextYear = displayedDate.getMonth() === 11
            ? displayedDate.getFullYear() + 1
            : displayedDate.getFullYear();
        setDisplayedDate(new Date(nextYear, nextMonth));
    };
    const handlePrevYear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisplayedDate(new Date(displayedDate.getFullYear() - 1, displayedDate.getMonth()));
    };
    const handleNextYear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisplayedDate(new Date(displayedDate.getFullYear() + 1, displayedDate.getMonth()));
    };
    const handlePrev12Year = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisplayedDate(new Date(displayedDate.getFullYear() - 12, displayedDate.getMonth()));
    };
    const handleNext12Year = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisplayedDate(new Date(displayedDate.getFullYear() + 12, displayedDate.getMonth()));
    };
    const handleSelectDate = (date) => {
        if (tempValue[0] !== null && tempValue[1] !== null) {
            setTempValue([date, null]);
        }
        else if (tempValue[0] !== null) {
            let newDate;
            if (isDateABeforeDateB(date, tempValue[0])) {
                newDate = [
                    dayjs(date).endOf('day').toDate(),
                    dayjs(tempValue[0]).startOf('day').toDate(),
                ];
            }
            else {
                newDate = [
                    dayjs(tempValue[0]).endOf('day').toDate(),
                    dayjs(date).startOf('day').toDate(),
                ];
            }
            setTempValue(newDate);
            handleChange(newDate);
            setDisplayedDate(tempValue === null ? new Date() : newDate[0]);
            handleBlur();
        }
        else {
            setTempValue([date, null]);
        }
    };
    const handleChange = (newValue) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
        handleBlur();
    };
    const handleCancel = () => {
        setTempValue(value || [null, null]);
        setDisplayedDate(value === null ? new Date() : value[0]);
        handleBlur();
    };
    const handleClearValue = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleChange(null);
    };
    useEffect(() => {
        if (value === null) {
            setTempValue([null, null]);
            setDisplayedDate(new Date());
        }
    }, [value, isDropdownOpen]);
    const dropdownContent = (React.createElement("div", { className: "min-w-60" },
        React.createElement("div", { className: "px-4 flex flex-col gap-4" },
            React.createElement("div", { className: "flex items-center gap-4 text-neutral-100 font-medium" },
                React.createElement("div", { className: "flex-1" },
                    React.createElement("div", { className: "text-12px font-semibold text-neutral-70" }, "Start Date"),
                    React.createElement("div", null, tempValue[0] ? dayjs(tempValue[0]).format('D/M/YYYY') : '-')),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("div", { className: "text-12px font-semibold text-neutral-70" }, "End Date"),
                    React.createElement("div", null, tempValue[1] ? dayjs(tempValue[1]).format('D/M/YYYY') : '-')))),
        calendarView === 'date' && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex justify-between items-center gap-2 p-2" },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handlePrevYear, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                        React.createElement(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2 })),
                    React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handlePrevMonth, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                        React.createElement(Icon, { name: "chevron-left", size: 20, strokeWidth: 2 }))),
                React.createElement("div", { className: "flex items-center gap-4 text-16px font-medium" },
                    React.createElement("div", { role: "button", className: "hover:text-primary-hover w-[84px]", onMouseDown: handleViewMonth }, monthFormatter.format(displayedDate)),
                    React.createElement("div", { role: "button", className: "hover:text-primary-hover w-10", onMouseDown: handleViewYear }, displayedDate.getFullYear())),
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handleNextMonth, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                        React.createElement(Icon, { name: "chevron-right", size: 20, strokeWidth: 2 })),
                    React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handleNextYear, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                        React.createElement(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2 })))),
            React.createElement("div", { className: "text-12px p-2 border-t border-neutral-40" },
                React.createElement("table", { className: "w-full" },
                    React.createElement("thead", null,
                        React.createElement("tr", null, days.map((day) => (React.createElement("th", { key: day },
                            React.createElement("div", { className: "text-center p-1 font-normal w-8" }, day)))))),
                    React.createElement("tbody", null, dateMatrix.map((row, rowIdx) => (React.createElement("tr", { key: rowIdx }, row.map((date, dateIdx) => {
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
                        const handleChooseDate = (date) => (e) => {
                            if (!date || isDateDisabled)
                                return;
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            e === null || e === void 0 ? void 0 : e.stopPropagation();
                            handleSelectDate(date);
                        };
                        return (React.createElement("td", { key: dateIdx, "aria-label": date ? date.toDateString() : 'Disabled date' },
                            React.createElement("div", { role: "button", onMouseDown: handleChooseDate(date), className: cx('text-14px mt-0.5 h-7 transition-colors duration-200 ease-in flex items-center justify-center', {
                                    'cursor-default text-neutral-30': isDateDisabled,
                                    'cursor-pointer text-neutral-100': !isDateDisabled,
                                    'hover:bg-neutral-20': !isDateDisabled &&
                                        !(isStartSelected || isEndSelected),
                                    'border border-primary-main': isToday(date) &&
                                        !(isStartSelected || isEndSelected),
                                    'bg-primary-main !text-neutral-10': isStartSelected || isEndSelected,
                                    'rounded-tl-md rounded-bl-md': isStartSelected,
                                    'rounded-tr-md rounded-br-md': isEndSelected,
                                    'bg-primary-surface': isBetween,
                                }) }, date === null || date === void 0 ? void 0 : date.getDate())));
                    }))))))))),
        calendarView === 'month' && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex justify-between items-center gap-2 p-2" },
                React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handlePrevYear, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                    React.createElement(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2 })),
                React.createElement("div", { role: "button", className: "text-16px font-medium hover:text-primary-hover", onMouseDown: handleViewYear }, displayedDate.getFullYear()),
                React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handleNextYear, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                    React.createElement(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2 }))),
            React.createElement("div", { className: "grid grid-cols-3 p-2 border-t border-neutral-40 gap-y-1 text-14px" }, MONTH_LIST.map((item) => {
                const currentMonth = displayedDate.getFullYear() * 100 + item.value;
                const [start, end] = (tempValue === null || tempValue === void 0 ? void 0 : tempValue.map((v) => v ? v.getFullYear() * 100 + v.getMonth() : null)) || [null, null];
                const isStartSelected = start !== null && currentMonth === start;
                const isEndSelected = end !== null && currentMonth === end;
                const isBetween = start !== null &&
                    end !== null &&
                    currentMonth > start &&
                    currentMonth < end;
                return (React.createElement("div", { className: "flex items-center", key: item.value },
                    React.createElement("div", { role: "button", onMouseDown: handleJumpMonth(item.value), className: cx('w-full h-8 cursor-pointer transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center', {
                            'hover:bg-neutral-20': !isStartSelected,
                            'bg-primary-main !text-neutral-10': isStartSelected || isEndSelected,
                            'rounded-tl-md rounded-bl-md': isStartSelected,
                            'rounded-tr-md rounded-br-md': isEndSelected,
                            'bg-primary-surface': isBetween,
                        }) }, item.label)));
            })),
            React.createElement("div", { className: "flex justify-end gap-3 px-2" },
                React.createElement(Button, { variant: "outlined", size: "small", onClick: handleViewDate }, "Cancel")))),
        calendarView === 'year' && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex justify-between items-center gap-2 p-2" },
                React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handlePrev12Year, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                    React.createElement(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2 })),
                React.createElement("div", { className: "text-16px font-medium" }, `${yearRange[0]} - ${yearRange[yearRange.length - 1]}`),
                React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handleNext12Year, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                    React.createElement(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2 }))),
            React.createElement("div", { className: "grid grid-cols-3 p-2 border-t border-neutral-40 gap-y-1 text-14px" }, yearRange.map((item) => {
                var _a;
                const isDateSelected = displayedDate.getMonth() === item;
                const [start, end] = (_a = tempValue === null || tempValue === void 0 ? void 0 : tempValue.map((v) => (v === null || v === void 0 ? void 0 : v.getFullYear()) || null)) !== null && _a !== void 0 ? _a : [null, null];
                const isStartSelected = start !== null && item === start;
                const isEndSelected = end !== null && item === end;
                const isBetween = start !== null && end !== null && item > start && item < end;
                return (React.createElement("div", { className: "flex items-center", key: item },
                    React.createElement("div", { role: "button", onMouseDown: handleJumpYear(item), className: cx('cursor-pointer w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center', {
                            'hover:bg-neutral-20': !isDateSelected,
                            'bg-primary-main !text-neutral-10': isStartSelected || isEndSelected,
                            'rounded-tl-md rounded-bl-md': isStartSelected,
                            'rounded-tr-md rounded-br-md': isEndSelected,
                            'bg-primary-surface': isBetween,
                        }) }, item)));
            })),
            React.createElement("div", { className: "flex justify-end gap-3 px-2" },
                React.createElement(Button, { variant: "outlined", size: "small", onClick: handleViewDate }, "Cancel"))))));
    return (React.createElement("div", { className: cx('relative text-14px', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className) },
        label && (React.createElement("label", { htmlFor: id, className: cx('block text-left text-12px text-neutral-80 mb-1', {
                'text-12px': size === 'default',
                'text-20px': size === 'large',
            }) }, label)),
        React.createElement("div", { className: cx('bg-neutral-10 relative px-4 border rounded-md py-1 flex gap-2 items-center', {
                'w-full': fullWidth,
                'border-danger-main focus:ring-danger-focus': isError,
                'border-success-main focus:ring-success-focus': !isError && successProp,
                'border-neutral-50 hover:border-primary-main focus:ring-neutral-focus': !isError && !successProp && !disabled,
                'bg-neutral-20 cursor-not-allowed text-neutral-60 hover:!border-neutral-50': disabled,
                'shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                'ring-3 ring-primary-focus !border-primary-main': focused,
            }), ref: elementRef, style: width ? { width } : undefined },
            React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: value && dayjs(value[0]).isValid() && dayjs(value[1]).isValid()
                    ? `${formatDate(value[0])} - ${formatDate(value[1])}`
                    : '', placeholder: focused ? '' : placeholder, className: cx('w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed', {
                    'text-16px': size === 'default',
                    'text-18px': size === 'large',
                    'py-1.5': size === 'default',
                    'py-[12.5px]': size === 'large',
                }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, onChange: () => { } })),
            React.createElement("div", { className: "flex gap-0.5 items-center" },
                focused && !!value ? (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 p-1.5 text-neutral-70 transition-color" },
                    React.createElement(Icon, { name: "x-mark", size: 16, strokeWidth: 2 }))) : (React.createElement("div", { title: "Open", role: "button", onClick: handleDropdown, className: "rounded-full hover:bg-neutral-30 p-1.5 text-neutral-70 transition-color" },
                    React.createElement(Icon, { name: "calendar", size: 16 }))),
                successProp && (React.createElement("div", { className: "rounded-full bg-success-main p-0.5 text-neutral-10" },
                    React.createElement(Icon, { name: "check", size: 10, strokeWidth: 3 }))),
                isError && (React.createElement("div", { className: "rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center" }, "!")))),
        helperMessage && (React.createElement("div", { className: `w-full text-left mt-1 text-12px ${isError ? 'text-danger-main' : 'text-neutral-60'}` }, helperMessage)),
        React.createElement(InputDropdown, { open: isDropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, maxHeight: 320 }, dropdownContent)));
};
export default DateRangePicker;
//# sourceMappingURL=DateRangePicker.js.map