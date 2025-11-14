import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { useInView } from 'react-intersection-observer';
import { FETCH_LIMIT } from '../../const/select';
import Icon from '../Icon';
import InputDropdown from './InputDropdown';
import InputEndIconWrapper from './InputEndIconWrapper';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
/**
 * Select components are used for collecting user provided information from a list of options.
 */
const Select = ({ id, name, value: valueProp, defaultValue, initialValue = null, label, labelPosition = 'top', autoHideLabel = false, placeholder = '', options: optionsProp, onChange, className, helperText, disabled: disabledProp = false, fullWidth, startIcon, endIcon, inputRef, size = 'default', error: errorProp, success: successProp, loading = false, clearable = false, width, required, renderOption, async, fetchOptions, onKeyDown, }) => {
    var _a;
    const elementRef = React.useRef(null);
    const valueRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const { ref: refInView, inView } = useInView({ threshold: 0.1 });
    const [focused, setFocused] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [loadingFetchOptions, setLoadingFetchOptions] = React.useState(!!async);
    const [stopAsyncFetch, setStopAsyncFetch] = React.useState(false);
    const [inheritOptions, setInheritOptions] = React.useState(optionsProp || []);
    const [page, setPage] = React.useState(0);
    const options = React.useMemo(() => (async ? inheritOptions : optionsProp), [async, optionsProp, inheritOptions]);
    const [internalValue, setInternalValue] = React.useState(options.find((item) => item.value === defaultValue) || initialValue);
    React.useEffect(() => {
        setInternalValue(options.find((item) => { var _a; return item.value === ((_a = internalValue === null || internalValue === void 0 ? void 0 : internalValue.value) !== null && _a !== void 0 ? _a : defaultValue); }) || null);
    }, [optionsProp]);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const helperMessage = errorProp !== null && errorProp !== void 0 ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => { var _a; return (_a = valueRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
        reset: () => setInternalValue(initialValue),
        disabled,
    }));
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            var _a, _b, _c;
            const target = event.target;
            const dropdownContainsTarget = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(target);
            const selectElementContainsTarget = (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(target);
            if (dropdownContainsTarget || selectElementContainsTarget) {
                (_c = elementRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                return;
            }
            setDropdownOpen(false);
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
            const response = yield fetchOptions(newPage, FETCH_LIMIT);
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
        setHighlightedIndex(-1);
    };
    const handleDropdown = () => {
        if (disabled)
            return;
        setDropdownOpen((prev) => !prev);
    };
    const handleClearValue = () => {
        setDropdownOpen(true);
        onChange === null || onChange === void 0 ? void 0 : onChange(null);
        if (!isControlled)
            setInternalValue(null);
    };
    const handleSelectOption = (option) => {
        if ((value === null || value === void 0 ? void 0 : value.value) === option.value)
            return;
        if (!isControlled)
            setInternalValue(option);
        onChange === null || onChange === void 0 ? void 0 : onChange(option);
        setFocused(false);
        setDropdownOpen(false);
    };
    const handleKeyDown = (e) => {
        const maxIndex = options.length - 1;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!focused)
                handleFocus();
            setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!focused)
                handleFocus();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && options[highlightedIndex]) {
                handleSelectOption(options[highlightedIndex]);
            }
        }
        else if (e.key === 'Escape') {
            e.preventDefault();
            setDropdownOpen(false);
            setHighlightedIndex(-1);
        }
        else {
            onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
        }
    };
    const dropdownContent = (_jsxs(_Fragment, { children: [renderOption
                ? renderOption(options, handleSelectOption, value, highlightedIndex)
                : options.map((option, index) => (_jsx("div", { role: "button", onClick: () => handleSelectOption(option), onMouseOver: () => setHighlightedIndex(index), "data-highlighted": index === highlightedIndex, className: cx('py-1.5 px-4 text-left break-words', {
                        'text-14px': size === 'default',
                        'text-18px': size === 'large',
                        'bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark': option.value === (value === null || value === void 0 ? void 0 : value.value),
                        'cursor-pointer hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100 dark:text-neutral-100-dark': option.value !== (value === null || value === void 0 ? void 0 : value.value),
                        '!bg-neutral-20 !dark:bg-neutral-20-dark': index === highlightedIndex,
                    }), children: option.label }, String(option.value)))), _jsx("div", { ref: refInView }), (loading || loadingFetchOptions) && (_jsx(Icon, { name: "loader", size: 24, strokeWidth: 2, animation: "spin", className: "p-2 text-neutral-60 dark:text-neutral-60-dark" })), !loadingFetchOptions && options.length === 0 && (_jsxs("div", { className: "flex flex-col items-center gap-4 text center text-neutral-60 dark:text-neutral-60-dark text-16px", children: [_jsx("div", { className: "h-12 w-12 bg-neutral-60 dark:bg-neutral-60-dark flex items-center justify-center rounded-full text-neutral-10 dark:text-neutral-10-dark text-36px font-semibold mt-1", children: "!" }), _jsx("div", { children: "Empty Option" })] }))] }));
    React.useEffect(() => {
        if (!dropdownRef.current || highlightedIndex < 0)
            return;
        // Find any element that is marked as the highlighted one
        const activeItem = dropdownRef.current.querySelector('[data-highlighted="true"]');
        if (activeItem) {
            activeItem.scrollIntoView({
                block: 'nearest',
            });
        }
    }, [highlightedIndex, dropdownContent]);
    const inputId = `select-${id || name}-${React.useId()}`;
    return (_jsxs("div", { className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), onKeyDown: handleKeyDown, children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: inputId, size: size, required: required, children: label })), _jsxs("div", { className: cx('relative px-3 border rounded-md flex gap-2 items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-hover dark:hover:border-primary-hover-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                    'py-[3px]': size === 'default',
                    'py-[9px]': size === 'large',
                }), ref: elementRef, style: width ? { width } : undefined, children: [!!startIcon && (_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: startIcon })), _jsx("div", { role: "button", tabIndex: disabled ? -1 : 0, "aria-pressed": "true", className: cx('w-full outline-none truncate', {
                            'text-14px py-0.5': size === 'default',
                            'text-18px py-0.5': size === 'large',
                            'text-neutral-60 dark:text-neutral-60-dark': !value || !value.label,
                            '!bg-neutral-20 dark:!bg-neutral-30-dark cursor-not-allowed': disabled,
                        }), onFocus: handleFocus, onBlur: handleBlur, onClick: handleFocus, ref: valueRef, children: (_a = value === null || value === void 0 ? void 0 : value.label) !== null && _a !== void 0 ? _a : placeholder }), _jsx(InputEndIconWrapper, { loading: loading, error: isError, success: successProp, clearable: clearable && focused && !!value, onClear: handleClearValue, endIcon: endIcon, children: disabled ? (_jsx(Icon, { name: "chevron-down", size: 20, strokeWidth: 2, className: "p-0.5 text-neutral-70 dark:text-neutral-70-dark" })) : (_jsx(Icon, { name: "chevron-down", size: 20, strokeWidth: 2, onClick: handleDropdown, className: cx('rounded-full p-0.5 text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark cursor-pointer transition-color', {
                                'rotate-180': dropdownOpen,
                            }) })) })] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size }), _jsx(InputDropdown, { open: dropdownOpen, elementRef: elementRef, dropdownRef: dropdownRef, fullWidth: true, children: dropdownContent })] }));
};
Select.isFormInput = true;
export default Select;
