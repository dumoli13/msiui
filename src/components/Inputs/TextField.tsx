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

export interface TextfieldRef {
  element: HTMLInputElement | null;
  value: string;
  focus: () => void;
}

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  value?: string | number;
  defaultValue?: string | number;
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  onChange?: (value: string) => void;
  helperText?: ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputRef?: RefObject<TextfieldRef | null> | RefCallback<TextfieldRef | null>;
  size?: 'default' | 'large';
  clearable?: boolean;
  error?: string;
  success?: boolean;
  width?: number;
}

/**
 * TextField Component
 *
 * A customizable input field component that supports various features such as labels, icons, error/success states,
 * placeholder text, and the ability to clear the input value. It can be used for both controlled and uncontrolled form inputs.
 *
 * @property {string | number} [value] - The value of the input. If provided, the input will be controlled.
 * @property {string | number} [defaultValue] - The initial value of the input for uncontrolled usage.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed inside the input when it is empty.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<TextfieldRef> | RefCallback<TextfieldRef>} [inputRef] - A ref to access the input element directly.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {boolean} [clearable=false] - Whether the input field should have a clear button to reset its value.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success] - Whether the input field is in a success state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <TextField
 *   label="Username"
 *   value={username}
 *   onChange={(value) => setUsername(value)}
 *   placeholder="Enter your username"
 *   size="large"
 *   success={isValidUsername}
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered TextField component.
 */

const TextField = ({
  id,
  value: valueProp,
  defaultValue,
  label,
  labelPosition = 'top',
  onChange,
  className,
  helperText,
  placeholder = '',
  disabled = false,
  fullWidth,
  startIcon,
  endIcon,
  inputRef,
  size = 'default',
  clearable = false,
  error: errorProp,
  success: successProp,
  width,
  ...props
}: TextFieldProps) => {
  const elementRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(
    defaultValue?.toString() || '',
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp.toString() : internalValue;

  const helperMessage = errorProp || helperText;
  const isError = errorProp;

  useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => {
      elementRef.current?.focus();
    },
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const handleClearValue = (e: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    onChange?.('');
    if (!isControlled) {
      setInternalValue('');
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
        style={width ? { width } : undefined}
      >
        {!!startIcon && <div className="text-neutral-70">{startIcon}</div>}
        <input
          {...props}
          tabIndex={!disabled ? 0 : -1}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={focused ? '' : placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
          ref={elementRef}
        />
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
        {!!endIcon && <div className="text-neutral-70">{endIcon}</div>}
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

export default TextField;
