import React from 'react';
import { InputProps, InputPropsRefType } from '../../types/input';

export interface FormRef {
  submit: () => void;
  reset: () => void;
  validate: () => boolean;
  getValues: () => Record<string, any>;
}

export type FormRule =
  | {
      required?: boolean;
      email?: boolean;
      url?: boolean;
      pattern?: RegExp | string;
      minLength?: number;
      maxLength?: number;
      min?: number;
      max?: number;
      equal?: any;
      validate?: (value: any) => boolean | string;
      message?: string;
    }
  | 'required'
  | 'email'
  | 'url';

export type FormRules = Record<string, FormRule[]>;

const normalizeRule = (rule: FormRule) => {
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

export interface FormProps {
  onSubmit: (values: Record<string, any>) => void;
  onReset?: () => void;
  className?: string;
  children: React.ReactNode;
  rules?: FormRules;
  disabled?: boolean;
  initialValues?: Record<string, any>;
  formRef?: React.Ref<FormRef>;
}

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

const isFormInput = (
  element: React.ReactElement,
): element is React.ReactElement<{ name?: string; id?: string }> => {
  return (
    React.isValidElement(element) &&
    INPUT_TYPES.includes((element.type as any)?.name)
  );
};

const Form = ({
  onSubmit,
  onReset,
  className,
  children,
  rules = {},
  disabled = false,
  initialValues = {},
  formRef,
}: FormProps) => {
  const inputRefsRef = React.useRef<Record<string, InputPropsRefType>>({});

  const [values, setValues] = React.useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = { ...initialValues };

    const getDefaultValue = (child: React.ReactNode): Record<string, any> => {
      if (!React.isValidElement(child)) return defaults;

      const childProps = child.props as InputProps<any>;
      if (isFormInput(child)) {
        const name = childProps.name ?? childProps.id;
        if (name) {
          defaults[name] = childProps.defaultValue ?? '';
        }
      }
      if (childProps.children) {
        React.Children.map(childProps.children, getDefaultValue);
      }
      return defaults;
    };

    React.Children.forEach(children, getDefaultValue);
    return { ...defaults, ...initialValues };
  });

  const [errors, setErrors] = React.useState<
    Record<string, string | undefined>
  >({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const formDisabled = disabled || isSubmitting;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  const getErrorMessage = (
    rule: FormRule,
    ruleType: keyof typeof DEFAULT_ERROR_MESSAGES,
  ) => {
    if (typeof rule === 'string') return DEFAULT_ERROR_MESSAGES[ruleType];

    const message = rule.message ?? DEFAULT_ERROR_MESSAGES[ruleType];
    return message
      .replace('{minLength}', String(rule.minLength))
      .replace('{maxLength}', String(rule.maxLength))
      .replace('{min}', String(rule.min))
      .replace('{max}', String(rule.max));
  };

  const validate = React.useCallback(() => {
    const newErrors: Record<string, string> = {};

    Object.entries(rules).forEach(([fieldName, fieldRules]) => {
      const value = values[fieldName];

      for (const rule of fieldRules) {
        const normalizedRule = normalizeRule(rule);

        if (
          normalizedRule.required &&
          (value === undefined || value === null || value === '')
        ) {
          newErrors[fieldName] = getErrorMessage(rule, 'required');
          break;
        }

        if (value === undefined || value === null || value === '') continue;

        if (normalizedRule.pattern) {
          const pattern =
            typeof normalizedRule.pattern === 'string'
              ? new RegExp(normalizedRule.pattern)
              : normalizedRule.pattern;
          if (!pattern.test(String(value))) {
            newErrors[fieldName] = getErrorMessage(rule, 'pattern');
            break;
          }
        }

        if (
          normalizedRule.minLength !== undefined &&
          String(value).length < normalizedRule.minLength
        ) {
          newErrors[fieldName] = getErrorMessage(rule, 'minLength');
          break;
        }

        if (
          normalizedRule.maxLength !== undefined &&
          String(value).length > normalizedRule.maxLength
        ) {
          newErrors[fieldName] = getErrorMessage(rule, 'maxLength');
          break;
        }

        if (
          normalizedRule.min !== undefined &&
          Number(value) < normalizedRule.min
        ) {
          newErrors[fieldName] = getErrorMessage(rule, 'min');
          break;
        }

        if (
          normalizedRule.max !== undefined &&
          Number(value) > normalizedRule.max
        ) {
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

        if (
          normalizedRule.equal !== undefined &&
          value !== normalizedRule.equal
        ) {
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

  const enhanceChild = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) return child;
    const childProps = child.props as InputProps<any>;

    if (isFormInput(child)) {
      const {
        name,
        id,
        onChange: childOnChange,
        defaultValue,
        inputRef: originalInputRef,
      } = childProps;
      const fieldName = name ?? id;
      if (!fieldName) return child;

      const handleChange = (value: any) => {
        setValues((prev) => ({ ...prev, [fieldName]: value }));
        if (errors[fieldName]) {
          setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
        }
        childOnChange?.(value);
      };

      // Preserve existing ref and props
      return React.cloneElement<InputProps<any>>(child, {
        ...child.props,
        defaultValue,
        onChange: handleChange,
        error: errors[fieldName] ?? undefined,
        disabled: formDisabled || childProps.disabled,
        inputRef: (ref: InputPropsRefType) => {
          if (fieldName) {
            inputRefsRef.current[fieldName] = ref;
          }

          // Call original ref if it exists
          if (typeof originalInputRef === 'function') {
            originalInputRef(ref);
          } else if (originalInputRef?.current !== undefined) {
            originalInputRef.current = ref;
          }
        },
      });
    }

    if (childProps.children) {
      return React.cloneElement(
        child as React.ReactElement<React.PropsWithChildren<unknown>>,
        {
          children: React.Children.map(childProps.children, enhanceChild),
        },
      );
    }

    return child;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const isValid = validate();
    if (isValid) onSubmit(values);
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
    onReset?.();
  };

  React.useImperativeHandle(formRef, () => ({
    submit: handleSubmit,
    reset: handleReset,
    validate,
    getValues: () => values,
  }));

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      onReset={(e) => {
        e.preventDefault();
        handleReset();
      }}
    >
      {React.Children.map(children, enhanceChild)}
    </form>
  );
};

export default Form;
