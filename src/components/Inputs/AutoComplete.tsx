import React, {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  RefCallback,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
import { SelectValue } from './Select';

export interface AutoCompleteRef<T, D = undefined> {
  element: HTMLDivElement | null;
  value: SelectValue<T, D> | null;
  focus: () => void;
  reset: () => void;
}

export interface AutoCompleteProps<T, D = undefined>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue' | 'size'
  > {
  value?: SelectValue<T, D> | null;
  defaultValue?: T | null;
  label?: string;
  labelPosition?: 'top' | 'left';
  placeholder?: string;
  options: SelectValue<T, D>[];
  onChange?: (value: SelectValue<T, D> | null) => void;
  helperText?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputRef?:
    | RefObject<AutoCompleteRef<T> | null>
    | RefCallback<AutoCompleteRef<T> | null>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  loading?: boolean;
  width?: number;
}

/**
 *
 * A customizable input component that allows users to search through a list of options and select one.
 * It supports both controlled and uncontrolled states, offers an interactive dropdown with filtering options,
 * and includes features like custom icons, error handling, and loading states.
 *
 * @property {SelectValue<T, D> | null} value - The currently selected value, if any. If controlled, this prop is required.
 * @property {T | null} defaultValue - The default value for the input. Used in uncontrolled mode.
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {string} [placeholder=''] - Placeholder text displayed in the input when it’s empty.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D> | null) => void} [onChange] - Callback function when an option is selected or cleared.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<AutoCompleteRef<T>> | RefCallback<AutoCompleteRef<T>>} [inputRef] - A ref to access the input field and its value programmatically.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {number} [width] - Optional custom width for the input field.
 *
 *
 */

const AutoComplete = <T, D = undefined>({
  id,
  value: valueProp,
  defaultValue,
  label,
  labelPosition = 'top',
  placeholder = '',
  options,
  onChange,
  className,
  helperText,
  disabled = false,
  fullWidth,
  startIcon,
  endIcon,
  inputRef,
  size = 'default',
  error: errorProp,
  success: successProp,
  loading = false,
  width,
  ...props
}: AutoCompleteProps<T, D>) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [focused, setFocused] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [internalValue, setInternalValue] = useState<SelectValue<T, D> | null>(
    options.find((item) => item.value === defaultValue) || null,
  );

  useEffect(() => {
    setInternalValue(
      options.find((item) => item.value === defaultValue) || null,
    );
  }, [options]);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const [inputValue, setInputValue] = useState(value?.label || '');

  const helperMessage = errorProp || helperText;
  const isError = errorProp;

  useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value: value as SelectValue<T, undefined>,
    focus: () => {
      valueRef.current?.focus();
    },
    reset: () => {
      setInternalValue(null);
    },
  }));

  const [filteredOptions, setFilteredOptions] = useState<SelectValue<T, D>[]>(
    [],
  );

  useEffect(() => {
    setInputValue(value?.label || '');
  }, [value]);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdownContainsTarget = dropdownRef.current?.contains(target);
      const selectElementContainsTarget = elementRef.current?.contains(target);

      if (dropdownContainsTarget || selectElementContainsTarget) {
        elementRef.current?.focus();
        return;
      }

      setDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    if (disabled) return;
    setFocused(true);
    setDropdownOpen(true);
    setFilteredOptions(options);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;

    const dropdownContainsTarget = dropdownRef.current?.contains(relatedTarget);
    const selectElementContainsTarget =
      elementRef.current?.contains(relatedTarget);

    if (dropdownContainsTarget || selectElementContainsTarget) {
      return;
    }

    setFocused(false);
    setDropdownOpen(false);
  };

  const handleDropdown = () => {
    if (disabled) return;
    setFocused(true);
    setDropdownOpen((prev) => !prev);
    setFilteredOptions(options);
  };

  const handleClearValue = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDropdownOpen(true);
    onChange?.(null);
    if (!isControlled) setInternalValue(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue.length === 0) {
      handleClearValue();
    }
  };

  const handleOptionSelect =
    (option: SelectValue<T, D>) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setInputValue(option.label);
      if (!isControlled) setInternalValue(option);
      setDropdownOpen(false);
      if (onChange) onChange(option);
    };

  const dropdownContent = (
    <>
      {filteredOptions.map((option) => (
        <div
          role="button"
          key={String(option.value)}
          onMouseDown={handleOptionSelect(option)}
          className={cx(
            'cursor-pointer p-4 hover:bg-neutral-20 text-left break-words',
            {
              'bg-info-border text-neutral-90': option.value === value?.value,
              'text-16px': size === 'default',
              'text-18px': size === 'large',
            },
          )}
        >
          {option.label}
        </div>
      ))}
      {filteredOptions.length === 0 && (
        <div className="flex flex-col items-center gap-4 text center text-neutral-60 text-16px">
          <div className="h-12 w-12 bg-neutral-60 flex items-center justify-center rounded-full text-neutral-10 text-36px font-semibold mt-1">
            !
          </div>
          <div className="">Empty Option</div>
        </div>
      )}
    </>
  );

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
        ref={elementRef}
      >
        {startIcon && <div className="text-neutral-70">{startIcon}</div>}
        <input
          {...props}
          tabIndex={!disabled ? 0 : -1}
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={focused ? '' : placeholder}
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
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleFocus}
          ref={valueRef}
        />
        <div className="flex gap-0.5 items-center">
          {focused && !!value && (
            <div
              title="Clear"
              role="button"
              onMouseDown={handleClearValue}
              className="rounded-full hover:bg-neutral-30 p-0.5 text-neutral-70 transition-color"
            >
              <Icon name="x-mark" size={16} strokeWidth={2} />
            </div>
          )}
          <div
            title="Open"
            role="button"
            onClick={handleDropdown}
            className={cx('rounded-full p-0.5 text-neutral-70', {
              'cursor-not-allowed': disabled,
              'hover:bg-neutral-30 cursor-pointer transition-color': !disabled,
              'rotate-180': isDropdownOpen,
            })}
          >
            <Icon name="chevron-down" size={16} strokeWidth={2} />
          </div>
          {loading && (
            <div className="text-neutral-70">
              <Icon name="loader" size={16} className="animate-spin" />
            </div>
          )}
          {successProp && (
            <div className="rounded-full bg-success-main p-0.5 text-neutral-10">
              <Icon name="check" size={10} strokeWidth={3} />
            </div>
          )}
          {isError && (
            <div className="rounded-full bg-danger-main p-0.5 text-neutral-10 font-medium text-12px h-4 w-4 flex items-center justify-center">
              !
            </div>
          )}
          {endIcon && <div className="text-neutral-70">{endIcon}</div>}
        </div>
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
      <InputDropdown
        open={isDropdownOpen}
        elementRef={elementRef}
        dropdownRef={dropdownRef}
        fullWidth
      >
        {dropdownContent}
      </InputDropdown>
    </div>
  );
};

export default AutoComplete;
