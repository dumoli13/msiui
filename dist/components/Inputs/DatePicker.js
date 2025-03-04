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
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useImperativeHandle, useRef, useState, } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { Calendar, Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, } from 'react-feather';
import { MONTH_LIST } from '../../const/datePicker';
import { SUNDAY_DATE, areDatesEqual, getYearRange, isToday, } from '../../libs/inputValidation';
import InputDropdown from './InputDropdown';
/**
 * DatePicker Component
 *
 * A date picker input component that allows users to select a date, month, or year.
 * The component provides a calendar view with the option to select a date, switch to month or year views,
 * and also supports clearing the selected value, selecting today's date, and disabling specific dates.
 * It is highly customizable, supporting error messages, success states, and additional helper text.
 *
 * @property {InputDateValue} value - The currently selected date. If provided, the component behaves as a controlled component.
 * @property {InputDateValue} [defaultValue=null] - The default date to display if no value is provided (used in uncontrolled mode).
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether to hide the label when the input is focused.
 * @property {function} [onChange] - Callback function invoked when the date changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder='input date'] - Placeholder text for the input field.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {RefObject<InputDatePickerRef>} [inputRef] - A reference to the date picker input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {function} [disabledDate] - A function to determine if a specific date is disabled (not selectable).
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @returns {JSX.Element} The rendered DatePicker component.
 *
 * @example Basic Usage:
 * ```tsx
 * const [selectedDate, setSelectedDate] = useState<Date | null>(null);
 *
 * <DatePicker
 *   value={selectedDate}
 *   onChange={(date) => setSelectedDate(date)}
 *   label="Select Date"
 *   placeholder="Choose a date"
 *   error="Date is required"
 * />
 * ```
 *
 */
