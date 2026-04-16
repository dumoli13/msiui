/* eslint-disable no-console */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AutoComplete,
  AutoCompleteMultiple,
  Button,
  Checkbox,
  DatePicker,
  DateRangePicker,
  DateRangeValue,
  DateValue,
  Form,
  FormField,
  FormProps,
  FormRef,
  MisDesignProvider,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  MultipleDatePicker,
  NumberTextField,
  PasswordField,
  Select,
  SelectValue,
  Switch,
  TextArea,
  TextField,
  TimerField,
  useNotification,
} from '../../src';
import Tab from '../../src/components/Navigations/Tab';
import '../../src/output.css';
import { options } from '../const/select';

const meta: Meta<FormProps<any>> = {
  title: 'Input/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      control: false,
      description: 'Callback function to handle form submission.',
      table: {
        type: { summary: '(values: T) => Promise<void> | void' },
      },
    },
    onReset: {
      control: false,
      description: 'Callback function to handle form reset.',
      table: {
        type: { summary: '() => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names to customize the component style.',
      table: {
        type: { summary: 'string' },
      },
    },
    rules: {
      control: false,
      description: 'Validation rules for the form.',
      table: {
        type: {
          summary: '(ref: T) => Partial<Record<keyof T, Array<FormRule>>>',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'A flag that disables input field if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    formRef: {
      control: false,
      description:
        'A reference to access the input field and its value programmatically.',
      table: { disable: true },
    },

    submitOnChange: {
      control: 'boolean',
      description:
        'A flag that submits the form when any input field changes if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    focusOnLastFieldEnter: {
      control: 'boolean',
      description:
        'A flag that focuses submit button when user hit enter on the last field if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: false,
      description:
        'Children of the form. Make sure to use input from the mis-design to make it work with the form.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    template: {
      control: 'object',
      description:
        'A template for the form. If set, it will override children.',
      table: {
        type: { summary: 'FormTemplate[]' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### InputPropsRefType — All Available Refs
<table style="width:100%;border-collapse:collapse;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08);border-radius:8px;overflow:hidden;">
  <thead>
    <tr>
      <th style="padding:12px;text-align:left;border:none;border-left:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;width:160px;">Name</th>
      <th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;">Description</th>
      <th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;width:250px;white-space:nowrap;">Type</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">AutoCompleteRef</td>
      <td style="padding:12px;border:none;">Ref for the AutoComplete component.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">AutoCompleteRef&lt;any&gt;</td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">CheckboxRef</td>
      <td style="padding:12px;border:none;">Ref for the Checkbox component.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">CheckboxRef</td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">DatePickerRef</td>
      <td style="padding:12px;border:none;">Ref for the DatePicker component.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">DatePickerRef</td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">NumberTextfieldRef</td>
      <td style="padding:12px;border:none;">Ref for the NumberTextField component.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">NumberTextfieldRef</td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">TextfieldRef</td>
      <td style="padding:12px;border:none;">Ref for the TextField component.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">TextfieldRef</td>
    </tr>
    <tr>
      <td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">...other refs</td>
      <td style="padding:12px;border:none;">Includes AutoCompleteMultipleRef, DateRangePickerRef, MultipleDatePickerRef, PasswordFieldRef, SelectRef, SwitchRef, TextAreaRef, TimerFieldRef.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">See type definition</td>
    </tr>
  </tbody>
</table>

### InputProps<T> — Props

<table style="width:100%;border-collapse:collapse;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08);border-radius:8px;overflow:hidden;">
<thead>
<tr>
<th style="padding:12px;text-align:left;border:none;border-left:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;width:160px;">Name</th>
<th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;">Description</th>
<th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;width:250px;white-space:nowrap;">Type</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">id</td>
<td style="padding:12px;border:none;">Unique identifier for the input element.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">string</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">name</td>
<td style="padding:12px;border:none;">Name of the input for form submission.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">string</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">label</td>
<td style="padding:12px;border:none;">Text shown above the input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">string</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">helperText</td>
<td style="padding:12px;border:none;">Optional helper text displayed below the input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">string</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">error</td>
<td style="padding:12px;border:none;">Indicates error state; can be boolean or string.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">boolean | string</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">disabled</td>
<td style="padding:12px;border:none;">Disables the input when true.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">boolean</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">value</td>
<td style="padding:12px;border:none;">Controlled value of the input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">T</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">defaultValue</td>
<td style="padding:12px;border:none;">Default value for uncontrolled input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">T</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">initialValue</td>
<td style="padding:12px;border:none;">Initial value used by ref reset method.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">T</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">onChange</td>
<td style="padding:12px;border:none;">Callback triggered when value changes.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">(value: T) => void</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">inputRef</td>
<td style="padding:12px;border:none;">Reference used to access input methods such as reset(), focus(), or getValue().</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">React.RefObject&lt;InputPropsRefType&gt; | React.RefCallback&lt;InputPropsRefType&gt;</td>
</tr>
<tr>
<td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">onKeyDown</td>
<td style="padding:12px;border:none;">Callback for keydown events on input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">(e: React.KeyboardEvent&lt;HTMLInputElement&gt;) =&gt; void</td>
</tr>
</tbody>
</table>

### FormRef<T> — API
<table style="width:100%;border-collapse:collapse;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08);border-radius:8px;overflow:hidden;">
<thead>
<tr>
<th style="padding:12px;text-align:left;border:none;border-left:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;width:160px;">Name</th>
<th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;">Description</th>
<th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;width:250px;white-space:nowrap;">Type</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">submit</td>
<td style="padding:12px;border:none;">Submits the form programmatically.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">() => Promise&lt;void&gt;</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">reset</td>
<td style="padding:12px;border:none;">Resets all fields to initial values.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">() => void</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">validate</td>
<td style="padding:12px;border:none;">Validates all fields and returns array of error messages.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">() => string[]</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">getValue</td>
<td style="padding:12px;border:none;">Get value of a specific field by key.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">&lt;K extends keyof T&gt;(key: K) => T[K] | undefined</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">getValues</td>
<td style="padding:12px;border:none;">Get all form values as partial object.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">() => Partial&lt;T&gt;</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">getErrors</td>
<td style="padding:12px;border:none;">Get current errors for all fields.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">() => Record&lt;string, string | undefined&gt;</td>
</tr>
<tr>
<td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">setErrors</td>
<td style="padding:12px;border:none;">Programmatically set errors for fields.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">(errors: Record&lt;string, string | undefined&gt;) =&gt; void</td>
</tr>
</tbody>
</table>

### FormTemplate — Component Template
<table style="width:100%;border-collapse:collapse;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08);border-radius:8px;overflow:hidden;">
<thead>
<tr>
<th style="padding:12px;text-align:left;border:none;border-left:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;width:160px;">Component</th>
<th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;">Description</th>
<th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;width:250px;white-space:nowrap;">Props Type</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">div</td>
<td style="padding:12px;border:none;">Container wrapper, can have children templates.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">React.HTMLAttributes&lt;HTMLDivElement&gt;</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">Button</td>
<td style="padding:12px;border:none;">Button element inside the form.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">ButtonProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">AutoComplete</td>
<td style="padding:12px;border:none;">Single selection autocomplete input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">AutoCompleteProps&lt;any&gt;</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">AutoCompleteMultiple</td>
<td style="padding:12px;border:none;">Multiple selection autocomplete input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">AutoCompleteMultipleProps&lt;any&gt;</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">Checkbox</td>
<td style="padding:12px;border:none;">Checkbox input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">CheckboxProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">DatePicker</td>
<td style="padding:12px;border:none;">Single date picker input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">DatePickerProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">DateRangePicker</td>
<td style="padding:12px;border:none;">Select range of dates.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">DateRangePickerProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">MultipleDatePicker</td>
<td style="padding:12px;border:none;">Select multiple dates.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">MultipleDatePickerProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">NumberTextField</td>
<td style="padding:12px;border:none;">Input for numeric values.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">NumberTextFieldProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">PasswordField</td>
<td style="padding:12px;border:none;">Password input field.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">PasswordFieldProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">RadioGroup</td>
<td style="padding:12px;border:none;">Radio button group input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">RadioGroupProps&lt;any&gt;</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">Select</td>
<td style="padding:12px;border:none;">Select dropdown input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">SelectProps&lt;any&gt;</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">Switch</td>
<td style="padding:12px;border:none;">Toggle switch input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">SwitchProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">TextArea</td>
<td style="padding:12px;border:none;">Multi-line text input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">TextAreaProps</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">TextField</td>
<td style="padding:12px;border:none;">Single-line text input.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">TextFieldProps</td>
</tr>
<tr>
<td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">TimerField</td>
<td style="padding:12px;border:none;">Time input field.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">TimerFieldProps</td>
</tr>
</tbody>
</table>

### FormRule — Validation Rules
<table style="width:100%;border-collapse:collapse;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08);border-radius:8px;overflow:hidden;">
<thead>
<tr>
<th style="padding:12px;text-align:left;border:none;border-left:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;width:160px;">Rule</th>
<th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;">Description</th>
<th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;width:250px;white-space:nowrap;">Type</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">required</td>
<td style="padding:12px;border:none;">Field must have a value.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">boolean</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">email</td>
<td style="padding:12px;border:none;">Field must be a valid email.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">boolean</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">url</td>
<td style="padding:12px;border:none;">Field must be a valid URL.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">boolean</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">pattern</td>
<td style="padding:12px;border:none;">Regex pattern validation.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">RegExp | string</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">minLength</td>
<td style="padding:12px;border:none;">Minimum string length.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">number</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">maxLength</td>
<td style="padding:12px;border:none;">Maximum string length.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">number</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">exactLength</td>
<td style="padding:12px;border:none;">Exact string length required.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">number</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">min</td>
<td style="padding:12px;border:none;">Minimum numeric value.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">number</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">max</td>
<td style="padding:12px;border:none;">Maximum numeric value.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">number</td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
<td style="padding:12px;border:none;">equal</td>
<td style="padding:12px;border:none;">Field must equal this value.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">any</td>
</tr>
<tr>
<td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">validate</td>
<td style="padding:12px;border:none;">Custom validation function, should return boolean.</td>
<td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">(value: any) => boolean</td>
</tr>
</tbody>
</table>
      `,
      },
    },
  },
  args: {
    disabled: false,
    focusOnLastFieldEnter: false,
  },
};

export default meta;
type Story = StoryObj<FormProps<any>>;

export const BasicForm: Story = {
  render: (args) => {
    const formRef = React.useRef<FormRef<FormComposition>>(null);
    type FormComposition = {
      name: string[];
      fruit: SelectValue<string>;
      multipleFruit: SelectValue<string>[];
      email: string;
      website: string;
      phone: string;
      date: DateValue;
      stayPeriod: DateRangeValue;
    };

    const notify = useNotification();

    const handleSubmit = (value: FormComposition) => {
      console.log('handleSubmit', value);
      notify({
        color: 'success',
        title: 'Form Submitted',
        description: `name: ${value.name}, date: ${value.date}, fruit: ${value.fruit.label}, etc.`,
      });
    };

    return (
      <MisDesignProvider>
        <Form<FormComposition>
          {...args}
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          formRef={formRef}
          rules={(_value) => ({
            name: [{ required: true }, { minLength: 10 }],
            fruit: [{ required: true }],
            multipleFruit: [{ required: true }],
            email: [{ required: true }, { email: true }],
            website: [{ required: true }, { url: true }],
            phone: [{ required: true }, { pattern: /^(62|0)8[1-9]\d{6,9}$/ }],
            date: [{ required: true }],
            stayPeriod: [{ required: true }],
          })}
        >
          <TextField
            id="nameId"
            name="name"
            label="Name 1"
            placeholder="Enter your name"
            defaultValue="default name 1"
          />
          <TextArea
            id="nameId2"
            name="name"
            label="Name 2"
            placeholder="Enter your name"
            defaultValue="default name 2"
          />
          <TextField
            id="emailId"
            name="email"
            label="Email"
            placeholder="Enter your email"
            defaultValue="default@email.com"
          />
          <AutoComplete
            id="fruitId"
            name="fruit"
            label="Fruit"
            options={options}
            placeholder="Select your favorite fruit"
            defaultValue="apple"
          />
          <AutoCompleteMultiple
            id="multipleFruitId"
            name="multipleFruit"
            label="Multiple Fruit"
            options={options}
            placeholder="Select your favorite fruit"
            appendIfNotFound
            defaultValue={['apple', 'orange']}
          />
          <TextField
            id="websiteId"
            name="website"
            label="Website"
            placeholder="Enter your website"
            defaultValue="https://www.google.com"
          />
          <TextField
            id="phoneId"
            name="phone"
            label="Phone"
            placeholder="Enter your phone"
            defaultValue="085128211932"
          />
          <DatePicker
            id="dateId"
            name="date"
            label="Date"
            placeholder="Enter your birthday"
            defaultValue={new Date()}
          />
          <DateRangePicker
            id="stayPeriodId"
            name="stayPeriod"
            label="Stay Period"
            placeholder="Enter your stay period"
            defaultValue={[new Date(), new Date()]}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
type FormComposition = {
  name: string[];
  fruit: SelectValue<string>;
  multipleFruit: SelectValue<string>[];
  email: string;
  website: string;
  phone: string;
  date: DateValue;
};

const BasicForm = () => {
  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const notify = useNotification();

  const handleSubmit = (value: FormComposition) => {
    console.log(value)
  };

  return (
    <MisDesignProvider> 
      <Form<FormComposition>
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        formRef={formRef}
        rules={(value) => ({
          name: [{ required: true }, { minLength: 10 }],
          fruit: [{ required: true }],
          multipleFruit: [{ required: true }],
          email: [{ required: true }, { email: true }],
          website: [{ required: true }, { url: true }],
          phone: [{ required: true }, { pattern: /^(62|0)8[1-9]\d{6,9}$/ }],
          date: [{ required: true }],
          stayPeriod: [{ required: true }],
        })}
      >
        <TextField
          id="nameId"
          name="name"
          label="Name 1"
          placeholder="Enter your name"
          defaultValue="default name 1"
        />
        <TextField
          id="nameId2"
          name="name"
          label="Name 2"
          placeholder="Enter your name"
          defaultValue="default name 2"
        />
        <TextField
          id="emailId"
          name="email"
          label="Email"
          placeholder="Enter your email"
          defaultValue="default@email.com"
        />
        <AutoComplete
          id="fruitId"
          name="fruit"
          label="Fruit"
          options={options}
          placeholder="Select your favorite fruit"
          defaultValue="apple"
        />
        <AutoCompleteMultiple
          id="multipleFruitId"
          name="multipleFruit"
          label="Multiple Fruit"
          options={options}
          placeholder="Select your favorite fruit"
          appendIfNotFound
          defaultValue={['apple', 'orange']}
        />
        <TextField
          id="websiteId"
          name="website"
          label="Website"
          placeholder="Enter your website"
          defaultValue="https://www.google.com"
        />
        <TextField
          id="phoneId"
          name="phone"
          label="Phone"
          placeholder="Enter your phone"
          defaultValue="085128211932"
        />
        <DatePicker
          id="dateId"
          name="date"
          label="Date"
          placeholder="Enter your birthday"
          defaultValue={new Date()}
        />
        <DateRangePicker
          id="stayPeriodId"
          name="stayPeriod"
          label="Stay Period"
          placeholder="Enter your stay period"
          defaultValue={[new Date(), new Date()]}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </MisDesignProvider>
  );
}

export default BasicForm;
          `.trim(),
      },
    },
  },
};

type GroupEntry = { id: string; name?: string; fruit?: string };
type GroupAction = { type: 'ADD' } | { type: 'REMOVE'; id: string };

function groupReducer(state: GroupEntry[], action: GroupAction): GroupEntry[] {
  if (action.type === 'ADD') return [...state, { id: crypto.randomUUID() }];
  if (action.type === 'REMOVE') return state.filter((g) => g.id !== action.id);
  return state;
}

const DEFAULT_GROUPS: GroupEntry[] = [
  { id: '1', name: 'default name 1', fruit: 'apple' },
  { id: '2', name: 'default name 2', fruit: 'orange' },
];

function GeneratedFieldFormImpl() {
  type FormComposition = {
    name: string[];
    fruit: Array<SelectValue<string>>;
  };
  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const [groups, dispatch] = React.useReducer(groupReducer, DEFAULT_GROUPS);

  const handleSubmit = (value: FormComposition) => {
    console.log('handleSubmit', value);
  };

  return (
    <MisDesignProvider>
      <Form<FormComposition>
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        formRef={formRef}
        rules={() => ({
          name: [{ required: true }],
          fruit: [{ required: true }],
        })}
      >
        {groups.map((group) => (
          <div key={group.id} className="flex items-end gap-4">
            <TextField
              name="name"
              label="Name"
              placeholder="Enter your name"
              defaultValue={group.name}
              className="flex-1"
            />
            <AutoComplete
              name="fruit"
              label="Fruit"
              options={options}
              placeholder="Select your favorite fruit"
              defaultValue={group.fruit}
              className="flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              color="danger"
              className="self-end"
              onClick={() => dispatch({ type: 'REMOVE', id: group.id })}
            >
              Remove
            </Button>
          </div>
        ))}

        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => dispatch({ type: 'ADD' })}
          >
            Add New
          </Button>
        </div>

        <Button type="submit">Submit</Button>
      </Form>
    </MisDesignProvider>
  );
}

export const GeneratedFieldForm: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Dynamically generates field rows directly inside \`<Form>\` using \`useReducer\`.
Each **Add New** click appends an empty row; **Remove** deletes it.
On submit, every \`name\` and \`fruit\` field is collected as an array in the order they appear.

> **How it works** — \`Form\` traverses its \`children\` tree recursively via \`enhanceChild\`.
> Any input rendered inside a plain \`<div>\` or other DOM wrapper is found and enhanced automatically,
> so no extra wiring is needed when inputs are direct (or nested) JSX children of \`<Form>\`.
        `.trim(),
      },
      source: {
        language: 'tsx',
        code: `
type GroupEntry = { id: string; name?: string; fruit?: string };
type GroupAction = { type: 'ADD' } | { type: 'REMOVE'; id: string };

function groupReducer(state: GroupEntry[], action: GroupAction): GroupEntry[] {
  if (action.type === 'ADD') return [...state, { id: crypto.randomUUID() }];
  if (action.type === 'REMOVE') return state.filter((g) => g.id !== action.id);
  return state;
}

const DEFAULT_GROUPS: GroupEntry[] = [
  { id: '1', name: 'default name 1', fruit: 'apple' },
  { id: '2', name: 'default name 2', fruit: 'orange' },
];

function GeneratedFieldForm() {
  type FormComposition = {
    name: string[];
    fruit: Array<SelectValue<string>>;
  };

  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const [groups, dispatch] = React.useReducer(groupReducer, DEFAULT_GROUPS);

  const handleSubmit = (value: FormComposition) => {
    console.log('handleSubmit', value);
  };

  return (
    <Form<FormComposition>
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      formRef={formRef}
      rules={() => ({
        name: [{ required: true }],
        fruit: [{ required: true }],
      })}
    >
      {groups.map((group) => (
        <div key={group.id} className="flex items-end gap-4">
          <TextField
            name="name"
            label="Name"
            placeholder="Enter your name"
            defaultValue={group.name}
            className="flex-1"
          />
          <AutoComplete
            name="fruit"
            label="Fruit"
            options={options}
            placeholder="Select your favorite fruit"
            defaultValue={group.fruit}
            className="flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            color="danger"
            className="self-end"
            onClick={() => dispatch({ type: 'REMOVE', id: group.id })}
          >
            Remove
          </Button>
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => dispatch({ type: 'ADD' })}
        >
          Add New
        </Button>
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
        `.trim(),
      },
    },
  },
  render: (args) => <GeneratedFieldFormImpl {...args} />,
};

