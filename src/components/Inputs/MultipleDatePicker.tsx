/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { MONTH_LIST } from '../../const/datePicker';
import { SUNDAY_DATE, areDatesEqual, getYearRange, isToday } from '../../libs';
import { Tag } from '../Displays';
import Icon from '../Icon';
import { CancelButton } from './DatePicker';
import InputDropdown from './InputDropdown';

export type InputMultipleDateValue = Date[];
export interface InputMultipleDatePickerRef {
  element: HTMLDivElement | null;
  value: InputMultipleDateValue;
  focus: () => void;
  reset: () => void;
}
export interface MultipleDatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'size'
  > {
  value?: InputMultipleDateValue;
  defaultValue?: InputMultipleDateValue;
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  onChange?: (value: InputMultipleDateValue) => void;
  helperText?: React.ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  inputRef?:
    | React.RefObject<InputMultipleDatePickerRef | null>
    | React.RefCallback<InputMultipleDatePickerRef | null>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  loading?: boolean;
  disabledDate?: (
    date: Date,
    firstSelectedDate: InputMultipleDateValue,
  ) => boolean;
  width?: number;
}

/**
 * MultipleDatePicker Component
 *
 * A date picker input component that allows users to select a date, month, or year.
 * The component provides a calendar view with the option to select a date, switch to month or year views,
 * and also supports clearing the selected value, selecting today's date, and disabling specific dates.
 * It is highly customizable, supporting error messages, success states, and additional helper text.
 * Multiple selection doest not support showTime
 *
 * @property {InputDateValue} value - The currently selected date. If provided, the component behaves as a controlled component.
 * @property {InputDateValue} [defaultValue=null] - The default date to display if no value is provided (used in uncontrolled mode).
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether to hide the label when the input is focused.
 * @property {function} [onChange] - Callback function invoked when the date changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder='Input date'] - Placeholder text for the input field.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {RefObject<InputDatePickerRef>} [inputRef] - A reference to the date picker input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {function} [disabledDate] - A function to determine if a specific date is disabled (not selectable).
 * @property {number} [width] - Optional custom width for the input field. *
 *
 */