const DatePicker = (_a) => {
    var { id, value: valueProp, defaultValue, label, labelPosition = 'top', onChange, className, helperText, placeholder = 'input date', disabled = false, fullWidth, inputRef, size = 'default', error: errorProp, success: successProp, disabledDate = () => false, width } = _a, props = __rest(_a, ["id", "value", "defaultValue", "label", "labelPosition", "onChange", "className", "helperText", "placeholder", "disabled", "fullWidth", "inputRef", "size", "error", "success", "disabledDate", "width"]);
    const elementRef = useRef(null);
    const dropdownRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || null);
    const isControlled = typeof valueProp !== 'undefined';
    const value = isControlled ? valueProp : internalValue;
    const [tempValue, setTempValue] = useState(value || null);
    const [calendarView, setCalendarView] = useState('date');
    const [displayedDate, setDisplayedDate] = useState(value === null ? new Date() : value);
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
        setDisplayedDate(new Date(displayedDate.getFullYear(), month));
        setCalendarView('date');
    };
    const handleJumpYear = (year) => (e) => {
        e.preventDefault();
        e.stopPropagation();
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
    const handleCancel = () => {
        setDisplayedDate(value === null ? new Date() : value);
    };
    const handleChange = (newValue) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
        setDisplayedDate(newValue || new Date());
        handleBlur();
    };
    const handleClearValue = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleChange(null);
    };
    const handleToday = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const today = new Date();
        handleChange(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    };
    useEffect(() => {
        setTempValue(value);
        setDisplayedDate(value || new Date());
    }, [value, isDropdownOpen]);
    const dropdownContent = (React.createElement(React.Fragment, null,
        calendarView === 'date' && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40" },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handlePrevYear, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                        React.createElement(ChevronsLeft, { width: 20, height: 20, strokeWidth: 2 })),
                    React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handlePrevMonth, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                        React.createElement(ChevronLeft, { width: 20, height: 20, strokeWidth: 2 }))),
                React.createElement("div", { className: "flex items-center gap-4 text-16px font-medium" },
                    React.createElement("div", { role: "button", className: "hover:text-primary-hover w-[84px]", onMouseDown: handleViewMonth }, monthFormatter.format(displayedDate)),
                    React.createElement("div", { role: "button", className: "hover:text-primary-hover w-10", onMouseDown: handleViewYear }, displayedDate.getFullYear())),
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handleNextMonth, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                        React.createElement(ChevronRight, { width: 20, height: 20, strokeWidth: 2 })),
                    React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handleNextYear, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                        React.createElement(ChevronsRight, { width: 20, height: 20, strokeWidth: 2 })))),
            React.createElement("div", { className: "text-14px p-2 border-b border-neutral-40" },
                React.createElement("table", { className: "w-full" },
                    React.createElement("thead", null,
                        React.createElement("tr", null, days.map((day) => (React.createElement("th", { key: day },
                            React.createElement("div", { className: "text-center p-1 font-normal" }, day)))))),
                    React.createElement("tbody", null, dateMatrix.map((row, rowIdx) => (React.createElement("tr", { key: rowIdx }, row.map((date, dateIdx) => {
                        const isDateDisabled = date === null || disabledDate(date, tempValue);
                        const isDateSelected = date
                            ? tempValue !== null && areDatesEqual(date, tempValue)
                            : false;
                        const handleChooseDate = (date) => (e) => {
                            if (isDateDisabled)
                                return;
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            e === null || e === void 0 ? void 0 : e.stopPropagation();
                            handleChange(date);
                        };
                        return (React.createElement("td", { key: dateIdx, "aria-label": date ? date.toDateString() : 'Disabled date' },
                            React.createElement("div", { className: "flex justify-center items-center h-8" },
                                React.createElement("div", { role: "button", onMouseDown: handleChooseDate(date), className: cx('transition-colors duration-200 ease-in w-7 h-7 flex items-center justify-center', {
                                        'cursor-default text-neutral-30': isDateDisabled,
                                        'cursor-pointer text-neutral-100': !isDateDisabled,
                                        'hover:bg-neutral-20': !isDateDisabled && !isDateSelected,
                                        'border border-primary-main': isToday(date) && !isDateSelected,
                                        'bg-primary-main !text-neutral-10': isDateSelected,
                                    }) }, date === null || date === void 0 ? void 0 : date.getDate()))));
                    }))))))),
            React.createElement("div", { className: "flex justify-center p-2.5 text-14px text-primary-main hover:text-primary-hover", role: "button", onMouseDown: handleToday }, "Today"))),
        calendarView === 'month' && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40" },
                React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handlePrevYear, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                    React.createElement(ChevronsLeft, { width: 20, height: 20, strokeWidth: 2 })),
                React.createElement("div", { role: "button", className: "text-16px font-medium hover:text-primary-hover", onMouseDown: handleViewYear }, displayedDate.getFullYear()),
                React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handleNextYear, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                    React.createElement(ChevronsRight, { width: 20, height: 20, strokeWidth: 2 }))),
            React.createElement("div", { className: "grid grid-cols-3 p-2" }, MONTH_LIST.map((item) => {
                const isDateSelected = (value === null || value === void 0 ? void 0 : value.getMonth()) === item.value;
                return (React.createElement("div", { className: "flex justify-center items-center h-12", key: item.value },
                    React.createElement("div", { role: "button", onMouseDown: handleJumpMonth(item.value), className: cx('cursor-pointer transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-full', {
                            'hover:bg-neutral-20': !isDateSelected,
                            'bg-primary-main text-neutral-10 rounded-md': isDateSelected,
                        }) }, item.label)));
            })))),
        calendarView === 'year' && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40" },
                React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handlePrev12Year, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                    React.createElement(ChevronsLeft, { width: 20, height: 20, strokeWidth: 2 })),
                React.createElement("div", { className: "text-16px font-medium" }, `${yearRange[0]} - ${yearRange[yearRange.length - 1]}`),
                React.createElement("div", { role: "button", title: "Previous Year", onMouseDown: handleNext12Year, className: "rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25" },
                    React.createElement(ChevronsRight, { width: 20, height: 20, strokeWidth: 2 }))),
            React.createElement("div", { className: "grid grid-cols-3 p-2" }, yearRange.map((item) => {
                const isDateSelected = displayedDate.getMonth() === item;
                return (React.createElement("div", { className: "flex justify-center items-center h-12 w-20", key: item },
                    React.createElement("div", { role: "button", onMouseDown: handleJumpYear(item), className: cx('cursor-pointer transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-full', {
                            'hover:bg-neutral-20': !isDateSelected,
                            'bg-primary-main text-neutral-10 rounded-md': isDateSelected,
                        }) }, item)));
            }))))));
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
            React.createElement("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: id, value: value ? dayjs(value).format('D/M/YYYY') : '', placeholder: focused ? '' : placeholder, className: cx('w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed', {
                    'text-16px': size === 'default',
                    'text-18px': size === 'large',
                    'py-1.5': size === 'default',
                    'py-[12.5px]': size === 'large',
                }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, onChange: () => { } })),
            React.createElement("div", { className: "flex gap-0.5 items-center" },
                focused && !!value ? (React.createElement("div", { title: "Clear", role: "button", onMouseDown: handleClearValue, className: "rounded-full hover:bg-neutral-30 p-1.5 text-neutral-70 transition-color" },
                    React.createElement(X, { width: 16, height: 16, strokeWidth: 2 }))) : (React.createElement("div", { title: "Open", role: "button", onClick: handleDropdown, className: "rounded-full hover:bg-neutral-30 p-1.5 text-neutral-70 transition-color" },
                    React.createElement(Calendar, { width: 16, height: 16 }))),
                successProp && (React.createElement("div", { className: "rounded-full bg-success-main p-0.5 text-neutral-10" },
                    React.createElement(Check, { width: 10, height: 10, strokeWidth: 3 }))),
                isError && (React.createElement("div", { className: "rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center" }, "!")))),
        helperMessage && (React.createElement("div", { className: `w-full text-left mt-1 text-12px ${isError ? 'text-danger-main' : 'text-neutral-60'}` }, helperMessage)),
        React.createElement(InputDropdown, { open: isDropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, maxHeight: 305 }, dropdownContent)));
};
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map