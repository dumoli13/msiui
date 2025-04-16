import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';

export interface CheckboxRef {
  element: HTMLInputElement | null;
  value: boolean;
  focus: () => void;
  reset: () => void;
}

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'placeholder'
  > {
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  helperText?: React.ReactNode;
  disabled?: boolean;
  inputRef?:
    | React.RefObject<CheckboxRef | null>
    | React.RefCallback<CheckboxRef | null>;
  size?: 'default' | 'large';
  error?: string;
  loading?: boolean;
  width?: number;
}

/**
 *
 * A customizable checkbox input that allows users to select or deselect an option. It supports both controlled
 * and uncontrolled modes, provides an indeterminate state, and handles accessibility features like `aria-label`.
 *
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'bottom' | 'left' | 'right'} [labelPosition='right'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [checked] - The controlled value of the checkbox. If provided, the component acts as a controlled component.
 * @property {boolean} [defaultChecked=false] - The default checked state if `checked` is not provided. Used in uncontrolled mode.
 * @property {boolean} [indeterminate=false] - If true, the checkbox will appear in an indeterminate state.
 * @property {function} [onChange] - Callback function invoked when the checkbox value changes. Provides the new `checked` state.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {RefObject<CheckboxRef>} [inputRef] - A reference to the checkbox element.
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 * @property {string} [aria-label] - The ARIA label for accessibility purposes.
 *
 */

const Checkbox = ({
  label = '',
  labelPosition = 'right',
  checked: valueProp,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  helperText,
  disabled: disabledProp = false,
  className,
  inputRef,
  size = 'default',
  error: errorProp,
  loading = false,
  width,
  'aria-label': ariaLabel,
  ...props
}: CheckboxProps) => {
  const elementRef = React.useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = React.useState(defaultChecked);
  const [isFocused, setIsFocused] = React.useState(false);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

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
      setInternalValue(defaultChecked);
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className={className} style={width ? { width } : undefined}>
      <label
        className={cx('flex w-fit', {
          'cursor-not-allowed opacity-50': disabled,
          'cursor-pointer': !disabled,
          'gap-0.5 items-center':
            (labelPosition === 'top' || labelPosition === 'bottom') &&
            size === 'default',
          'gap-1.5 items-center':
            (labelPosition === 'top' || labelPosition === 'bottom') &&
            size === 'large',
          'flex-col-reverse': labelPosition === 'top',
          'flex-col': labelPosition === 'bottom',
          'gap-2 && h-[42px]':
            (labelPosition === 'left' || labelPosition === 'right') &&
            size === 'default',
          'gap-2 && h-[64px]':
            (labelPosition === 'left' || labelPosition === 'right') &&
            size === 'large',
          'flex-row-reverse': labelPosition === 'left',
          'flex-row': labelPosition === 'right',
        })}
      >
        <div
          role="checkbox"
          aria-checked="true"
          aria-disabled="false"
          aria-label={ariaLabel}
          className={cx(
            'shrink-0rounded-md border flex justify-center items-center transition-all box-border relative',
            {
              'w-5 h-5': size === 'default',
              'w-7 h-7': size === 'large',
              'bg-neutral-20 dark:bg-neutral-20-dark border-neutral-40 dark:border-neutral-40-dark':
                disabled,
              'bg-neutral-10 dark:bg-neutral-10-dark border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark':
                !disabled,
              'bg-primary-main dark:bg-primary-main-dark border-primary-main dark:border-primary-main-dark':
                !disabled && value && !indeterminate,
              'ring-3 ring-primary-focus': isFocused,
            },
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault(); // Prevent scrolling
              handleChange({
                target: { checked: !value },
              } as React.ChangeEvent<HTMLInputElement>);
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
          {loading && (
            <div className="text-neutral-70 dark:text-neutral-70-dark">
              <Icon name="loader" animation="spin" strokeWidth={2} />
            </div>
          )}
          {!loading && value && !indeterminate && (
            <Icon
              name="check"
              strokeWidth={4}
              size={size === 'default' ? 14 : 18}
              className={cx('absolute', {
                'text-neutral-10 dark:text-neutral-10-dark': !disabled,
                'text-neutral-60 dark:text-neutral-60-dark': disabled,
              })}
            />
          )}
          {!loading && !value && indeterminate && (
            <span className="absolute w-2.5 h-2.5 rounded-sm bg-primary-main dark:bg-primary-main-dark" />
          )}
        </div>
        {!!label && (
          <span
            className={cx('text-neutral-90 dark:text-neutral-90-dark', {
              'text-14px': size === 'default',
              'text-18px': size === 'large',
            })}
          >
            {label}
          </span>
        )}
      </label>
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

export default Checkbox;
