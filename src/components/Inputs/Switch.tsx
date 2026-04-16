import React from 'react';
import cx from 'classnames';
import type { SwitchProps } from '../../types';
import Icon from '../Icon';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';

/**
 * The Switch component is used for toggling between two states. Most commonly used for setting on or off.
 */
const Switch = ({
  id,
  name,
  defaultChecked,
  initialChecked = false,
  checked: checkedProp,
  label,
  labelPosition = 'top',
  onChange,
  className,
  helperText,
  disabled: disabledProp = false,
  inputRef,
  size = 'default',
  fullWidth = false,
  error: errorProp,
  loading = false,
  width,
  trueLabel = 'Yes',
  falseLabel = 'No',
  required,
  onKeyDown,
  ...props
}: SwitchProps) => {
  const elementRef = React.useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked || initialChecked,
  );
  const isControlled = checkedProp !== undefined;
  const value = isControlled ? checkedProp : internalChecked;

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => elementRef.current?.focus(),
    reset: () => setInternalChecked(initialChecked),
    disabled,
  }));

  const helperMessage = errorProp || helperText;
  const isError = !!errorProp;
  const disabled = loading || disabledProp;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur?.(event);
  };

  const handleChange = () => {
    const newChecked = !value;
    onChange?.(newChecked);
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      handleChange();
    } else {
      onKeyDown?.(e);
    }
  };

  const inputId = `switch-${id || name}-${React.useId()}`;

  return (
    <div
      id={id}
      className={cx(
        'relative',
        {
          'w-full': fullWidth,
        },
        className,
      )}
      style={{ width }}
    >
      <div
        className={cx(
          'relative flex text-neutral-90 dark:text-neutral-90-dark',
          {
            'flex-col gap-0.5': labelPosition === 'top',
            'flex items-center gap-4': labelPosition === 'left',
          },
        )}
      >
        {label && (
          <InputLabel id={inputId} size={size} required={required}>
            {label}
          </InputLabel>
        )}
        <div
          className={cx('w-fit flex items-center gap-2.5 rounded-md', {
            'bg-neutral-20 dark:bg-neutral-20-dark opacity-50':
              loading || disabled,
            'cursor-default': loading,
            'cursor-not-allowed': disabled,
            'py-1.5': size === 'default',
            'py-3': size === 'large',
          })}
        >
          <div>
            <input
              {...props}
              id={inputId}
              tabIndex={-1}
              name={name}
              type="checkbox"
              className="sr-only"
              checked={value}
              readOnly
            />
            {loading ? (
              <div
                className={cx(
                  'rounded-full transition-colors relative bg-neutral-50 dark:bg-neutral-50-dark',
                  {
                    'w-7 h-4': size === 'default',
                    'w-8 h-5': size === 'large',
                  },
                )}
              >
                <div className="absolute left-0.5 top-0.5 transition-transform duration-500 translate-x-1.5 text-neutral-10 dark:text-neutral-10-dark">
                  <Icon
                    name="loader"
                    size={size === 'default' ? 12 : 16}
                    animation="spin"
                    strokeWidth={4}
                  />
                </div>
              </div>
            ) : (
              <div
                role="button"
                aria-label={typeof label === 'string' ? label : 'Toggle switch'}
                ref={elementRef}
                tabIndex={disabled ? -1 : 0}
                onMouseDown={!loading && !disabled ? handleChange : undefined}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className={cx(
                  'rounded-full transition-colors relative focus:ring-3 ring-primary-focus dark:ring-primary-focus-dark focus:outline-none',
                  {
                    'w-7 h-4': size === 'default',
                    'w-8 h-5': size === 'large',
                    'bg-neutral-40 dark:bg-neutral-40-dark':
                      !value && !disabled,
                    'bg-primary-main dark:bg-primary-main-dark':
                      value && !disabled,
                    '!bg-danger-main !dark:bg-danger-main-dark': isError,
                    'bg-neutral-60 dark:bg-neutral-60-dark cursor-not-allowed':
                      disabled,
                  },
                )}
              >
                <div
                  className={cx(
                    'absolute left-0.5 top-0.5 rounded-full bg-neutral-10 dark:bg-neutral-10-dark transition-all duration-500',
                    {
                      'translate-x-3': value,
                      'w-3 h-3': size === 'default',
                      'w-4 h-4': size === 'large',
                    },
                  )}
                />
              </div>
            )}
          </div>
          <div>
            <div
              className={cx('min-w-5', {
                'text-14px': size === 'default',
                'text-18px': size === 'large',
              })}
            >
              {value ? trueLabel : falseLabel}
            </div>
            <InputHelper message={helperMessage} error={isError} size={size} />
          </div>
        </div>
      </div>
    </div>
  );
};

Switch.isFormInput = true;

export default Switch;
