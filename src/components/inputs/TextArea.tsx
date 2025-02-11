import {
  ChangeEvent,
  ReactNode,
  RefCallback,
  RefObject,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { Check } from 'react-feather';

export interface TextAreaRef {
  element: HTMLTextAreaElement | null;
  value: string;
  focus: () => void;
}

interface TextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'size'
  > {
  value?: string;
  defaultValue?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  onChange?: (value: string) => void;
  helperText?: ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputRef?: RefObject<TextAreaRef> | RefCallback<TextAreaRef>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  minLines?: number;
  maxLines?: number;
  width?: number;
}

/**
 * TextArea Component
 *
 * A customizable multi-line text input component that supports various features such as labels, icons, error/success states,
 * placeholder text, and the ability to handle dynamic height (min/max lines). This component is ideal for longer form inputs
 * like comments, descriptions, or messages.
 *
 * @property {string} [value] - The value of the textarea. If provided, the textarea will be controlled.
 * @property {string} [defaultValue] - The initial value of the textarea for uncontrolled usage.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the textarea is focused.
 * @property {(value: string) => void} [onChange] - Callback function to handle textarea value changes.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {string} [placeholder] - Placeholder text displayed inside the textarea when it is empty.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<TextAreaRef> | RefCallback<TextAreaRef>} [inputRef] - A ref to access the textarea element directly.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {number} [minLines=2] - The minimum number of lines (rows) visible in the textarea.
 * @property {number} [maxLines] - The maximum number of lines (rows) the textarea can expand to.
 * @property {number} [width] - Optional custom width for the input field.
 *
 * @example Basic Usage:
 * ```tsx
 * <TextArea
 *   label="Description"
 *   value={description}
 *   onChange={(value) => setDescription(value)}
 *   placeholder="Enter your description here"
 *   size="large"
 *   minLines={4}
 *   maxLines={8}
 *   success={isValidDescription}
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered TextArea component.
 */

const TextArea = ({
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
  error: errorProp,
  success: successProp,
  minLines = 2,
  maxLines,
  width,
  ...props
}: TextAreaProps) => {
  const elementRef = useRef<HTMLTextAreaElement>(null);
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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          'bg-neutral-10 relative px-4 border rounded-md py-1 flex gap-2 items-start',
          {
            'w-full': fullWidth,
            'border-danger-main focus:ring-danger-focus': isError,
            'border-success-main focus:ring-success-focus':
              !isError && successProp,
            'border-neutral-50 hover:border-primary-main focus:ring-neutral-focus':
              !isError && !successProp,
            'bg-neutral-20 cursor-not-allowed text-neutral-60 hover:!border-neutral-50':
              disabled,
            'shadow-box-3': !disabled,
          },
        )}
        style={width ? { width } : undefined}
      >
        {!!startIcon && (
          <div
            className={cx('text-neutral-70', {
              'py-1.5': size === 'default',
              'py-[12.5px]': size === 'large',
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
            'w-full outline-none resize-none disabled:bg-neutral-20 disabled:cursor-not-allowed',
            {
              'text-16px': size === 'default',
              'text-18px': size === 'large',
              'py-1.5': size === 'default',
              'py-[12.5px]': size === 'large',
            },
          )}
          disabled={disabled}
          rows={minLines}
          ref={elementRef}
          style={{
            minHeight: `${minLines * 1.5}em`,
            maxHeight: maxLines ? `${maxLines * 1.5}em` : undefined,
          }}
          aria-label={label}
        />
        {!!endIcon && (
          <div
            className={cx('text-neutral-70', {
              'my-1.5': size === 'default',
              'my-[12.5px]': size === 'large',
            })}
          >
            {endIcon}
          </div>
        )}
        {successProp && (
          <div
            className={cx(
              'rounded-full bg-success-main p-0.5 text-neutral-10',
              {
                'my-1.5': size === 'default',
                'my-[12.5px]': size === 'large',
              },
            )}
          >
            <Check width={10} height={10} strokeWidth={3} />
          </div>
        )}
        {isError && (
          <div
            className={cx(
              'rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center',
              {
                'my-1.5': size === 'default',
                'my-[12.5px]': size === 'large',
              },
            )}
          >
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

export default TextArea;
