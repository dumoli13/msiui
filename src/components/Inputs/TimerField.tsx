import React, {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  RefCallback,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { Check, X } from 'react-feather';

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
}

export interface TimerFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
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
  helperText?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  clearable?: boolean;
  inputRef?: RefObject<TimerTextfieldRef> | RefCallback<TimerTextfieldRef>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  width?: number;
}

/**
 * TimerField Component
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
 * @property {RefObject<TimerTextfieldRef> | RefCallback<TimerTextfieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <TimerField
 *   value={amount}
 *   onChange={handleAmountChange}
 *   label="Amount"
 *   error="Invalid amount"
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered TimerField component.
 */

const TimerField = ({
  id,
  value: valueProp,
  defaultValue = valueProp,
  label,
  labelPosition = 'top',
  onChange,
  className,
  helperText,
  disabled = false,
  fullWidth,
  startIcon,
  endIcon,
  clearable = false,
  inputRef,
  size = 'default',
  error: errorProp,
  success: successProp,
  width,
  ...props
}: TimerFieldProps) => {
  const elementRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState<'hour' | 'minute' | 'second' | null>(
    null,
  );
  const [internalValue, setInternalValue] = useState<number | null>(
    defaultValue !== undefined ? defaultValue : null,
  );

  const isControlled = valueProp !== undefined;

  // Sync `internalStringValue` with `valueProp` when `valueProp` changes

  const value = isControlled ? valueProp : internalValue;
  const [tempValue, setTempValue] = useState({
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

  const helperMessage = errorProp || helperText;
  const isError = errorProp;

  useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => {
      elementRef.current?.focus();
    },
  }));

  const handleChange =
    (input: 'hours' | 'minutes' | 'seconds') =>
    (e: ChangeEvent<HTMLInputElement>) => {
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
      {label && (
        <label
          htmlFor={id}
          className={cx('block text-left text-neutral-80 mb-1', {
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
        style={width ? { width } : undefined}
      >
        {startIcon && <div className="text-neutral-70">{startIcon}</div>}
        <div className="flex items-center w-full">
          <div
            className={cx('mr-1 text-neutral-60', {
              'text-14px': size === 'default',
              'text-16px': size === 'large',
            })}
          >
            Hours:
          </div>
          <input
            {...props}
            tabIndex={!disabled ? 0 : -1}
            id={id}
            value={displayValue.hours}
            // onChange={handleChange(3600)}
            onChange={handleChange('hours')}
            placeholder={focused === 'hour' ? '' : 'Input hour'}
            onFocus={() => handleFocus('hour')}
            onBlur={handleBlur}
            ref={elementRef}
            className={cx(
              'font-semibold w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed',
              {
                'text-16px': size === 'default',
                'text-18px': size === 'large',
                'py-1.5': size === 'default',
                'py-[12.5px]': size === 'large',
              },
            )}
            disabled={disabled}
            autoComplete="off"
          />
          <div
            className={cx('mr-1 ml-2 text-neutral-60', {
              'text-14px': size === 'default',
              'text-16px': size === 'large',
            })}
          >
            Minutes:
          </div>
          <input
            {...props}
            tabIndex={!disabled ? 0 : -1}
            id={id}
            value={displayValue.minutes}
            // onChange={handleChange(60)}
            onChange={handleChange('minutes')}
            placeholder={focused === 'minute' ? '' : 'Input minute'}
            onFocus={() => handleFocus('minute')}
            onBlur={handleBlur}
            ref={elementRef}
            className={cx(
              'font-semibold w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed',
              {
                'text-16px': size === 'default',
                'text-18px': size === 'large',
                'py-1.5': size === 'default',
                'py-[12.5px]': size === 'large',
              },
            )}
            disabled={disabled}
            autoComplete="off"
          />
          <div
            className={cx('mr-1 ml-2 text-neutral-60', {
              'text-14px': size === 'default',
              'text-16px': size === 'large',
            })}
          >
            Seconds:
          </div>
          <input
            {...props}
            tabIndex={!disabled ? 0 : -1}
            id={id}
            value={displayValue.seconds}
            // onChange={handleChange(1)}
            onChange={handleChange('seconds')}
            placeholder={focused === 'second' ? '' : 'Input second'}
            onFocus={() => handleFocus('second')}
            onBlur={handleBlur}
            ref={elementRef}
            className={cx(
              'font-semibold w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed',
              {
                'text-16px': size === 'default',
                'text-18px': size === 'large',
                'py-1.5': size === 'default',
                'py-[12.5px]': size === 'large',
              },
            )}
            disabled={disabled}
            autoComplete="off"
          />
        </div>
        {clearable && focused && !!value && (
          <div
            title="Clear"
            role="button"
            onMouseDown={handleClearValue}
            className="rounded-full hover:bg-neutral-30 p-0.5 text-neutral-70 transition-color"
          >
            <X width={16} height={16} strokeWidth={2} />
          </div>
        )}
        {successProp && (
          <div className="rounded-full bg-success-main p-0.5 text-neutral-10">
            <Check width={10} height={10} strokeWidth={3} />
          </div>
        )}
        {isError && (
          <div className="rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center shrink-0">
            !
          </div>
        )}
        {endIcon && <div className="text-neutral-70">{endIcon}</div>}
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
    </div>
  );
};

export default TimerField;