const MultipleDatePicker = ({
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
}: MultipleDatePickerProps) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const [internalValue, setInternalValue] = React.useState(defaultValue || []);
  const isControlled = typeof valueProp !== 'undefined';
  const value = isControlled ? valueProp : internalValue;
  const [tempValue, setTempValue] = React.useState<InputMultipleDateValue>([]);

  const [calendarView, setCalendarView] = React.useState<
    'date' | 'month' | 'year'
  >('date');
  const [displayedDate, setDisplayedDate] = React.useState(
    value.length === 0 ? new Date() : value[0],
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
  const disabled = loading || disabledProp;

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => {
      elementRef.current?.focus();
    },
    reset: () => {
      setInternalValue(defaultValue || []);
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

  const handleFocus = () => {
    if (disabled) return;
    handleChangeView('date');
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

  const handleChangeView = (view: 'date' | 'month' | 'year') => {
    setCalendarView(view);
  };

  const handleJumpMonth = (month: number) => {
    setDisplayedDate(new Date(displayedDate.getFullYear(), month));
    handleChangeView('date');
  };

  const handleJumpYear = (year: number) => {
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

  const handleChange = (newValue: InputMultipleDateValue) => {
    onChange?.(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }

    setDisplayedDate(newValue[newValue.length - 1] || new Date());
  };

  const handleClearValue = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleChange([]);
  };

  React.useEffect(() => {
    setTempValue(value);
    setDisplayedDate(value[0] || new Date());
  }, [value, isDropdownOpen]);

  const dropdownContent = (
    <div className="min-w-60">
      {calendarView === 'date' && (
        <>
          <div className="flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark">
            <div className="flex items-center">
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
                <Icon name="chevron-double-right" size={20} strokeWidth={2} />
              </div>
            </div>
          </div>
          <div className="text-12px p-2 border-neutral-40 dark:border-neutral-40-dark">
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
                        date === null || disabledDate(date, tempValue);
                      const isDateSelected = date
                        ? tempValue !== null && areDatesEqual(date, tempValue)
                        : false;

                      const handleChooseDate = (date: Date) => {
                        if (isDateDisabled) return;

                        const newValue = [...value];

                        if (isDateSelected) {
                          handleChange(
                            newValue.filter(
                              (item) => item.getTime() !== date.getTime(),
                            ),
                          );
                        } else {
                          newValue.push(date);
                          handleChange(newValue);
                        }
                      };

                      return (
                        <td
                          key={dateIdx}
                          aria-label={
                            date ? date.toDateString() : 'Disabled date'
                          }
                          className="px-0"
                        >
                          <div className="flex justify-center items-center">
                            {date && (
                              <div
                                role="button"
                                onClick={() => handleChooseDate(date)}
                                className={cx(
                                  'rounded-md text-14px mt-0.5 transition-colors duration-200 ease-in w-7 h-7 flex items-center justify-center',
                                  {
                                    'cursor-default text-neutral-30 dark:text-neutral-30-dark':
                                      isDateDisabled,
                                    'cursor-pointer text-neutral-100 dark:text-neutral-100-dark':
                                      !isDateDisabled,
                                    'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                                      !isDateDisabled && !isDateSelected,
                                    'border border-primary-main dark:border-primary-main-dark':
                                      isToday(date) && !isDateSelected,
                                    'bg-primary-main dark:bg-primary-main-dark !text-neutral-10 dark:!text-neutral-10-dark':
                                      isDateSelected,
                                  },
                                )}
                              >
                                {date.getDate()}
                              </div>
                            )}
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
              const isDateSelected = value.some(
                (dateItem) =>
                  dateItem.getFullYear() === displayedDate.getFullYear() &&
                  dateItem.getMonth() === item.value,
              );

              return (
                <div
                  className="flex justify-center items-center h-12 text-neutral-100 dark:text-neutral-100-dark"
                  key={item.value}
                >
                  <div
                    role="button"
                    onClick={() => handleJumpMonth(item.value)}
                    className={cx(
                      'w-full h-8 transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md',
                      {
                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                          !isDateSelected,
                        'bg-primary-main text-neutral-10 rounded-md':
                          isDateSelected,
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
              const dateList = value.map((v) => v.getFullYear());
              const isDateSelected = dateList.includes(item);

              return (
                <div
                  className="flex justify-center items-center h-12 w-20 text-neutral-100 dark:text-neutral-100-dark"
                  key={item}
                >
                  <div
                    role="button"
                    onClick={() => handleJumpYear(item)}
                    className={cx(
                      'cursor-pointer transition-colors duration-200 ease-in px-3 py-0.5 flex items-center justify-center rounded-md',
                      {
                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                          !isDateSelected,
                        'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark':
                          isDateSelected,
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
          role="button"
          tabIndex={!disabled ? 0 : -1}
          aria-pressed="true"
          className={cx('flex flex-1 gap-2 items-center flex-wrap', {
            'w-full': fullWidth,
            'cursor-text': !disabled,
            'cursor-not-allowed': disabled,
          })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleFocus}
        >
          {value?.map((selected, index) => {
            const tagValue = dayjs(selected).format('D/M/YYYY');
            return (
              <div
                className={cx({
                  'h-[32px]': size === 'default',
                  'h-[44px]': size === 'large',
                })}
                key={tagValue}
              >
                {disabled ? (
                  <Tag color="neutral">{tagValue}</Tag>
                ) : (
                  <Tag
                    color="info"
                    onRemove={
                      isControlled
                        ? undefined
                        : () =>
                            handleChange(value.filter((_, i) => i !== index))
                    }
                  >
                    {tagValue}
                  </Tag>
                )}
              </div>
            );
          })}
          {value.length === 0 && (
            <div
              className={cx(
                'w-full outline-none truncate text-neutral-70 dark:text-neutral-70-dark',
                {
                  'text-14px h-[32px]': size === 'default',
                  'text-18px h-[44px]': size === 'large',
                  'py-1.5': size === 'default',
                  'py-3': size === 'large',
                },
              )}
            >
              {placeholder}
            </div>
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
              onClick={handleDropdown}
              className="rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color"
            >
              <Icon name="calendar" strokeWidth={2} />
            </div>
          )}
          {loading && (
            <div className="text-neutral-70 dark:text-neutral-70-dark">
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

export default MultipleDatePicker;
