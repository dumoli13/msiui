import React, { useMemo } from 'react';
import cx from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useDebouncedCallback } from 'use-debounce';
import { FETCH_LIMIT } from '../../const/select';
import { isSelectValue } from '../../libs';
import type { AutoCompleteProps, SelectValue } from '../../types';
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
 * The autocomplete is a normal text input enhanced by a panel of suggested options.
 */
const AutoComplete = <T, D = undefined>({
  id,
  name,
  value: valueProp,
  defaultValue,
  initialValue = null,
  label,
  labelPosition = 'top',
  autoHideLabel = false,
  placeholder,
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
  appendIfNotFound,
  onAppend,
  required,
  renderOption,
  async,
  fetchOptions,
  onKeyDown,
  animation,
  autoFocus,
  ...props
}: AutoCompleteProps<T, D>) => {
  const generatedId = React.useId();
  const listboxId = `${id ?? generatedId}-listbox`;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const valueRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { ref: refInView, inView } = useInView({ threshold: 0.1 });

  const [focused, setFocused] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const [loadingFetchOptions, setLoadingFetchOptions] = React.useState(!!async);
  const [stopAsyncFetch, setStopAsyncFetch] = React.useState(false);
  const [asyncOptions, setAsyncOptions] = React.useState<SelectValue<T, D>[]>(
    optionsProp || [],
  );
  const [appendOptions, setAppendOptions] = React.useState<SelectValue<T, D>[]>(
    [],
  );
  const [inputValue, setInputValue] = React.useState('');
  const [page, setPage] = React.useState(0);

  const options = React.useMemo(() => {
    const sourceOptions = async ? asyncOptions : optionsProp;
    const combinedOptions = [...appendOptions, ...sourceOptions];

    return Array.from(
      new Map(combinedOptions.map((item) => [item.label, item])).values(),
    );
  }, [async, optionsProp, asyncOptions, appendOptions]);

  const [internalValue, setInternalValue] = React.useState<SelectValue<
    T,
    D
  > | null>(() => {
    if (isSelectValue(defaultValue)) return defaultValue;
    if (defaultValue == null) return initialValue ?? null;
    return (
      options.find((item) => item.value === defaultValue) ??
      initialValue ??
      null
    );
  });

  React.useEffect(() => {
    if (defaultValue && !isSelectValue(defaultValue)) {
      const next = options.find((item) => item.value === defaultValue) ?? null;
      setInternalValue(next);
    }
  }, [defaultValue, options]);

  const filteredOptions = React.useMemo(() => {
    if (async) return options;

    const filterKeyword = inputValue.trim().toLowerCase();
    return options.filter(
      (option) =>
        !inputValue || option.label.toLowerCase().includes(filterKeyword),
    );
  }, [async, inputValue, options]);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const isError = !!errorProp;
  const disabled = loading || disabledProp;

  const inputId = id ?? `autocomplete-${name ?? generatedId}`;
  const inputElementId = `${inputId}-input`;
  const helperId = `${inputId}-helper`;
  const helperMessage =
    isError && typeof errorProp === 'string' ? errorProp : helperText;

  React.useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    focus: () => valueRef.current?.focus(),
    reset: () => setInternalValue(initialValue),
    disabled,
  }));

  React.useEffect(() => {
    if (autoFocus) valueRef.current?.focus();
  }, []);

  const handleClose = React.useCallback(() => {
    setFocused(false);
    setDropdownOpen(false);
    setHighlightedIndex(-1);
    setInputValue('');
  }, []);

  useClickOutside([elementRef, dropdownRef], handleClose);

  React.useEffect(() => {
    const getAsyncOptions = async () => {
      setLoadingFetchOptions(true);
      const newPage = page + 1;
      const response =
        (await fetchOptions?.(inputValue, newPage, FETCH_LIMIT)) ?? [];
      setPage(newPage);
      if (response.length < FETCH_LIMIT) {
        setStopAsyncFetch(true);
      }
      setAsyncOptions((prev) => [...prev, ...response]);
      setLoadingFetchOptions(false);
    };

    if (async && inView && !stopAsyncFetch) getAsyncOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally triggers only on inView/dropdownOpen; page and stopAsyncFetch are modified inside, and fetchOptions/inputValue are stable across these triggers
  }, [async, inView, dropdownOpen]);

  const handleFetchOption = async (keyword: string) => {
    setAsyncOptions([]);
    setStopAsyncFetch(false);
    setLoadingFetchOptions(true);
    const newPage = 1;
    const response =
      (await fetchOptions?.(keyword, newPage, FETCH_LIMIT)) ?? [];
    setPage(newPage);
    if (response.length < FETCH_LIMIT) {
      setStopAsyncFetch(true);
    }
    setAsyncOptions(response);
    setLoadingFetchOptions(false);
  };

  const debouncedSearch = useDebouncedCallback(
    (keyword: string) => handleFetchOption(keyword),
    500,
  );

  const debounceMatchInputtoOptions = useDebouncedCallback(
    (keyword: string) => {
      const inputLower = keyword.toLowerCase();
      const matched = options.find(
        ({ label: optionLabel }) => optionLabel.toLowerCase() === inputLower,
      );

      if (matched) {
        handleSelectOption(matched);
        setInputValue('');
      }
    },
    500,
  );

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (disabled) return;
    setFocused(true);
    setDropdownOpen(true);
    props.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = event.relatedTarget;
    const dropdownContainsTarget = dropdownRef.current?.contains(relatedTarget);
    const elementContainsTarget = elementRef.current?.contains(relatedTarget);

    if (dropdownContainsTarget || elementContainsTarget) return;

    setFocused(false);
    setDropdownOpen(false);
    setHighlightedIndex(-1);
    setInputValue('');
    props.onBlur?.(event);
  };

  const handleDropdown = () => {
    setFocused(true);
    setDropdownOpen((prev) => !prev);
  };

  const handleClearValue = () => {
    setDropdownOpen(true);
    onChange?.(null);
    if (!isControlled) setInternalValue(null);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);
    setHighlightedIndex(input ? 0 : -1);

    if (async) {
      debouncedSearch(input);
      return;
    }

    debounceMatchInputtoOptions(input);
  };

  const handleSelectOption = (option: SelectValue<T, D>) => {
    if (value?.value === option.value) return;
    if (!isControlled) setInternalValue(option);
    setFocused(false);
    setDropdownOpen(false);
    onChange?.(option);
  };

  const handleAppend = () => {
    if (inputValue.length === 0 || !appendIfNotFound) return;

    const newValue = {
      label: inputValue,
      value: inputValue as T,
    };
    setAppendOptions((prev) => [...prev, newValue]);
    if (!isControlled) setInternalValue(newValue);

    setInputValue('');
    setDropdownOpen(false);
    setFocused(false);
    onAppend?.(newValue);
  };

  const isCreateNew = useMemo(
    () =>
      appendIfNotFound &&
      inputValue &&
      !options.some((option) => option.label === inputValue)
        ? 1
        : 0,
    [appendIfNotFound, inputValue, options],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const maxIndex = filteredOptions.length - 1 + isCreateNew;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!dropdownOpen) {
        setFocused(true);
        setInputValue('');
        setDropdownOpen(true);
      }
      setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!dropdownOpen) {
        setFocused(true);
        setInputValue('');
        setDropdownOpen(true);
      }
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setDropdownOpen(false);
      setHighlightedIndex(-1);
    } else if (e.key === 'Enter' && dropdownOpen) {
      e.preventDefault();
      if (isCreateNew && highlightedIndex === 0) {
        handleAppend();
        return;
      }
      if (highlightedIndex > -1) {
        handleSelectOption(filteredOptions[highlightedIndex - isCreateNew]);
      }
    } else {
      onKeyDown?.(e);
    }
  };

  const showEmpty =
    !loading &&
    !loadingFetchOptions &&
    !renderOption &&
    ((options.length === 0 && !inputValue) ||
      (!appendIfNotFound && filteredOptions.length === 0));

  const dropdownContent = (
    <>
      {!!isCreateNew && (
        <button
          type="button"
          onClick={handleAppend}
          data-highlighted={highlightedIndex === 0}
          className={cx(
            'w-full py-1.5 px-4 text-left break-words cursor-pointer hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100 dark:text-neutral-100-dark',
            {
              'text-14px': size === 'default',
              'text-18px': size === 'large',
              '!bg-neutral-20 !dark:bg-neutral-20-dark': highlightedIndex === 0,
            },
          )}
        >
          Create <b>{inputValue}</b>...
        </button>
      )}
      {renderOption
        ? renderOption(
            filteredOptions,
            handleSelectOption,
            value,
            highlightedIndex,
          )
        : filteredOptions.map((option, index) => (
            <button
              type="button"
              role="option"
              aria-selected={value ? option.value === value.value : false}
              key={String(option.value)}
              onClick={() => handleSelectOption(option)}
              onMouseOver={() => setHighlightedIndex(index + isCreateNew)}
              onFocus={() => setHighlightedIndex(index + isCreateNew)}
              data-highlighted={highlightedIndex === index + isCreateNew}
              className={cx(
                'select-text w-full py-1.5 px-4 text-left break-words',
                {
                  'text-14px': size === 'default',
                  'text-18px': size === 'large',
                  'cursor-default bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark':
                    value && option.value === value.value,
                  'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100 dark:text-neutral-100-dark':
                    option.value !== value?.value,
                  '!bg-neutral-20 !dark:bg-neutral-20-dark':
                    highlightedIndex === index + isCreateNew,
                },
              )}
            >
              {option.label}
            </button>
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
      {showEmpty && <DropdownEmptyState />}
    </>
  );

  React.useEffect(() => {
    if (!dropdownRef.current || highlightedIndex < 0) return;
    const activeItem = dropdownRef.current.querySelector(
      '[data-highlighted="true"]',
    ) as HTMLElement | null;
    activeItem?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- keyboard navigation for combobox
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
        <input
          {...props}
          id={inputElementId}
          name={name}
          value={focused ? inputValue : ''}
          onChange={handleChangeInput}
          placeholder={focused ? '' : value?.label || placeholder}
          disabled={disabled}
          role="combobox"
          aria-invalid={isError || undefined}
          aria-describedby={helperMessage ? helperId : undefined}
          aria-autocomplete="list"
          aria-expanded={dropdownOpen}
          aria-haspopup="listbox"
          aria-controls={dropdownOpen ? listboxId : undefined}
          aria-required={required || undefined}
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={valueRef}
          className={cx(
            'w-full min-w-0 outline-none bg-transparent disabled:cursor-not-allowed',
            'text-neutral-90 dark:text-neutral-90-dark',
            'placeholder:text-neutral-50 dark:placeholder:text-neutral-50-dark',
            {
              'text-14px py-0.5': size === 'default',
              'text-18px py-0.5': size === 'large',
              'placeholder:!text-neutral-100 dark:placeholder:!text-neutral-100-dark':
                !!value?.label,
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
      <InputDropdown
        id={listboxId}
        open={dropdownOpen}
        elementRef={elementRef}
        dropdownRef={dropdownRef}
        fullWidth
        animation={animation}
      >
        {dropdownContent}
      </InputDropdown>
    </div>
  );
};

AutoComplete.isFormInput = true;

export default AutoComplete;
