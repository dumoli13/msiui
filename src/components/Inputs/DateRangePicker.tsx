/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useDebouncedCallback } from 'use-debounce';
import { DAYS_OF_WEEK, MONTH_OF_YEAR, TimeUnit } from '../../const/datePicker';
import {
  areDatesEqual,
  getYearRange,
  isDateABeforeDateB,
  isDateBetween,
  isToday,
} from '../../libs';
import type {
  DateRangePickerProps,
  DateRangeValue,
  DateValue,
  PickerType,
} from '../../types';
import Icon from '../Icon';
import CalendarHeader from './CalendarHeader';
import { CancelButton } from './DatePicker';
import InputBase from './InputBase';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
import TimeColumn from './TimeColumn';
import useClickOutside from './useClickOutside';

const BORDER_PRIMARY = 'border-primary-main dark:border-primary-main-dark';
const TAB_BUTTON_CLASS = 'shrink-0 flex-1 border-b-2';

/**
 * The Date Range Picker lets the user select a range of dates.
 */
const DateRangePicker = ({
  id,
  name,
  value: valueProp,
  defaultValue,
  initialValue,
  label,
  labelPosition = 'top',
  autoHideLabel = false,
  placeholder,
  onChange,
  className,
  helperText,
  disabled: disabledProp = false,
  fullWidth,
  inputRef,
  size = 'default',
  error: errorProp,
  success: successProp,
  loading = false,
  clearable = false,
  width,
  disabledDate = () => false,
  showTime = false,
  format: formatProps,
  picker = 'date',
  required,
  onKeyDown,
  ...props
}: DateRangePickerProps) => {
  const generatedId = React.useId();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const valueStartRef = React.useRef<HTMLInputElement>(null);
  const valueEndRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [pointer, setPointer] = React.useState<0 | 1>(0);

  let format = formatProps;
  if (!format) {
    if (picker === 'year') format = 'YYYY';
    else if (picker === 'month') format = 'MMM YYYY';
    else format = 'DD MMM YYYY';
    if (showTime) format = `${format} HH:mm:ss`;
  }

  const [internalValue, setInternalValue] = React.useState(
    defaultValue || initialValue || null,
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const [inputValue, setInputValue] = React.useState<[string, string]>(
    value
      ? [dayjs(value[0]).format(format), dayjs(value[1]).format(format)]
      : ['', ''],
  );
  const [tempValue, setTempValue] = React.useState<[Date | null, Date | null]>(
    value || [null, null],
  );
  const [timeValue, setTimeValue] = React.useState({
    hours: (tempValue[0] ? value?.[1] : value?.[0])?.getHours() ?? null,
    minutes: (tempValue[0] ? value?.[1] : value?.[0])?.getMinutes() ?? null,
    seconds: (tempValue[0] ? value?.[1] : value?.[0])?.getSeconds() ?? null,
  });

  const [calendarView, setCalendarView] = React.useState<PickerType>(picker);
  const [displayedDate, setDisplayedDate] = React.useState(
    value === null ? new Date() : value[0],
  );
  const yearRange = getYearRange(displayedDate.getFullYear());

  const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

  const isError = !!errorProp;
  const disabled = loading || disabledProp;

  const inputId = id ?? `daterangepicker-${name ?? generatedId}`;
  const inputStartId = `${inputId}-start`;
  const inputEndId = `${inputId}-end`;
  const helperId = `${inputId}-helper`;
  const helperMessage =
    isError && typeof errorProp === 'string' ? errorProp : helperText;

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => valueStartRef.current?.focus(),
    reset: () => {
      setTempValue([null, null]);
      setInternalValue(null);
    },
    disabled,
  }));

  const handleClose = React.useCallback(() => {
    setFocused(false);
    setDropdownOpen(false);
  }, []);

  useClickOutside([elementRef, dropdownRef], handleClose);

  const handleFocus = (target: 0 | 1) => {
    if (disabled) return;
    handleChangeView(picker);
    setFocused(true);
    setDropdownOpen(true);
    setPointer(target);
  };

  const handleBlur = (event?: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event?.relatedTarget as Node | null;
    const dropdownContainsTarget = dropdownRef.current?.contains(relatedTarget);
    const elementContainsTarget = elementRef.current?.contains(relatedTarget);

    if (dropdownContainsTarget || elementContainsTarget) return;

    setFocused(false);
    setDropdownOpen(false);
  };

  const dateMatrix = useMemo(() => {
    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const matrix: DateValue[][] = [];
    let currentDay = 1 - firstDayIndex;

    for (let week = 0; week < 6; week++) {
      const weekRow: DateValue[] = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(year, month, currentDay);

        if (currentDay < 1 || currentDay > totalDays) {
          weekRow.push(null);
        } else {
          weekRow.push(date);
        }
        currentDay++;
      }
      matrix.push(weekRow);
    }

    return matrix;
  }, [displayedDate]);

  const handleChangeView = (view: 'date' | 'month' | 'year') => {
    setCalendarView(view);
  };

  const handleJumpMonth = (month: number) => {
    if (picker === 'month') {
      handleSelectDate(new Date(displayedDate.getFullYear(), month));
    } else {
      setDisplayedDate(new Date(displayedDate.getFullYear(), month));
      handleChangeView('date');
    }
  };

  const handleJumpYear = (year: number) => {
    if (picker === 'year') {
      handleSelectDate(new Date(year, 0));
    } else {
      setDisplayedDate(new Date(year, displayedDate.getMonth()));
      setCalendarView('month');
    }
  };

  const handlePrevMonth = () => {
    const prevMonth =
      displayedDate.getMonth() === 0 ? 11 : displayedDate.getMonth() - 1;
    const prevYear =
      displayedDate.getMonth() === 0
        ? displayedDate.getFullYear() - 1
        : displayedDate.getFullYear();
    setDisplayedDate(new Date(prevYear, prevMonth));
  };

  const handleNextMonth = () => {
    const nextMonth =
      displayedDate.getMonth() === 11 ? 0 : displayedDate.getMonth() + 1;
    const nextYear =
      displayedDate.getMonth() === 11
        ? displayedDate.getFullYear() + 1
        : displayedDate.getFullYear();
    setDisplayedDate(new Date(nextYear, nextMonth));
  };

  const handleChangeYear = (jump: number) => {
    setDisplayedDate(
      new Date(displayedDate.getFullYear() + jump, displayedDate.getMonth()),
    );
  };

  const debounceTextToDate = useDebouncedCallback(
    (input: [string, string], position: 0 | 1) => {
      const parsed = dayjs(input[position], format, true);

      if (parsed.isValid()) {
        const newDate = parsed.toDate();

        if (showTime) {
          setTimeValue({
            hours: newDate.getHours(),
            minutes: newDate.getMinutes(),
            seconds: newDate.getSeconds(),
          });

          setTempValue((prev) =>
            prev[position] === newDate
              ? prev
              : (prev.map((v, i) => (i === position ? newDate : v)) as [
                  Date | null,
                  Date | null,
                ]),
          );
        } else {
          handleSelectDate(newDate, position);
        }
      } else {
        setTempValue((prev) => {
          const newInput: [Date | null, Date | null] = [...prev];
          newInput[position] = null;
          return newInput;
        });
      }
    },
    500,
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue((prev) => {
      const newInput: [string, string] = [...prev];
      newInput[pointer] = newValue;
      debounceTextToDate(newInput, pointer);
      return newInput;
    });
  };

  React.useEffect(() => {
    if (showTime) {
      const selectedTime = {
        hours: tempValue[pointer] ? tempValue[pointer].getHours() : null,
        minutes: tempValue[pointer] ? tempValue[pointer].getMinutes() : null,
        seconds: tempValue[pointer] ? tempValue[pointer].getSeconds() : null,
      };
      setTimeValue(selectedTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only re-derive time when pointer (start/end) changes; tempValue is read but should not trigger this effect
  }, [pointer, showTime]);

  const convertDateOnly = (start: Date | null, end: Date | null) => {
    let newDate: [Date | null, Date | null] = [start, end];

    if (start !== null && end !== null) {
      if (isDateABeforeDateB(start, end)) {
        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);
        newDate = [startDate, endDate];
      } else {
        const startDate = new Date(end);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(start);
        endDate.setHours(23, 59, 59, 999);
        newDate = [startDate, endDate];
      }
      handleChangeValue(newDate as [Date, Date]);
    }
    setTempValue(newDate);
  };

  const convertDateTime = () => {
    const start = tempValue[0];
    const end = tempValue[1];

    const newDate: [Date | null, Date | null] = [start, end];

    if (start !== null && end !== null) {
      const startTime = start?.getTime();
      const endTime = end?.getTime();

      if (startTime < endTime) {
        newDate[0] = start;
        newDate[1] = end;
      } else {
        newDate[0] = end;
        newDate[1] = start;
      }
      handleChangeValue(newDate as [Date, Date]);
    }

    setTempValue(newDate);
  };

  const handleSelectDate = (date: Date, position?: 0 | 1) => {
    const currentPosition = position ?? pointer;
    if (showTime) {
      const selectedTime = {
        hours: timeValue.hours ?? 0,
        minutes: timeValue.minutes ?? 0,
        seconds: timeValue.seconds ?? 0,
      };
      setTimeValue(selectedTime);

      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        selectedTime.hours,
        selectedTime.minutes,
        selectedTime.seconds,
      );

      setTempValue((prev) =>
        prev[currentPosition] === newDate
          ? prev
          : (prev.map((v, i) => (i === pointer ? newDate : v)) as [
              Date | null,
              Date | null,
            ]),
      );
    } else if (currentPosition === 0) {
      convertDateOnly(date, tempValue[1]);
      setPointer(1);
      valueEndRef.current?.focus();
    } else if (currentPosition === 1) {
      convertDateOnly(tempValue[0], date);
    }
  };

  const handleSelectTime = (category: TimeUnit, selected: number) => {
    const selectedDate = tempValue?.[pointer] || new Date();
    const selectedTime = {
      hours: timeValue.hours ?? 0,
      minutes: timeValue.minutes ?? 0,
      seconds: timeValue.seconds ?? 0,
      [category]: selected,
    };
    setTimeValue(selectedTime);

    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.hours,
      selectedTime.minutes,
      selectedTime.seconds,
    );
    setTempValue((prev) =>
      prev[pointer] === newDate
        ? prev
        : (prev.map((v, i) => (i === pointer ? newDate : v)) as [
            Date | null,
            Date | null,
          ]),
    );
  };

  const handleConfirmDateTime = () => {
    convertDateTime();
    if (pointer === 0) {
      setPointer(1);
    } else if (pointer === 1) {
      handleBlur();
    }
  };

  const handleChangeValue = (newValue: DateRangeValue) => {
    onChange?.(newValue);
    if (!isControlled) setInternalValue(newValue);
  };

  const handleClearValue = () => {
    handleChangeValue(null);
    handleBlur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.shiftKey && e.key === 'Tab' && pointer === 0) {
      e.preventDefault();
      setPointer(1);
      valueEndRef.current?.focus();
    } else if (e.shiftKey && e.key === 'Tab' && pointer === 1) {
      e.preventDefault();
      setPointer(0);
      valueStartRef.current?.focus();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!dropdownOpen) handleFocus(0);
    } else {
      onKeyDown?.(e);
    }
  };

  React.useEffect(() => {
    if (value === null) {
      setTempValue([null, null]);
      setInputValue(['', '']);
      setDisplayedDate(new Date());
    } else {
      setTempValue(value);
      setInputValue([
        dayjs(value[0]).format(format),
        dayjs(value[1]).format(format),
      ]);
      setDisplayedDate(value[0] || new Date());
    }
  }, [value, dropdownOpen, format]);

  // Show the calendar toggle when the clear button is NOT shown
  const showCalendarButton =
    !clearable || !focused || (clearable && focused && !value);

  const dropdownContent = (
    <div className="min-w-60">
      {calendarView === 'date' && (
        <>
          <div className="px-4 flex flex-col gap-4 border-b border-neutral-40 dark:border-neutral-40-dark">
            <div className="flex items-center gap-10 text-neutral-100 dark:text-neutral-100-dark font-medium mb-1">
              <button
                type="button"
                className={cx('flex-1 border-b-2', {
                  [BORDER_PRIMARY]: pointer === 0,
                  'border-transparent': pointer !== 0,
                })}
                onClick={() => handleFocus(0)}
                disabled={pointer === 0}
              >
                <div className="text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark">
                  Start Date
                </div>
                <div>
                  {tempValue[0] ? dayjs(tempValue[0]).format(format) : '-'}
                </div>
              </button>
              <button
                type="button"
                className={cx('flex-1 border-b-2', {
                  [BORDER_PRIMARY]: pointer === 1,
                  'border-transparent': pointer !== 1,
                })}
                onClick={() => handleFocus(1)}
                disabled={pointer === 1 || tempValue[0] === null}
              >
                <div className="text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark">
                  End Date
                </div>
                <div>
                  {tempValue[1] ? dayjs(tempValue[1]).format(format) : '-'}
                </div>
              </button>
            </div>
          </div>
          <div className="flex">
            <div>
              <CalendarHeader
                displayedDate={displayedDate}
                monthFormatter={monthFormatter}
                onPrevYear={() => handleChangeYear(-1)}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onNextYear={() => handleChangeYear(1)}
                onClickMonth={() => handleChangeView('month')}
                onClickYear={() => handleChangeView('year')}
              />
              <div className="text-12px p-2">
                <table className="w-full">
                  <thead>
                    <tr>
                      {DAYS_OF_WEEK.map((day) => (
                        <th key={day}>
                          <div className="text-center p-1 font-normal w-8">
                            {day}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dateMatrix.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((date, dateIdx) => {
                          const isDateDisabled =
                            date === null || disabledDate(date, tempValue[0]);
                          const isStartSelected = date
                            ? tempValue[0] !== null &&
                              areDatesEqual(date, tempValue[0])
                            : false;
                          const isEndSelected = date
                            ? tempValue[1] !== null &&
                              areDatesEqual(date, tempValue[1])
                            : false;
                          const isBetween =
                            date !== null &&
                            tempValue[0] !== null &&
                            tempValue[1] !== null &&
                            isDateBetween({
                              date,
                              startDate: tempValue[0],
                              endDate: tempValue[1],
                            });

                          return (
                            <td
                              key={dateIdx}
                              aria-label={
                                date ? date.toDateString() : 'Disabled date'
                              }
                              className="px-0"
                            >
                              {date && (
                                <button
                                  type="button"
                                  onClick={() => handleSelectDate(date)}
                                  className={cx(
                                    'w-full text-14px mt-0.5 h-7 transition-colors duration-200 ease-in flex items-center justify-center',
                                    {
                                      'cursor-not-allowed text-neutral-50 dark:text-neutral-50-dark':
                                        isDateDisabled,
                                      'cursor-pointer text-neutral-100 dark:text-neutral-100-dark':
                                        !isDateDisabled,
                                      'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                                        !isDateDisabled &&
                                        !(isStartSelected || isEndSelected),
                                      'border border-primary-main dark:border-primary-main-dark rounded-md':
                                        isToday(date) &&
                                        !(
                                          isStartSelected ||
                                          isEndSelected ||
                                          isBetween
                                        ),
                                      'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark':
                                        isStartSelected || isEndSelected,
                                      'rounded-tl-md rounded-bl-md':
                                        isStartSelected,
                                      'rounded-tr-md rounded-br-md':
                                        isEndSelected,
                                      'bg-primary-surface dark:bg-primary-surface-dark':
                                        isBetween,
                                    },
                                  )}
                                  disabled={isDateDisabled}
                                >
                                  {date?.getDate()}
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {showTime && (
              <div className="border-l border-neutral-40 dark:border-neutral-40-dark text-14px">
                <div className="h-[45px] border-b border-neutral-40 dark:border-neutral-40-dark" />
                <div className="flex">
                  {(
                    Object.keys(timeValue) as Array<keyof typeof timeValue>
                  ).map((unit) => {
                    const tuUnit = unit as TimeUnit;
                    return (
                      <TimeColumn
                        key={unit}
                        unit={tuUnit}
                        length={tuUnit === TimeUnit.hours ? 24 : 60}
                        selected={timeValue[unit]}
                        onSelect={(val) => handleSelectTime(tuUnit, val)}
                        open={dropdownOpen}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {showTime && (
            <div className="border-t border-neutral-40 dark:border-neutral-40-dark flex items-center justify-end py-2 px-3">
              <button
                type="button"
                onClick={handleConfirmDateTime}
                className={cx(
                  'text-14px py-0.5 px-2 rounded disabled:border',
                  'text-neutral-10 disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 bg-primary-main hover:bg-primary-hover active:bg-primary-pressed',
                  'dark:text-neutral-10-dark dark:disabled:border-neutral-40-dark dark:disabled:text-neutral-60-dark dark:disabled:bg-neutral-30-dark dark:bg-primary-main-dark dark:hover:bg-primary-hover-dark dark:active:bg-primary-pressed-dark',
                )}
                disabled={disabled}
              >
                OK
              </button>
            </div>
          )}
        </>
      )}
      {calendarView === 'month' && (
        <>
          {picker === 'month' && (
            <div className="px-4 flex flex-col gap-4 border-b border-neutral-40 dark:border-neutral-40-dark">
              <div className="shrink-0 flex items-center gap-10 text-neutral-100 dark:text-neutral-100-dark font-medium mb-1">
                <button
                  type="button"
                  className={cx(TAB_BUTTON_CLASS, {
                    [BORDER_PRIMARY]: pointer === 0,
                    'border-transparent': pointer !== 0,
                  })}
                  onClick={() => handleFocus(0)}
                  disabled={pointer === 0}
                >
                  <div className="text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark">
                    Start Month
                  </div>
                  <div className="shrink-0">
                    {tempValue[0]
                      ? dayjs(tempValue[0]).format('MMM YYYY')
                      : '-'}
                  </div>
                </button>
                <button
                  type="button"
                  className={cx(TAB_BUTTON_CLASS, {
                    [BORDER_PRIMARY]: pointer === 1,
                    'border-transparent': pointer !== 1,
                  })}
                  onClick={() => handleFocus(1)}
                  disabled={pointer === 1 || tempValue[0] === null}
                >
                  <div className="text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark">
                    End Month
                  </div>
                  <div className="shrink-0">
                    {tempValue[1]
                      ? dayjs(tempValue[1]).format('MMM YYYY')
                      : '-'}
                  </div>
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark">
            <button
              type="button"
              aria-label="Previous year"
              onClick={() => handleChangeYear(-1)}
              className="p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
            >
              <Icon name="chevron-double-left" size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="text-16px font-medium text-neutral-100 dark:text-neutral-100-dark hover:text-primary-hover dark:hover:text-primary-hover-dark"
              onClick={() => handleChangeView('year')}
            >
              {displayedDate.getFullYear()}
            </button>
            <button
              type="button"
              aria-label="Next year"
              onClick={() => handleChangeYear(1)}
              className="p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
            >
              <Icon name="chevron-double-right" size={20} strokeWidth={2} />
            </button>
          </div>
          <div className="grid grid-cols-3 p-2 gap-y-1 text-14px">
            {MONTH_OF_YEAR.map((item) => {
              const currentMonth =
                displayedDate.getFullYear() * 100 + item.value;
              const isDateDisabled =
                picker === 'month' &&
                disabledDate(
                  new Date(displayedDate.getFullYear(), item.value),
                  tempValue[0],
                );
              const [start, end] = tempValue?.map((v) =>
                v ? v.getFullYear() * 100 + v.getMonth() : null,
              ) ?? [null, null];

              const isStartSelected = start !== null && currentMonth === start;
              const isEndSelected = end !== null && currentMonth === end;
              const isBetween =
                start !== null &&
                end !== null &&
                currentMonth > start &&
                currentMonth < end;

              return (
                <div
                  className="flex justify-center items-center h-12 text-neutral-100 dark:text-neutral-100-dark"
                  key={item.value}
                >
                  <button
                    type="button"
                    onClick={() => handleJumpMonth(item.value)}
                    className={cx(
                      'w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center',
                      {
                        'cursor-not-allowed text-neutral-50 dark:text-neutral-50-dark':
                          isDateDisabled,
                        'cursor-pointer text-neutral-100 dark:text-neutral-100-dark':
                          !isDateDisabled,
                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                          !isDateDisabled &&
                          !(isStartSelected || isEndSelected),
                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark':
                          isStartSelected || isEndSelected,
                        'rounded-tl-md rounded-bl-md': isStartSelected,
                        'rounded-tr-md rounded-br-md': isEndSelected,
                        'bg-primary-surface dark:bg-primary-surface-dark':
                          isBetween,
                      },
                    )}
                    disabled={isDateDisabled}
                  >
                    {item.label}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-3 px-2">
            <CancelButton onClick={() => handleChangeView('date')} />
          </div>
        </>
      )}
      {calendarView === 'year' && (
        <>
          {picker === 'year' && (
            <div className="px-4 flex flex-col gap-4 border-b border-neutral-40 dark:border-neutral-40-dark">
              <div className="shrink-0 flex items-center gap-10 text-neutral-100 dark:text-neutral-100-dark font-medium mb-1">
                <button
                  type="button"
                  className={cx(TAB_BUTTON_CLASS, {
                    [BORDER_PRIMARY]: pointer === 0,
                    'border-transparent': pointer !== 0,
                  })}
                  onClick={() => handleFocus(0)}
                  disabled={pointer === 0}
                >
                  <div className="text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark">
                    Start Year
                  </div>
                  <div className="shrink-0">
                    {tempValue[0] ? dayjs(tempValue[0]).format('YYYY') : '-'}
                  </div>
                </button>
                <button
                  type="button"
                  className={cx(TAB_BUTTON_CLASS, {
                    [BORDER_PRIMARY]: pointer === 1,
                    'border-transparent': pointer !== 1,
                  })}
                  onClick={() => handleFocus(1)}
                  disabled={pointer === 1 || tempValue[0] === null}
                >
                  <div className="text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark">
                    End Year
                  </div>
                  <div className="shrink-0">
                    {tempValue[1] ? dayjs(tempValue[1]).format('YYYY') : '-'}
                  </div>
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark">
            <button
              type="button"
              aria-label="Previous year range"
              onClick={() => handleChangeYear(-12)}
              className="p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
            >
              <Icon name="chevron-double-left" size={20} strokeWidth={2} />
            </button>
            <div className="text-16px font-medium text-neutral-100 dark:text-neutral-100-dark">
              {`${yearRange[0]} - ${yearRange[yearRange.length - 1]}`}
            </div>
            <button
              type="button"
              aria-label="Next year range"
              onClick={() => handleChangeYear(12)}
              className="p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
            >
              <Icon name="chevron-double-right" size={20} strokeWidth={2} />
            </button>
          </div>
          <div className="grid grid-cols-3 p-2 gap-y-1 text-14px">
            {yearRange.map((item) => {
              const isDateDisabled =
                picker === 'year' &&
                disabledDate(
                  new Date(item, displayedDate.getMonth()),
                  tempValue[0],
                );
              const [start, end] = tempValue?.map(
                (v) => v?.getFullYear() ?? null,
              ) ?? [null, null];

              const isStartSelected = start !== null && item === start;
              const isEndSelected = end !== null && item === end;
              const isBetween =
                start !== null && end !== null && item > start && item < end;

              return (
                <div
                  className="flex justify-center items-center h-12 w-20 text-neutral-100 dark:text-neutral-100-dark"
                  key={item}
                >
                  <button
                    type="button"
                    onClick={() => handleJumpYear(item)}
                    className={cx(
                      'w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center',
                      {
                        'cursor-not-allowed text-neutral-50 dark:text-neutral-50-dark':
                          isDateDisabled,
                        'cursor-pointer text-neutral-100 dark:text-neutral-100-dark':
                          !isDateDisabled,
                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                          !isDateDisabled &&
                          !(isStartSelected || isEndSelected),
                        'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark':
                          isStartSelected || isEndSelected,
                        'rounded-tl-md rounded-bl-md': isStartSelected,
                        'rounded-tr-md rounded-br-md': isEndSelected,
                        'bg-primary-surface dark:bg-primary-surface-dark':
                          isBetween,
                      },
                    )}
                    disabled={isDateDisabled}
                  >
                    {item}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-3 px-2">
            <CancelButton onClick={() => handleChangeView('date')} />
          </div>
        </>
      )}
    </div>
  );

  return (
    <div
      id={inputId}
      className={cx(
        'relative text-14px',
        {
          'w-full': fullWidth,
          'flex items-center gap-4': labelPosition === 'left',
        },
        className,
      )}
    >
      {label && (!autoHideLabel || focused) && (
        <InputLabel id={inputStartId} size={size} required={required}>
          {label}
        </InputLabel>
      )}

      <InputBase
        focused={focused}
        error={isError}
        success={successProp}
        disabled={disabled}
        size={size}
        width={width}
        fullWidth={fullWidth}
        containerRef={elementRef}
        endIcons={
          <InputEndIconWrapper
            loading={loading}
            error={isError}
            success={successProp}
            clearable={clearable && focused && !!value}
            onClear={handleClearValue}
          >
            {showCalendarButton && (
              <button
                type="button"
                aria-label={
                  dropdownOpen ? 'Close date picker' : 'Open date picker'
                }
                aria-expanded={dropdownOpen}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => !disabled && handleFocus(0)}
                disabled={disabled}
                className="rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark transition-colors duration-150 disabled:pointer-events-none"
              >
                <Icon name="calendar" size={20} strokeWidth={2} />
              </button>
            )}
          </InputEndIconWrapper>
        }
      >
        <div
          className={cx(
            'flex gap-2 items-center truncate flex-1 text-neutral-90 dark:text-neutral-90-dark',
            {
              'text-14px py-0.5': size === 'default',
              'text-18px py-0.5': size === 'large',
            },
          )}
        >
          <input
            {...props}
            id={inputStartId}
            name={name}
            value={inputValue[0]}
            placeholder={focused ? '' : placeholder || format}
            disabled={disabled}
            aria-invalid={isError || undefined}
            aria-describedby={helperMessage ? helperId : undefined}
            autoComplete="off"
            onBlur={handleBlur}
            onFocus={() => handleFocus(0)}
            onChange={handleChangeInput}
            ref={valueStartRef}
            onKeyDown={handleKeyDown}
            className={cx(
              'w-full truncate outline-none bg-transparent disabled:cursor-not-allowed',
              {
                'text-primary-main dark:text-primary-main-dark font-medium':
                  focused && pointer === 0,
              },
            )}
          />
          {inputValue[0] && (
            <>
              <div>-</div>
              <input
                {...props}
                id={inputEndId}
                name={name}
                value={inputValue[1]}
                placeholder={focused ? '' : placeholder || format}
                disabled={disabled}
                autoComplete="off"
                onBlur={handleBlur}
                onFocus={() => handleFocus(1)}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
                ref={valueEndRef}
                className={cx(
                  'w-full truncate outline-none bg-transparent disabled:cursor-not-allowed',
                  {
                    'text-primary-main dark:text-primary-main-dark font-medium':
                      focused && pointer === 1,
                  },
                )}
              />
            </>
          )}
        </div>
      </InputBase>

      <InputHelper
        id={helperMessage ? helperId : undefined}
        message={helperMessage}
        error={isError}
        size={size}
      />
      <InputDropdown
        open={dropdownOpen}
        elementRef={elementRef}
        dropdownRef={dropdownRef}
        maxHeight={400}
      >
        {dropdownContent}
      </InputDropdown>
    </div>
  );
};

DateRangePicker.isFormInput = true;

export default DateRangePicker;
