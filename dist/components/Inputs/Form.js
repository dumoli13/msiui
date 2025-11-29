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
        if (typeof rule === 'string')
            return DEFAULT_ERROR_MESSAGES[ruleType];
        const message = rule.message ?? DEFAULT_ERROR_MESSAGES[ruleType];
        return message
            .replace('{minLength}', String(rule.minLength))
            .replace('{maxLength}', String(rule.maxLength))
            .replace('{exactLength}', String(rule.exactLength))
            .replace('{min}', String(rule.min))
            .replace('{max}', String(rule.max));
    };
    const handleSubmit = async () => {
        setIsSubmitting(true);
        const invalidFields = validate();
        if (invalidFields.length === 0) {
            const result = getValues();
            onSubmit?.(result);
        }
        setIsSubmitting(false);
    };
    const handleReset = React.useCallback(() => {
        for (const refs of Object.values(inputRefsRef.current)) {
            for (const ref of refs) {
                if (ref && typeof ref.reset === 'function') {
                    ref.reset();
                }
            }
        }
        setErrors({});
        onReset?.();
    }, []);
    const validate = React.useCallback(() => {
        const newErrors = {};
        const typedValues = {};
        for (const [key, refs] of Object.entries(inputRefsRef.current)) {
            const values = refs.map((r) => r?.value).filter((v) => v !== undefined);
            typedValues[key] = values;
        }
        if (!rules)
            return [];
        for (const [fieldName, fieldRules] of Object.entries(rules(typedValues))) {
            const values = typedValues[fieldName];
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
                };
                // Check each value for this field
                for (const value of values) {
                    checkValue(value);
                    if (newErrors[fieldName])
                        break; // Stop at first error
                }
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors);
    }, [rules, submitOnChange]);
    const handleFormKeyDown = (e, currentKey) => {
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
                    if (refs?.some((r) => !r.disabled)) {
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
                    if (refs?.some((r) => !r.disabled)) {
                        nextIndex = i;
                        break;
                    }
                }
            }
            if (nextIndex > -1) {
                const targetRefs = inputRefsRef.current[order[nextIndex]];
                const target = targetRefs.find((r) => !r?.disabled);
                target?.focus?.();
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
        return refs.map((r) => r?.value);
    }, []);
    const getValues = React.useCallback(() => {
        const result = {};
        for (const [key, refs] of Object.entries(inputRefsRef.current)) {
            const values = refs.map((r) => r?.value).filter((v) => v !== undefined);
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
            onSubmit?.(result);
        }
    }, 2000);
    // Separate ref tracking for cleanup functions
    const cleanupRefs = React.useRef({});
    const enhanceChild = (child) => {
        if (!React.isValidElement(child))
            return child;
        if (isFormSubmitButton(child)) {
            return React.cloneElement(child, {
                ...child.props,
                ref: child.ref || submitButtonRef,
            });
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
                    setErrors((prev) => ({ ...prev, [name]: undefined }));
                }
                childOnChange?.(value);
                if (submitOnChange) {
                    debounceSubmit();
                }
            };
            return React.cloneElement(child, {
                ...child.props,
                defaultValue,
                onChange: handleChange,
                error: errors[name] ?? undefined,
                disabled: childProps.disabled ?? formDisabled,
                onKeyDown: (e) => {
                    if (childProps.onKeyDown) {
                        childProps.onKeyDown(e);
                    }
                    else {
                        handleFormKeyDown(e, name);
                    }
                },
                inputRef: (ref) => {
                    // Generate unique key for this specific input instance
                    const instanceKey = `${name}_${Math.random().toString(36).substr(2, 9)}`;
                    // Run previous cleanup if it exists for this instance
                    if (cleanupRefs.current[instanceKey]) {
                        console.log('Running cleanup for:', name, instanceKey);
                        cleanupRefs.current[instanceKey]();
                        delete cleanupRefs.current[instanceKey];
                    }
                    if (name && ref) {
                        console.log('Setting ref for:', name, ref, instanceKey);
                        if (!inputRefsRef.current[name]) {
                            inputRefsRef.current[name] = [];
                        }
                        const refsArray = inputRefsRef.current[name];
                        if (!refsArray.includes(ref)) {
                            refsArray.push(ref);
                        }
                        // Create cleanup function
                        const cleanup = () => {
                            console.log('Cleanup called for:', name, instanceKey);
                            if (inputRefsRef.current[name]) {
                                inputRefsRef.current[name] = inputRefsRef.current[name].filter((r) => r !== ref);
                                if (inputRefsRef.current[name].length === 0) {
                                    delete inputRefsRef.current[name];
                                }
                            }
                            delete cleanupRefs.current[instanceKey];
                        };
                        // Store cleanup function
                        cleanupRefs.current[instanceKey] = cleanup;
                    }
                    // Call original ref if it exists
                    if (typeof originalInputRef === 'function') {
                        originalInputRef(ref);
                    }
                    else if (originalInputRef?.current !== undefined) {
                        originalInputRef.current = ref;
                    }
                },
            });
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
        getErrors: () => errorsRef.current,
        setErrors,
    }), [handleSubmit, handleReset, validate, getValue, getValues]);
    const renderTemplate = React.useCallback((template) => {
        // Track cleanup functions for template components
        const templateCleanupRefs = React.useRef({});
        const registerInputRef = (name) => {
            return (ref) => {
                if (!name || !ref)
                    return;
                const instanceKey = `${name}_${Math.random().toString(36).substr(2, 9)}`;
                // Run previous cleanup if it exists
                if (templateCleanupRefs.current[instanceKey]) {
                    templateCleanupRefs.current[instanceKey]();
                    delete templateCleanupRefs.current[instanceKey];
                }
                console.log('Template - Setting ref for:', name, ref, instanceKey);
                if (!inputRefsRef.current[name]) {
                    inputRefsRef.current[name] = [];
                }
                const refsArray = inputRefsRef.current[name];
                if (!refsArray.includes(ref)) {
                    refsArray.push(ref);
                }
                // Create cleanup function
                const cleanup = () => {
                    console.log('Template - Cleanup called for:', name, instanceKey);
                    if (inputRefsRef.current[name]) {
                        inputRefsRef.current[name] = inputRefsRef.current[name].filter((r) => r !== ref);
                        if (inputRefsRef.current[name].length === 0) {
                            delete inputRefsRef.current[name];
                        }
                    }
                    delete templateCleanupRefs.current[instanceKey];
                };
                templateCleanupRefs.current[instanceKey] = cleanup;
            };
        };
        const renderItem = (item, index) => {
            const key = item.id ?? index;
            const commonInputProps = (name, childOnChange) => name
                ? {
                    disabled: formDisabled,
                    error: errors[name],
                    onChange: (value) => {
                        if (errors[name]) {
                            setErrors((prev) => ({ ...prev, [name]: undefined }));
                        }
                        childOnChange?.(value);
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
                    return (_jsx(Button, { ...item, children: item.children }, key));
                case 'AutoComplete':
                    return (_jsx(AutoComplete, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'AutoCompleteMultiple':
                    return (_jsx(AutoCompleteMultiple, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'Checkbox':
                    return (_jsx(Checkbox, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'DatePicker':
                    return (_jsx(DatePicker, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'DateRangePicker':
                    return (_jsx(DateRangePicker, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'MultipleDatePicker':
                    return (_jsx(MultipleDatePicker, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'NumberTextField':
                    return (_jsx(NumberTextField, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'PasswordField':
                    return (_jsx(PasswordField, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'RadioGroup':
                    return (_jsx(RadioGroup, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'Select':
                    return (_jsx(Select, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'Switch':
                    return (_jsx(Switch, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'TextArea':
                    return (_jsx(TextArea, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'TextField':
                    return (_jsx(TextField, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                case 'TimerField':
                    return (_jsx(TimerField, { ...item, ...commonInputProps(item.name, item.onChange) }, key));
                default:
                    // eslint-disable-next-line no-console
                    console.warn('Unknown component:', item);
                    return null;
            }
        };
        return template.map((item, index) => renderItem(item, index));
    }, [errors, formDisabled, submitOnChange, debounceSubmit]);
    // Cleanup all refs on unmount
    React.useEffect(() => {
        return () => {
            // Cleanup all refs when form unmounts
            Object.values(cleanupRefs.current).forEach((cleanup) => cleanup());
            inputRefsRef.current = {};
        };
    }, []);
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
