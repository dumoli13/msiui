import React from 'react';
import cx from 'classnames';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';

export interface TextfieldRef {
  element: HTMLInputElement | null;
  value: string;
  focus: () => void;
  reset: () => void;
}

export interface TextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'required'
  > {
  value?: string | number;
  defaultValue?: string | number;
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  onChange?: (value: string) => void;
  helperText?: React.ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputRef?:
    | React.RefObject<TextfieldRef | null>
    | React.RefCallback<TextfieldRef | null>;
  size?: 'default' | 'large';
  clearable?: boolean;
  error?: boolean | string;
  success?: boolean;
  loading?: boolean;
  width?: number;
}

/**
 *
 * @property {string | number} [value] - The current value of the number field, passed from the parent component.
 * @property {string | number} [defaultValue] - The default value. Use when the component is not controlled.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<TextfieldRef> | React.RefCallback<TextfieldRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {string} [placeholder] - Placeholder text displayed inside the input field when it is empty.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] -
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {boolean} [clearable=false] - Whether the input field should have a clear button to reset its value.
 *
 */

const TextField = ({
  id,
  value: valueProp,
  defaultValue,
  label,

  labelPosition = 'top',
  autoHideLabel = false,
  onChange,
  className,
  helperText,
  placeholder = '',
  disabled: disabledProp = false,
  fullWidth,
  startIcon,
  endIcon,
  inputRef,
  size = 'default',
  clearable = false,
  error: errorProp,
  success: successProp,
  loading = false,
  width,
  ...props
}: TextFieldProps) => {
  const elementRef = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(
    defaultValue?.toString() ?? '',
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp.toString() : internalValue;

  const helperMessage =
    errorProp && typeof errorProp === 'string' ? errorProp : helperText;
  const isError = !!errorProp;
  const disabled = loading || disabledProp;

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => {
      elementRef.current?.focus();
    },
    reset: () => {
      setInternalValue(defaultValue?.toString() ?? '');
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {((autoHideLabel && focused) || !autoHideLabel) && label && (
        <InputLabel id={id} size={size}>
          {label}
        </InputLabel>
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
            'w-full outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark text-neutral-90 dark:text-neutral-90-dark disabled:cursor-not-allowed',
            {
              'text-14px py-1.5': size === 'default',
              'text-18px py-3': size === 'large',
            },
          )}
          disabled={disabled}
          aria-label={label}
          ref={elementRef}
        />
        <InputEndIconWrapper
          loading={loading}
          error={isError}
          success={successProp}
          size={size}
          clearable={clearable && focused && !!value}
          onClear={handleClearValue}
          endIcon={endIcon}
        />
      </div>
      <InputHelper message={helperMessage} error={isError} size={size} />
    </div>
  );
};

export default TextField;
