/* eslint-disable react/no-array-index-key */
import React, {
  InputHTMLAttributes,
  ReactNode,
  RefCallback,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from 'react-feather';
import { MONTH_LIST } from '../../const/datePicker';
import {
  SUNDAY_DATE,
  areDatesEqual,
  getYearRange,
  isDateABeforeDateB,
  isDateBetween,
  isDateTimeABeforeOrEqualToDateB,
  isToday,
} from '../../libs';
import Button from './Button';
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
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'size'
  > {
  value?: InputDateRangeValue;
  defaultValue?: InputDateRangeValue;
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  onChange?: (value: InputDateRangeValue) => void;
  helperText?: ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  inputRef?:
    | RefObject<InputDateRangePickerRef>
    | RefCallback<InputDateRangePickerRef>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  disabledDate?: (date: Date, firstSelectedDate: Date | null) => boolean;
  width?: number;
}
const formatDate = (date?: Date) =>
  date ? dayjs(date).format('D/M/YYYY') : '';

const DateRangePicker = ({
  id,
  value: valueProp,
  defaultValue,
  label,
  labelPosition = 'top',
  onChange,
  className,
  helperText,
  placeholder = 'input date',
  disabled = false,
  fullWidth,
  inputRef,
  size = 'default',
  error: errorProp,
  success: successProp,
  disabledDate = () => false,
  width,
  ...props
}: DateRangePickerProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [internalValue, setInternalValue] = useState(defaultValue || null);
  const isControlled = typeof valueProp !== 'undefined';
  const value = isControlled ? valueProp : internalValue;
  const [tempValue, setTempValue] = useState<
    [Date, Date] | [Date, null] | [null, null]
  >(value || [null, null]);

  const [calendarView, setCalendarView] = useState<'date' | 'month' | 'year'>(
    'date',
  );
  const [displayedDate, setDisplayedDate] = useState(
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

  const helperMessage = errorProp || helperText;
  const isError = errorProp;

  useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => {
      elementRef.current?.focus();
    },
    reset: () => {
      setTempValue([null, null]);
      setInternalValue(null);
    },
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdownContainsTarget = dropdownRef.current?.contains(target);
      const selectElementContainsTarget = elementRef.current?.contains(target);

      if (dropdownContainsTarget || selectElementContainsTarget) {
        elementRef.current?.focus();
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
    if (disabled) return;
    setCalendarView('date');
    setFocused(true);
    setDropdownOpen(true);
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

  const handleDropdown = () => {
    if (disabled) return;
    setFocused(true);
    setDropdownOpen((prev) => {
      return !prev;
    });
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

  const handleViewDate = () => {
    setCalendarView('date');
  };

  const handleViewMonth = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCalendarView('month');
  };

  const handleViewYear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCalendarView('year');
  };

  const handleJumpMonth =
    (month: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (tempValue[0] !== null && tempValue[1] !== null) {
        setTempValue([null, null]);
      }
      setDisplayedDate(new Date(displayedDate.getFullYear(), month));
      setCalendarView('date');
    };

  const handleJumpYear =
    (year: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (tempValue[0] !== null && tempValue[1] !== null) {
        setTempValue([null, null]);
      }
      setDisplayedDate(new Date(year, displayedDate.getMonth()));
      setCalendarView('month');
    };

  const handlePrevMonth = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const prevMonth =
      displayedDate.getMonth() === 0 ? 11 : displayedDate.getMonth() - 1;
    const prevYear =
      displayedDate.getMonth() === 0
        ? displayedDate.getFullYear() - 1
        : displayedDate.getFullYear();
    setDisplayedDate(new Date(prevYear, prevMonth));
  };

  const handleNextMonth = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const nextMonth =
      displayedDate.getMonth() === 11 ? 0 : displayedDate.getMonth() + 1;
    const nextYear =
      displayedDate.getMonth() === 11
        ? displayedDate.getFullYear() + 1
        : displayedDate.getFullYear();
    setDisplayedDate(new Date(nextYear, nextMonth));
  };

  const handlePrevYear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDisplayedDate(
      new Date(displayedDate.getFullYear() - 1, displayedDate.getMonth()),
    );
  };

  const handleNextYear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDisplayedDate(
      new Date(displayedDate.getFullYear() + 1, displayedDate.getMonth()),
    );
  };

  const handlePrev12Year = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDisplayedDate(
      new Date(displayedDate.getFullYear() - 12, displayedDate.getMonth()),
    );
  };

  const handleNext12Year = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDisplayedDate(
      new Date(displayedDate.getFullYear() + 12, displayedDate.getMonth()),
    );
  };

  const handleSelectDate = (date: Date) => {
    if (tempValue[0] !== null && tempValue[1] !== null) {
      setTempValue([date, null]);
    } else if (tempValue[0] !== null) {
      let newDate: [Date, Date];
      if (isDateABeforeDateB(date, tempValue[0])) {
        newDate = [
          dayjs(date).endOf('day').toDate(),
          dayjs(tempValue[0]).startOf('day').toDate(),
        ];
      } else {
        newDate = [
          dayjs(tempValue[0]).endOf('day').toDate(),
          dayjs(date).startOf('day').toDate(),
        ];
      }

      setTempValue(newDate);
      handleChange(newDate);
      setDisplayedDate(tempValue === null ? new Date() : newDate[0]);
      handleBlur();
    } else {
      setTempValue([date, null]);
    }
  };

  const handleChange = (newValue: InputDateRangeValue | null) => {
    onChange?.(newValue);
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

  const handleClearValue = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const dropdownContent = (
    <div className="min-w-60">
      <div className="px-4 flex flex-col gap-4">
        <div className="flex items-center gap-4 text-neutral-100 font-medium">
          <div className="flex-1">
            <div className="text-12px font-semibold text-neutral-70">
              Start Date
            </div>
            <div>
              {tempValue[0] ? dayjs(tempValue[0]).format('D/M/YYYY') : '-'}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-12px font-semibold text-neutral-70">
              End Date
            </div>
            <div>
              {tempValue[1] ? dayjs(tempValue[1]).format('D/M/YYYY') : '-'}
            </div>
          </div>
        </div>
      </div>
      {calendarView === 'date' && (
        <>
          <div className="flex justify-between items-center gap-2 p-2">
            <div className="flex items-center">
              <div
                role="button"
                title="Previous Year"
                onMouseDown={handlePrevYear}
                className="rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25"
              >
                <ChevronsLeft width={20} height={20} strokeWidth={2} />
              </div>
              <div
                role="button"
                title="Previous Year"
                onMouseDown={handlePrevMonth}
                className="rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25"
              >
                <ChevronLeft width={20} height={20} strokeWidth={2} />
              </div>
            </div>
            <div className="flex items-center gap-4 text-16px font-medium">
              <div
                role="button"
                className="hover:text-primary-hover w-[84px]"
                onMouseDown={handleViewMonth}
              >
                {monthFormatter.format(displayedDate)}
              </div>
              <div
                role="button"
                className="hover:text-primary-hover w-10"
                onMouseDown={handleViewYear}
              >
                {displayedDate.getFullYear()}
              </div>
            </div>
            <div className="flex items-center">
              <div
                role="button"
                title="Previous Year"
                onMouseDown={handleNextMonth}
                className="rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25"
              >
                <ChevronRight width={20} height={20} strokeWidth={2} />
              </div>
              <div
                role="button"
                title="Previous Year"
                onMouseDown={handleNextYear}
                className="rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25"
              >
                <ChevronsRight width={20} height={20} strokeWidth={2} />
              </div>
            </div>
          </div>
          <div className="text-12px p-2 border-t border-neutral-40">
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

                      const handleChooseDate =
                        (date: Date | null) =>
                        (e: React.MouseEvent<HTMLDivElement>) => {
                          if (!date || isDateDisabled) return;
                          e?.preventDefault();
                          e?.stopPropagation();

                          handleSelectDate(date);
                        };

                      return (
                        <td
                          key={dateIdx}
                          aria-label={
                            date ? date.toDateString() : 'Disabled date'
                          }
                        >
                          <div
                            role="button"
                            onMouseDown={handleChooseDate(date)}
                            className={cx(
                              'text-14px mt-0.5 h-7 transition-colors duration-200 ease-in flex items-center justify-center',
                              {
                                'cursor-default text-neutral-30':
                                  isDateDisabled,
                                'cursor-pointer text-neutral-100':
                                  !isDateDisabled,
                                'hover:bg-neutral-20':
                                  !isDateDisabled &&
                                  !(isStartSelected || isEndSelected),
                                'border border-primary-main':
                                  isToday(date) &&
                                  !(isStartSelected || isEndSelected),
                                'bg-primary-main !text-neutral-10':
                                  isStartSelected || isEndSelected,
                                'rounded-tl-md rounded-bl-md': isStartSelected,
                                'rounded-tr-md rounded-br-md': isEndSelected,
                                'bg-primary-surface': isBetween,
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
        </>
      )}
      {calendarView === 'month' && (
        <>
          <div className="flex justify-between items-center gap-2 p-2">
            <div
              role="button"
              title="Previous Year"
              onMouseDown={handlePrevYear}
              className="rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25"
            >
              <ChevronsLeft width={20} height={20} strokeWidth={2} />
            </div>
            <div
              role="button"
              className="text-16px font-medium hover:text-primary-hover"
              onMouseDown={handleViewYear}
            >
              {displayedDate.getFullYear()}
            </div>
            <div
              role="button"
              title="Previous Year"
              onMouseDown={handleNextYear}
              className="rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25"
            >
              <ChevronsRight width={20} height={20} strokeWidth={2} />
            </div>
          </div>
          <div className="grid grid-cols-3 p-2 border-t border-neutral-40 gap-y-1 text-14px">
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
                <div className="flex items-center" key={item.value}>
                  <div
                    role="button"
                    onMouseDown={handleJumpMonth(item.value)}
                    className={cx(
                      'w-full h-8 cursor-pointer transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center',
                      {
                        'hover:bg-neutral-20': !isStartSelected,
                        'bg-primary-main !text-neutral-10':
                          isStartSelected || isEndSelected,
                        'rounded-tl-md rounded-bl-md': isStartSelected,
                        'rounded-tr-md rounded-br-md': isEndSelected,
                        'bg-primary-surface': isBetween,
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
            <Button variant="outlined" size="small" onClick={handleViewDate}>
              Cancel
            </Button>
          </div>
        </>
      )}
      {calendarView === 'year' && (
        <>
          <div className="flex justify-between items-center gap-2 p-2">
            <div
              role="button"
              title="Previous Year"
              onMouseDown={handlePrev12Year}
              className="rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25"
            >
              <ChevronsLeft width={20} height={20} strokeWidth={2} />
            </div>
            <div className="text-16px font-medium">
              {`${yearRange[0]} - ${yearRange[yearRange.length - 1]}`}
            </div>
            <div
              role="button"
              title="Previous Year"
              onMouseDown={handleNext12Year}
              className="rounded-full p-1 hover:bg-neutral-20 text-neutral-100/25"
            >
              <ChevronsRight width={20} height={20} strokeWidth={2} />
            </div>
          </div>
          <div className="grid grid-cols-3 p-2 border-t border-neutral-40 gap-y-1 text-14px">
            {yearRange.map((item) => {
              const isDateSelected = displayedDate.getMonth() === item;
              const [start, end] = tempValue?.map(
                (v) => v?.getFullYear() || null,
              ) ?? [null, null];

              const isStartSelected = start !== null && item === start;
              const isEndSelected = end !== null && item === end;
              const isBetween =
                start !== null && end !== null && item > start && item < end;

              return (
                <div className="flex items-center" key={item}>
                  <div
                    role="button"
                    onMouseDown={handleJumpYear(item)}
                    className={cx(
                      'cursor-pointer w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center',
                      {
                        'hover:bg-neutral-20': !isDateSelected,
                        'bg-primary-main !text-neutral-10':
                          isStartSelected || isEndSelected,
                        'rounded-tl-md rounded-bl-md': isStartSelected,
                        'rounded-tr-md rounded-br-md': isEndSelected,
                        'bg-primary-surface': isBetween,
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
            <Button variant="outlined" size="small" onClick={handleViewDate}>
              Cancel
            </Button>
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
      {label && (
        <label
          htmlFor={id}
          className={cx('block text-left text-12px text-neutral-80 mb-1', {
            'text-12px': size === 'default',
            'text-20px': size === 'large',
          })}
        >
          {label}
        </label>
      )}
      <div
        className={cx(
          'bg-neutral-10 relative px-4 border rounded-md py-1 flex gap-2 items-center',
          {
            'w-full': fullWidth,
            'border-danger-main focus:ring-danger-focus': isError,
            'border-success-main focus:ring-success-focus':
              !isError && successProp,
            'border-neutral-50 hover:border-primary-main focus:ring-neutral-focus':
              !isError && !successProp && !disabled,
            'bg-neutral-20 cursor-not-allowed text-neutral-60 hover:!border-neutral-50':
              disabled,
            'shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main':
              !disabled,
            'ring-3 ring-primary-focus !border-primary-main': focused,
          },
        )}
        ref={elementRef}
        style={width ? { width } : undefined}
      >
        <input
          {...props}
          tabIndex={!disabled ? 0 : -1}
          id={id}
          value={
            value && dayjs(value[0]).isValid() && dayjs(value[1]).isValid()
              ? `${formatDate(value[0])} - ${formatDate(value[1])}`
              : ''
          }
          placeholder={focused ? '' : placeholder}
          className={cx(
            'w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed',
            {
              'text-16px': size === 'default',
              'text-18px': size === 'large',
              'py-1.5': size === 'default',
              'py-[12.5px]': size === 'large',
            },
          )}
          disabled={disabled}
          aria-label={label}
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleFocus}
          onChange={() => {}}
        />
        <div className="flex gap-0.5 items-center">
          {focused && !!value ? (
            <div
              title="Clear"
              role="button"
              onMouseDown={handleClearValue}
              className="rounded-full hover:bg-neutral-30 p-1.5 text-neutral-70 transition-color"
            >
              <X width={16} height={16} strokeWidth={2} />
            </div>
          ) : (
            <div
              title="Open"
              role="button"
              onClick={handleDropdown}
              className="rounded-full hover:bg-neutral-30 p-1.5 text-neutral-70 transition-color"
            >
              <Calendar width={16} height={16} />
            </div>
          )}
          {successProp && (
            <div className="rounded-full bg-success-main p-0.5 text-neutral-10">
              <Check width={10} height={10} strokeWidth={3} />
            </div>
          )}
          {isError && (
            <div className="rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center">
              !
            </div>
          )}
        </div>
      </div>

      {helperMessage && (
        <div
          className={`w-full text-left mt-1 text-12px ${
            isError ? 'text-danger-main' : 'text-neutral-60'
          }`}
        >
          {helperMessage}
        </div>
      )}
      <InputDropdown
        open={isDropdownOpen}
        elementRef={elementRef}
        dropdownRef={dropdownRef}
        maxHeight={320}
      >
        {dropdownContent}
      </InputDropdown>
    </div>
  );
};

export default DateRangePicker;
