import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useDebouncedCallback } from 'use-debounce';
import { FETCH_LIMIT } from '../../const/select';
import { isSelectValueArray } from '../../libs';
import Tag from '../Displays/Tag';
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
 * An autocomplete where multiple options can be selected
 */
const AutoCompleteMultiple = ({ id, name, value: valueProp, defaultValue, initialValue = [], label, labelPosition = 'top', autoHideLabel = false, placeholder = '', options: optionsProp, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width, appendIfNotFound, onAppend, required, renderOption, async, fetchOptions, onKeyDown, onPaste, animation, ...props }) => {
    const generatedId = React.useId();
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const { ref: refInView, inView } = useInView({ threshold: 0.1 });
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [loadingFetchOptions, setLoadingFetchOptions] = React.useState(!!async);
    const [stopAsyncFetch, setStopAsyncFetch] = React.useState(false);
    const [asyncOptions, setAsyncOptions] = React.useState(optionsProp || []);
    const [appendOptions, setAppendOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [page, setPage] = React.useState(0);
    const options = React.useMemo(() => {
        const sourceOptions = async ? asyncOptions : optionsProp;
        const combinedOptions = [...appendOptions, ...sourceOptions];
        return Array.from(new Map(combinedOptions.map((item) => [item.label, item])).values());
    }, [async, optionsProp, asyncOptions, appendOptions]);
    const [internalValue, setInternalValue] = React.useState(() => {
        if (isSelectValueArray(defaultValue))
            return defaultValue;
        if (defaultValue == null)
            return initialValue;
        return options.filter((item) => defaultValue.includes(item.value));
    });
    React.useEffect(() => {
        if (defaultValue && !isSelectValueArray(defaultValue)) {
            setInternalValue(options.filter((item) => defaultValue.map((v) => v).includes(item.value)));
        }
    }, [defaultValue, options]);
    const filteredOptions = React.useMemo(() => {
        if (async)
            return options;
        const filterKeyword = inputValue.trim().toLowerCase();
        return options.filter((option) => !inputValue || option.label.toLowerCase().includes(filterKeyword));
    }, [async, inputValue, options]);
    const isControlled = valueProp !== undefined;
    const value = valueProp ?? internalValue;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const inputId = id ?? `autocompletemultiple-${name ?? generatedId}`;
    const inputElementId = `${inputId}-input`;
    const helperId = `${inputId}-helper`;
    const helperMessage = isError && typeof errorProp === 'string' ? errorProp : helperText;
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
        setHighlightedIndex(-1);
        setInputValue('');
    }, []);
    useClickOutside([elementRef, dropdownRef], handleClose);
    React.useEffect(() => {
        const getAsyncOptions = async () => {
            setLoadingFetchOptions(true);
            const newPage = page + 1;
            const response = (await fetchOptions?.(inputValue, newPage, FETCH_LIMIT)) ?? [];
            setPage(newPage);
            if (response.length < FETCH_LIMIT) {
                setStopAsyncFetch(true);
            }
            setAsyncOptions((prev) => [...prev, ...response]);
            setLoadingFetchOptions(false);
        };
        if (async && inView && !stopAsyncFetch)
            getAsyncOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally triggers only on inView/dropdownOpen; page and stopAsyncFetch are modified inside, and fetchOptions/inputValue are stable across these triggers
    }, [async, inView, dropdownOpen]);
    const handleFetchOption = async (keyword) => {
        setAsyncOptions([]);
        setStopAsyncFetch(false);
        setLoadingFetchOptions(true);
        const newPage = 1;
        const response = (await fetchOptions?.(keyword, newPage, FETCH_LIMIT)) ?? [];
        setPage(newPage);
        if (response.length < FETCH_LIMIT) {
            setStopAsyncFetch(true);
        }
        setAsyncOptions(response);
        setLoadingFetchOptions(false);
    };
    const debouncedSearch = useDebouncedCallback((keyword) => handleFetchOption(keyword), 500);
    const debounceMatchInputtoOptions = useDebouncedCallback((keyword) => {
        const inputLower = keyword.toLowerCase();
        const matched = options.find(({ label: optionLabel }) => optionLabel.toLowerCase() === inputLower);
        if (matched) {
            handleSelectOption(matched);
            setInputValue('');
        }
    }, 500);
    const handleFocus = (event) => {
        if (disabled)
            return;
        setFocused(true);
        setDropdownOpen(true);
        props.onFocus?.(event);
    };
    const handleBlur = (event) => {
        const relatedTarget = event.relatedTarget;
        const dropdownContainsTarget = dropdownRef.current?.contains(relatedTarget);
        const elementContainsTarget = elementRef.current?.contains(relatedTarget);
        if (dropdownContainsTarget || elementContainsTarget)
            return;
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
        onChange?.([]);
        if (!isControlled)
            setInternalValue([]);
    };
    const handleChangeInput = (e) => {
        const input = e.target.value;
        setInputValue(input);
        setHighlightedIndex(input ? 0 : -1);
        if (async) {
            debouncedSearch(input);
            return;
        }
        debounceMatchInputtoOptions(input);
    };
    const handleSelectOption = (option) => {
        const selected = value.some((v) => v.value === option.value);
        let newValue;
        if (selected) {
            newValue = value.filter((v) => v.value !== option.value);
        }
        else {
            newValue = [...(value || []), option];
        }
        if (!isControlled) {
            setInternalValue((prev) => {
                if (selected) {
                    return prev.filter((v) => v.value !== option.value);
                }
                return [...prev, option];
            });
        }
        onChange?.(newValue);
    };
    const handleAppend = (val) => {
        if (val.length === 0 || !appendIfNotFound)
            return;
        const newValue = {
            label: val,
            value: val,
        };
        setAppendOptions((prev) => [...prev, newValue]);
        handleSelectOption(newValue);
        setInputValue('');
        onAppend?.(newValue);
    };
    const isCreateNew = appendIfNotFound &&
        inputValue &&
        !options.some((option) => option.label === inputValue)
        ? 1
        : 0;
    const handleKeyDown = (e) => {
        const maxIndex = filteredOptions.length - 1 + isCreateNew;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!dropdownOpen) {
                setFocused(true);
                setInputValue('');
                setDropdownOpen(true);
            }
            setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!dropdownOpen) {
                setFocused(true);
                setInputValue('');
                setDropdownOpen(true);
            }
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
        }
        else if (e.key === 'Escape') {
            e.preventDefault();
            setDropdownOpen(false);
            setHighlightedIndex(-1);
        }
        else if (e.key === 'Enter' && dropdownOpen) {
            e.preventDefault();
            if (isCreateNew && highlightedIndex === 0) {
                handleAppend(inputValue);
                return;
            }
            if (highlightedIndex > -1) {
                handleSelectOption(filteredOptions[highlightedIndex - isCreateNew]);
            }
        }
        else {
            onKeyDown?.(e);
        }
    };
    const handleAppendPaste = (e) => {
        const rows = e.clipboardData.getData('text').trim().split(/\r?\n/);
        if (rows.length > 1) {
            e.preventDefault();
            for (const row of rows) {
                const rowValue = options.find((option) => option.label === row);
                if (rowValue) {
                    handleSelectOption(rowValue);
                }
                else {
                    handleAppend(row);
                }
            }
        }
        else {
            onPaste?.(e);
        }
    };
    const showEmpty = !loading &&
        !loadingFetchOptions &&
        ((options.length === 0 && !inputValue) ||
            (!appendIfNotFound && filteredOptions.length === 0));
    const dropdownContent = (_jsxs(_Fragment, { children: [!!isCreateNew && (_jsxs("button", { type: "button", onClick: () => handleAppend(inputValue), "data-highlighted": highlightedIndex === 0, className: cx('w-full py-1.5 px-4 text-left break-words cursor-pointer hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100 dark:text-neutral-100-dark', {
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                    '!bg-neutral-20 !dark:bg-neutral-20-dark': highlightedIndex === 0,
                }), children: ["Create ", _jsx("b", { children: inputValue }), "..."] })), renderOption
                ? renderOption(filteredOptions, handleSelectOption, value, highlightedIndex)
                : filteredOptions.map((option, index) => {
                    const selected = value?.some((v) => v.value === option.value);
                    return (_jsxs("button", { type: "button", onClick: () => handleSelectOption(option), onMouseOver: () => setHighlightedIndex(index + isCreateNew), onFocus: () => setHighlightedIndex(index + isCreateNew), "data-highlighted": highlightedIndex === index + isCreateNew, className: cx('select-text w-full py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words', {
                            'text-14px': size === 'default',
                            'text-18px': size === 'large',
                            '!bg-neutral-20 !dark:bg-neutral-20-dark': highlightedIndex === index + isCreateNew,
                            'flex items-center justify-between gap-2.5 bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark': selected,
                            'text-neutral-100 dark:text-neutral-100-dark': !selected,
                        }), children: [_jsx("span", { children: option.label }), selected && (_jsx(Icon, { name: "check", size: 10, strokeWidth: 3, className: "text-primary-main dark:text-primary-main-dark" }))] }, String(option.value)));
                }), _jsx("div", { ref: refInView }), (loading || loadingFetchOptions) && (_jsx("span", { "aria-hidden": "true", children: _jsx(Icon, { name: "loader", size: 24, strokeWidth: 2, animation: "spin", className: "p-2 text-neutral-60 dark:text-neutral-60-dark" }) })), showEmpty && _jsx(DropdownEmptyState, {})] }));
    React.useEffect(() => {
        if (!dropdownRef.current || highlightedIndex < 0)
            return;
        const activeItem = dropdownRef.current.querySelector('[data-highlighted="true"]');
        activeItem?.scrollIntoView({ block: 'nearest' });
    }, [highlightedIndex]);
    return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- keyboard navigation for combobox
    _jsxs("div", { id: inputId, role: "group", className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), onKeyDown: handleKeyDown, children: [label && (!autoHideLabel || focused) && (_jsx(InputLabel, { id: inputElementId, size: size, required: required, children: label })), _jsx(InputBase, { focused: focused, error: isError, success: successProp, disabled: disabled, size: size, width: width, fullWidth: fullWidth, startIcon: startIcon, containerRef: elementRef, endIcons: _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && value.length > 0, onClear: handleClearValue, endIcon: endIcon, children: _jsx(DropdownChevron, { open: dropdownOpen, disabled: disabled, onClick: handleDropdown }) }), children: _jsxs("div", { className: cx('flex flex-1 gap-x-2 gap-y-1 items-center flex-wrap', {
                        'w-full': fullWidth,
                    }), children: [value?.map((selected) => (_jsx(Tag, { color: "info", children: selected.label }, String(selected.value)))), _jsx("input", { ...props, id: inputElementId, name: name, value: focused ? inputValue : '', onChange: handleChangeInput, placeholder: focused ? '' : placeholder, disabled: disabled, "aria-invalid": isError || undefined, "aria-describedby": helperMessage ? helperId : undefined, "aria-autocomplete": "list", autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, ref: valueRef, onPaste: handleAppendPaste, className: cx('flex-grow min-w-0 outline-none bg-transparent disabled:cursor-not-allowed', 'text-neutral-90 dark:text-neutral-90-dark', 'placeholder:text-neutral-50 dark:placeholder:text-neutral-50-dark', {
                                'text-14px py-0.5': size === 'default',
                                'text-18px py-0.5': size === 'large',
                            }) })] }) }), _jsx(InputHelper, { id: helperMessage ? helperId : undefined, message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true, animation: animation, children: dropdownContent })] }));
};
AutoCompleteMultiple.isFormInput = true;
export default AutoCompleteMultiple;