interface GroupRowProps {
  defaultValue: GroupEntry;
  onRemove: () => void;
}

const GroupRow = ({ defaultValue, onRemove }: Readonly<GroupRowProps>) => (
  <div className="flex gap-4 items-end">
    <FormField>
      <TextField
        name="name"
        label="Name"
        placeholder="Enter your name"
        defaultValue={defaultValue.name}
        className="flex-1"
      />
    </FormField>
    <FormField>
      <AutoComplete
        name="fruit"
        label="Fruit"
        options={options}
        placeholder="Select your favorite fruit"
        defaultValue={defaultValue.fruit}
        className="flex-1"
      />
    </FormField>
    <Button
      type="button"
      variant="secondary"
      color="danger"
      className="self-end"
      onClick={onRemove}
    >
      Remove
    </Button>
  </div>
);

function GeneratedFieldFormWithComponentImpl() {
  type FormComposition = {
    name: string[];
    fruit: Array<SelectValue<string>>;
  };
  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const [groups, dispatch] = React.useReducer(groupReducer, DEFAULT_GROUPS);

  const handleSubmit = (value: FormComposition) => {
    console.log('handleSubmit', value);
  };

  return (
    <MisDesignProvider>
      <Form<FormComposition>
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        formRef={formRef}
        rules={() => ({
          name: [{ required: true }],
          fruit: [{ required: true }],
        })}
      >
        {groups.map((group) => (
          <GroupRow
            key={group.id}
            defaultValue={group}
            onRemove={() => dispatch({ type: 'REMOVE', id: group.id })}
          />
        ))}

        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => dispatch({ type: 'ADD' })}
          >
            Add New
          </Button>
        </div>

        <Button type="submit">Submit</Button>
      </Form>
    </MisDesignProvider>
  );
}

