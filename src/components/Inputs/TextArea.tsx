import React from 'react';
import cx from 'classnames';
import type { TextAreaProps } from '../../types/inputs/textArea';
import InputBase from './InputBase';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';

/**
 * The Text Area component is used for collecting large amounts of text from users.
 */
const TextArea = ({
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
  lines: minLines = 2,
  required,
  width,
  ...props
}: TextAreaProps) => {
  const generatedId = React.useId();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const elementRef = React.useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = React.useState(false);

  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? initialValue,
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? (valueProp ?? '') : internalValue;

  const isError = !!errorProp;
  const disabled = loading || disabledProp;

  const inputId = id ?? `textarea-${name ?? generatedId}`;
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

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
    props.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (containerRef.current?.contains(event.relatedTarget)) return;
    setFocused(false);
    props.onBlur?.(event);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    if (!isControlled) setInternalValue(newValue);
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

      {/* align='start' so icon and end-icons align to the top of the textarea */}
      <InputBase
        focused={focused}
        error={isError}
        success={successProp}
        disabled={disabled}
        size={size}
        width={width}
        fullWidth={fullWidth}
        startIcon={startIcon}
        align="start"
        containerRef={containerRef}
        endIcons={
          <InputEndIconWrapper
            loading={loading}
            error={isError}
            success={successProp}
            endIcon={endIcon}
          />
        }
      >
        <textarea
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
          rows={minLines}
          style={{ minHeight: `${minLines * 24}px` }}
          ref={elementRef}
          className={cx(
            'w-full min-w-0 outline-none resize-none bg-transparent',
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

TextArea.isFormInput = true;

export default TextArea;
