/* eslint-disable no-console */
import React from 'react';
import { InputProps, InputPropsRefType } from '../../types/input';

export interface FormRef<T> {
  submit: () => void;
  reset: () => void;
  validate: () => boolean;
  getValues: () => T;
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

export interface FormProps<T> {
  onSubmit: (values: T) => Promise<void> | void;
  onReset?: () => void;
  className?: string;
  children: React.ReactNode;
  rules?: FormRules;
  disabled?: boolean;
  formRef?: React.Ref<FormRef<T>>;
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
  console.log('isFormInput element.type', element.type);
  return (
    React.isValidElement(element) &&
    INPUT_TYPES.includes((element.type as any)?.name)
  );
};

const Form = <T,>({
  onSubmit,
  onReset,
  className,
  children,
  rules = {},
  disabled = false,
  formRef,
}: FormProps<T>) => {
  const inputRefsRef = React.useRef<Record<string, InputPropsRefType>>({});

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
    try {
      const newErrors: Record<string, string> = {};
      const typedValues = {} as T;
      Object.entries(inputRefsRef.current).forEach(([key, ref]) => {
        if (ref?.value !== undefined) {
          typedValues[key as keyof T] = ref.value as T[keyof T];
        }
      });
      console.log('inputRefsRef', inputRefsRef);
      console.log('typedValues', typedValues);

      Object.entries(rules).forEach(([fieldName, fieldRules]) => {
        const value = typedValues[fieldName as keyof T];

        for (const rule of fieldRules) {
          const normalizedRule = normalizeRule(rule);
          console.log('normalizedRule', normalizedRule, fieldName, value);
          console.log('value is Array', value, Array.isArray(value));
          console.log(
            'value is Date',
            value,
            value instanceof Date,
            value instanceof Date && isNaN(value.getTime()),
          );

          if (
            normalizedRule.required &&
            (value === undefined || // Check for undefined
              value === null || // Check for null
              value === '' || // Check for empty string
              (Array.isArray(value) && value.length === 0) || // Check for empty array
              (value instanceof Date && isNaN(value.getTime()))) // Check for invalid Dayjs instance
          ) {
            console.log('required', fieldName);
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
              console.log('pattern', fieldName);
              newErrors[fieldName] = getErrorMessage(rule, 'pattern');
              break;
            }
          }

          if (
            normalizedRule.minLength !== undefined &&
            String(value).length < normalizedRule.minLength
          ) {
            console.log('minLength', fieldName);
            newErrors[fieldName] = getErrorMessage(rule, 'minLength');
            break;
          }

          if (
            normalizedRule.maxLength !== undefined &&
            String(value).length > normalizedRule.maxLength
          ) {
            console.log('maxLength', fieldName);
            newErrors[fieldName] = getErrorMessage(rule, 'maxLength');
            break;
          }

          if (
            normalizedRule.min !== undefined &&
            Number(value) < normalizedRule.min
          ) {
            console.log('min', fieldName);
            newErrors[fieldName] = getErrorMessage(rule, 'min');
            break;
          }

          if (
            normalizedRule.max !== undefined &&
            Number(value) > normalizedRule.max
          ) {
            console.log('max', fieldName);
            newErrors[fieldName] = getErrorMessage(rule, 'max');
            break;
          }

          if (normalizedRule.email && !emailRegex.test(String(value))) {
            console.log('email', fieldName);
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
            console.log('equal', fieldName);
            newErrors[fieldName] = getErrorMessage(rule, 'equal');
            break;
          }

          if (normalizedRule.validate) {
            const result = normalizedRule.validate(value);
            console.log('normalizedRule.validate', result);
            if (result !== true) {
              console.log('validate', fieldName);
              newErrors[fieldName] =
                typeof result === 'string' ? result : 'Invalid value';
              break;
            }
          }
        }
      });

      console.log('errors', newErrors, Object.keys(newErrors).length === 0);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (e: any) {
      console.log('validate error', e);
      return false;
    }
  }, [rules]);

  const enhanceChild = (child: React.ReactNode): React.ReactNode => {
    console.log('enhanceChild child', child);
    if (!React.isValidElement(child)) return child;
    console.log('enhanceChild is valid element');
    const childProps = child.props as InputProps<any>;

    if (isFormInput(child)) {
      console.log('form is input', childProps);
      const {
        name,
        id,
        onChange: childOnChange,
        defaultValue,
        inputRef: originalInputRef,
      } = childProps;
      const fieldName = name ?? id;
      console.log('fieldName', fieldName);
      if (!fieldName) return child;

      const handleChange = (value: any) => {
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
            console.log('original InputRef condition 1');
            originalInputRef(ref);
          } else if (originalInputRef?.current !== undefined) {
            console.log('original InputRef condition 2');
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
  console.log('inputRefsRef', inputRefsRef);

  const handleSubmit = async () => {
    console.log('handleSubmit');
    setIsSubmitting(true);
    const isValid = validate();
    console.log('isValid', isValid);
    if (isValid) {
      const result = {} as T;
      for (const key in inputRefsRef.current) {
        result[key as keyof T] = inputRefsRef.current[key].value as T[keyof T];
      }

      console.log('submit valid', result);
      await onSubmit(result);
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
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
    getValues: () => {
      const result = {} as T;
      for (const key in inputRefsRef.current) {
        result[key as keyof T] = inputRefsRef.current[key].value as T[keyof T];
      }
      return result;
    },
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