export const GeneratedFieldFormWithComponent: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Same dynamic field generation as \`GeneratedFieldForm\`, but each row is extracted into
a standalone \`GroupRow\` component that owns its own layout and Remove button.

> **The problem** — \`Form\`'s \`enhanceChild\` traverses \`children\` props in the React element tree.
> When inputs are generated *inside* a child component they are invisible to \`Form\`,
> so they never get wired up (no \`inputRef\`, no validation, no disabled propagation).
>
> **The solution** — wrap each input in \`<FormField>\`, a thin context consumer exported from \`Form\`.
> \`FormField\` reads the parent \`Form\`'s context and applies the same enhancement that
> \`enhanceChild\` would have applied, making the input fully connected to the form.
        `.trim(),
      },
      source: {
        language: 'tsx',
        code: `
import { FormField } from 'mis-design';

// GroupRow is a self-contained layout component.
// Wrap each input in <FormField> so it connects to the parent Form
// even though it is not a direct JSX child of <Form>.
function GroupRow({ defaultValue, onRemove }: GroupRowProps) {
  return (
    <div className="flex gap-4 items-end">
      <FormField>
        <TextField
          name="name"
          label="Name"
          placeholder="Enter your name"
          defaultValue={defaultValue.name}
          className="flex-1"
        />
      </FormField>
      <FormField>
        <AutoComplete
          name="fruit"
          label="Fruit"
          options={options}
          placeholder="Select your favorite fruit"
          defaultValue={defaultValue.fruit}
          className="flex-1"
        />
      </FormField>
      <Button
        type="button"
        variant="secondary"
        color="danger"
        className="self-end"
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  );
}

function GeneratedFieldFormWithComponent() {
  type FormComposition = {
    name: string[];
    fruit: Array<SelectValue<string>>;
  };

  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const [groups, dispatch] = React.useReducer(groupReducer, DEFAULT_GROUPS);

  const handleSubmit = (value: FormComposition) => {
    console.log('handleSubmit', value);
  };

  return (
    <Form<FormComposition>
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      formRef={formRef}
      rules={() => ({
        name: [{ required: true }],
        fruit: [{ required: true }],
      })}
    >
      {groups.map((group) => (
        <GroupRow
          key={group.id}
          defaultValue={group}
          onRemove={() => dispatch({ type: 'REMOVE', id: group.id })}
        />
      ))}

      <div className="flex justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => dispatch({ type: 'ADD' })}
        >
          Add New
        </Button>
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
        `.trim(),
      },
    },
  },
  render: (args) => <GeneratedFieldFormWithComponentImpl {...args} />,
};

