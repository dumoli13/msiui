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
import { Check } from 'react-feather';

export interface CheckboxRef {
  element: HTMLInputElement | null;
  value: boolean;
  focus: () => void;
}

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: string;
  labelPosition?: 'top' | 'left';
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  helperText?: ReactNode;
  disabled?: boolean;
  inputRef?: RefObject<CheckboxRef | null> | RefCallback<CheckboxRef | null>;
  error?: string;
  width?: number;
}

/**
 * Checkbox Component
 *
 * A customizable checkbox input that allows users to select or deselect an option. It supports both controlled
 * and uncontrolled modes, provides an indeterminate state, and handles accessibility features like `aria-label`.
 * The component is also highly customizable with props for labels, error messages, and helper text.
 *
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [checked] - The controlled value of the checkbox. If provided, the component acts as a controlled component.
 * @property {boolean} [defaultChecked=false] - The default checked state if `checked` is not provided. Used in uncontrolled mode.
 * @property {boolean} [indeterminate=false] - If true, the checkbox will appear in an indeterminate state.
 * @property {function} [onChange] - Callback function invoked when the checkbox value changes. Provides the new `checked` state.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {RefObject<CheckboxRef>} [inputRef] - A reference to the checkbox element.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {number} [width] - Optional custom width for the input field.
 * @property {string} [aria-label] - The ARIA label for accessibility purposes.
 *
 * @returns {JSX.Element} The rendered Checkbox component.
 *
 * @example Basic Usage:
 * ```tsx
 * const [isChecked, setIsChecked] = useState(false);
 *
 * <Checkbox
 *   label="Accept terms and conditions"
 *   checked={isChecked}
 *   onChange={(checked) => setIsChecked(checked)}
 * />
 * ```
 *
 */

const Checkbox = ({
  label = '',
  labelPosition = 'top',
  checked: valueProp,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  helperText,
  disabled,
  className,
  inputRef,
  error: errorProp,
  width,
  'aria-label': ariaLabel,
  ...props
}: CheckboxProps) => {
  const elementRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState(defaultChecked);
  const [isFocused, setIsFocused] = useState(false);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

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
    if (!disabled) {
      const newChecked = e.target.checked;
      onChange?.(newChecked);
      if (!isControlled) {
        setInternalValue(newChecked);
      }
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const id = label ? label.replace(/\s+/g, '-').toLowerCase() : undefined;

  return (
    <div
      className={cx(
        { 'flex items-center gap-4': labelPosition === 'left' },
        className,
      )}
      style={width ? { width } : undefined}
    >
      <label
        className={cx('inline-flex gap-2 w-fit', {
          'cursor-not-allowed opacity-50': disabled,
          'cursor-pointer': !disabled,
        })}
      >
        <div
          role="checkbox"
          aria-checked="true"
          aria-disabled="false"
          aria-label={ariaLabel}
          className={cx(
            'shrink-0 w-5 h-5 rounded-md border flex justify-center items-center transition-all box-border relative',
            {
              'bg-neutral-20 border-neutral-40': disabled,
              'border-neutral-50 bg-neutral-10 hover:border-primary-main':
                !disabled,
              'bg-primary-main border-primary-main':
                !disabled && value && !indeterminate,
              'ring-3 ring-primary-focus': isFocused,
            },
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault(); // Prevent scrolling
              handleChange({
                target: { checked: !value },
              } as ChangeEvent<HTMLInputElement>);
            }
          }}
        >
          <input
            id={id}
            tabIndex={!disabled ? 0 : -1}
            type="checkbox"
            className="hidden"
            checked={value}
            onChange={handleChange}
            disabled={disabled}
            aria-label={ariaLabel}
            ref={elementRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {value && !indeterminate && (
            <Check
              className={`absolute w-3.5 h-3.5 ${disabled ? 'text-neutral-60' : 'text-neutral-10'}`}
              strokeWidth={4}
            />
          )}
          {indeterminate && !value && (
            <span className="absolute w-2.5 h-2.5 rounded-sm bg-primary-main" />
          )}
        </div>
        {label && <span className="text-14px text-neutral-90">{label}</span>}
      </label>
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

export default Checkbox;
