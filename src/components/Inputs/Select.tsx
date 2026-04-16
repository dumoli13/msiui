import React from 'react';
import cx from 'classnames';
import { useInView } from 'react-intersection-observer';
import { FETCH_LIMIT } from '../../const/select';
import type { SelectProps, SelectValue } from '../../types/inputs';
import Icon from '../Icon';
import DropdownChevron from './DropdownChevron';
import DropdownEmptyState from './DropdownEmptyState';
import InputBase from './InputBase';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
import useClickOutside from './useClickOutside';

/**
 * Select components are used for collecting user provided information from a list of options.
 */
const Select = <T, D = undefined>({
  id,
  name,
  value: valueProp,
  defaultValue,
  initialValue = null,
  label,
  labelPosition = 'top',
  autoHideLabel = false,
  placeholder = '',
  options: optionsProp,
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
  renderOption,
  async,
  fetchOptions,
  onKeyDown,
  ...props
}: SelectProps<T, D>) => {
  const generatedId = React.useId();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const valueRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { ref: refInView, inView } = useInView({ threshold: 0.1 });

  const [focused, setFocused] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const [loadingFetchOptions, setLoadingFetchOptions] = React.useState(!!async);
  const [stopAsyncFetch, setStopAsyncFetch] = React.useState(false);
  const [inheritOptions, setInheritOptions] = React.useState<
    SelectValue<T, D>[]
  >(optionsProp || []);
  const [page, setPage] = React.useState(0);

  const options = React.useMemo(
    () => (async ? inheritOptions : optionsProp),
    [async, optionsProp, inheritOptions],
  );

  const [internalValue, setInternalValue] = React.useState<SelectValue<
    T,
    D
  > | null>(
    options.find((item) => item.value === defaultValue) || initialValue,
  );

  React.useEffect(() => {
    setInternalValue(
      options.find(
        (item) => item.value === (internalValue?.value ?? defaultValue),
      ) || null,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Re-sync internal value only when the options prop changes; reading internalValue and defaultValue here is intentional
  }, [optionsProp]);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const isError = !!errorProp;
  const disabled = loading || disabledProp;

  const inputId = id ?? `select-${name ?? generatedId}`;
  const comboboxId = `${inputId}-combobox`;
  const helperId = `${inputId}-helper`;
  const helperMessage =
    isError && typeof errorProp === 'string' ? errorProp : helperText;
  const listboxId = `${inputId}-listbox`;
  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => valueRef.current?.focus(),
    reset: () => setInternalValue(initialValue),
    disabled,
  }));

  const handleClose = React.useCallback(() => {
    setFocused(false);
    setDropdownOpen(false);
  }, []);

  useClickOutside([elementRef, dropdownRef], handleClose);

  React.useEffect(() => {
    const getAsyncOptions = async () => {
      setLoadingFetchOptions(true);
      const newPage = page + 1;
      const response = (await fetchOptions?.(newPage, FETCH_LIMIT)) ?? [];
      setPage(newPage);
      if (response.length < FETCH_LIMIT) setStopAsyncFetch(true);
      setInheritOptions((prev) => [...prev, ...response]);
      setLoadingFetchOptions(false);
    };

    if (async && inView && !stopAsyncFetch) getAsyncOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally triggers only on inView/dropdownOpen; page and stopAsyncFetch are modified inside
  }, [async, inView, dropdownOpen]);

  const handleFocus = (event?: React.FocusEvent<HTMLDivElement>) => {
    setFocused(true);
    setDropdownOpen(true);
    if (event) props.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const dropdownContainsTarget = dropdownRef.current?.contains(
      event.relatedTarget,
    );
    const elementContainsTarget = elementRef.current?.contains(
      event.relatedTarget,
    );
    if (dropdownContainsTarget || elementContainsTarget) return;

    setFocused(false);
    setDropdownOpen(false);
    setHighlightedIndex(-1);
    props.onBlur?.(event);
  };

  const handleDropdown = () => {
    if (disabled) return;
    setDropdownOpen((prev) => !prev);
  };

  const handleClearValue = () => {
    setDropdownOpen(true);
    onChange?.(null);
    if (!isControlled) setInternalValue(null);
  };

  const handleSelectOption = (option: SelectValue<T, D>) => {
    if (value?.value === option.value) return;
    if (!isControlled) setInternalValue(option);
    onChange?.(option);
    setFocused(false);
    setDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const maxIndex = options.length - 1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!focused) handleFocus();
      setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!focused) handleFocus();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && options[highlightedIndex]) {
        handleSelectOption(options[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setDropdownOpen(false);
      setHighlightedIndex(-1);
    } else {
      onKeyDown?.(e);
    }
  };

  const dropdownContent = (
    <div role="listbox" id={listboxId} aria-label={label}>
      {renderOption
        ? renderOption(options, handleSelectOption, value, highlightedIndex)
        : options.map((option, index) => (
            <div
              role="option"
              aria-selected={option.value === value?.value}
              key={String(option.value)}
              onClick={() => handleSelectOption(option)}
              onMouseOver={() => setHighlightedIndex(index)}
              data-highlighted={index === highlightedIndex}
              className={cx(
                'py-1.5 px-4 text-left break-words cursor-pointer',
                {
                  'text-14px': size === 'default',
                  'text-18px': size === 'large',
                  'bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark':
                    option.value === value?.value,
                  'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100 dark:text-neutral-100-dark':
                    option.value !== value?.value,
                  '!bg-neutral-20 !dark:bg-neutral-20-dark':
                    index === highlightedIndex,
                },
              )}
            >
              {option.label}
            </div>
          ))}
      <div ref={refInView} />
      {(loading || loadingFetchOptions) && (
        <span aria-hidden="true">
          <Icon
            name="loader"
            size={24}
            strokeWidth={2}
            animation="spin"
            className="p-2 text-neutral-60 dark:text-neutral-60-dark"
          />
        </span>
      )}
      {!loadingFetchOptions && options.length === 0 && <DropdownEmptyState />}
    </div>
  );

  React.useEffect(() => {
    if (!dropdownRef.current || highlightedIndex < 0) return;
    const activeItem = dropdownRef.current.querySelector(
      '[data-highlighted="true"]',
    ) as HTMLElement | null;
    activeItem?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- keyboard navigation delegated from inner combobox
    <div
      id={inputId}
      role="group"
      className={cx(
        'relative',
        {
          'w-full': fullWidth,
          'flex items-center gap-4': labelPosition === 'left',
        },
        className,
      )}
      onKeyDown={handleKeyDown}
    >
      {label && (!autoHideLabel || focused) && (
        <InputLabel id={comboboxId} size={size} required={required}>
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
        containerRef={elementRef}
        endIcons={
          <InputEndIconWrapper
            loading={loading}
            error={isError}
            success={successProp}
            clearable={clearable && focused && !!value}
            onClear={handleClearValue}
            endIcon={endIcon}
          >
            <DropdownChevron
              open={dropdownOpen}
              disabled={disabled}
              onClick={handleDropdown}
            />
          </InputEndIconWrapper>
        }
      >
        <div
          id={comboboxId}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-controls={listboxId}
          aria-required={required}
          aria-invalid={isError || undefined}
          aria-describedby={helperMessage ? helperId : undefined}
          className={cx('w-full outline-none truncate', {
            'text-14px py-0.5': size === 'default',
            'text-18px py-0.5': size === 'large',
            'text-neutral-60 dark:text-neutral-60-dark': !value?.label,
            'cursor-not-allowed': disabled,
          })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={valueRef}
        >
          {value?.label ?? placeholder}
        </div>
      </InputBase>

      <InputHelper
        id={helperMessage ? helperId : undefined}
        message={helperMessage}
        error={isError}
        size={size}
      />
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

Select.isFormInput = true;

export default Select;