export const ModalForm: Story = {
  render: (args) => {
    const formRef = React.useRef<FormRef<FormComposition>>(null);
    type FormComposition = {
      name: string;
      fruit: SelectValue<string>;
      multipleFruit: SelectValue<string>[];
      email: string;
      website: string;
      phone: string;
      date: DateValue;
      stayPeriod: DateRangeValue;
    };

    const notify = useNotification();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = (value: FormComposition) => {
      console.log('handleSubmit', value);
      notify({
        color: 'success',
        title: 'Form Submitted',
        description: `name: ${value.name}, date: ${value.date}, fruit: ${value.fruit.label}, etc.`,
      });
    };

    return (
      <MisDesignProvider>
        <Button onClick={handleOpen}>Create New</Button>
        <Modal open={open}>
          <ModalHeader title="Create New" />
          <Form<FormComposition>
            {...args}
            onSubmit={handleSubmit}
            formRef={formRef}
            rules={() => ({
              name: [{ required: true }, { minLength: 10 }],
              fruit: [{ required: true }],
              multipleFruit: [{ required: true }],
              email: [{ required: true }, { email: true }],
              website: [{ required: true }, { url: true }],
              phone: [{ required: true }, { pattern: /^(62|0)8[1-9]\d{6,9}$/ }],
              date: [{ required: true }],
              stayPeriod: [{ required: true }],
            })}
          >
            <ModalBody>
              <div className="flex flex-col gap-4">
                <TextField
                  id="nameId"
                  name="name"
                  label="Name 1"
                  placeholder="Enter your name"
                />
                <TextField
                  id="emailId"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <AutoComplete
                  id="fruitId"
                  name="fruit"
                  label="Fruit"
                  options={options}
                  placeholder="Select your favorite fruit"
                />
                <AutoCompleteMultiple
                  id="multipleFruitId"
                  name="multipleFruit"
                  label="Multiple Fruit"
                  options={options}
                  placeholder="Select your favorite fruit"
                  appendIfNotFound
                />
                <TextField
                  id="websiteId"
                  name="website"
                  label="Website"
                  placeholder="Enter your website"
                />
                <TextField
                  id="phoneId"
                  name="phone"
                  label="Phone"
                  placeholder="Enter your phone"
                />
                <DatePicker
                  id="dateId"
                  name="date"
                  label="Date"
                  placeholder="Enter your birthday"
                />
                <DateRangePicker
                  id="stayPeriodId"
                  name="stayPeriod"
                  label="Stay Period"
                  placeholder="Enter your stay period"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center gap-4 justify-between w-full">
                <Button type="reset" color="danger" variant="secondary">
                  Reset
                </Button>
                <div className="flex items-center gap-6">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </ModalFooter>
          </Form>
        </Modal>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
type FormComposition = {
  name: string;
  fruit: SelectValue<string>;
  multipleFruit: SelectValue<string>[];
  email: string;
  website: string;
  phone: string;
  date: DateValue;
};

const ModalForm = () => {
  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const notify = useNotification();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (value: FormComposition) => {
    console.log(value)
  };

  return (
    <MisDesignProvider>
      <Button onClick={handleOpen}>Create New</Button>
      <Modal open={open}>
        <ModalHeader title="Create New" />
        <Form<FormComposition>
          onSubmit={handleSubmit}
          formRef={formRef}
          rules={() => ({
            name: [{ required: true }, { minLength: 10 }],
            fruit: [{ required: true }],
            multipleFruit: [{ required: true }],
            email: [{ required: true }, { email: true }],
            website: [{ required: true }, { url: true }],
            phone: [{ required: true }, { pattern: /^(62|0)8[1-9]d{6,9}$/ }],
            date: [{ required: true }],
            stayPeriod: [{ required: true }],
          })}
        >
          <ModalBody>
            <div className="flex flex-col gap-4">
              <TextField
                id="nameId"
                name="name"
                label="Name 1"
                placeholder="Enter your name"
              />
              <TextField
                id="emailId"
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <AutoComplete
                id="fruitId"
                name="fruit"
                label="Fruit"
                options={options}
                placeholder="Select your favorite fruit"
              />
              <AutoCompleteMultiple
                id="multipleFruitId"
                name="multipleFruit"
                label="Multiple Fruit"
                options={options}
                placeholder="Select your favorite fruit"
                appendIfNotFound
              />
              <TextField
                id="websiteId"
                name="website"
                label="Website"
                placeholder="Enter your website"
              />
              <TextField
                id="phoneId"
                name="phone"
                label="Phone"
                placeholder="Enter your phone"
              />
              <DatePicker
                id="dateId"
                name="date"
                label="Date"
                placeholder="Enter your birthday"
              />
              <DateRangePicker
                id="stayPeriodId"
                name="stayPeriod"
                label="Stay Period"
                placeholder="Enter your stay period"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center gap-4 justify-between w-full">
              <Button type="reset" color="danger" variant="secondary">
                Reset
              </Button>
              <div className="flex items-center gap-6">
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </MisDesignProvider>
  );
}

export default ModalForm;
          `.trim(),
      },
    },
  },
};

export const AllInputType: Story = {
  render: (args) => {
    const formRef = React.useRef<FormRef<FormComposition>>(null);
    type FormComposition = {
      name: string;
      fruit: SelectValue<string>;
      multipleFruit: SelectValue<string>[];
      email: string;
      website: string;
      phone: string;
      date: DateValue;
      stayPeriod: DateRangeValue;
    };

    const notify = useNotification();

    const handleSubmit = (value: FormComposition) => {
      console.log('handleSubmit', value);
      notify({
        color: 'success',
        title: 'Form Submitted',
        description: `name: ${value.name}, date: ${value.date}, etc.`,
      });
    };

    return (
      <MisDesignProvider>
        <Form<FormComposition>
          {...args}
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          formRef={formRef}
        >
          <div className="flex items-center gap-2">
            <AutoComplete
              name="autoComplete"
              label="Auto Complete"
              options={options}
              placeholder="Select one option"
              className="flex-1"
              clearable
            />
            <AutoComplete
              name="autoCompleteAppend"
              label="Auto Complete (Append Option)"
              options={options}
              placeholder="Select one option"
              appendIfNotFound
              className="flex-1"
              clearable
            />
          </div>
          <div className="flex items-center gap-2">
            <AutoCompleteMultiple
              name="autoCompleteMultiple"
              label="Auto Complete Multiple"
              options={options}
              placeholder="Select several option"
              className="flex-1"
              clearable
            />
            <AutoCompleteMultiple
              name="autoCompleteMultipleAppend"
              label="Auto Complete Multiple (Append)"
              options={options}
              placeholder="Select several option"
              appendIfNotFound
              className="flex-1"
              clearable
            />
          </div>
          <Checkbox name="checkbox" label="Checkbox" />
          <div className="flex items-center gap-2">
            <DatePicker
              name="datePicker"
              label="Date Picker"
              className="flex-1"
              clearable
            />
            <DatePicker
              name="datePickerTime"
              label="Date Picker"
              showTime
              className="flex-1"
              clearable
            />
          </div>
          <div className="flex items-center gap-2">
            <DateRangePicker
              name="dateRangePicker"
              label="Date Range Picker"
              className="flex-1"
              clearable
            />
            <DateRangePicker
              name="dateRangePickerTime"
              label="Date Range Picker"
              showTime
              className="flex-1"
              clearable
            />
          </div>
          <MultipleDatePicker
            name="multipleDatePicker"
            label="Multiple Date Picker"
            placeholder="Select several date"
            clearable
          />
          <PasswordField name="password" label="Password Field" clearable />
          <Select
            name="select"
            label="Select"
            options={options}
            placeholder="Select one option"
            clearable
          />
          <Switch name="switch" label="Switch" />
          <TextArea
            name="textArea"
            label="Text Area"
            placeholder="write something..."
          />
          <TextField
            name="textField"
            label="Text Field"
            placeholder="write something..."
            clearable
          />
          <TimerField name="timerField" label="Timer Field" clearable />
          <Button type="submit">Submit</Button>
        </Form>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
type FormComposition = {
  name: string;
  fruit: SelectValue<string>;
  multipleFruit: SelectValue<string>[];
  email: string;
  website: string;
  phone: string;
  date: DateValue;
};

const AllInputType = () => {
  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const notify = useNotification();

  const handleSubmit = (value: FormComposition) => {
    console.log(value)
  };

  return (
    <MisDesignProvider>
      <Form<FormComposition>
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        formRef={formRef}
        rules={() => ({
          name: [{ required: true }],
          fruit: [{ required: true }],
          multipleFruit: [{ required: true }],
          email: [{ required: true }, 'email'],
          website: [{ required: true }, { url: true }],
          phone: [{ required: true }, { pattern: /^(62|0)8[1-9]\d{6,9}$/ }],
          date: [{ required: true }],
        })}
      >
        <TextField name="name" label="Name" placeholder="Enter your name" />
        <AutoComplete
          name="fruit"
          label="Fruit"
          options={options}
          placeholder="Select your favorite fruit"
        />
        <AutoCompleteMultiple
          name="multipleFruit"
          label="Multiple Fruit"
          options={options}
          placeholder="Select your favorite fruit"
        />
        <TextField
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <TextField
          name="website"
          label="Website"
          placeholder="Enter your website"
        />
        <TextField
          name="phone"
          label="Phone"
          placeholder="Enter your phone"
        />
        <DatePicker
          name="date"
          label="Date"
          placeholder="Enter your birthday"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </MisDesignProvider>
  );
}

export default AllInputType;
          `.trim(),
      },
    },
  },
};

