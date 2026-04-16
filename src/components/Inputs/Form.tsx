import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EMAIL_REGEX, URL_REGEX } from '../../const/regex';
import type { FormDisabledStore } from '../../libs/FormDisabledStore';
import { FormStore } from '../../libs/FormStore';
import type { FormProps } from '../../types';
import type { ButtonProps, FormRule } from '../../types/inputs';
import type {
  FormTemplate,
  InputProps,
  InputPropsRefType,
} from '../../types/inputs/form';
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

// ─── Form Context ─────────────────────────────────────────────────────────────
// Allows components nested deeper than direct Form children (e.g. a custom row
// component that owns its own inputs internally) to register those inputs with
// the Form's error-store and ref-tracking by calling useFormEnhanceChild().
type FormContextValue = {
  enhanceChild: (child: React.ReactNode) => React.ReactNode;
};
const FormContext = React.createContext<FormContextValue | null>(null);

/**
 * Returns the Form's `enhanceChild` function so that inputs rendered inside a
 * custom component (not direct JSX children of `<Form>`) can still be wired up
 * to the form's error store, dirty tracking, and ref collection.
 *
 * Must be called inside a component that is rendered within a `<Form>`.
 */
export function useFormEnhanceChild() {
  return React.useContext(FormContext)?.enhanceChild ?? null;
}

/**
 * Wrapper that connects a single input to the nearest `<Form>`.
 * Use this inside custom components that own their inputs internally
 * (i.e. the inputs are not direct JSX children of `<Form>`).
 *
 * @example
 * function MyRow({ defaultValue }) {
 *   return (
 *     <div className="flex gap-4">
 *       <FormField><TextField name="name" defaultValue={defaultValue.name} /></FormField>
 *       <FormField><Select name="status" defaultValue={defaultValue.status} /></FormField>
 *     </div>
 *   );
 * }
 */
export function FormField({ children }: { children: React.ReactElement }) {
  const enhanceChild = useFormEnhanceChild();
  return (enhanceChild?.(children) ?? children) as React.ReactElement;
}
// ──────────────────────────────────────────────────────────────────────────────

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

const isFormInput = (
  el: React.ReactNode,
): el is React.ReactElement<InputProps<unknown>> =>
  React.isValidElement(el) &&
  !!(el.type as { isFormInput?: boolean }).isFormInput;

const isFormSubmitButton = (
  el: React.ReactNode,
): el is React.ReactElement<ButtonProps> => {
  return (
    React.isValidElement(el) &&
    (el.props as { type?: string }).type === 'submit'
  );
};

interface FormFieldWrapperProps {
  name: string;
  errorStore: FormStore['errorStore'];
  disabledStore: FormDisabledStore;
  propDisabled: boolean | undefined;
  externalDisabled: boolean;
  children: React.ReactElement<{
    error?: boolean | string;
    disabled?: boolean;
  }>;
}

const FormFieldWrapper = React.memo(function FormFieldWrapper({
  name,
  errorStore,
  disabledStore,
  propDisabled,
  externalDisabled,
  children,
}: FormFieldWrapperProps) {
  const error = React.useSyncExternalStore(
    errorStore.makeSubscribe(name),
    errorStore.makeSnapshot(name),
  );
  const isSubmitting = React.useSyncExternalStore(
    disabledStore.subscribe,
    disabledStore.getSnapshot,
  );
  const disabled = propDisabled ?? (externalDisabled || isSubmitting);
  return React.cloneElement(children, {
    error: error ?? undefined,
    disabled,
  });
});

interface FormSubmitButtonWrapperProps {
  disabledStore: FormDisabledStore;
  externalDisabled: boolean;
  children: React.ReactElement<ButtonProps>;
}

const FormSubmitButtonWrapper = React.memo(function FormSubmitButtonWrapper({
  disabledStore,
  externalDisabled,
  children,
}: FormSubmitButtonWrapperProps) {
  const isSubmitting = React.useSyncExternalStore(
    disabledStore.subscribe,
    disabledStore.getSnapshot,
  );
  const disabled = children.props.disabled || externalDisabled || isSubmitting;
  return React.cloneElement(children, { disabled });
});

