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
import { Check, Eye, EyeOff } from 'react-feather';

export interface PasswordFieldRef {
  element: HTMLInputElement | null;
  value: string;
  focus: () => void;
}

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  value?: string;
  defaultValue?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  onChange?: (value: string) => void;
  helperText?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputRef?:
    | RefObject<PasswordFieldRef | null>
    | RefCallback<PasswordFieldRef | null>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  width?: number;
}

/**
 * PasswordField Component
 *
 * A customizable password input field that allows users to enter a password with the option to show/hide it.
 * It supports various features including label positioning, password visibility toggling, loading state, and validation feedback.
 *
 * @property {string} [value] - The current value of the password field, passed from the parent component.
 * @property {string} [defaultValue] - The initial value of the password field when the component is uncontrolled.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should hide when the user starts typing.
 * @property {(value: string) => void} [onChange] - Callback function when the password value changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed when no value is entered.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<PasswordFieldRef> | RefCallback<PasswordFieldRef>} [inputRef] - A ref that provides access to the input element.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <PasswordField
 *   value={password}
 *   onChange={handlePasswordChange}
 *   label="Password"
 *   placeholder="Enter your password"
 *   error="Password is too weak"
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered PasswordField component.
 */

const PasswordField = ({
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
  size,
  type,
  error: errorProp,
  success: successProp,
  width,
  ...props
}: PasswordFieldProps) => {
  const elementRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const [showPassword, setShowPassword] = useState(false);

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
        {startIcon && <div className="text-neutral-70">{startIcon}</div>}
        <input
          {...props}
          tabIndex={!disabled ? 0 : -1}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={focused ? '' : placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={elementRef}
          className={cx(
            'w-full outline-none disabled:bg-neutral-20 disabled:cursor-not-allowed',
            {
              'text-16px': size === 'default',
              'text-18px': size === 'large',
              'py-1.5': size === 'default',
              'py-[13.5px]': size === 'large',
            },
          )}
          disabled={disabled}
          aria-label={label}
          type={showPassword ? type : 'password'}
        />
        <div
          className="p-1.5 hover:bg-neutral-20 rounded-full text-neutral-50"
          role="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye width={16} height={16} strokeWidth={2} />
          ) : (
            <EyeOff width={16} height={16} strokeWidth={2} />
          )}
        </div>
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

export default PasswordField;