export const DirtySubmitForm: Story = {
  render: (_args) => {
    type FormComposition = {
      name: string;
      email: string;
      website: string;
    };

    const formRef = React.useRef<FormRef<FormComposition>>(null);
    const notify = useNotification();
    const [dirtyFields, setDirtyFields] = React.useState<any>({});

    const handleSubmit = (value: FormComposition) => {
      console.log('handle Submit All Fields', value);
      notify({
        color: 'success',
        title: 'Submit All Fields',
        description: JSON.stringify(value),
      });
    };

    const handleDirtySubmit = async () => {
      const values = formRef.current?.getValues();
      const dirty = formRef.current?.getDirtyFields?.();

      const allFields = Object.keys(values || {});

      const dirtyStatus = allFields.reduce(
        (acc, key) => {
          acc[key as keyof FormComposition] = !!dirty?.[key];
          return acc;
        },
        {} as Record<keyof FormComposition, boolean>,
      );

      console.log('handle submit dirty fields: ', dirtyStatus);

      setDirtyFields(dirtyStatus);
    };

    return (
      <MisDesignProvider>
        <Form<FormComposition>
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          formRef={formRef}
        >
          <TextField name="name" label="Name" defaultValue="John Doe" />

          <TextField name="email" label="Email" defaultValue="john@email.com" />

          <TextField
            name="website"
            label="Website"
            defaultValue="https://example.com"
          />

          <div className="flex gap-4">
            <Button type="submit">Submit All</Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleDirtySubmit}
            >
              Submit Dirty Only
            </Button>

            <Button
              type="button"
              color="danger"
              variant="secondary"
              onClick={() => formRef.current?.reset()}
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Debug Panel */}
        <div className="mt-6 p-4 bg-gray-100 rounded text-xs">
          <div className="font-bold mb-2">Dirty Fields:</div>
          <pre>{JSON.stringify(dirtyFields, null, 2)}</pre>
        </div>
      </MisDesignProvider>
    );
  },
};

