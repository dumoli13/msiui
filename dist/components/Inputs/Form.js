import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EMAIL_REGEX, URL_REGEX } from '../../const/regex';
const normalizeRule = (rule) => {
    if (typeof rule === 'string') {
        switch (rule) {
            case 'required':
                return { required: true };
            case 'email':
                return { email: true };
            case 'url':
                return { url: true };
            default:
                return {};
        }
    }
    return rule;
};
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
};
const isFormInput = (el) => React.isValidElement(el) && !!el.type.isFormInput;
const isFormSubmitButton = (el) => {
    return React.isValidElement(el) && el.props.type === 'submit';
};
/**
 * High-performance form component with data domain management. Includes data entry and validation.
 */
const Form = ({ onSubmit, onReset, className, children, rules = {}, disabled = false, formRef, submitOnChange = false, focusOnLastFieldEnter = false, }) => {
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
        var _a, _b, _c;
        setIsSubmitting(true);
        const isValid = validate();
        if (isValid.length === 0) {
            const result = {};
            for (const key in inputRefsRef.current) {
                // inputRefsRef.current[key] may be undefined if user remove it in the jsx
                result[key] = (_a = inputRefsRef.current[key]) === null || _a === void 0 ? void 0 : _a.value;
            }
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(result);
        }
        else {
            const firstInvalid = isValid.find((id) => { var _a; return inputRefsRef.current[id] && !((_a = inputRefsRef.current[id]) === null || _a === void 0 ? void 0 : _a.disabled); });
            if (firstInvalid) {
                (_c = (_b = inputRefsRef.current[firstInvalid]) === null || _b === void 0 ? void 0 : _b.focus) === null || _c === void 0 ? void 0 : _c.call(_b);
            }
        }
        setIsSubmitting(false);
    });
    const handleReset = React.useCallback(() => {
        Object.values(inputRefsRef.current).forEach((ref) => {
            if (ref && typeof ref.reset === 'function') {
                ref.reset();
            }
        });
        setErrors({});
        onReset === null || onReset === void 0 ? void 0 : onReset();
    }, []);
    const validate = React.useCallback(() => {
        const newErrors = {};
        const typedValues = {};
        Object.entries(inputRefsRef.current).forEach(([key, ref]) => {
            if ((ref === null || ref === void 0 ? void 0 : ref.value) !== undefined) {
                typedValues[key] = ref.value;
            }
        });
        Object.entries(rules).forEach(([fieldName, fieldRules]) => {
            const value = typedValues[fieldName];
            for (const rule of fieldRules) {
                const normalizedRule = normalizeRule(rule);
                if (normalizedRule.required &&
                    (value === undefined || // Check for undefined
                        value === null || // Check for null
                        value === '' || // Check for empty string
                        (Array.isArray(value) && value.length === 0) || // Check for empty array
                        (value instanceof Date && isNaN(value.getTime()))) // Check for invalid Dayjs instance
                ) {
                    // Do not show required error if submitOnChange is true since user need time to fill all fields
                    if (!submitOnChange) {
                        newErrors[fieldName] = getErrorMessage(rule, 'required');
                    }
                    break;
                }
                if (value === undefined || value === null || value === '')
                    continue;
                if (normalizedRule.pattern) {
                    const pattern = typeof normalizedRule.pattern === 'string'
                        ? new RegExp(normalizedRule.pattern)
                        : normalizedRule.pattern;
                    if (!pattern.test(String(value))) {
                        newErrors[fieldName] = getErrorMessage(rule, 'pattern');
                        break;
                    }
                }
                if (normalizedRule.minLength !== undefined &&
                    (typeof value === 'number' || typeof value === 'string') &&
                    String(value).length < normalizedRule.minLength) {
                    newErrors[fieldName] = getErrorMessage(rule, 'minLength');
                    break;
                }
                if (normalizedRule.maxLength !== undefined &&
                    (typeof value === 'number' || typeof value === 'string') &&
                    String(value).length > normalizedRule.maxLength) {
                    newErrors[fieldName] = getErrorMessage(rule, 'maxLength');
                    break;
                }
                if (normalizedRule.exactLength !== undefined &&
                    (typeof value === 'number' || typeof value === 'string') &&
                    String(value).length !== normalizedRule.exactLength) {
                    newErrors[fieldName] = getErrorMessage(rule, 'exactLength');
                    break;
                }
                if (normalizedRule.min !== undefined &&
                    typeof value === 'number' &&
                    Number(value) < normalizedRule.min) {
                    newErrors[fieldName] = getErrorMessage(rule, 'min');
                    break;
                }
                if (normalizedRule.max &&
                    typeof value === 'number' &&
                    Number(value) > normalizedRule.max) {
                    newErrors[fieldName] = getErrorMessage(rule, 'max');
                    break;
                }
                if (normalizedRule.email && !EMAIL_REGEX.test(String(value))) {
                    newErrors[fieldName] = getErrorMessage(rule, 'email');
                    break;
                }
                if (normalizedRule.url &&
                    typeof value === 'string' &&
                    !URL_REGEX.test(String(value))) {
                    newErrors[fieldName] = getErrorMessage(rule, 'url');
                    break;
                }
                if (normalizedRule.equal !== undefined &&
                    value !== normalizedRule.equal) {
                    newErrors[fieldName] = getErrorMessage(rule, 'equal');
                    break;
                }
                if (normalizedRule.validate) {
                    const result = normalizedRule.validate(value);
                    if (result.length > 0) {
                        newErrors[fieldName] =
                            typeof result === 'string' ? result : 'Invalid value';
                        break;
                    }
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors);
    }, [rules]);
    const handleInputKeyDown = (e, currentKey) => {
        var _a;
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            const order = inputOrderRef.current;
            const currentIndex = order.indexOf(currentKey);
            if (currentIndex === -1)
                return;
            // Find the next enabled input
            let nextEnabledInputIndex = -1;
            for (let i = currentIndex + 1; i < order.length; i++) {
                const nextKey = order[i];
                const ref = inputRefsRef.current[nextKey];
                if (ref && typeof ref.focus === 'function' && !ref.disabled) {
                    nextEnabledInputIndex = i;
                    break;
                }
            }
            // If found, focus on the next enabled input
            if (nextEnabledInputIndex > -1) {
                const nextKey = order[nextEnabledInputIndex];
                const ref = inputRefsRef.current[nextKey];
                (_a = ref.focus) === null || _a === void 0 ? void 0 : _a.call(ref);
                return;
            }
            // No more enabled inputs found
            if (focusOnLastFieldEnter) {
                if (submitButtonRef.current && !submitButtonRef.current.disabled) {
                    submitButtonRef.current.focus();
                }
            }
            else {
                handleSubmit();
            }
        }
    };
    const getValues = React.useCallback(() => {
        const result = {};
        for (const key in inputRefsRef.current) {
            result[key] = inputRefsRef.current[key].value;
        }
        return result;
    }, []);
    const errorsRef = React.useRef(errors);
    errorsRef.current = errors;
    const debounceSubmit = useDebouncedCallback(() => {
        const isValid = validate();
        if (isValid.length === 0) {
            const result = {};
            for (const key in inputRefsRef.current) {
                result[key] = inputRefsRef.current[key].value;
            }
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
            const { name, id, onChange: childOnChange, defaultValue, inputRef: originalInputRef, } = childProps;
            const fieldName = name !== null && name !== void 0 ? name : id;
            if (!fieldName)
                return child;
            if (!inputOrderRef.current.includes(fieldName)) {
                inputOrderRef.current.push(fieldName);
            }
            const handleChange = (value) => {
                if (errors[fieldName]) {
                    setErrors((prev) => (Object.assign(Object.assign({}, prev), { [fieldName]: undefined })));
                }
                childOnChange === null || childOnChange === void 0 ? void 0 : childOnChange(value);
                if (submitOnChange) {
                    debounceSubmit();
                }
            };
            // Preserve existing ref and props
            return React.cloneElement(child, Object.assign(Object.assign({}, child.props), { defaultValue, onChange: handleChange, error: (_a = errors[fieldName]) !== null && _a !== void 0 ? _a : undefined, disabled: (_b = childProps.disabled) !== null && _b !== void 0 ? _b : formDisabled, onKeyDown: (e) => {
                    if (childProps.onKeyDown) {
                        childProps.onKeyDown(e);
                    }
                    else {
                        handleInputKeyDown(e, fieldName);
                    }
                }, inputRef: (ref) => {
                    if (fieldName) {
                        inputRefsRef.current[fieldName] = ref;
                    }
                    // Call original ref if it exists
                    if (typeof originalInputRef === 'function') {
                        originalInputRef(ref);
                    }
                    else if ((originalInputRef === null || originalInputRef === void 0 ? void 0 : originalInputRef.current) !== undefined) {
                        originalInputRef.current = ref;
                    }
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
        getValues,
        getErrors: () => errorsRef.current, // Use ref to avoid closure issues
        setErrors,
    }), [handleSubmit, handleReset, validate, getValues, setErrors]);
    return (_jsx("form", { className: className, onSubmit: (e) => {
            e.preventDefault();
            handleSubmit();
        }, onReset: (e) => {
            e.preventDefault();
            handleReset();
        }, children: React.Children.map(children, enhanceChild) }));
};
export default Form;
