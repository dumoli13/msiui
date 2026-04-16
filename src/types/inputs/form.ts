import type { AutoCompleteProps, AutoCompleteRef } from './autoComplete';
import type {
  AutoCompleteMultipleProps,
  AutoCompleteMultipleRef,
} from './autoCompleteMultiple';
import type { ButtonProps } from './button';
import type { CheckboxProps, CheckboxRef } from './checkbox';
import type { DatePickerProps, DatePickerRef } from './datePicker';
import type {
  DateRangePickerProps,
  DateRangePickerRef,
} from './dateRangePicker';
import type {
  MultipleDatePickerProps,
  MultipleDatePickerRef,
} from './multipleDatePicker';
import type {
  NumberTextFieldProps,
  NumberTextfieldRef,
} from './numberTextField';
import type { PasswordFieldProps, PasswordFieldRef } from './passwordField';
import type { RadioGroupProps } from './radioGroup';
import type { SelectProps, SelectRef } from './select';
import type { SwitchProps, SwitchRef } from './switch';
import type { TextAreaProps, TextAreaRef } from './textArea';
import type { TextFieldProps, TextfieldRef } from './textField';
import type { TimerFieldProps, TimerFieldRef } from './timerField';

export type InputPropsRefType =
  | AutoCompleteRef<unknown>
  | AutoCompleteMultipleRef<unknown>
  | CheckboxRef
  | DatePickerRef
  | DateRangePickerRef
  | MultipleDatePickerRef
  | NumberTextfieldRef
  | PasswordFieldRef
  | SelectRef<unknown>
  | SwitchRef
  | TextAreaRef
  | TextfieldRef
  | TimerFieldRef;

export interface InputProps<T> {
  id?: string;
  name?: string;
  label?: string;
  helperText?: string;
  error?: boolean | string;
  success?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  value?: T;
  defaultValue?: T;
  initialValue?: T;
  onChange?: (value: T) => void;
  children?: React.ReactNode;
  inputRef?:
    | React.RefObject<InputPropsRefType | null>
    | React.RefCallback<InputPropsRefType | null>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface FormRef<T> {
  submit: () => Promise<void>;
  reset: () => void;
  validate: () => string[];
  getValue: <K extends keyof T>(key: K) => T[K] | undefined;
  getValues: () => Partial<T>;
  getErrors: () => Record<string, string | undefined>;
  setErrors: (errors: Record<string, string | undefined>) => void;
  getDirtyFields: () => Record<string, boolean>;
}

type BaseRule = {
  message?: string;
};

interface AllRuleKeys<V = unknown> {
  required: boolean;
  email: boolean;
  url: boolean;
  pattern: RegExp | string;
  minLength: number;
  maxLength: number;
  exactLength: number;
  min: number;
  max: number;
  equal: V;
  validate: (value: V) => boolean;
}

export type FormTemplate =
  | ({
      component: 'div';
      children?: FormTemplate[];
    } & React.HTMLAttributes<HTMLDivElement>)
  | ({ component: 'Button' } & ButtonProps)
  | ({ component: 'AutoComplete' } & AutoCompleteProps<unknown>)
  | ({ component: 'AutoCompleteMultiple' } & AutoCompleteMultipleProps<unknown>)
  | ({ component: 'Checkbox' } & CheckboxProps)
  | ({ component: 'DatePicker' } & DatePickerProps)
  | ({ component: 'DateRangePicker' } & DateRangePickerProps)
  | ({ component: 'MultipleDatePicker' } & MultipleDatePickerProps)
  | ({ component: 'NumberTextField' } & NumberTextFieldProps)
  | ({ component: 'PasswordField' } & PasswordFieldProps)
  | ({ component: 'RadioGroup' } & RadioGroupProps<unknown>)
  | ({ component: 'Select' } & SelectProps<unknown>)
  | ({ component: 'Switch' } & SwitchProps)
  | ({ component: 'TextArea' } & TextAreaProps)
  | ({ component: 'TextField' } & TextFieldProps)
  | ({ component: 'TimerField' } & TimerFieldProps);

export type FormRule<V = unknown> = BaseRule &
  {
    [K in keyof AllRuleKeys<V>]: { [P in K]: AllRuleKeys<V>[P] } & {
      [P in Exclude<keyof AllRuleKeys<V>, K>]?: undefined;
    };
  }[keyof AllRuleKeys<V>];

interface BaseFormProps<T> {
  onSubmit?: (values: T) => Promise<void> | void;
  onError?: (errorFields: string[]) => void;
  onReset?: () => void;
  className?: string;
  rules?: (ref: { [K in keyof T]: T[K][] }) => Partial<{
    [K in keyof T]: Array<FormRule<T[K]>>;
  }>;
  disabled?: boolean;
  formRef?: React.Ref<FormRef<T>>;
  submitOnChange?: boolean;
  focusOnLastFieldEnter?: boolean;
}

export type FormProps<T> =
  | (BaseFormProps<T> & { children: React.ReactNode; template?: never })
  | (BaseFormProps<T> & { template: FormTemplate[]; children?: never });