export const InterdependentFormRules: Story = {
  render: (_args) => {
    const formRef = React.useRef<FormRef<FormComposition>>(null);
    type FormComposition = {
      luckyKey: number;
      luckyNumber: number;
    };

    const notify = useNotification();

    const handleSubmit = (value: FormComposition) => {
      console.log('handleSubmit', value);
      notify({
        color: 'success',
        title: 'Form Submitted',
        description: `lucky Number: ${value.luckyNumber}.`,
      });
    };

    const handleValidate = () => {
      formRef.current?.validate();
    };

    return (
      <MisDesignProvider>
        <Form<FormComposition>
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          formRef={formRef}
          rules={(ref) => ({
            luckyKey: [
              { required: true },
              {
                validate: (value) => value > 100,
                message: 'Lucky number must be above 100',
              },
              {
                validate: (value) => value < 1000,
                message: 'Lucky number must be below 1000',
              },
            ],
            luckyNumber: [
              {
                equal: ref['luckyKey'],
                message: "It's not the lucky number",
              },
            ],
          })}
        >
          <NumberTextField
            name="luckyKey"
            label="Lucky Key"
            placeholder="Enter your lucky key"
          />
          <NumberTextField
            name="luckyNumber"
            label="Lucky Number"
            placeholder="Enter your lucky number"
          />
          <div className="flex items-center gap-4 w-full">
            <Button
              type="button"
              onClick={handleValidate}
              className="flex-1"
              variant="secondary"
            >
              Validate
            </Button>
            <Button type="submit" className="flex-1">
              Submit
            </Button>
          </div>
        </Form>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
import { useState } from 'react';

type FormComposition = {
  luckyKey: number;
  luckyNumber: number;
};

const InterdependentFormRules = () => {
  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const notify = useNotification();

  const handleSubmit = (value: FormComposition) => {
    console.log(value)
  };

  const handleValidate = () => {
    formRef.current?.validate();
  };

  return (
    <MisDesignProvider>
      <Form<FormComposition>
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        formRef={formRef}
        rules={(ref) => ({
          luckyKey: [
            { required: true },
            {
              validate: (value) => value > 100,
              message: 'Lucky number must be above 100',
            },
            {
              validate: (value) => value < 1000,
              message: 'Lucky number must be below 1000',
            },
          ],
          luckyNumber: [
            {
              equal: ref['luckyKey'],
              message: "It's not the lucky number",
            },
          ],
        })}
      >
        <NumberTextField
          name="luckyKey"
          label="Lucky Key"
          placeholder="Enter your lucky key"
        />
        <NumberTextField
          name="luckyNumber"
          label="Lucky Number"
          placeholder="Enter your lucky number"
        />
        <div className="flex items-center gap-4 w-full">
          <Button
            type="button"
            onClick={handleValidate}
            className="flex-1"
            variant="secondary"
          >
            Validate
          </Button>
          <Button type="submit" className="flex-1">
            Submit
          </Button>
        </div>
      </Form>
    </MisDesignProvider>
  )
};

export default InterdependentFormRules;
          `.trim(),
      },
    },
  },
};

export const AutoSubmit: Story = {
  render: (args) => {
    type FormComposition = {
      name: string;
      date: DateValue;
      fruit: SelectValue<string>;
    };

    const notify = useNotification();

    const handleSubmit = (value: FormComposition) => {
      console.log('handleSubmit', value);
      notify({
        color: 'success',
        title: 'Form Submitted',
        description: `name: ${value.name}, date: ${value.date}, fruit: ${value.fruit.label}, etc.`,
      });
    };

    return (
      <MisDesignProvider>
        <Form<FormComposition>
          {...args}
          submitOnChange
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          rules={() => ({
            name: [{ required: true }],
            email: [{ required: true }, 'email'],
            website: [{ required: true }, { url: true }],
            phone: [{ required: true }, { pattern: /^(62|0)8[1-9]\d{6,9}$/ }],
            date: [{ required: true }],
            fruit: [{ required: true }],
          })}
        >
          <TextField name="name" label="Name" placeholder="Enter your name" />
          <AutoComplete
            name="fruit"
            label="Fruit"
            options={options}
            placeholder="Select your favorite fruit"
          />
          <TextField
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <TextField
            name="website"
            label="Website"
            placeholder="Enter your website"
          />
          <TextField
            name="phone"
            label="Phone"
            placeholder="Enter your phone"
          />
          <DatePicker
            name="date"
            label="Date"
            placeholder="Enter your birthday"
          />
        </Form>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
type FormComposition = {
  name: string;
  fruit: SelectValue<string>;
  multipleFruit: SelectValue<string>[];
  email: string;
  website: string;
  phone: string;
  date: DateValue;
};

const AutoSubmit = () => {
  const notify = useNotification();

  const handleSubmit = (value: FormComposition) => {
    console.log(value)
  };

  return (
    <MisDesignProvider>
      <Form<FormComposition>
        submitOnChange
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        rules={() => ({
          name: [{ required: true }],
          email: [{ required: true }, 'email'],
          website: [{ required: true }, { url: true }],
          phone: [{ required: true }, { pattern: /^(62|0)8[1-9]\d{6,9}$/ }],
          date: [{ required: true }],
          fruit: [{ required: true }],
        })}
      >
        <TextField name="name" label="Name" placeholder="Enter your name" />
        <AutoComplete
          name="fruit"
          label="Fruit"
          options={options}
          placeholder="Select your favorite fruit"
        />
        <TextField
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <TextField
          name="website"
          label="Website"
          placeholder="Enter your website"
        />
        <TextField
          name="phone"
          label="Phone"
          placeholder="Enter your phone"
        />
        <DatePicker
          name="date"
          label="Date"
          placeholder="Enter your birthday"
        />
      </Form>
    </MisDesignProvider>
  );
};

export default AutoSubmit;
          `.trim(),
      },
    },
  },
};