/**
 * High-performance form component with data domain management. Includes data entry and validation.
 */
const Form = <T,>({
  onSubmit,
  onError,
  onReset,
  className,
  rules,
  disabled = false,
  formRef,
  submitOnChange = false,
  focusOnLastFieldEnter = false,
  children,
  template,
}: FormProps<T>) => {
  // ─── Single consolidated store (replaces 8+ individual useRefs) ────────
  const storeRef = React.useRef(new FormStore());
  const store = storeRef.current;

  // DOM ref for the submit button (kept separate — it's a real DOM element)
  const submitButtonRef = React.useRef<HTMLButtonElement>(null);

  // ─── Stable refs for closure stabilization ─────────────────────────────
  const disabledRef = React.useRef(disabled);
  disabledRef.current = disabled;

  const submitOnChangeRef = React.useRef(submitOnChange);
  submitOnChangeRef.current = submitOnChange;

  const focusOnLastFieldEnterRef = React.useRef(focusOnLastFieldEnter);
  focusOnLastFieldEnterRef.current = focusOnLastFieldEnter;

  const getErrorMessage = (
    rule: FormRule,
    ruleType: keyof typeof DEFAULT_ERROR_MESSAGES,
  ) => {
    if (typeof rule === 'string') return DEFAULT_ERROR_MESSAGES[ruleType];

    const message = rule.message ?? DEFAULT_ERROR_MESSAGES[ruleType];
    return message
      .replace('{minLength}', String(rule.minLength))
      .replace('{maxLength}', String(rule.maxLength))
      .replace('{exactLength}', String(rule.exactLength))
      .replace('{min}', String(rule.min))
      .replace('{max}', String(rule.max));
  };

  const handleReset = React.useCallback(() => {
    store.reset();
    onReset?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = React.useCallback(() => {
    const newErrors: Record<string, string> = {};
    const typedValues: Record<string, unknown[]> = {};

    for (const [key, refs] of Object.entries(store.inputRefs)) {
      const values = refs.map((r) => r?.value).filter((v) => v !== undefined);
      typedValues[key] = values;
    }

    if (!rules) return [];

    for (const [fieldName, fieldRules] of Object.entries(
      rules(typedValues as { [K in keyof T]: T[K][] }),
    )) {
      const refs = store.inputRefs[fieldName];
      if (!refs) continue;

      for (const element of refs) {
        const instanceKey = store.refToErrorKey.get(element) ?? fieldName;
        const val = element?.value;
        if (val === undefined) continue;

        for (const rule of fieldRules as FormRule[]) {
          const checkValue = (innerVal: unknown, innerInstanceKey: string) => {
            // Handle required rule
            if (
              rule.required &&
              (innerVal === undefined ||
                innerVal === null ||
                (typeof innerVal === 'string' && innerVal.trim() === '') ||
                (Array.isArray(innerVal) && innerVal.length === 0) ||
                (innerVal instanceof Date && Number.isNaN(innerVal.getTime())))
            ) {
              // Do not show required error if submitOnChange is true since user need time to fill all fields
              if (!submitOnChange) {
                newErrors[innerInstanceKey] = getErrorMessage(rule, 'required');
              }
            } else if (rule.pattern) {
              const pattern =
                typeof rule.pattern === 'string'
                  ? new RegExp(rule.pattern)
                  : rule.pattern;
              const str =
                typeof innerVal === 'string' || typeof innerVal === 'number'
                  ? String(innerVal)
                  : '';
              if (!pattern.test(str)) {
                newErrors[innerInstanceKey] = getErrorMessage(rule, 'pattern');
              }
            } else if (
              rule.minLength !== undefined &&
              (typeof innerVal === 'number' || typeof innerVal === 'string') &&
              String(innerVal).length < rule.minLength
            ) {
              newErrors[innerInstanceKey] = getErrorMessage(rule, 'minLength');
            } else if (
              rule.maxLength !== undefined &&
              (typeof innerVal === 'number' || typeof innerVal === 'string') &&
              String(innerVal).length > rule.maxLength
            ) {
              newErrors[innerInstanceKey] = getErrorMessage(rule, 'maxLength');
            } else if (
              rule.exactLength !== undefined &&
              (typeof innerVal === 'number' || typeof innerVal === 'string') &&
              String(innerVal).length !== rule.exactLength
            ) {
              newErrors[innerInstanceKey] = getErrorMessage(
                rule,
                'exactLength',
              );
            } else if (
              rule.min !== undefined &&
              typeof innerVal === 'number' &&
              innerVal < rule.min
            ) {
              newErrors[innerInstanceKey] = getErrorMessage(rule, 'min');
            } else if (
              rule.max !== undefined &&
              typeof innerVal === 'number' &&
              innerVal > rule.max
            ) {
              newErrors[innerInstanceKey] = getErrorMessage(rule, 'max');
            } else if (
              rule.email &&
              typeof innerVal === 'string' &&
              !EMAIL_REGEX.test(innerVal)
            ) {
              newErrors[innerInstanceKey] = getErrorMessage(rule, 'email');
            } else if (
              rule.url &&
              typeof innerVal === 'string' &&
              !URL_REGEX.test(innerVal)
            ) {
              newErrors[innerInstanceKey] = getErrorMessage(rule, 'url');
            } else if (rule.equal !== undefined && innerVal !== rule.equal) {
              newErrors[innerInstanceKey] = getErrorMessage(rule, 'equal');
            } else if (rule.validate && !rule.validate(innerVal)) {
              newErrors[innerInstanceKey] = getErrorMessage(rule, 'validate');
            }
          };

          checkValue(val, instanceKey);
          if (newErrors[instanceKey]) break; // Stop at first error for this instance
        }
      }
    }
    store.errorStore.setErrors(newErrors);
    return Object.keys(newErrors);
  }, [rules, submitOnChange, store]);

  const getValue = React.useCallback(
    <K extends keyof T>(key: K) => store.getValue<T, K>(key),
    [store],
  );

  const getValues = React.useCallback(() => store.getValues<T>(), [store]);

  // handleSubmit uses disabledStore instead of setState
  const handleSubmit = React.useCallback(async () => {
    store.disabledStore.set(true);
    try {
      const invalidFields = validate();

      if (invalidFields.length === 0) {
        const result = getValues();
        await onSubmit?.(result);
      } else {
        onError?.(invalidFields);
      }
    } finally {
      store.disabledStore.set(false);
    }
  }, [validate, getValues, onSubmit, onError, store]);

  // Stable ref for handleSubmit so handleFormKeyDown can read it
  const handleSubmitRef = React.useRef(handleSubmit);
  handleSubmitRef.current = handleSubmit;

  const debounceSubmit = useDebouncedCallback(() => {
    const invalidFields = validate();
    if (invalidFields.length === 0) {
      const result = getValues();
      onSubmit?.(result);
    }
  }, 2000);

  // Stable ref for debounceSubmit
  const debounceSubmitRef = React.useRef(debounceSubmit);
  debounceSubmitRef.current = debounceSubmit;

  // handleFormKeyDown reads all mutable values from refs
  const handleFormKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, currentKey: string) => {
      // Allow Enter to work naturally in textarea elements (insert newline)
      if (
        (e.target as HTMLElement).tagName === 'TEXTAREA' &&
        e.key === 'Enter'
      ) {
        return;
      }

      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        const order = store.inputOrder;
        const currentIndex = order.indexOf(currentKey);
        if (currentIndex === -1) return;

        let nextIndex = -1;

        if (e.shiftKey && e.key === 'Tab') {
          // 🔹 Go backward when Shift + Tab
          for (let i = currentIndex - 1; i >= 0; i--) {
            const prevKey = order[i];
            const refs = store.inputRefs[prevKey];
            if (refs?.some((r) => !r.disabled)) {
              nextIndex = i;
              break;
            }
          }
        } else {
          // 🔹 Normal Tab or Enter → go forward
          for (let i = currentIndex + 1; i < order.length; i++) {
            const nextKey = order[i];
            const refs = store.inputRefs[nextKey];
            if (refs?.some((r) => !r.disabled)) {
              nextIndex = i;
              break;
            }
          }
        }

        if (nextIndex > -1) {
          const targetRefs = store.inputRefs[order[nextIndex]];
          const target = targetRefs.find((r) => !r?.disabled);
          target?.focus?.();
          return;
        }

        // 🔹 No more enabled inputs
        if (!e.shiftKey) {
          if (focusOnLastFieldEnterRef.current) {
            if (submitButtonRef.current && !submitButtonRef.current.disabled) {
              submitButtonRef.current.focus();
            }
          } else {
            handleSubmitRef.current();
          }
        }
      }
    },
    [store],
  );

  // enhanceChild reads all mutable values from refs — stable across renders
  const enhanceChild = React.useCallback(
    (child: React.ReactNode): React.ReactNode => {
      if (!React.isValidElement(child)) return child;

      if (isFormSubmitButton(child)) {
        const childWithRef = child as React.ReactElement & {
          ref?: React.Ref<HTMLButtonElement>;
        };
        const cloned = React.cloneElement(child, {
          ...child.props,
          ref: childWithRef.ref || submitButtonRef,
        } as Partial<ButtonProps>);
        return (
          <FormSubmitButtonWrapper
            disabledStore={store.disabledStore}
            externalDisabled={disabledRef.current}
          >
            {cloned}
          </FormSubmitButtonWrapper>
        );
      }

      const childProps = child.props as InputProps<unknown>;
      if (isFormInput(child)) {
        const {
          name,
          onChange: childOnChange,
          defaultValue,
          inputRef: originalInputRef,
        } = childProps;
        if (!name) return child;

        store.renderCounters[name] = (store.renderCounters[name] ?? -1) + 1;
        const errorKey =
          store.renderCounters[name] === 0
            ? name
            : `${name}__${store.renderCounters[name]}`;

        if (!store.inputOrder.includes(name)) {
          store.inputOrder.push(name);
        }

        const handleChange = (value: unknown) => {
          store.errorStore.setError(errorKey, undefined);
          store.dirtyFields[name] = true;
          store.lastValues[name] = value;
          childOnChange?.(value);
          if (submitOnChangeRef.current) {
            debounceSubmitRef.current();
          }
        };

        const enhancedChild = React.cloneElement(child, {
          ...child.props,
          defaultValue,
          onChange: handleChange,
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (childProps.onKeyDown) {
              childProps.onKeyDown(e);
            } else {
              handleFormKeyDown(e, name);
            }
          },
          inputRef: store.getOrCreateInputRef(errorKey, name, originalInputRef),
        });

        return (
          <FormFieldWrapper
            key={errorKey}
            name={errorKey}
            errorStore={store.errorStore}
            disabledStore={store.disabledStore}
            propDisabled={childProps.disabled}
            externalDisabled={disabledRef.current}
          >
            {enhancedChild}
          </FormFieldWrapper>
        );
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
    },
    [handleFormKeyDown, store],
  );

  // Keep a ref to the latest enhanceChild so the stable context callback
  // always calls the version that closes over the current render's state
  // (renderCounters, errorStoreRef, etc.).
  const enhanceChildRef = React.useRef(enhanceChild);
  enhanceChildRef.current = enhanceChild;
  const formContextValue = React.useMemo<FormContextValue>(
    () => ({ enhanceChild: (child) => enhanceChildRef.current(child) }),
    [],
  );

  React.useImperativeHandle(
    formRef,
    () => ({
      submit: handleSubmit,
      reset: handleReset,
      validate,
      getValue,
      getValues,
      getDirtyFields: () => store.dirtyFields,
      getErrors: () => store.errorStore.getErrors(),
      setErrors: (errors) => store.errorStore.setErrors(errors),
    }),
    [handleSubmit, handleReset, validate, getValue, getValues, store],
  );

  // renderTemplate no longer depends on formDisabled
  const renderTemplate = React.useCallback(
    (formTemplate: FormTemplate[]): React.ReactNode => {
      const registerInputRef = (name?: string) => {
        // Each call creates a closure tracking its own last-mounted ref
        let lastRef: InputPropsRefType | null = null;
        return (ref: InputPropsRefType | null) => {
          if (ref !== null && ref !== undefined) {
            lastRef = ref;
            if (name) {
              store.registerRef(name, ref);
            }
          } else if (lastRef !== null) {
            if (name) {
              store.unregisterRef(name, lastRef);
            }
            lastRef = null;
          }
        };
      };

      const wrapWithErrorStore = (
        name: string | undefined,
        el: React.ReactElement<{
          error?: boolean | string;
          disabled?: boolean;
        }>,
        propDisabled?: boolean,
      ): React.ReactElement => {
        if (!name) return el;
        return (
          <FormFieldWrapper
            key={el.key ?? undefined}
            name={name}
            errorStore={store.errorStore}
            disabledStore={store.disabledStore}
            propDisabled={propDisabled}
            externalDisabled={disabledRef.current}
          >
            {el}
          </FormFieldWrapper>
        );
      };

      const commonInputProps = <V = unknown,>(
        name?: string,
        childOnChange?: (value: V) => void,
      ) =>
        name
          ? {
              onChange: (value: V) => {
                store.errorStore.setError(name, undefined);
                store.dirtyFields[name] = true;
                store.lastValues[name] = value;
                childOnChange?.(value);
                if (submitOnChangeRef.current) {
                  debounceSubmitRef.current();
                }
              },
              inputRef: registerInputRef(name),
            }
          : {};

      const renderItem = (
        item: FormTemplate,
        index: number,
      ): React.ReactNode => {
        const key = item.id ?? index;

        switch (item.component) {
          case 'div':
            return (
              <div key={key} className={item.className} style={item.style}>
                {item.children ? renderTemplate(item.children) : null}
              </div>
            );

          case 'Button':
            return (
              <Button key={key} {...item}>
                {item.children}
              </Button>
            );

          case 'AutoComplete':
            return wrapWithErrorStore(
              item.name,
              <AutoComplete
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'AutoCompleteMultiple':
            return wrapWithErrorStore(
              item.name,
              <AutoCompleteMultiple
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'Checkbox':
            return wrapWithErrorStore(
              item.name,
              <Checkbox
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'DatePicker':
            return wrapWithErrorStore(
              item.name,
              <DatePicker
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'DateRangePicker':
            return wrapWithErrorStore(
              item.name,
              <DateRangePicker
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'MultipleDatePicker':
            return wrapWithErrorStore(
              item.name,
              <MultipleDatePicker
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'NumberTextField':
            return wrapWithErrorStore(
              item.name,
              <NumberTextField
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'PasswordField':
            return wrapWithErrorStore(
              item.name,
              <PasswordField
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'RadioGroup':
            return wrapWithErrorStore(
              item.name,
              <RadioGroup
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'Select':
            return wrapWithErrorStore(
              item.name,
              <Select
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'Switch':
            return wrapWithErrorStore(
              item.name,
              <Switch
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'TextArea':
            return wrapWithErrorStore(
              item.name,
              <TextArea
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'TextField':
            return wrapWithErrorStore(
              item.name,
              <TextField
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          case 'TimerField':
            return wrapWithErrorStore(
              item.name,
              <TimerField
                key={key}
                {...item}
                {...commonInputProps(item.name, item.onChange)}
              />,
              item.disabled,
            );
          default:
            // eslint-disable-next-line no-console
            console.warn('Unknown component:', item);
            return null;
        }
      };

      return formTemplate.map((item, index) => renderItem(item, index));
    },
    [store],
  );

  // Reset renderCounters at top of each render
  store.renderCounters = {};

  const enhancedChildren = React.useMemo(
    () => React.Children.map(children, enhanceChild),
    [children, enhanceChild],
  );

  return (
    <FormContext.Provider value={formContextValue}>
      <form
        className={className}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitRef.current();
        }}
        onReset={(e) => {
          e.preventDefault();
          handleReset();
        }}
      >
        {template ? renderTemplate(template) : enhancedChildren}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
