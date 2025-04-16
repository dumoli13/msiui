import React from 'react';
import cx from 'classnames';
import Tag from '../Displays/Tag';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
import { SelectValue } from './Select';

export interface AutoCompleteMultipleRef<T, D = undefined> {
  element: HTMLDivElement | null;
  value: SelectValue<T, D>[];
  focus: () => void;
  reset: () => void;
}

export interface AutoCompleteMultipleProps<T, D = undefined>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue' | 'size'
  > {
  value?: SelectValue<T, D>[];
  defaultValue?: T[];
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  placeholder?: string;
  options: SelectValue<T, D>[];
  onChange?: (value: SelectValue<T, D>[]) => void;
  helperText?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputRef?:
    | React.RefObject<AutoCompleteMultipleRef<T> | null>
    | React.RefCallback<AutoCompleteMultipleRef<T> | null>;
  size?: 'default' | 'large';
  error?: string;
  success?: boolean;
  loading?: boolean;
  clearable?: boolean;
  width?: number;
}

/**
 *
 * A multi-select input component that allows users to select multiple values from a list of options with autocomplete functionality.
 *
 * @property {SelectValue<T, D>[]} [value] - The controlled value of the multi-select input. An array of selected options.
 * @property {T[]} [defaultValue=[]] - The initial selected values in an uncontrolled state (defaults to empty array).
 * @property {string} [label] - The label text displayed above or beside the input field.
 * @property {'top' | 'left'} [labelPosition='top'] - The position of the label relative to the field ('top' or 'left').
 * @property {boolean} [autoHideLabel=false] - Whether the label should automatically hide when the input is focused.
 * @property {string} [placeholder=''] - Placeholder text displayed in the input when it’s empty.
 * @property {SelectValue<T, D>[]} options - An array of option objects, each containing a value and a label.
 * @property {(value: SelectValue<T, D>[]) => void} [onChange] - Callback function invoked when the selected values change.
 * @property {ReactNode} [helperText] - A helper message displayed below the input field, often used for validation.
 * @property {boolean} [disabled=false] - Disables the input field if true.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {ReactNode} [startIcon] - An optional icon to display at the start of the input field.
 * @property {ReactNode} [endIcon] - An optional icon to display at the end of the input field.
 * @property {RefObject<AutoCompleteMultipleRef<T>>} [inputRef] - A reference to the input element for imperative actions like focusing.
 * @property {'default' | 'large'} [size='default'] - The size of the input field (default or large).
 * @property {string} [error] - Error message to display when the input has an error.
 * @property {boolean} [success=false] - Whether the input field is in a success state.
 * @property {boolean} [loading=false] - Whether the input is in a loading state.
 * @property {boolean} [clearable=false] - Whether the input has a clear button to remove selected values.
 * @property {number} [width] - Optional custom width for the input field.
 *
 */

