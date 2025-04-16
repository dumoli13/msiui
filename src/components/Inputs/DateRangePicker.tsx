/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import { MONTH_LIST, TimeUnit } from '../../const/datePicker';
import {
  SUNDAY_DATE,
  areDatesEqual,
  getYearRange,
  isDateABeforeDateB,
  isDateBetween,
  isToday,
} from '../../libs';
import { formatDate, isValidDate } from '../../libs/inputDate';
import Icon from '../Icon';
import { CancelButton } from './DatePicker';
import InputDropdown from './InputDropdown';

export type InputDateRangeValue = [Date, Date] | null;
export interface InputDateRangePickerRef {
  element: HTMLDivElement | null;
  value: InputDateRangeValue;
  focus: () => void;
  reset: () => void;
}

export interface DateRangePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'size'
  > {
  value?: InputDateRangeValue;
  defaultValue?: InputDateRangeValue;
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  onChange?: (value: InputDateRangeValue) => void;
  helperText?: React.ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  inputRef?:
    | React.RefObject<InputDateRangePickerRef>
    | React.RefCallback<InputDateRangePickerRef>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  loading?: boolean;
  disabledDate?: (date: Date, firstSelectedDate: Date | null) => boolean;
  width?: number;
  showTime?: boolean;
}

/**
 * A date range picker component that allows users to select a start and end date.
 * It supports customization options such as labels, helper text, validation, and disabled dates.
 *
 * @property {InputDateRangeValue} [value] - The selected date range. If provided, the component will be controlled.
 * @property {InputDateRangeValue} [defaultValue] - The initial date range for uncontrolled usage.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the input ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
 * @property {(value: InputDateRangeValue) => void} [onChange] - Callback function triggered when the selected date range changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder='Input date'] - Placeholder text displayed inside the input field when it is empty.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {RefObject<InputDateRangePickerRef> | React.RefCallback<InputDateRangePickerRef>} [inputRef] - A ref to access the date range picker element directly.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message displayed when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {(date: Date, firstSelectedDate: Date | null) => boolean} [disabledDate] - A function to disable specific dates based on custom logic.
 * @property {number} [width] - Optional custom width for the input field.
 * @property {boolean} [showTime=false] - Whether time selection should be enabled in the date range picker.
 */
