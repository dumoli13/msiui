import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EMAIL_REGEX, URL_REGEX } from '../../const/regex';
import AutoComplete from './AutoComplete';
import AutoCompleteMultiple from './AutoCompleteMultiple';
import Button from './Button';
import Checkbox from './Checkbox';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';
import MultipleDatePicker from './MultipleDatePicker';
import NumberTextField from './NumberTextField';
import PasswordField from './PasswordField';
import RadioGroup from './RadioGroup';
import Select from './Select';
import Switch from './Switch';
import TextArea from './TextArea';
import TextField from './TextField';
import TimerField from './TimerField';
/**
 * List of predefined rule. Other than this, user can add rule in pattern
 */
const DEFAULT_ERROR_MESSAGES = {
    required: 'This field is required',
    pattern: 'Invalid format',
    minLength: 'Must be at least {minLength} characters',
    maxLength: 'Must be no more than {maxLength} characters',
    exactLength: 'Must be exactly {exactLength} characters',
    min: 'Must be at least {min}',
    max: 'Must be no more than {max}',
    email: 'Please enter a valid email address',
    url: 'Please enter a valid URL',
    equal: 'Values must match',
    validate: 'Invalid value',
};
const isFormInput = (el) => React.isValidElement(el) && !!el.type.isFormInput;
const isFormSubmitButton = (el) => {
    return React.isValidElement(el) && el.props.type === 'submit';
};
/**
 * High-performance form component with data domain management. Includes data entry and validation.
 */
