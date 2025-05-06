import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import { MONTH_LIST } from '../../const/datePicker';
import { SUNDAY_DATE, areDatesEqual, getYearRange, isToday } from '../../libs';
import { formatDate } from '../../libs/inputDate';
import { Tag } from '../Displays';
import InputEndIconWrapper from '../Displays/InputEndIconWrapper';
import InputHelper from '../Displays/InputHelper';
import Icon from '../Icon';
import { CancelButton } from './DatePicker';
import InputDropdown from './InputDropdown';
/**
 *
 * @property {InputDateValue} value - The currently selected date. If provided, the component behaves as a controlled component.
 * @property {InputDateValue} [defaultValue=null] - The default date to display if no value is provided (used in uncontrolled mode).
 * @property {function} [onChange] - Callback function to handle input changes.
 * @property {RefObject<InputDatePickerRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {string} [placeholder='Input date'] - Placeholder text displayed inside the input field when it is empty.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px). *
 * @property {function} [disabledDate] - A function to determine if a specific date is disabled (not selectable).
 *
 */
const MultipleDatePicker = ({ id, value: valueProp, defaultValue, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, placeholder = 'Input date', disabled: disabledProp = false, fullWidth, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, disabledDate = () => false, width, }) => {
    const elementRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || []);
    const isControlled = typeof valueProp !== 'undefined';
    const value = isControlled ? valueProp : internalValue;
    const [tempValue, setTempValue] = React.useState([]);
    const [calendarView, setCalendarView] = React.useState('date');
    const [displayedDate, setDisplayedDate] = React.useState(value.length === 0 ? new Date() : value[0]);
    const yearRange = getYearRange(displayedDate.getFullYear());
    const firstDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1);
    const lastDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 0);
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => {
            var _a;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        reset: () => {
            setInternalValue(defaultValue || []);
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
    const handleFocus = () => {
        if (disabled)
            return;
        handleChangeView('date');
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
    const handleChangeView = (view) => {
        setCalendarView(view);
    };
    const handleJumpMonth = (month) => {
        setDisplayedDate(new Date(displayedDate.getFullYear(), month));
        handleChangeView('date');
    };
    const handleJumpYear = (year) => {
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
    const handleChange = (newValue) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (!isControlled) {
            setInternalValue(newValue);
        }
        setDisplayedDate(newValue[newValue.length - 1] || new Date());
    };
    const handleClearValue = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleChange([]);
    };
    React.useEffect(() => {
        setTempValue(value);
        setDisplayedDate(value[0] || new Date());
    }, [value, dropdownOpen]);
    const dropdownContent = (_jsxs("div", { className: "min-w-60", children: [calendarView === 'date' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Icon, { name: "chevron-double-left", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(-1), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx(Icon, { name: "chevron-left", size: 32, strokeWidth: 2, onClick: handlePrevMonth, className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] }), _jsxs("div", { className: "flex items-center gap-4 text-16px font-semibold text-neutral-100 dark:text-neutral-100-dark", children: [_jsx("button", { type: "button", className: "shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-[84px]", onClick: () => handleChangeView('month'), children: monthFormatter.format(displayedDate) }), _jsx("button", { type: "button", className: "shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-10", onClick: () => handleChangeView('year'), children: displayedDate.getFullYear() })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Icon, { name: "chevron-right", size: 32, strokeWidth: 2, onClick: handleNextMonth, className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx(Icon, { name: "chevron-double-right", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(1), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] })] }), _jsx("div", { className: "text-12px p-2 border-neutral-40 dark:border-neutral-40-dark", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsx("tr", { children: days.map((day) => (_jsx("th", { children: _jsx("div", { className: "text-center p-1 font-normal w-8", children: day }) }, day))) }) }), _jsx("tbody", { children: dateMatrix.map((row, rowIdx) => (_jsx("tr", { children: row.map((date, dateIdx) => {
                                            const isDateDisabled = date === null || disabledDate(date, tempValue);
                                            const isDateSelected = date
                                                ? tempValue !== null && areDatesEqual(date, tempValue)
                                                : false;
                                            const handleChooseDate = (date) => {
                                                if (isDateDisabled)
                                                    return;
                                                const newValue = [...value];
                                                if (isDateSelected) {
                                                    handleChange(newValue.filter((item) => item.getTime() !== date.getTime()));
                                                }
                                                else {
                                                    newValue.push(date);
                                                    handleChange(newValue);
                                                }
                                            };
                                            return (_jsx("td", { "aria-label": date ? date.toDateString() : 'Disabled date', className: "px-0", children: _jsx("div", { className: "flex justify-center items-center", children: date && (_jsx("button", { type: "button", onClick: () => handleChooseDate(date), className: cx('rounded-md text-14px mt-0.5 transition-colors duration-200 ease-in w-7 h-7 flex items-center justify-center', {
                                                            'cursor-default text-neutral-30 dark:text-neutral-30-dark': isDateDisabled,
                                                            'cursor-pointer text-neutral-100 dark:text-neutral-100-dark': !isDateDisabled,
                                                            'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateDisabled && !isDateSelected,
                                                            'border border-primary-main dark:border-primary-main-dark': isToday(date) && !isDateSelected,
                                                            'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark': isDateSelected,
                                                        }), children: date.getDate() })) }) }, dateIdx));
                                        }) }, rowIdx))) })] }) })] })), calendarView === 'month' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx(Icon, { name: "chevron-double-left", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(-1), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx("button", { type: "button", className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark hover:text-primary-hover dark:hover:text-primary-hover-dark", onClick: () => handleChangeView('year'), children: displayedDate.getFullYear() }), _jsx("button", { type: "button", title: "Next Year", onClick: () => handleChangeYear(1), className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25", children: _jsx(Icon, { name: "chevron-double-right", size: 32, strokeWidth: 2 }) })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-y-1 text-14px", children: MONTH_LIST.map((item) => {
                            const isDateSelected = value.some((dateItem) => dateItem.getFullYear() === displayedDate.getFullYear() &&
                                dateItem.getMonth() === item.value);
                            return (_jsx("div", { className: "flex justify-center items-center h-12 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpMonth(item.value), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateSelected,
                                        'bg-primary-main text-neutral-10 rounded-md': isDateSelected,
                                    }), children: item.label }) }, item.value));
                        }) }), _jsx("div", { className: "flex justify-end gap-3 px-2", children: _jsx(CancelButton, { onClick: () => handleChangeView('date') }) })] })), calendarView === 'year' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsx(Icon, { name: "chevron-double-left", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(-12), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" }), _jsx("div", { className: "text-16px font-medium text-neutral-100 dark:text-neutral-100-dark", children: `${yearRange[0]} - ${yearRange[yearRange.length - 1]}` }), _jsx(Icon, { name: "chevron-double-right", size: 32, strokeWidth: 2, onClick: () => handleChangeYear(12), className: "p-1.5 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25" })] }), _jsx("div", { className: "grid grid-cols-3 p-2 gap-y-1 text-14px", children: yearRange.map((item) => {
                            const dateList = value.map((v) => v.getFullYear());
                            const isDateSelected = dateList.includes(item);
                            return (_jsx("div", { className: "flex justify-center items-center h-12 w-20 text-neutral-100 dark:text-neutral-100-dark", children: _jsx("button", { type: "button", onClick: () => handleJumpYear(item), className: cx('w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md', {
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDateSelected,
                                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark': isDateSelected,
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
                }), ref: elementRef, style: width ? { width } : undefined, children: [_jsxs("div", { role: "button", tabIndex: !disabled ? 0 : -1, "aria-pressed": "true", className: cx('flex flex-1 gap-2 items-center flex-wrap', {
                            'w-full': fullWidth,
                            'cursor-text': !disabled,
                            'cursor-not-allowed': disabled,
                        }), onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, children: [value === null || value === void 0 ? void 0 : value.map((selected, index) => {
                                const tagValue = formatDate(selected);
                                return (_jsx("div", { className: cx({
                                        'h-[32px]': size === 'default',
                                        'h-[44px]': size === 'large',
                                    }), children: disabled ? (_jsx(Tag, { color: "neutral", children: tagValue })) : (_jsx(Tag, { color: "info", onRemove: isControlled
                                            ? undefined
                                            : () => handleChange(value.filter((_, i) => i !== index)), children: tagValue })) }, tagValue));
                            }), value.length === 0 && (_jsx("div", { className: cx('w-full outline-none truncate text-neutral-70 dark:text-neutral-70-dark', {
                                    'text-14px h-[32px]': size === 'default',
                                    'text-18px h-[44px]': size === 'large',
                                    'py-1.5': size === 'default',
                                    'py-3': size === 'large',
                                }), children: placeholder }))] }), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, size: size, clearable: focused && !!value, onClear: handleClearValue, children: (!focused || !value) && (_jsx(Icon, { name: "calendar", strokeWidth: 2, onClick: disabled ? undefined : handleDropdown, className: "rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color" })) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, maxHeight: 320, children: dropdownContent })] }));
};
export default MultipleDatePicker;
