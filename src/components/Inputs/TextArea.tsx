import React from 'react';
import cx from 'classnames';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';

export interface TextAreaRef {
  element: HTMLTextAreaElement | null;
  value: string;
  focus: () => void;
  reset: () => void;
}

export interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'size' | 'required'
  > {
  value?: string;
  defaultValue?: string;
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
    | React.RefObject<TextAreaRef | null>
    | React.RefCallback<TextAreaRef | null>;
  size?: 'default' | 'large';
  error?: boolean | string;
  success?: boolean;
  loading?: boolean;
  lines?: number;
  width?: number;
}

/**
 *
 * @property {string} [value] - The value of the textarea. If provided, the textarea will be controlled.
 * @property {string} [defaultValue] - The initial value of the textarea for uncontrolled usage.
 * @property {(value: string) => void} [onChange] - Callback function to handle input changes.
 * @property {RefObject<TextAreaRef> | React.RefCallback<TextAreaRef>} [inputRef] - A reference to access the input field and its value programmatically.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - A flag to set if label should automatically hide when the input is focused.
 * @property {string} [placeholder] - Placeholder text displayed inside the input field when it is empty.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field.
 * @property {string} [className] - Additional class names to customize the component's style.
 * @property {boolean | string} [error] - A flag to display error of input field. If set to string, it will be displayed as error message.
 * @property {boolean} [success] - A flag to display success of input field if set to true.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {'default' | 'large'} [size='default'] - The size of the input field.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [width] - Optional custom width for the input field (in px).
 * @property {number} [lines=2] - The minimum number of lines (rows) visible in the textarea.
 *
 */

const TextArea = ({
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
  error: errorProp,
  success: successProp,
  loading = false,
  lines: minLines = 2,
  width,
  ...props
}: TextAreaProps) => {
  const elementRef = React.useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(
    defaultValue?.toString() ?? '',
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp.toString() : internalValue;

  const helperMessage = errorProp ?? helperText;
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      {((autoHideLabel && focused) || !autoHideLabel) && label && (
        <InputLabel id={id} size={size}>
          {label}
        </InputLabel>
      )}
      <div
        className={cx(
          ' relative px-4 border rounded-md py-1 flex gap-2 items-start',
          {
            'w-full': fullWidth,
            'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark':
              isError,
            'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark':
              !isError && successProp,
            'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark':
              !isError && !successProp,
            'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark':
              disabled,
            'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3': !disabled,
          },
        )}
        style={width ? { width } : undefined}
      >
        {!!startIcon && (
          <div
            className={cx('text-neutral-70 dark:text-neutral-70-dark', {
              'py-1.5': size === 'default',
              'py-3': size === 'large',
            })}
          >
            {startIcon}
          </div>
        )}
        <textarea
          {...props}
          tabIndex={!disabled ? 0 : -1}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={focused ? '' : placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cx(
            'w-full outline-none resize-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed',
            {
              'text-14px py-1.5': size === 'default',
              'text-18px py-3': size === 'large',
            },
          )}
          disabled={disabled}
          rows={minLines}
          ref={elementRef}
          style={{
            minHeight: `${minLines * 24}px`,
          }}
          aria-label={label}
        />
        <InputEndIconWrapper
          loading={loading}
          error={isError}
          success={successProp}
          size={size}
          endIcon={endIcon}
        />
      </div>
      <InputHelper message={helperMessage} error={isError} size={size} />
    </div>
  );
};

export default TextArea;