const Form = ({ onSubmit, onReset, className, rules, disabled = false, formRef, submitOnChange = false, focusOnLastFieldEnter = false, children, template, }) => {
    const inputRefsRef = React.useRef({});
    const submitButtonRef = React.useRef(null);
    const inputOrderRef = React.useRef([]);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const formDisabled = disabled || isSubmitting;
    const getErrorMessage = (rule, ruleType) => {
        var _a;
        if (typeof rule === 'string')
            return DEFAULT_ERROR_MESSAGES[ruleType];
        const message = (_a = rule.message) !== null && _a !== void 0 ? _a : DEFAULT_ERROR_MESSAGES[ruleType];
        return message
            .replace('{minLength}', String(rule.minLength))
            .replace('{maxLength}', String(rule.maxLength))
            .replace('{exactLength}', String(rule.exactLength))
            .replace('{min}', String(rule.min))
            .replace('{max}', String(rule.max));
    };
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsSubmitting(true);
        const invalidFields = validate();
        if (invalidFields.length === 0) {
            const result = getValues();
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(result);
        }
        setIsSubmitting(false);
    });
    const handleReset = React.useCallback(() => {
        for (const refs of Object.values(inputRefsRef.current)) {
            for (const ref of refs) {
                if (ref && typeof ref.reset === 'function') {
                    ref.reset();
                }
            }
        }
        setErrors({});
        onReset === null || onReset === void 0 ? void 0 : onReset();
    }, []);
    const validate = React.useCallback(() => {
        const newErrors = {};
        const typedValues = {};
        for (const [key, refs] of Object.entries(inputRefsRef.current)) {
            const values = refs.map((r) => r === null || r === void 0 ? void 0 : r.value).filter((v) => v !== undefined);
            typedValues[key] = values;
        }
        if (!rules)
            return [];
        for (const [fieldName, fieldRules] of Object.entries(rules(typedValues))) {
            const value = typedValues[fieldName];
            const refs = inputRefsRef.current[fieldName];
            if (!refs)
                continue;
            for (const rule of fieldRules) {
                const checkValue = (val) => {
                    // Handle required rule
                    if (rule.required &&
                        (val === undefined ||
                            val === null ||
                            val === '' ||
                            (Array.isArray(val) && val.length === 0) ||
                            (val instanceof Date && Number.isNaN(val.getTime())))) {
                        // Do not show required error if submitOnChange is true since user need time to fill all fields
                        if (!submitOnChange) {
                            newErrors[fieldName] = getErrorMessage(rule, 'required');
                        }
                    }
                    else if (rule.pattern) {
                        const pattern = typeof rule.pattern === 'string'
                            ? new RegExp(rule.pattern)
                            : rule.pattern;
                        if (!pattern.test(String(val))) {
                            newErrors[fieldName] = getErrorMessage(rule, 'pattern');
                        }
                    }
                    else if (rule.minLength !== undefined &&
                        (typeof val === 'number' || typeof val === 'string') &&
                        String(val).length < rule.minLength) {
                        newErrors[fieldName] = getErrorMessage(rule, 'minLength');
                    }
                    else if (rule.maxLength !== undefined &&
                        (typeof val === 'number' || typeof val === 'string') &&
                        String(val).length > rule.maxLength) {
                        newErrors[fieldName] = getErrorMessage(rule, 'maxLength');
                    }
                    else if (rule.exactLength !== undefined &&
                        (typeof val === 'number' || typeof val === 'string') &&
                        String(val).length !== rule.exactLength) {
                        newErrors[fieldName] = getErrorMessage(rule, 'exactLength');
                    }
                    else if (rule.min !== undefined &&
                        typeof val === 'number' &&
                        val < rule.min) {
                        newErrors[fieldName] = getErrorMessage(rule, 'min');
                    }
                    else if (rule.max !== undefined &&
                        typeof val === 'number' &&
                        val > rule.max) {
                        newErrors[fieldName] = getErrorMessage(rule, 'max');
                    }
                    else if (rule.email &&
                        typeof val === 'string' &&
                        !EMAIL_REGEX.test(val)) {
                        newErrors[fieldName] = getErrorMessage(rule, 'email');
                    }
                    else if (rule.url &&
                        typeof val === 'string' &&
                        !URL_REGEX.test(val)) {
                        newErrors[fieldName] = getErrorMessage(rule, 'url');
                    }
                    else if (rule.equal !== undefined && val !== rule.equal) {
                        newErrors[fieldName] = getErrorMessage(rule, 'equal');
                    }
                    else if (rule.validate && !rule.validate(val)) {
                        newErrors[fieldName] = getErrorMessage(rule, 'validate');
                    }
                    setErrors(newErrors);
                    return Object.keys(newErrors);
                };
                for (const v of value) {
                    checkValue(v);
                }
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors);
    }, [rules]);
    const handleFormKeyDown = (e, currentKey) => {
        var _a;
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            const order = inputOrderRef.current;
            const currentIndex = order.indexOf(currentKey);
            if (currentIndex === -1)
                return;
            let nextIndex = -1;
            if (e.shiftKey && e.key === 'Tab') {
                // 🔹 Go backward when Shift + Tab
                for (let i = currentIndex - 1; i >= 0; i--) {
                    const prevKey = order[i];
                    const refs = inputRefsRef.current[prevKey];
                    if (refs === null || refs === void 0 ? void 0 : refs.some((r) => !r.disabled)) {
                        nextIndex = i;
                        break;
                    }
                }
            }
            else {
                // 🔹 Normal Tab or Enter → go forward
                for (let i = currentIndex + 1; i < order.length; i++) {
                    const nextKey = order[i];
                    const refs = inputRefsRef.current[nextKey];
                    if (refs === null || refs === void 0 ? void 0 : refs.some((r) => !r.disabled)) {
                        nextIndex = i;
                        break;
                    }
                }
            }
            if (nextIndex > -1) {
                const targetRefs = inputRefsRef.current[order[nextIndex]];
                const target = targetRefs.find((r) => !(r === null || r === void 0 ? void 0 : r.disabled));
                (_a = target === null || target === void 0 ? void 0 : target.focus) === null || _a === void 0 ? void 0 : _a.call(target);
                return;
            }
            // 🔹 No more enabled inputs
            if (!e.shiftKey) {
                if (focusOnLastFieldEnter) {
                    if (submitButtonRef.current && !submitButtonRef.current.disabled) {
                        submitButtonRef.current.focus();
                    }
                }
                else {
                    handleSubmit();
                }
            }
        }
    };
    const getValue = React.useCallback((key) => {
        const refs = inputRefsRef.current[key];
        if (!refs || refs.length === 0)
            return undefined;
        if (refs.length === 1)
            return refs[0].value;
        return refs.map((r) => r === null || r === void 0 ? void 0 : r.value);
    }, []);
    const getValues = React.useCallback(() => {
        const result = {};
        for (const [key, refs] of Object.entries(inputRefsRef.current)) {
            const values = refs.map((r) => r === null || r === void 0 ? void 0 : r.value).filter((v) => v !== undefined);
            if (values.length === 1) {
                result[key] = values[0];
            }
            else if (values.length > 1) {
                result[key] = values;
            }
        }
        return result;
    }, []);
    const errorsRef = React.useRef(errors);
    errorsRef.current = errors;
    const debounceSubmit = useDebouncedCallback(() => {
        const invalidFields = validate();
        if (invalidFields.length === 0) {
            const result = getValues();
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(result);
        }
    }, 2000);
    const enhanceChild = (child) => {
        var _a, _b;
        if (!React.isValidElement(child))
            return child;
        if (isFormSubmitButton(child)) {
            return React.cloneElement(child, Object.assign(Object.assign({}, child.props), { ref: child.ref || submitButtonRef }));
        }
        const childProps = child.props;
        if (isFormInput(child)) {
            const { name, onChange: childOnChange, defaultValue, inputRef: originalInputRef, } = childProps;
            if (!name)
                return child;
            if (!inputOrderRef.current.includes(name)) {
                inputOrderRef.current.push(name);
            }
            const handleChange = (value) => {
                if (errors[name]) {
                    setErrors((prev) => (Object.assign(Object.assign({}, prev), { [name]: undefined })));
                }
                childOnChange === null || childOnChange === void 0 ? void 0 : childOnChange(value);
                if (submitOnChange) {
                    debounceSubmit();
                }
            };
            // Preserve existing ref and props
            return React.cloneElement(child, Object.assign(Object.assign({}, child.props), { defaultValue, onChange: handleChange, error: (_a = errors[name]) !== null && _a !== void 0 ? _a : undefined, disabled: (_b = childProps.disabled) !== null && _b !== void 0 ? _b : formDisabled, onKeyDown: (e) => {
                    if (childProps.onKeyDown) {
                        childProps.onKeyDown(e);
                    }
                    else {
                        handleFormKeyDown(e, name);
                    }
                }, inputRef: (ref) => {
                    if (name && ref) {
                        if (!inputRefsRef.current[name]) {
                            inputRefsRef.current[name] = [];
                        }
                        const refsArray = inputRefsRef.current[name];
                        if (!refsArray.includes(ref)) {
                            refsArray.push(ref);
                        }
                    }
                    // Call original ref if it exists
                    if (typeof originalInputRef === 'function') {
                        originalInputRef(ref);
                    }
                    else if ((originalInputRef === null || originalInputRef === void 0 ? void 0 : originalInputRef.current) !== undefined) {
                        originalInputRef.current = ref;
                    }
                    // Clean up on unmount
                    return () => {
                        if (inputRefsRef.current[name]) {
                            inputRefsRef.current[name] = inputRefsRef.current[name].filter((r) => r !== ref);
                            if (inputRefsRef.current[name].length === 0) {
                                delete inputRefsRef.current[name];
                            }
                        }
                    };
                } }));
        }
        if (childProps.children) {
            return React.cloneElement(child, {
                children: React.Children.map(childProps.children, enhanceChild),
            });
        }
        return child;
    };
    React.useImperativeHandle(formRef, () => ({
        submit: handleSubmit,
        reset: handleReset,
        validate,
        getValue,
        getValues,
        getErrors: () => errorsRef.current, // Use ref to avoid closure issues
        setErrors,
    }), [handleSubmit, handleReset, validate, getValues, setErrors]);
    const renderTemplate = React.useCallback((template) => {
        const registerInputRef = (name) => (ref) => {
            if (!name || !ref)
                return;
            if (!inputRefsRef.current[name]) {
                inputRefsRef.current[name] = [];
            }
            const refsArray = inputRefsRef.current[name];
            if (!refsArray.includes(ref)) {
                refsArray.push(ref);
            }
            return () => {
                if (inputRefsRef.current[name]) {
                    inputRefsRef.current[name] = inputRefsRef.current[name].filter((r) => r !== ref);
                    if (inputRefsRef.current[name].length === 0) {
                        delete inputRefsRef.current[name];
                    }
                }
            };
        };
        const renderItem = (item, index) => {
            var _a;
            const key = (_a = item.id) !== null && _a !== void 0 ? _a : index;
            const commonInputProps = (name, childOnChange) => name
                ? {
                    disabled: formDisabled,
                    error: errors[name],
                    onChange: (value) => {
                        if (errors[name]) {
                            setErrors((prev) => (Object.assign(Object.assign({}, prev), { [name]: undefined })));
                        }
                        childOnChange === null || childOnChange === void 0 ? void 0 : childOnChange(value);
                        if (submitOnChange) {
                            debounceSubmit();
                        }
                    },
                    inputRef: registerInputRef(name),
                }
                : {};
            switch (item.component) {
                case 'div':
                    return (_jsx("div", { className: item.className, style: item.style, children: item.children ? renderTemplate(item.children) : null }, key));
                case 'Button':
                    return (_jsx(Button, Object.assign({}, item, { children: item.children }), key));
                case 'AutoComplete':
                    return (_jsx(AutoComplete, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'AutoCompleteMultiple':
                    return (_jsx(AutoCompleteMultiple, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'Checkbox':
                    return (_jsx(Checkbox, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'DatePicker':
                    return (_jsx(DatePicker, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'DateRangePicker':
                    return (_jsx(DateRangePicker, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'MultipleDatePicker':
                    return (_jsx(MultipleDatePicker, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'NumberTextField':
                    return (_jsx(NumberTextField, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'PasswordField':
                    return (_jsx(PasswordField, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'RadioGroup':
                    return (_jsx(RadioGroup, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'Select':
                    return (_jsx(Select, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'Switch':
                    return (_jsx(Switch, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'TextArea':
                    return (_jsx(TextArea, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'TextField':
                    return (_jsx(TextField, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                case 'TimerField':
                    return (_jsx(TimerField, Object.assign({}, item, commonInputProps(item.name, item.onChange)), key));
                default:
                    // eslint-disable-next-line no-console
                    console.warn('Unknown component:', item);
                    return null;
            }
        };
        return template.map((item, index) => renderItem(item, index));
    }, [errors, formDisabled, submitOnChange, debounceSubmit]);
    return (_jsx("form", { className: className, onSubmit: (e) => {
            e.preventDefault();
            handleSubmit();
        }, onReset: (e) => {
            e.preventDefault();
            handleReset();
        }, children: template
            ? renderTemplate(template)
            : React.Children.map(children, enhanceChild) }));
};
export default Form;
