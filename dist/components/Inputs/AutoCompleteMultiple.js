import { __awaiter, __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useDebouncedCallback } from 'use-debounce';
import { FETCH_LIMIT } from '../../const/select';
import Tag from '../Displays/Tag';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 * An autocomplete where multiple options can be selected
 */
const AutoCompleteMultiple = (_a) => {
    var { id, name, value: valueProp, defaultValue = [], initialValue = [], label, labelPosition = 'top', autoHideLabel = false, placeholder = '', options: optionsProp, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width, appendIfNotFound, onAppend, required, renderOption, async, fetchOptions } = _a, props = __rest(_a, ["id", "name", "value", "defaultValue", "initialValue", "label", "labelPosition", "autoHideLabel", "placeholder", "options", "onChange", "className", "helperText", "disabled", "fullWidth", "startIcon", "endIcon", "inputRef", "size", "error", "success", "loading", "clearable", "width", "appendIfNotFound", "onAppend", "required", "renderOption", "async", "fetchOptions"]);
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const { ref: refInView, inView } = useInView({ threshold: 0.1 });
    const [loadingFetchOptions, setLoadingFetchOptions] = React.useState(!!async);
    const [stopAsyncFetch, setStopAsyncFetch] = React.useState(false);
    const [inheritOptions, setInheritOptions] = React.useState(optionsProp || []);
    const [injectOptions, setInjectOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [page, setPage] = React.useState(0);
    const options = React.useMemo(() => {
        const sourceOptions = async ? inheritOptions : optionsProp;
        const combinedOptions = [...injectOptions, ...sourceOptions];
        return Array.from(new Map(combinedOptions.map((item) => [item.label, item])).values());
    }, [async, optionsProp, inheritOptions, injectOptions]);
    const [internalValue, setInternalValue] = React.useState(options.filter((item) => defaultValue.includes(item.value)) || initialValue);
    const filteredOptions = React.useMemo(() => async
        ? options
        : options.filter((option) => !inputValue ||
            option.label.toLowerCase().includes(inputValue.toLowerCase())), [inputValue, options]);
    React.useEffect(() => {
        setInternalValue(options.filter((item) => defaultValue.map((v) => v).includes(item.value)) || []);
    }, [optionsProp]);
    const isControlled = valueProp !== undefined;
    const value = valueProp !== null && valueProp !== void 0 ? valueProp : internalValue; // Default to internal state if undefined
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value: value,
        focus: () => { var _a; return (_a = valueRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
        reset: () => setInternalValue(initialValue),
        disabled,
    }));
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            var _a, _b;
            const target = event.target;
            const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(target);
            const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(target);
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
    React.useEffect(() => {
        const getAsyncOptions = () => __awaiter(void 0, void 0, void 0, function* () {
            setLoadingFetchOptions(true);
            const newPage = page + 1;
            const response = yield fetchOptions(inputValue, newPage, FETCH_LIMIT);
            setPage(newPage);
            if (response.length < FETCH_LIMIT) {
                setStopAsyncFetch(true);
            }
            setInheritOptions((prev) => [...prev, ...response]);
            setLoadingFetchOptions(false);
        });
        if (async && inView && !stopAsyncFetch)
            getAsyncOptions();
    }, [async, inView, dropdownOpen]);
    const handleFetchOption = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
        // Fetch new options and reset page
        setInheritOptions([]);
        setStopAsyncFetch(false);
        setLoadingFetchOptions(true);
        const newPage = 1;
        const response = yield fetchOptions(keyword, newPage, FETCH_LIMIT);
        setPage(newPage);
        if (response.length < FETCH_LIMIT) {
            setStopAsyncFetch(true);
        }
        setInheritOptions(response);
        setLoadingFetchOptions(false);
    });
    const debouncedSearch = useDebouncedCallback((keyword) => handleFetchOption(keyword), 500);
    const handleFocus = () => {
        if (disabled)
            return;
        setFocused(true);
        setDropdownOpen(true);
    };
    const handleBlur = (event) => {
        var _a, _b;
        const relatedTarget = event.relatedTarget;
        const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(relatedTarget);
        const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(relatedTarget);
        if (dropdownContainsTarget || selectElementContainsTarget) {
            return;
        }
        setFocused(false);
        setDropdownOpen(false);
    };
    const handleDropdown = () => {
        setFocused(true);
        setDropdownOpen((prev) => !prev);
    };
    const handleClearValue = () => {
        setDropdownOpen(true);
        onChange === null || onChange === void 0 ? void 0 : onChange([]); // Clear with an empty array
        if (!isControlled)
            setInternalValue([]); // Update internal state if uncontrolled
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        const input = e.target.value.toLowerCase();
        if (async) {
            debouncedSearch(input);
        }
        else {
            const filtered = options.find(({ label }) => label.toLowerCase() === input);
            if (filtered) {
                handleOptionSelect(filtered);
            }
        }
    };
    const handleOptionSelect = (option) => {
        const newValue = [...(value || []), option];
        if (!isControlled)
            setInternalValue(newValue); // Update internal state if uncontrolled
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    const handleRemoveSelected = (option) => {
        const newValue = value.filter((v) => v.value !== option.value);
        if (!isControlled)
            setInternalValue(newValue);
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    const handleAppend = () => {
        if (inputValue.length === 0 || !appendIfNotFound)
            return;
        const newValue = {
            label: inputValue,
            value: inputValue,
        };
        setInjectOptions((prev) => [...prev, newValue]);
        handleOptionSelect(newValue);
        onAppend(newValue);
    };
    const dropdownContent = (_jsxs(_Fragment, { children: [appendIfNotFound &&
                inputValue &&
                !options.find((option) => option.label === inputValue) && (_jsxs("button", { type: "button", onClick: handleAppend, className: cx('py-1.5 px-4 text-left break-words cursor-pointer bg-neutral-15 dark:bg-neutral-15-dark hover:bg-neutral-20 dark:hover:bg-neutral-20-dark', {
                    'text-14px': size === 'default',
                    'text-18px': size === 'large',
                }), children: ["Create ", _jsx("b", { children: inputValue }), "..."] })), renderOption
                ? renderOption(filteredOptions, handleOptionSelect, value)
                : filteredOptions.map((option) => {
                    const selected = value === null || value === void 0 ? void 0 : value.some((v) => v.value === option.value);
                    return selected ? (_jsxs("div", { role: "button", onMouseDown: () => handleRemoveSelected(option), className: cx('cursor-pointer py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words flex items-center justify-between gap-2.5 bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark', {
                            'text-14px': size === 'default',
                            'text-18px': size === 'large',
                        }), children: [_jsx("span", { children: option.label }), _jsx(Icon, { name: "check", size: 10, strokeWidth: 3, className: "text-primary-main dark:text-primary-main-dark" })] }, String(option.value))) : (_jsx("div", { role: "button", onMouseDown: () => handleOptionSelect(option), className: cx('cursor-pointer py-1.5 px-4 hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-left break-words text-neutral-100 dark:text-neutral-100-dark', {
                            'text-14px': size === 'default',
                            'text-18px': size === 'large',
                        }), children: option.label }, String(option.value)));
                }), _jsx("div", { ref: refInView }), (loading || loadingFetchOptions) && (_jsx(Icon, { name: "loader", size: 24, strokeWidth: 2, animation: "spin", className: "p-2 text-neutral-60 dark:text-neutral-60-dark" })), !loading &&
                !loadingFetchOptions &&
                ((options.length === 0 && !inputValue) ||
                    (!appendIfNotFound && filteredOptions.length === 0)) && (_jsxs("div", { className: "flex flex-col items-center gap-4 text center text-neutral-60 text-16px dark:text-neutral-60-dark", children: [_jsx("div", { className: "h-12 w-12 bg-neutral-60 dark:bg-neutral-60-dark flex items-center justify-center rounded-full text-neutral-10 dark:text-neutral-10-dark text-36px font-semibold mt-1", children: "!" }), _jsx("div", { children: "Empty Option" })] }))] }));
    const inputId = `autocompletemultiple-${id || name}-${React.useId()}`;
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: inputId, size: size, required: required, children: label })), _jsxs("div", { className: cx('relative px-3 border rounded-md flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-main dark:hover:border-primary-main-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                    'py-[3px]': size === 'default',
                    'py-[9px]': size === 'large',
                }), style: width ? { width } : undefined, ref: elementRef, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsxs("div", { className: cx('flex flex-1 gap-x-2 gap-y-1 items-center flex-wrap', {
                            'w-full': fullWidth,
                        }), children: [value === null || value === void 0 ? void 0 : value.map((selected) => (_jsx(Tag, { color: "info", children: selected.label }, String(selected.value)))), _jsx("input", Object.assign({}, props, { tabIndex: !disabled ? 0 : -1, id: inputId, value: focused ? inputValue : '', onChange: handleInputChange, placeholder: focused ? '' : placeholder, className: cx('flex-grow outline-none bg-neutral-10 dark:bg-neutral-10-dark disabled:bg-neutral-20 dark:disabled:bg-neutral-30-dark disabled:cursor-not-allowed', {
                                    'text-14px py-0.5': size === 'default',
                                    'text-18px py-0.5': size === 'large',
                                }), disabled: disabled, "aria-label": label, autoComplete: "off", onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus }))] }), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && !!value, onClear: handleClearValue, endIcon: endIcon, children: disabled ? (_jsx(Icon, { name: "chevron-down", size: 20, strokeWidth: 2, className: "p-0.5 text-neutral-70 dark:text-neutral-70-dark" })) : (_jsx(Icon, { name: "chevron-down", size: 20, strokeWidth: 2, onClick: handleDropdown, className: cx('rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark cursor-pointer transition-color', {
                                'rotate-180': dropdownOpen,
                            }) })) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true, children: dropdownContent })] }));
};
AutoCompleteMultiple.isFormInput = true;
export default AutoCompleteMultiple;
