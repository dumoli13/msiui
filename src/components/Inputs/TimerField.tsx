import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';

const formatValue = (value: string | number | null | undefined) => {
  if (value === '' || value === null || value === undefined) {
    return '';
  }

  const numberValue = Number(value);
  if (isNaN(numberValue)) return value.toString(); // In case it's not a valid number

  // Format number with thousand separators
  return numberValue.toLocaleString('en-US');
};

export interface TimerTextfieldRef {
  element: HTMLInputElement | null;
  value: number | null;
  focus: () => void;
  reset: () => void;
}

export interface TimerFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'size'
  > {
  id?: string;
  value?: number | null;
  defaultValue?: number | null;
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  onChange?: (value: number | null) => void;
  className?: string;
  helperText?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clearable?: boolean;
  inputRef?:
    | React.RefObject<TimerTextfieldRef>
    | React.RefCallback<TimerTextfieldRef>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  loading?: boolean;
  width?: number;
}

/**
 *
 * A customizable input field designed for numeric values. This component formats and displays numbers with thousand separators, and it supports various features including label positioning, value clearing, validation feedback, and more.
 *
 * @property {number | null} [value] - The current value of the number field, passed from the parent component.
 * @property {number | null} [defaultValue] - The initial value of the number field when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should hide when the user starts typing.
 * @property {(value: number | null) => void} [onChange] - Callback function when the number value changes.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {boolean} [clearable=false] - If `true`, a clear button will appear when the field is focused and has a value.
 * @property {RefObject<TimerTextfieldRef> | React.RefCallback<TimerTextfieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 */

const TimerField = ({
  id,
  value: valueProp,
  defaultValue = valueProp,
  label,

  labelPosition = 'top',
  autoHideLabel = false,
  onChange,
  className,
  helperText,
  disabled: disabledProp = false,
  fullWidth,
  startIcon,
  endIcon,
  clearable = false,
  inputRef,
  size = 'default',
  error: errorProp,
  success: successProp,
  loading = false,
  width,
  ...props
}: TimerFieldProps) => {
  const elementRef = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState<
    'hour' | 'minute' | 'second' | null
  >(null);
  const [internalValue, setInternalValue] = React.useState<number | null>(
    defaultValue !== undefined ? defaultValue : null,
  );

  const isControlled = valueProp !== undefined;

  // Sync `internalStringValue` with `valueProp` when `valueProp` changes
  const value = isControlled ? valueProp : internalValue;
  const [tempValue, setTempValue] = React.useState({
    hours: internalValue ? Math.floor(internalValue / 3600) : 0,
    minutes: internalValue ? Math.floor((internalValue % 3600) / 60) : 0,
    seconds: internalValue ? internalValue % 60 : 0,
  });
  const displayValue = focused
    ? tempValue
    : isControlled
      ? value === null
        ? { hours: '', minutes: '', seconds: '' }
        : {
            hours: value ? Math.floor(value / 3600) : 0,
            minutes: value ? Math.floor((value % 3600) / 60) : 0,
            seconds: value ? value % 60 : 0,
          }
      : {
          hours: formatValue(
            internalValue ? Math.floor(internalValue / 3600) : 0,
          ),
          minutes: formatValue(
            internalValue ? Math.floor((internalValue % 3600) / 60) : 0,
          ),
          seconds: formatValue(internalValue ? internalValue % 60 : 0),
        };

  const helperMessage = errorProp ?? helperText;
  const isError = errorProp;
  const disabled = loading || disabledProp;

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => {
      elementRef.current?.focus();
    },
    reset: () => {
      setInternalValue(defaultValue !== undefined ? defaultValue : null);
    },
  }));

  const handleChange =
    (input: 'hours' | 'minutes' | 'seconds') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Allow only positive integers (no decimals, no negative values)
      if (/^\d*$/.test(inputValue)) {
        // Convert input to a number or null if empty
        const newValue = inputValue === '' ? null : Number(inputValue);
        setTempValue((prev) => ({ ...prev, [input]: newValue ?? 0 }));
      }
    };

  const handleFocus = (component: 'hour' | 'minute' | 'second' = 'hour') => {
    setFocused(component);
  };

  const handleBlur = () => {
    setFocused(null);

    const value =
      tempValue.hours * 3600 + tempValue.minutes * 60 + tempValue.seconds;
    onChange?.(value);
    if (!isControlled) {
      setInternalValue(value);
    }
    setTempValue({
      hours: value ? Math.floor(value / 3600) : 0,
      minutes: value ? Math.floor((value % 3600) / 60) : 0,
      seconds: value ? value % 60 : 0,
    });
  };

  const handleClearValue = (e: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (onChange) {
      onChange(null);
    }
    if (!isControlled) {
      setInternalValue(null);
    }
  };

  return (
    <div
      className={cx(
        'relative',
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
        style={width ? { width } : undefined}
      >
        {!!startIcon && (
          <div className="text-neutral-70 dark:text-neutral-70-dark">
            {startIcon}
          </div>
        )}
        <div
          className={cx('flex items-center w-full text-neutral-60', {
            'text-14px': size === 'default',
            'text-18px': size === 'large',
          })}
        >
          <div className="mr-1">Hours:</div>
          <input
            {...props}
            tabIndex={!disabled ? 0 : -1}
            id={id}
            value={displayValue.hours}
            onChange={handleChange('hours')}
            placeholder={focused === 'hour' ? '' : 'Input hour'}
            onFocus={() => handleFocus('hour')}
            onBlur={handleBlur}
            ref={elementRef}
            className={cx(
              'font-semibold w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed',
              {
                'py-1.5': size === 'default',
                'py-3': size === 'large',
              },
            )}
            disabled={disabled}
            autoComplete="off"
          />
          <div className="mr-1">Minutes:</div>
          <input
            {...props}
            tabIndex={!disabled ? 0 : -1}
            id={id}
            value={displayValue.minutes}
            onChange={handleChange('minutes')}
            placeholder={focused === 'minute' ? '' : 'Input minute'}
            onFocus={() => handleFocus('minute')}
            onBlur={handleBlur}
            ref={elementRef}
            className={cx(
              'font-semibold w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed',
              {
                'py-1.5': size === 'default',
                'py-3': size === 'large',
              },
            )}
            disabled={disabled}
            autoComplete="off"
          />
          <div className="mr-1">Seconds:</div>
          <input
            {...props}
            tabIndex={!disabled ? 0 : -1}
            id={id}
            value={displayValue.seconds}
            onChange={handleChange('seconds')}
            placeholder={focused === 'second' ? '' : 'Input second'}
            onFocus={() => handleFocus('second')}
            onBlur={handleBlur}
            ref={elementRef}
            className={cx(
              'font-semibold w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed',
              {
                'py-1.5': size === 'default',
                'py-3': size === 'large',
              },
            )}
            disabled={disabled}
            autoComplete="off"
          />
        </div>

        <div
          className={cx('flex gap-1 items-center', {
            'text-16px': size === 'default',
            'text-20px': size === 'large',
          })}
        >
          {clearable && focused && !!value && (
            <div
              title="Clear"
              role="button"
              onMouseDown={handleClearValue}
              className="rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark p-0.5 text-neutral-70 dark:text-neutral-70-dark transition-color"
            >
              <Icon name="x-mark" strokeWidth={4} />
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
          {!!endIcon && (
            <div className={cx('text-neutral-70 dark:text-neutral-70-dark')}>
              {endIcon}
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
    </div>
  );
};

export default TimerField;