export const AutogenerateForm: Story = {
  args: {
    template: [
      {
        component: 'div',
        className: 'flex gap-4',
        children: [
          {
            component: 'TextField',
            id: 'nameId',
            name: 'name',
            label: 'Name 1',
            placeholder: 'Enter your name',
            className: 'flex-1',
          },
          {
            component: 'TextField',
            id: 'nameId2',
            name: 'name',
            label: 'Name 2',
            placeholder: 'Enter your name',
            className: 'flex-1',
          },
        ],
      },
      {
        component: 'TextField',
        id: 'emailId',
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        defaultValue: 'default@email.com',
      },
      {
        component: 'AutoComplete',
        id: 'fruitId',
        name: 'fruit',
        label: 'Fruit',
        options: options,
        placeholder: 'Select your favorite fruit',
      },
      {
        component: 'AutoCompleteMultiple',
        id: 'multipleFruitId',
        name: 'multipleFruit',
        label: 'Multiple Fruit',
        options: options,
        placeholder: 'Select your favorite fruit',
        appendIfNotFound: true,
      },
      {
        component: 'TextField',
        id: 'websiteId',
        name: 'website',
        label: 'Website',
        placeholder: 'Enter your website',
      },
      {
        component: 'TextField',
        id: 'phoneId',
        name: 'phone',
        label: 'Phone',
        placeholder: 'Enter your phone',
      },
      {
        component: 'DatePicker',
        id: 'dateId',
        name: 'date',
        label: 'Date',
        placeholder: 'Enter your birthday',
      },
      {
        component: 'DateRangePicker',
        id: 'stayPeriodId',
        name: 'stayPeriod',
        label: 'Stay Period',
        placeholder: 'Enter your stay period',
      },
      { component: 'Button', type: 'submit', children: 'Submit' },
    ],
  },
  render: (args) => {
    const formRef = React.useRef<FormRef<FormComposition>>(null);
    type FormComposition = {
      name: string;
      fruit: SelectValue<string>;
      multipleFruit: SelectValue<string>[];
      email: string;
      website: string;
      phone: string;
      date: DateValue;
      stayPeriod: DateRangeValue;
    };

    const notify = useNotification();

    const handleSubmit = (value: FormComposition) => {
      console.log('handleSubmit', value);
      notify({
        color: 'success',
        title: 'Form Submitted',
        description: `name: ${value.name}, date: ${value.date}, fruit: ${value.fruit.label}, etc.`,
      });
    };

    return (
      <MisDesignProvider>
        <Form<FormComposition>
          {...args}
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          formRef={formRef}
          rules={() => ({
            name: [{ required: true }, { minLength: 10 }],
            fruit: [{ required: true }],
            multipleFruit: [{ required: true }],
            email: [{ required: true }, { email: true }],
            website: [{ required: true }, { url: true }],
            phone: [{ required: true }, { pattern: /^(62|0)8[1-9]\d{6,9}$/ }],
            date: [{ required: true }],
            stayPeriod: [{ required: true }],
          })}
        >
          asdfasdf
        </Form>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
type FormComposition = {
  name: string;
  fruit: SelectValue<string>;
  multipleFruit: SelectValue<string>[];
  email: string;
  website: string;
  phone: string;
  date: DateValue;
};

const AutogenerateForm = () => {
  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const notify = useNotification();

  const handleSubmit = (value: FormComposition) => {
    console.log(value)
  };

  return (
    <MisDesignProvider> 
      <Form<FormComposition>
        {...args}
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        formRef={formRef}
        rules={() => ({
          name: [{ required: true }, { minLength: 10 }],
          fruit: [{ required: true }],
          multipleFruit: [{ required: true }],
          email: [{ required: true }, { email: true }],
          website: [{ required: true }, { url: true }],
          phone: [{ required: true }, { pattern: /^(62|0)8[1-9]\d{6,9}$/ }],
          date: [{ required: true }],
          stayPeriod: [{ required: true }],
        })} 
        template: [
          {
            component: 'div',
            className: 'flex gap-4',
            children: [
              {
                component: 'TextField',
                id: 'nameId',
                name: 'name',
                label: 'Name 1',
                placeholder: 'Enter your name',
                className: 'flex-1',
              },
              {
                component: 'TextField',
                id: 'nameId2',
                name: 'name',
                label: 'Name 2',
                placeholder: 'Enter your name',
                className: 'flex-1',
              },
            ],
          },
          {
            component: 'TextField',
            id: 'emailId',
            name: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            defaultValue: 'default@email.com',
          },
          {
            component: 'AutoComplete',
            id: 'fruitId',
            name: 'fruit',
            label: 'Fruit',
            options: options,
            placeholder: 'Select your favorite fruit',
          },
          {
            component: 'AutoCompleteMultiple',
            id: 'multipleFruitId',
            name: 'multipleFruit',
            label: 'Multiple Fruit',
            options: options,
            placeholder: 'Select your favorite fruit',
            appendIfNotFound: true,
          },
          {
            component: 'TextField',
            id: 'websiteId',
            name: 'website',
            label: 'Website',
            placeholder: 'Enter your website',
          },
          {
            component: 'TextField',
            id: 'phoneId',
            name: 'phone',
            label: 'Phone',
            placeholder: 'Enter your phone',
          },
          {
            component: 'DatePicker',
            id: 'dateId',
            name: 'date',
            label: 'Date',
            placeholder: 'Enter your birthday',
          },
          {
            component: 'DateRangePicker',
            id: 'stayPeriodId',
            name: 'stayPeriod',
            label: 'Stay Period',
            placeholder: 'Enter your stay period',
          },
          { component: 'Button', type: 'submit', children: 'Submit' },
        ]
      >
        <TextField
          id="nameId"
          name="name"
          label="Name 1"
          placeholder="Enter your name"
          defaultValue="default name 1"
        />
        <TextField
          id="nameId2"
          name="name"
          label="Name 2"
          placeholder="Enter your name"
          defaultValue="default name 2"
        />
        <TextField
          id="emailId"
          name="email"
          label="Email"
          placeholder="Enter your email"
          defaultValue="default@email.com"
        />
        <AutoComplete
          id="fruitId"
          name="fruit"
          label="Fruit"
          options={options}
          placeholder="Select your favorite fruit"
          defaultValue="apple"
        />
        <AutoCompleteMultiple
          id="multipleFruitId"
          name="multipleFruit"
          label="Multiple Fruit"
          options={options}
          placeholder="Select your favorite fruit"
          appendIfNotFound
          defaultValue={['apple', 'orange']}
        />
        <TextField
          id="websiteId"
          name="website"
          label="Website"
          placeholder="Enter your website"
          defaultValue="https://www.google.com"
        />
        <TextField
          id="phoneId"
          name="phone"
          label="Phone"
          placeholder="Enter your phone"
          defaultValue="085128211932"
        />
        <DatePicker
          id="dateId"
          name="date"
          label="Date"
          placeholder="Enter your birthday"
          defaultValue={new Date()}
        />
        <DateRangePicker
          id="stayPeriodId"
          name="stayPeriod"
          label="Stay Period"
          placeholder="Enter your stay period"
          defaultValue={[new Date(), new Date()]}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </MisDesignProvider>
  );
}

export default AutogenerateForm;
          `.trim(),
      },
    },
  },
};

export const TabForm: Story = {
  render: (_args) => {
    type FormComposition = {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      street: string;
      city: string;
      zip: string;
    };

    const FIELD_TO_TAB: Record<string, string> = {
      firstName: 'personal',
      lastName: 'personal',
      email: 'contact',
      phone: 'contact',
      street: 'address',
      city: 'address',
      zip: 'address',
    };

    const formRef = React.useRef<FormRef<FormComposition>>(null);
    const [activeTab, setActiveTab] = React.useState<string>('personal');
    const notify = useNotification();

    const handleSubmit = (value: FormComposition) => {
      console.log('handleSubmit', value);
      notify({
        color: 'success',
        title: 'Form Submitted',
        description: JSON.stringify(value, null, 2),
      });
    };

    const handleError = (errorFields: string[]) => {
      const firstErrorField = errorFields[0];
      const tabKey = FIELD_TO_TAB[firstErrorField];
      if (tabKey) {
        setActiveTab(tabKey);
      }
    };

    return (
      <MisDesignProvider>
        <Form<FormComposition>
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          onError={handleError}
          formRef={formRef}
          rules={() => ({
            firstName: [{ required: true }],
            lastName: [{ required: true }],
            email: [{ required: true }, { email: true }],
            phone: [{ required: true }],
            street: [{ required: true }],
            city: [{ required: true }],
            zip: [{ required: true }],
          })}
        >
          <Tab
            mountAllTabs
            activeKey={activeTab}
            onTabClick={(key) => setActiveTab(String(key))}
            items={[
              {
                key: 'personal',
                label: 'Personal Info',
                children: (
                  <div className="flex flex-col gap-4">
                    <FormField>
                      <TextField
                        name="firstName"
                        label="First Name"
                        placeholder="Enter first name"
                        defaultValue="John"
                      />
                    </FormField>
                    <FormField>
                      <TextField
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter last name"
                        defaultValue="Doe"
                      />
                    </FormField>
                  </div>
                ),
              },
              {
                key: 'contact',
                label: 'Contact Info',
                children: (
                  <div className="flex flex-col gap-4">
                    <FormField>
                      <TextField
                        name="email"
                        label="Email"
                        placeholder="Enter email"
                        defaultValue="john@email.com"
                      />
                    </FormField>
                    <FormField>
                      <TextField
                        name="phone"
                        label="Phone"
                        placeholder="Enter phone number"
                      />
                    </FormField>
                  </div>
                ),
              },
              {
                key: 'address',
                label: 'Address',
                children: (
                  <div className="flex flex-col gap-4">
                    <FormField>
                      <TextField
                        name="street"
                        label="Street"
                        placeholder="Enter street address"
                      />
                    </FormField>
                    <FormField>
                      <TextField
                        name="city"
                        label="City"
                        placeholder="Enter city"
                      />
                    </FormField>
                    <FormField>
                      <TextField
                        name="zip"
                        label="ZIP Code"
                        placeholder="Enter ZIP code"
                      />
                    </FormField>
                  </div>
                ),
              },
            ]}
          />
          <div className="flex items-center gap-4">
            <Button type="reset" color="danger" variant="secondary">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </MisDesignProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Form wrapping a Tab component with \`mountAllTabs\`. Fields are spread across multiple tabs,
and the submit button sits outside the tabs. On submit, values from **all tabs** are collected
and **all tabs** are validated — even inactive ones.

When validation fails, the tab containing the first error field is automatically activated
via the \`onError\` callback.

> **Key props** — \`mountAllTabs\` on \`<Tab>\` keeps all panels in the DOM (hidden with \`display: none\`),
> so every input stays registered with \`Form\`'s ref store. This enables cross-tab validation
> and value collection. \`onError\` on \`<Form>\` fires with error field names when validation fails,
> letting you switch to the relevant tab.
        `.trim(),
      },
      source: {
        language: 'tsx',
        code: `
import { Form, FormField, Tab, TextField, Button, FormRef } from 'mis-design';

type FormComposition = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
};

const FIELD_TO_TAB: Record<string, string> = {
  firstName: 'personal',
  lastName: 'personal',
  email: 'contact',
  phone: 'contact',
  street: 'address',
  city: 'address',
  zip: 'address',
};

function TabForm() {
  const formRef = React.useRef<FormRef<FormComposition>>(null);
  const [activeTab, setActiveTab] = React.useState<string>('personal');

  const handleSubmit = (value: FormComposition) => {
    console.log(value);
  };

  const handleError = (errorFields: string[]) => {
    const tabKey = FIELD_TO_TAB[errorFields[0]];
    if (tabKey) setActiveTab(tabKey);
  };

  return (
    <Form<FormComposition>
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      onError={handleError}
      formRef={formRef}
      rules={() => ({
        firstName: [{ required: true }],
        lastName: [{ required: true }],
        email: [{ required: true }, { email: true }],
        phone: [{ required: true }],
        street: [{ required: true }],
        city: [{ required: true }],
        zip: [{ required: true }],
      })}
    >
      <Tab
        mountAllTabs
        activeKey={activeTab}
        onTabClick={(key) => setActiveTab(String(key))}
        items={[
          {
            key: 'personal',
            label: 'Personal Info',
            children: (
              <div className="flex flex-col gap-4">
                <FormField>
                  <TextField name="firstName" label="First Name" />
                </FormField>
                <FormField>
                  <TextField name="lastName" label="Last Name" />
                </FormField>
              </div>
            ),
          },
          {
            key: 'contact',
            label: 'Contact Info',
            children: (
              <div className="flex flex-col gap-4">
                <FormField>
                  <TextField name="email" label="Email" />
                </FormField>
                <FormField>
                  <TextField name="phone" label="Phone" />
                </FormField>
              </div>
            ),
          },
          {
            key: 'address',
            label: 'Address',
            children: (
              <div className="flex flex-col gap-4">
                <FormField>
                  <TextField name="street" label="Street" />
                </FormField>
                <FormField>
                  <TextField name="city" label="City" />
                </FormField>
                <FormField>
                  <TextField name="zip" label="ZIP Code" />
                </FormField>
              </div>
            ),
          },
        ]}
      />
      <div className="flex items-center gap-4">
        <Button type="reset" color="danger" variant="secondary">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
        `.trim(),
      },
    },
  },
};