const AutoCompleteMultiple = <T, D = undefined>({
  id,
  value: valueProp,
  defaultValue = [],
  label,

  labelPosition = 'top',
  autoHideLabel = false,
  placeholder = '',
  options,
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
  ...props
}: AutoCompleteMultipleProps<T, D>) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const valueRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [focused, setFocused] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<SelectValue<T, D>[]>(
    options.filter((item) => defaultValue.includes(item.value)) || [],
  );

  React.useEffect(() => {
    setInternalValue(
      options.filter((item) => defaultValue.includes(item.value)) || [],
    );
  }, [options]);

  const isControlled = valueProp !== undefined;
  const value = valueProp ?? internalValue; // Default to internal state if undefined
  const [inputValue, setInputValue] = React.useState('');

  const helperMessage = errorProp ?? helperText;
  const isError = errorProp;
  const disabled = loading || disabledProp;

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value: value as SelectValue<T, undefined>[],
    focus: () => {
      valueRef.current?.focus();
    },
    reset: () => {
      setInternalValue(
        options.filter((item) => defaultValue.includes(item.value)) || [],
      );
    },
  }));

  const [filteredOptions, setFilteredOptions] = React.useState<
    SelectValue<T, D>[]
  >([]);

  React.useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredOptions(filtered);
  }, [inputValue, options, value]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdownContainsTarget = dropdownRef.current?.contains(target);
      const selectElementContainsTarget = elementRef.current?.contains(target);

      if (!dropdownContainsTarget && !selectElementContainsTarget) {
        setDropdownOpen(false);
        setFocused(false); // Add this line to ensure 'focused' is set to false
      }
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
  };

  const handleClearValue = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDropdownOpen(true);
    onChange?.([]); // Clear with an empty array
    if (!isControlled) setInternalValue([]); // Update internal state if uncontrolled
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleOptionSelect =
    (option: SelectValue<T, D>) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const newValue = [...(value || []), option];
      setInputValue('');
      if (!isControlled) setInternalValue(newValue); // Update internal state if uncontrolled
      onChange?.(newValue);
      setDropdownOpen(false);
    };

  const handleRemoveSelected =
    (option: SelectValue<T, D>) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const newValue = value.filter((v) => v.value !== option.value);
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    };

  const dropdownContent = (
    <>
      {filteredOptions.map((option) => {
        const selected = value?.some((v) => v.value === option.value);

        return selected ? (
          <div
            role="button"
            key={String(option.value)}
            onMouseDown={handleRemoveSelected(option)}
            className={cx(
              'cursor-pointer py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words flex items-center justify-between gap-2.5 bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark',
              {
                'text-14px': size === 'default',
                'text-18px': size === 'large',
              },
            )}
          >
            <span>{option.label}</span>
            <Icon
              name="check"
              size={10}
              strokeWidth={3}
              className="text-primary-main dark:text-primary-main-dark"
            />
          </div>
        ) : (
          <div
            role="button"
            key={String(option.value)}
            onMouseDown={handleOptionSelect(option)}
            className={cx(
              'cursor-pointer py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words text-neutral-100 dark:text-neutral-100-dark',
              {
                'text-14px': size === 'default',
                'text-18px': size === 'large',
              },
            )}
          >
            {option.label}
          </div>
        );
      })}
      {filteredOptions.length === 0 && (
        <div className="flex flex-col items-center gap-4 text center text-neutral-60 text-16px dark:text-neutral-60-dark">
          <div className="h-12 w-12 bg-neutral-60 dark:bg-neutral-60-dark flex items-center justify-center rounded-full text-neutral-10 dark:text-neutral-10-dark text-36px font-semibold mt-1">
            !
          </div>
          <div>Empty Option</div>
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
      {((autoHideLabel && focused) || !autoHideLabel) && label && (
        <label
          htmlFor={id}
          className={cx(
            'shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1',
            {
              'text-14px': size === 'default',
              'text-18px': size === 'large',
            },
          )}
        >
          {label}
        </label>
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
        ref={elementRef}
      >
        {!!startIcon && (
          <div className="text-neutral-70 dark:text-neutral-70-dark">
            {startIcon}
          </div>
        )}
        <div
          className={cx('flex flex-wrap gap-2 items-center w-full', {
            'w-full': fullWidth,
          })}
        >
          {value?.map((selected) => (
            <Tag key={String(selected.value)} color="info">
              {selected.label}
            </Tag>
          ))}
          <input
            {...props}
            tabIndex={!disabled ? 0 : -1}
            id={id}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={focused ? '' : placeholder}
            className={cx(
              'flex-grow outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed',
              {
                'text-14px py-1.5': size === 'default',
                'text-18px py-3': size === 'large',
              },
            )}
            disabled={disabled}
            aria-label={label}
            autoComplete="off"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleFocus}
          />
        </div>
        <div
          className={cx('flex gap-1 items-center', {
            'text-16px': size === 'default',
            'text-20px': size === 'large',
          })}
        >
          {clearable && focused && !!value && (
            <div
              title="Clear"
              role="button"
              onMouseDown={handleClearValue}
              className="rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark p-0.5 text-neutral-70 dark:text-neutral-70-dark transition-color"
            >
              <Icon name="x-mark" strokeWidth={4} />
            </div>
          )}
          <div
            title="Open"
            role="button"
            onClick={handleDropdown}
            className={cx(
              'rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark',
              {
                'cursor-not-allowed': disabled,
                'hover:bg-neutral-30 dark:hover:bg-neutral-30-dark cursor-pointer transition-color':
                  !disabled,
                'rotate-180': dropdownOpen,
              },
            )}
          >
            <Icon name="chevron-down" size={16} strokeWidth={2} />
          </div>
          {loading && (
            <div className="text-neutral-70 dark:text-neutral-70-dark">
              <Icon name="loader" animation="spin" strokeWidth={2} />
            </div>
          )}
          {successProp && (
            <div
              className={cx(
                'shrink-0 rounded-full bg-success-main dark:bg-success-main-dark text-neutral-10 dark:text-neutral-10-dark flex items-center justify-center',
                {
                  'h-4 w-4 text-12px': size === 'default',
                  'h-5 w-5 text-16px': size === 'large',
                },
              )}
            >
              <Icon name="check" strokeWidth={3} />
            </div>
          )}
          {isError && (
            <div
              className={cx(
                'shrink-0 rounded-full bg-danger-main dark:bg-danger-main-dark text-neutral-10 dark:text-neutral-10-dark font-bold flex items-center justify-center',
                {
                  'h-4 w-4 text-12px': size === 'default',
                  'h-5 w-5 text-16px': size === 'large',
                },
              )}
            >
              !
            </div>
          )}
          {!!endIcon && (
            <div className={cx('text-neutral-70 dark:text-neutral-70-dark')}>
              {endIcon}
            </div>
          )}
        </div>
      </div>
      {helperMessage && (
        <div
          className={cx('w-full text-left mt-1 ', {
            'text-danger-main dark:text-danger-main-dark': isError,
            'text-neutral-60 dark:text-neutral-60-dark': !isError,
            'text-12px': size === 'default',
            'text-16px': size === 'large',
          })}
        >
          {helperMessage}
        </div>
      )}
      <InputDropdown
        open={dropdownOpen}
        elementRef={elementRef}
        dropdownRef={dropdownRef}
        fullWidth
      >
        {dropdownContent}
      </InputDropdown>
    </div>
  );
};

export default AutoCompleteMultiple;
