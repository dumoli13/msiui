import React from 'react';
import {
  AutoCompleteMultipleRef,
  AutoCompleteRef,
  CheckboxRef,
  InputDatePickerRef,
  InputDateRangePickerRef,
  InputMultipleDatePickerRef,
  NumberTextfieldRef,
  PasswordFieldRef,
  SelectRef,
  SwitchRef,
  TextAreaRef,
  TextfieldRef,
  TimerTextfieldRef,
} from '../components';

export type InputPropsRefType =
  | AutoCompleteRef<any>
  | AutoCompleteMultipleRef<any>
  | CheckboxRef
  | InputDatePickerRef
  | InputDateRangePickerRef
  | InputMultipleDatePickerRef
  | NumberTextfieldRef
  | PasswordFieldRef
  | SelectRef<any>
  | SwitchRef
  | TextAreaRef
  | TextfieldRef
  | TimerTextfieldRef;

export interface InputProps<T> {
  id?: string;
  name?: string;
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  children?: React.ReactNode;
  inputRef?:
    | React.RefObject<InputPropsRefType>
    | React.RefCallback<InputPropsRefType>;
}