export const ConditionalFieldForm: Story = {
  render: (_args) => {
    type FormComposition = {
      name: string;
      email: string;
      notes: string;
    };

    const formRef = React.useRef<FormRef<FormComposition>>(null);
    const [showNotes, setShowNotes] = React.useState(true);
    const [formValues, setFormValues] = React.useState<
      Partial<FormComposition>
    >({});

    const handleGetValues = () => {
      const values = formRef.current?.getValues();
      console.log('getValues:', values);
      setFormValues(values ?? {});
    };

    const handleGetValue = (key: keyof FormComposition) => {
      const value = formRef.current?.getValue(key);
      console.log(`getValue(${key}):`, value);
      setFormValues((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <MisDesignProvider>
        <Form<FormComposition>
          className="flex flex-col gap-4"
          formRef={formRef}
        >
          <TextField name="name" label="Name" defaultValue="John Doe" />
          <TextField name="email" label="Email" defaultValue="john@email.com" />

          {showNotes && (
            <TextField
              name="notes"
              label="Notes (conditional)"
              defaultValue="Some notes"
            />
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowNotes((prev) => !prev)}
            >
              {showNotes ? 'Hide Notes Field' : 'Show Notes Field'}
            </Button>

            <Button type="button" onClick={handleGetValues}>
              Get All Values
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => handleGetValue('notes')}
            >
              Get Notes Value
            </Button>

            <Button
              type="button"
              color="danger"
              variant="secondary"
              onClick={() => formRef.current?.reset()}
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Debug Panel */}
        <div className="mt-6 p-4 bg-gray-100 rounded text-xs">
          <div className="font-bold mb-2">
            Form Values (cached values persist after unmount):
          </div>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
          <div className="mt-2 text-gray-500">
            Notes field is {showNotes ? 'mounted' : 'unmounted'} — try hiding it
            and clicking &quot;Get All Values&quot;
          </div>
        </div>
      </MisDesignProvider>
    );
  },
};