const DateRangePicker = ({
  id,
  value: valueProp,
  defaultValue,
  label,

  labelPosition = 'top',
  autoHideLabel = false,
  onChange,
  className,
  helperText,
  placeholder = 'Input date',
  disabled: disabledProp = false,
  fullWidth,
  inputRef,
  size = 'default',
  error: errorProp,
  success: successProp,
  loading = false,
  disabledDate = () => false,
  width,
  showTime = false,
  ...props
}: DateRangePickerProps) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [pointer, setPointer] = React.useState<0 | 1>(0);

  const [internalValue, setInternalValue] = React.useState(
    defaultValue || null,
  );
  const isControlled = typeof valueProp !== 'undefined';
  const value = isControlled ? valueProp : internalValue;
  const [tempValue, setTempValue] = React.useState<[Date | null, Date | null]>(
    value || [null, null],
  );
  const [timeValue, setTimeValue] = React.useState({
    hours: (tempValue[0] ? value?.[1] : value?.[0])?.getHours() ?? null, // if
    minutes: (tempValue[0] ? value?.[1] : value?.[0])?.getMinutes() ?? null,
    seconds: (tempValue[0] ? value?.[1] : value?.[0])?.getSeconds() ?? null,
  });

  const [calendarView, setCalendarView] = React.useState<
    'date' | 'month' | 'year'
  >('date');
  const [displayedDate, setDisplayedDate] = React.useState(
    value === null ? new Date() : value[0],
  );
  const yearRange = getYearRange(displayedDate.getFullYear());

  const firstDate = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth(),
    1,
  );
  const lastDate = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth() + 1,
    0,
  );

  const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
  const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

  const helperMessage = errorProp ?? helperText;
  const isError = errorProp;
  const disabled = loading || disabledProp;

  const scrollRefs = {
    hours: React.useRef<HTMLDivElement>(null),
    minutes: React.useRef<HTMLDivElement>(null),
    seconds: React.useRef<HTMLDivElement>(null),
  };

  const itemRefs = {
    hours: React.useRef<(HTMLButtonElement | null)[]>([]),
    minutes: React.useRef<(HTMLButtonElement | null)[]>([]),
    seconds: React.useRef<(HTMLButtonElement | null)[]>([]),
  };

  React.useEffect(() => {
    if (!dropdownOpen) return;

    // Delay to ensure dropdown is fully rendered before scrolling
    setTimeout(() => {
      (Object.keys(timeValue) as Array<keyof typeof timeValue>).forEach(
        (unit) => {
          const value = timeValue[unit];
          const container = scrollRefs[unit]?.current;
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
        },
      );
    }, 50); // Small delay for rendering
  }, [dropdownOpen, timeValue.hours, timeValue.minutes, timeValue.seconds]);

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => {
      elementRef.current?.focus();
    },
    reset: () => {
      setTempValue([null, null]);
      setInternalValue(defaultValue || null);
    },
  }));

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdownContainsTarget = dropdownRef.current?.contains(target);
      const selectElementContainsTarget = elementRef.current?.contains(target);

      if (dropdownContainsTarget || selectElementContainsTarget) {
        elementRef.current?.focus();
        return;
      }

      handleBlur();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = (target: 0 | 1) => {
    if (disabled) return;
    handleChangeView('date');
    setFocused(true);
    setDropdownOpen(true);
    setPointer(target);
  };

  const handleBlur = (event?: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event?.relatedTarget as Node | null;

    const dropdownContainsTarget = dropdownRef.current?.contains(relatedTarget);
    const selectElementContainsTarget =
      elementRef.current?.contains(relatedTarget);

    if (dropdownContainsTarget || selectElementContainsTarget) {
      return;
    }
    setFocused(false);
    setDropdownOpen(false);
  };

  const days: Array<string> = Array.from({ length: 7 }).map((_, idx) =>
    dayFormatter.format(
      new Date(
        SUNDAY_DATE.getFullYear(),
        SUNDAY_DATE.getMonth(),
        SUNDAY_DATE.getDate() + idx,
      ),
    ),
  );

  const dates = Array.from({ length: lastDate.getDate() }).map(
    (_, idx) =>
      new Date(
        firstDate.getFullYear(),
        firstDate.getMonth(),
        firstDate.getDate() + idx,
      ),
  );

  const dateMatrix: Array<Array<Date | null>> = Array(days.length).fill([]);

  while (dates.length > 0) {
    const dateRow = days.map((_, idx) => {
      if (dates.length > 0 && dates[0].getDay() === idx) {
        const currentDate = dates.shift();
        return currentDate ?? null;
      }
      return null;
    });
    dateMatrix.push(dateRow);
  }

  const handleChangeView = (view: 'date' | 'month' | 'year') => {
    setCalendarView(view);
  };

  const handleJumpMonth = (month: number) => {
    if (tempValue[0] !== null && tempValue[1] !== null) {
      setTempValue([null, null]);
    }
    setDisplayedDate(new Date(displayedDate.getFullYear(), month));
    handleChangeView('date');
  };

  const handleJumpYear = (year: number) => {
    if (tempValue[0] !== null && tempValue[1] !== null) {
      setTempValue([null, null]);
    }
    setDisplayedDate(new Date(year, displayedDate.getMonth()));
    setCalendarView('month');
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

  const convertDateOnly = (start: Date | null, end: Date | null) => {
    let newDate: [Date | null, Date | null] = [start, end];

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
        if (pointer === 1) handleBlur();
      } else {
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
      handleChange(newDate as [Date, Date]);
    }
    setTempValue(newDate);
  };

  const convertDateTime = () => {
    const start = tempValue[0];
    const end = tempValue[1];
    const newDate: [Date | null, Date | null] = [start, end];

    if (start !== null && end !== null) {
      /**
       * use selected time instead of start of the day or end of the day
       */
      if (isDateABeforeDateB(start, end)) {
        newDate[0] = start;
        newDate[1] = end;
      } else {
        newDate[0] = end;
        newDate[1] = start;
      }
      handleChange(newDate as [Date, Date]);
    }
    setTempValue(newDate);
  };

  const handleSelectDate = (date: Date) => {
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
        prev[pointer] === newDate
          ? prev
          : (prev.map((v, i) => (i === pointer ? newDate : v)) as [
              Date | null,
              Date | null,
            ]),
      );
    } else {
      if (pointer === 0) {
        convertDateOnly(date, tempValue[1]);
        setPointer(1);
      } else if (pointer === 1) {
        // Do not close dropdown in here in case end value < start value
        convertDateOnly(tempValue[0], date);
      }
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

  const handleChange = (newValue: InputDateRangeValue) => {
    onChange?.(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const handleClearValue = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleChange(null);
    handleBlur();
  };

  React.useEffect(() => {
    if (value === null) {
      setTempValue([null, null]);
      setDisplayedDate(new Date());
    } else {
      setTempValue(value);
      setDisplayedDate(value[0] || new Date());
    }
  }, [value, dropdownOpen]);

  const dropdownContent = (
    <div className="min-w-60">
      {calendarView === 'date' && (
        <>
          <div className="px-4 flex flex-col gap-4 border-b border-neutral-40 dark:border-neutral-40-dark">
            <div className="flex items-center gap-10 text-neutral-100 dark:text-neutral-100-dark font-medium mb-1">
              <button
                type="button"
                className={cx('flex-1 border-b-2', {
                  ' border-primary-main dark:border-primary-main-dark':
                    pointer === 0,
                  'border-transparent': pointer !== 0,
                })}
                onClick={() => handleFocus(0)}
                disabled={pointer === 0} // disable if alreay focus at pointer 0
              >
                <div className="text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark">
                  Start Date
                </div>
                <div>
                  {tempValue[0] ? formatDate(tempValue[0], showTime) : '-'}
                </div>
              </button>
              <button
                type="button"
                className={cx('flex-1 border-b-2', {
                  'border-primary-main dark:border-primary-main-dark':
                    pointer === 1,
                  'border-transparent': pointer !== 1,
                })}
                onClick={() => handleFocus(1)}
                disabled={pointer === 1 || tempValue[0] === null} // disable if already focus at pointer 1 or start date is not selected
              >
                <div className="text-12px font-semibold text-neutral-70 dark:text-neutral-70-dark">
                  End Date
                </div>
                <div>
                  {tempValue[1] ? formatDate(tempValue[1], showTime) : '-'}
                </div>
              </button>
            </div>
          </div>
          <div className="flex">
            <div>
              <div className="flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark">
                <div className="flex items-center">
                  <div
                    role="button"
                    title="Previous Year"
                    onClick={() => handleChangeYear(-1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
                  >
                    <Icon
                      name="chevron-double-left"
                      size={20}
                      strokeWidth={2}
                    />
                  </div>
                  <div
                    role="button"
                    title="Previous Month"
                    onClick={handlePrevMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
                  >
                    <Icon name="chevron-left" size={20} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-16px font-semibold text-neutral-100 dark:text-neutral-100-dark">
                  <div
                    role="button"
                    className="shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-[84px]"
                    onClick={() => handleChangeView('month')}
                  >
                    {monthFormatter.format(displayedDate)}
                  </div>
                  <div
                    role="button"
                    className="shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-10"
                    onClick={() => handleChangeView('year')}
                  >
                    {displayedDate.getFullYear()}
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    role="button"
                    title="Next Month"
                    onClick={handleNextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
                  >
                    <Icon name="chevron-right" size={20} strokeWidth={2} />
                  </div>
                  <div
                    role="button"
                    title="Next Year"
                    onClick={() => handleChangeYear(1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
                  >
                    <Icon
                      name="chevron-double-right"
                      size={20}
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>
              <div className="text-12px p-2">
                <table className="w-full">
                  <thead>
                    <tr>
                      {days.map((day) => (
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

                          const handleChooseDate = (date: Date | null) => {
                            if (!date || isDateDisabled) return;
                            handleSelectDate(date);
                          };

                          return (
                            <td
                              key={dateIdx}
                              aria-label={
                                date ? date.toDateString() : 'Disabled date'
                              }
                              className="px-0"
                            >
                              <div
                                role="button"
                                onClick={() => handleChooseDate(date)}
                                className={cx(
                                  'text-14px mt-0.5 h-7 transition-colors duration-200 ease-in flex items-center justify-center',
                                  {
                                    'cursor-default text-neutral-30 dark:text-neutral-30-dark':
                                      isDateDisabled,
                                    'cursor-pointer text-neutral-100 dark:text-neutral-100-dark':
                                      !isDateDisabled,
                                    'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                                      !isDateDisabled &&
                                      !(isStartSelected || isEndSelected),
                                    'border border-primary-main dark:border-primary-main-dark':
                                      isToday(date) &&
                                      !(isStartSelected || isEndSelected),
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
                              >
                                {date?.getDate()}
                              </div>
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
                <div className="h-[49px] border-b border-neutral-40 dark:border-neutral-40-dark" />
                <div className="flex">
                  {Object.keys(TimeUnit).map((key) => {
                    const unit = key as TimeUnit;
                    const length = unit === TimeUnit.hours ? 24 : 60;
                    return (
                      <div
                        key={unit}
                        ref={scrollRefs[unit]}
                        className="text-neutral-100 dark:text-neutral-100-dark max-h-[234px] overflow-y-auto p-2 apple-scrollbar flex flex-col gap-1 border-l border-neutral-40 dark:border-neutral-40-dark first:border-none"
                      >
                        {Array.from({ length }).map((_, idx) => (
                          <button
                            type="button"
                            key={idx}
                            ref={(el) => {
                              itemRefs[unit].current[idx] = el;
                            }}
                            className={cx('w-10 text-center rounded py-0.5', {
                              'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark cursor-default':
                                idx === timeValue[unit],
                              'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                                idx !== timeValue[unit],
                            })}
                            onClick={() => handleSelectTime(unit, idx)}
                          >
                            {idx.toString().padStart(2, '0')}
                          </button>
                        ))}
                      </div>
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
          <div className="flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark">
            <div
              role="button"
              title="Previous Year"
              onClick={() => handleChangeYear(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
            >
              <Icon name="chevron-double-left" size={20} strokeWidth={2} />
            </div>
            <div
              role="button"
              className="text-16px font-medium text-neutral-100 dark:text-neutral-100-dark hover:text-primary-hover dark:hover:text-primary-hover-dark"
              onClick={() => handleChangeView('year')}
            >
              {displayedDate.getFullYear()}
            </div>
            <div
              role="button"
              title="Next Year"
              onClick={() => handleChangeYear(1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
            >
              <Icon name="chevron-double-right" size={20} strokeWidth={2} />
            </div>
          </div>
          <div className="grid grid-cols-3 p-2 gap-y-1 text-14px">
            {MONTH_LIST.map((item) => {
              const currentMonth =
                displayedDate.getFullYear() * 100 + item.value;
              const [start, end] = tempValue?.map((v) =>
                v ? v.getFullYear() * 100 + v.getMonth() : null,
              ) || [null, null];

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
                  <div
                    role="button"
                    onClick={() => handleJumpMonth(item.value)}
                    className={cx(
                      'w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center',
                      {
                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                          !isStartSelected,
                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark':
                          isStartSelected || isEndSelected,
                        'rounded-tl-md rounded-bl-md': isStartSelected,
                        'rounded-tr-md rounded-br-md': isEndSelected,
                        'bg-primary-surface dark:bg-primary-surface-dark':
                          isBetween,
                      },
                    )}
                  >
                    {item.label}
                  </div>
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
          <div className="flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark">
            <div
              role="button"
              title="Previous Year"
              onClick={() => handleChangeYear(-12)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
            >
              <Icon name="chevron-double-left" size={20} strokeWidth={2} />
            </div>
            <div className="text-16px font-medium text-neutral-100 dark:text-neutral-100-dark">
              {`${yearRange[0]} - ${yearRange[yearRange.length - 1]}`}
            </div>
            <div
              role="button"
              title="Next Year"
              onClick={() => handleChangeYear(12)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25"
            >
              <Icon name="chevron-double-right" size={20} strokeWidth={2} />
            </div>
          </div>
          <div className="grid grid-cols-3 p-2 gap-y-1 text-14px">
            {yearRange.map((item) => {
              const isDateSelected = displayedDate.getMonth() === item;
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
                  <div
                    role="button"
                    onClick={() => handleJumpYear(item)}
                    className={cx(
                      'cursor-pointer w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center',
                      {
                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                          !isDateSelected,
                        'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark':
                          isStartSelected || isEndSelected,
                        'rounded-tl-md rounded-bl-md': isStartSelected,
                        'rounded-tr-md rounded-br-md': isEndSelected,
                        'bg-primary-surface dark:bg-primary-surface-dark':
                          isBetween,
                      },
                    )}
                  >
                    {item}
                  </div>
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
      className={cx(
        'relative text-14px',
        {
          'w-full': fullWidth,
          'flex items-center gap-4': labelPosition === 'left',
        },
        className,
      )}
    >
      {((autoHideLabel && focused) || !autoHideLabel) && label && (
        <label
          htmlFor={id}
          className={cx(
            'shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1',
            {
              'text-14px': size === 'default',
              'text-18px': size === 'large',
            },
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cx(
          'relative px-3 border rounded-md py-1 flex gap-2 items-center',
          {
            'w-full': fullWidth,
            'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark':
              isError,
            'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark':
              !isError && successProp,
            'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark':
              !isError && !successProp && !disabled,
            'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark':
              disabled,
            'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main':
              !disabled,
            'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark':
              focused,
          },
        )}
        ref={elementRef}
        style={width ? { width } : undefined}
      >
        <div
          className={cx(
            'flex gap-2 items-center truncate flex-1 text-neutral-90 dark:text-neutral-90-dark',
            {
              'text-14px py-1.5': size === 'default',
              'text-18px py-3': size === 'large',
            },
          )}
        >
          {value ? (
            <>
              <input
                {...props}
                tabIndex={!disabled ? 0 : -1}
                id={id}
                value={
                  isValidDate(value[0]) ? formatDate(value[0], showTime) : ''
                }
                placeholder={focused ? '' : placeholder}
                className="truncate outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed"
                disabled={disabled}
                aria-label={label}
                autoComplete="off"
                onBlur={handleBlur}
                onFocus={() => handleFocus(0)}
                onClick={() => handleFocus(0)}
                onChange={() => {}}
              />
              <div>-</div>
              <input
                {...props}
                tabIndex={!disabled ? 0 : -1}
                id={id}
                value={
                  isValidDate(value[1]) ? formatDate(value[1], showTime) : ''
                }
                placeholder={focused ? '' : placeholder}
                className="truncate outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed"
                disabled={disabled}
                aria-label={label}
                autoComplete="off"
                onBlur={handleBlur}
                onFocus={() => handleFocus(1)}
                onClick={() => handleFocus(1)}
                onChange={() => {}}
              />
            </>
          ) : (
            <input
              {...props}
              value={''}
              tabIndex={!disabled ? 0 : -1}
              id={id}
              placeholder={focused ? '' : placeholder}
              className="flex-1 truncate outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed"
              disabled={disabled}
              aria-label={label}
              autoComplete="off"
              onBlur={handleBlur}
              onFocus={() => handleFocus(0)}
              onClick={() => handleFocus(0)}
              onChange={() => {}}
            />
          )}
        </div>
        <div
          className={cx('flex gap-1 items-center', {
            'text-16px': size === 'default',
            'text-20px': size === 'large',
          })}
        >
          {focused && !!value ? (
            <div
              title="Clear"
              role="button"
              onMouseDown={handleClearValue}
              className="rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color"
            >
              <Icon name="x-mark" strokeWidth={3} />
            </div>
          ) : (
            <div
              title="Open"
              role="button"
              onClick={() => handleFocus(0)}
              className="rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color"
            >
              <Icon name="calendar" strokeWidth={2} />
            </div>
          )}
          {loading && (
            <div
              className={cx('text-neutral-70 dark:text-neutral-70-dark', {
                'text-16px': size === 'default',
                'text-20px': size === 'large',
              })}
            >
              <Icon name="loader" animation="spin" strokeWidth={2} />
            </div>
          )}
          {successProp && (
            <div
              className={cx(
                'shrink-0 rounded-full bg-success-main dark:bg-success-main-dark text-neutral-10 dark:text-neutral-10-dark flex items-center justify-center',
                {
                  'h-4 w-4 text-12px': size === 'default',
                  'h-5 w-5 text-16px': size === 'large',
                },
              )}
            >
              <Icon name="check" strokeWidth={3} />
            </div>
          )}
          {isError && (
            <div
              className={cx(
                'shrink-0 rounded-full bg-danger-main dark:bg-danger-main-dark text-neutral-10 dark:text-neutral-10-dark font-bold flex items-center justify-center',
                {
                  'h-4 w-4 text-12px': size === 'default',
                  'h-5 w-5 text-16px': size === 'large',
                },
              )}
            >
              !
            </div>
          )}
        </div>
      </div>
      {helperMessage && (
        <div
          className={cx('w-full text-left mt-1', {
            'text-danger-main dark:text-danger-main-dark': isError,
            'text-neutral-60 dark:text-neutral-60-dark': !isError,
            'text-12px': size === 'default',
            'text-16px': size === 'large',
          })}
        >
          {helperMessage}
        </div>
      )}
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

export default DateRangePicker;
