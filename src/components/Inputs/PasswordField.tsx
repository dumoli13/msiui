import React from 'react';
import cx from 'classnames';
import type { PasswordFieldProps } from '../../types/inputs';
import Icon from '../Icon';
import InputBase from './InputBase';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';

/**
 * The Password Field component is used for collecting sensitive data from users.
 * The user can toggle password visibility.
 */
const PasswordField = ({
  id,
  name,
  value: valueProp,
  defaultValue,
  initialValue = '',
  label,
  labelPosition = 'top',
  autoHideLabel = false,
  placeholder,
  onChange,
  className,
  helperText,
  disabled: disabledProp = false,
  fullWidth,
  startIcon,
  endIcon,
  inputRef,
  size = 'default',
  error: errorProp,
  success: successProp,
  loading = false,
  clearable = false,
  width,
  required,
  ...props
}: PasswordFieldProps) => {
  const generatedId = React.useId();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const elementRef = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // ?? so a falsy-but-valid defaultValue (e.g. empty string) is preserved
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? initialValue,
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const isError = !!errorProp;
  const disabled = loading || disabledProp;

  const inputId = id ?? `passwordfield-${name ?? generatedId}`;
  const inputElementId = `${inputId}-input`;
  const helperId = `${inputId}-helper`;
  const helperMessage =
    isError && typeof errorProp === 'string' ? errorProp : helperText;

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => elementRef.current?.focus(),
    reset: () => setInternalValue(initialValue),
    disabled,
  }));

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (containerRef.current?.contains(event.relatedTarget)) return;
    setFocused(false);
    props.onBlur?.(event);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    if (!isControlled) setInternalValue(newValue);
  };

  const handleClear = () => {
    onChange?.('');
    if (!isControlled) setInternalValue('');
    elementRef.current?.focus();
  };

  return (
    <div
      id={inputId}
      className={cx(
        'relative',
        {
          'w-full': fullWidth,
          'flex items-center gap-4': labelPosition === 'left',
        },
        className,
      )}
    >
      {label && (!autoHideLabel || focused) && (
        <InputLabel id={inputElementId} size={size} required={required}>
          {label}
        </InputLabel>
      )}

      <InputBase
        focused={focused}
        error={isError}
        success={successProp}
        disabled={disabled}
        size={size}
        width={width}
        fullWidth={fullWidth}
        startIcon={startIcon}
        containerRef={containerRef}
        endIcons={
          <InputEndIconWrapper
            loading={loading}
            error={isError}
            success={successProp}
            clearable={clearable && focused && !!value}
            onClear={handleClear}
            endIcon={endIcon}
          >
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((prev) => !prev)}
              className="rounded-full p-1 text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark transition-colors duration-150"
            >
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={18}
                strokeWidth={2}
              />
            </button>
          </InputEndIconWrapper>
        }
      >
        <input
          {...props}
          id={inputElementId}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          aria-invalid={isError || undefined}
          aria-describedby={helperMessage ? helperId : undefined}
          type={showPassword ? 'text' : 'password'}
          ref={elementRef}
          className={cx(
            'w-full min-w-0 outline-none bg-transparent',
            'text-neutral-90 dark:text-neutral-90-dark',
            'placeholder:text-neutral-50 dark:placeholder:text-neutral-50-dark',
            'disabled:cursor-not-allowed',
            {
              'text-14px py-0.5': size === 'default',
              'text-18px py-0.5': size === 'large',
            },
          )}
        />
      </InputBase>

      <InputHelper
        id={helperMessage ? helperId : undefined}
        message={helperMessage}
        error={isError}
        size={size}
      />
    </div>
  );
};

PasswordField.isFormInput = true;

export default PasswordField;
