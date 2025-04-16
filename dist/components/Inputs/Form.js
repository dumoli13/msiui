import React from 'react';
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
    min: 'Must be at least {min}',
    max: 'Must be no more than {max}',
    email: 'Please enter a valid email address',
    url: 'Please enter a valid URL',
    equal: 'Values must match',
};
/**
 * List of all mis-design input components
 * add new components here to make them available in the form
 */
const INPUT_TYPES = [
    'AutoComplete',
    'AutoCompleteMultiple',
    'Checkbox',
    'DatePicker',
    'DateRangePicker',
    'MultipleDatePicker',
    'NumberTextField',
    'PasswordField',
    'Select',
    'Switch',
    'TextArea',
    'TextField',
    'TimerField',
];
const isFormInput = (element) => {
    var _a;
    return (React.isValidElement(element) &&
        INPUT_TYPES.includes((_a = element.type) === null || _a === void 0 ? void 0 : _a.name));
};
const Form = ({ onSubmit, onReset, className, children, rules = {}, disabled = false, initialValues = {}, formRef, }) => {
    const inputRefsRef = React.useRef({});
    const [values, setValues] = React.useState(() => {
        const defaults = Object.assign({}, initialValues);
        const getDefaultValue = (child) => {
            var _a, _b;
            if (!React.isValidElement(child))
                return defaults;
            const childProps = child.props;
            if (isFormInput(child)) {
                const name = (_a = childProps.name) !== null && _a !== void 0 ? _a : childProps.id;
                if (name) {
                    defaults[name] = (_b = childProps.defaultValue) !== null && _b !== void 0 ? _b : '';
                }
            }
            if (childProps.children) {
                React.Children.map(childProps.children, getDefaultValue);
            }
            return defaults;
        };
        React.Children.forEach(children, getDefaultValue);
        return Object.assign(Object.assign({}, defaults), initialValues);
    });
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const formDisabled = disabled || isSubmitting;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const getErrorMessage = (rule, ruleType) => {
        var _a;
        if (typeof rule === 'string')
            return DEFAULT_ERROR_MESSAGES[ruleType];
        const message = (_a = rule.message) !== null && _a !== void 0 ? _a : DEFAULT_ERROR_MESSAGES[ruleType];
        return message
            .replace('{minLength}', String(rule.minLength))
            .replace('{maxLength}', String(rule.maxLength))
            .replace('{min}', String(rule.min))
            .replace('{max}', String(rule.max));
    };
    const validate = React.useCallback(() => {
        const newErrors = {};
        Object.entries(rules).forEach(([fieldName, fieldRules]) => {
            const value = values[fieldName];
            for (const rule of fieldRules) {
                const normalizedRule = normalizeRule(rule);
                if (normalizedRule.required &&
                    (value === undefined || value === null || value === '')) {
                    newErrors[fieldName] = getErrorMessage(rule, 'required');
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
                    String(value).length < normalizedRule.minLength) {
                    newErrors[fieldName] = getErrorMessage(rule, 'minLength');
                    break;
                }
                if (normalizedRule.maxLength !== undefined &&
                    String(value).length > normalizedRule.maxLength) {
                    newErrors[fieldName] = getErrorMessage(rule, 'maxLength');
                    break;
                }
                if (normalizedRule.min !== undefined &&
                    Number(value) < normalizedRule.min) {
                    newErrors[fieldName] = getErrorMessage(rule, 'min');
                    break;
                }
                if (normalizedRule.max !== undefined &&
                    Number(value) > normalizedRule.max) {
                    newErrors[fieldName] = getErrorMessage(rule, 'max');
                    break;
                }
                if (normalizedRule.email && !emailRegex.test(String(value))) {
                    newErrors[fieldName] = getErrorMessage(rule, 'email');
                    break;
                }
                if (normalizedRule.url && !urlRegex.test(String(value))) {
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
                    if (result !== true) {
                        newErrors[fieldName] =
                            typeof result === 'string' ? result : 'Invalid value';
                        break;
                    }
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [rules, values]);
    const enhanceChild = (child) => {
        var _a;
        if (!React.isValidElement(child))
            return child;
        const childProps = child.props;
        if (isFormInput(child)) {
            const { name, id, onChange: childOnChange, defaultValue, inputRef: originalInputRef, } = childProps;
            const fieldName = name !== null && name !== void 0 ? name : id;
            if (!fieldName)
                return child;
            const handleChange = (value) => {
                setValues((prev) => (Object.assign(Object.assign({}, prev), { [fieldName]: value })));
                if (errors[fieldName]) {
                    setErrors((prev) => (Object.assign(Object.assign({}, prev), { [fieldName]: undefined })));
                }
                childOnChange === null || childOnChange === void 0 ? void 0 : childOnChange(value);
            };
            // Preserve existing ref and props
            return React.cloneElement(child, Object.assign(Object.assign({}, child.props), { defaultValue, onChange: handleChange, error: (_a = errors[fieldName]) !== null && _a !== void 0 ? _a : undefined, disabled: formDisabled || childProps.disabled, inputRef: (ref) => {
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
    const handleSubmit = () => {
        setIsSubmitting(true);
        const isValid = validate();
        if (isValid)
            onSubmit(values);
        setIsSubmitting(false);
    };
    const handleReset = () => {
        setValues(initialValues);
        Object.values(inputRefsRef.current).forEach((ref) => {
            if (ref && typeof ref.reset === 'function') {
                ref.reset();
            }
        });
        setErrors({});
        onReset === null || onReset === void 0 ? void 0 : onReset();
    };
    React.useImperativeHandle(formRef, () => ({
        submit: handleSubmit,
        reset: handleReset,
        validate,
        getValues: () => values,
    }));
    return (React.createElement("form", { className: className, onSubmit: (e) => {
            e.preventDefault();
            handleSubmit();
        }, onReset: (e) => {
            e.preventDefault();
            handleReset();
        } }, React.Children.map(children, enhanceChild)));
};
export default Form;
//# sourceMappingURL=Form.js.map