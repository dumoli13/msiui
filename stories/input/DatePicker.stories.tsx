/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import {
  DatePicker,
  DatePickerProps,
  DatePickerRef,
  DateValue,
} from '../../src';
import '../../src/output.css';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];
const pickerOption = ['date', 'month', 'year'];

const meta: Meta<DatePickerProps> = {
  title: 'Input/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description:
        'Unique identifier for the input. Useful when there are multiple inputs in a form.',
      table: { type: { summary: 'string' } },
    },
    name: {
      control: 'text',
      description:
        'Name of the DatePicker input, typically used when submitting form data.',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: 'The controlled value of the input.',
      table: {
        type: { summary: 'DateValue' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'The default value when the component is first rendered.',
      table: {
        type: { summary: 'DateValue' },
      },
    },
    initialValue: {
      control: 'text',
      description:
        'Initial internal value for **DatePicker** when value is not provided.',
      table: {
        type: { summary: 'DateValue' },
      },
    },
    label: {
      control: 'text',
      description:
        'Label displayed for the input. You can position it top or left.',
      table: {
        type: { summary: 'string' },
      },
    },
    labelPosition: {
      control: 'select',
      options: labelPositionOption,
      description: 'The position of the label relative to the field',
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: "'top' | 'left'" },
      },
    },
    autoHideLabel: {
      control: 'boolean',
      description:
        'A flag to set if label should automatically hide when the input is focused.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      control: 'text',
      description:
        'Placeholder text displayed inside the input field when it is empty.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function to handle date selection changes.',
      table: {
        type: { summary: '(value: DateValue) => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names to customize the component style.',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'A helper message displayed below the input field.',
      table: {
        type: { summary: 'React.ReactNode' },
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
    fullWidth: {
      control: 'boolean',
      description: 'A flag that expand to full container width if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    inputRef: {
      control: false,
      description:
        'Ref to access input element, value, focus, reset, and disabled state.',
      table: {
        type: {
          summary:
            'React.RefObject<DatePickerRef> | React.RefCallback<DatePickerRef>',
        },
      },
    },
    size: {
      control: 'select',
      options: sizeOption,
      description: 'The size of the input field.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'large'" },
      },
    },
    error: {
      control: 'text',
      description:
        'A flag to display error of input field. If set to string, it will be displayed as error message.',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'boolean',
      description: 'A flag to display success of input field if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'A flag to display loading state if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    clearable: {
      control: 'boolean',
      description:
        'A flag that show clear button of input field if set to true. It allows the user to clear the input with one click.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    width: {
      control: 'number',
      description: 'Optional custom width for the input field (in px).',
      table: {
        type: { summary: 'number' },
      },
    },
    disabledDate: {
      control: false,
      description:
        'A function to determine if a specific date is disabled (not selectable).',
      table: {
        type: { summary: '(date: Date) => boolean' },
      },
    },
    showTime: {
      control: 'boolean',
      description:
        'A flag to show time picker alongside the date picker if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    format: {
      control: 'text',
      description: 'The format of the date displayed in the input field.',
      table: {
        type: { summary: 'string' },
      },
    },
    picker: {
      control: 'select',
      options: pickerOption,
      description: 'The type of the date picker',
      table: {
        defaultValue: { summary: 'date' },
        type: { summary: "'date' | 'month' | 'year'" },
      },
    },
    required: {
      control: 'boolean',
      description: 'A flag to set if input is required.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onKeyDown: {
      action: false,
      description:
        'Callback fired when a key is pressed while the DatePicker input is focused. Useful for handling keyboard navigation and selection.',
      table: {
        type: { summary: 'React.KeyboardEventHandler<HTMLInputElement>' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<h3 style="margin: 0 0 12px; font-size: 18px;">PickerType — Type Definition</h3>
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
      <td style="padding:12px;border:none;">PickerType</td>
      <td style="padding:12px;border:none;">
        Defines what type of picker is used.
        Useful to switch between selecting full date, month only, or year only.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          'date' | 'month' | 'year'
        </span>
      </td>
    </tr>
  </tbody>
</table>


<h3 style="margin: 24px 0 12px; font-size: 18px;">DateValue — Type Definition</h3>
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
      <td style="padding:12px;border:none;">DateValue</td>
      <td style="padding:12px;border:none;">
        Represents the value selected in the date picker.
        When no date is chosen, it returns <code>null</code>.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          Date | null
        </span>
      </td>
    </tr>
  </tbody>
</table>


<h3 style="margin: 24px 0 12px; font-size: 18px;">DatePickerRef — API Reference</h3>
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
      <td style="padding:12px;border:none;">element</td>
      <td style="padding:12px;border:none;">
        A reference to the main input element of the DatePicker component.
It will contain an HTMLDivElement after the component is mounted, and can be null before that.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          HTMLDivElement | null
        </span>
      </td>
    </tr>

    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">value</td>
      <td style="padding:12px;border:none;">
        The currently selected date value in the DatePicker.
        Returns <code>null</code> when no date is selected.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          DateValue
        </span>
      </td>
    </tr>

    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">focus</td>
      <td style="padding:12px;border:none;">
        Focuses the DatePicker input programmatically.
        Works the same as clicking the input.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          () =&gt; void
        </span>
      </td>
    </tr>

    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">reset</td>
      <td style="padding:12px;border:none;">
        Resets the DatePicker value back to the <code>initialValue</code>.
        Useful when you want to clear or restore the default state.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          () =&gt; void
        </span>
      </td>
    </tr>

    <tr>
      <td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">disabled</td>
      <td style="padding:12px;border:none;">
        Indicates whether the DatePicker input is currently disabled.
        If <code>true</code>, the user cannot interact with the input.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          boolean
        </span>
      </td>
    </tr>

  </tbody>
</table>

      `,
      },
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<DatePickerProps>;

export const Playground: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    size: 'default',
    clearable: false,
    fullWidth: false,
    loading: false,
    success: false,
    error: '',
    labelPosition: 'top',
    picker: 'date',
    onKeyDown: action('key-down'),
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    defaultValue: new Date('2023-12-01'),
  },
  render: (args) => {
    const InputRef = useRef<DatePickerRef>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // Date | null
    };

    return <DatePicker {...args} inputRef={InputRef} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an uncontrolled DatePicker. Use `defaultValue` to pre-select a date. Access the current value at any time via `inputRef`.',
      },
      source: {
        code: `
import { useRef } from 'react';
import { DatePicker, DatePickerRef } from '@mis-design/react';

const DefaultValue = () => {
  const inputRef = useRef<DatePickerRef>(null);

  const _getValueByRef = () => {
    return inputRef.current?.value; // Date | null
  };

  return (
    <DatePicker
      label="This is label"
      defaultValue={new Date('2023-12-01')}
      inputRef={inputRef}
    />
  );
};

export default DefaultValue;
        `.trim(),
      },
    },
  },
};

export const ControlledValue: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
  },
  render: (args) => {
    const [value, setValue] = useState<DateValue>(null);

    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled DatePicker with internal state using useState.',
      },
      source: {
        code: `
import { useState } from 'react';
import { DatePicker, DateValue } from '@mis-design/react';

const ControlledValue = () => {
  const [value, setValue] = useState<DateValue>(null);

  return (
    <DatePicker
      label="This is label"
      placeholder="Select a date..."
      value={value}
      onChange={setValue}
    />
  );
};

export default ControlledValue;
        `.trim(),
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-10 flex-wrap">
      {sizeOption.map((size) => (
        <DatePicker
          key={size}
          {...args}
          size={size as DatePickerProps['size']}
          label={`Size ${size}`}
        />
      ))}
    </div>
  ),
  args: {
    placeholder: 'Input Placeholder...',
  },
  argTypes: {
    size: { control: false },
    label: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker supports two sizes: `default` and `large`.',
      },
      source: {
        code: `
import { DatePicker } from '@mis-design/react';

const Sizes = () => (
  <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
    <DatePicker label="Size default" placeholder="Input Placeholder..." size="default" />
    <DatePicker label="Size large" placeholder="Input Placeholder..." size="large" />
  </div>
);

export default Sizes;
        `.trim(),
      },
    },
  },
};

export const Picker: Story = {
  render: (args) => (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col gap-4 flex-wrap">
        {pickerOption.map((picker) => (
          <DatePicker
            key={picker}
            {...args}
            picker={picker as DatePickerProps['picker']}
            label={`Picker type ${picker}`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 flex-wrap">
        {pickerOption.map((picker) => (
          <DatePicker
            key={picker}
            {...args}
            picker={picker as DatePickerProps['picker']}
            label={`Custom Picker format ${picker} (MMMM DD, YYYY)`}
            format="MMMM DD, YYYY"
          />
        ))}
      </div>
    </div>
  ),
  args: {
    placeholder: 'Input Placeholder...',
  },
  argTypes: {
    picker: { control: false },
    label: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `picker` to switch between `date`, `month`, and `year` selection modes. Combine with `format` to customize the displayed date string.',
      },
      source: {
        code: `
import { DatePicker } from '@mis-design/react';

const Picker = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <DatePicker label="Picker type date" placeholder="Select date..." picker="date" />
    <DatePicker label="Picker type month" placeholder="Select month..." picker="month" />
    <DatePicker label="Picker type year" placeholder="Select year..." picker="year" />
    <DatePicker label="Custom format (MMMM DD, YYYY)" placeholder="Select date..." picker="date" format="MMMM DD, YYYY" />
  </div>
);

export default Picker;
        `.trim(),
      },
    },
  },
};

export const LabelPosition: Story = {
  render: (args) => (
    <div className="flex flex-col w-full gap-4">
      {labelPositionOption.map((position) => (
        <DatePicker
          key={position}
          {...args}
          labelPosition={position as DatePickerProps['labelPosition']}
          label={`Position ${position}`}
          className="flex-1"
          width={500}
        />
      ))}
    </div>
  ),
  args: {
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
  },
  argTypes: {
    size: { control: false },
    label: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'The label can be placed either on `top` (default) or to the `left` of the input.',
      },
      source: {
        code: `
import { DatePicker } from '@mis-design/react';

const LabelPosition = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
    <DatePicker label="Position top" placeholder="Input Placeholder..." labelPosition="top" width={500} helperText="Input helper text" />
    <DatePicker label="Position left" placeholder="Input Placeholder..." labelPosition="left" width={500} helperText="Input helper text" />
  </div>
);

export default LabelPosition;
        `.trim(),
      },
    },
  },
};

export const SuccessAndError: Story = {
  render: (args) => (
    <div className="flex flex-col gap-10">
      <DatePicker {...args} label="Neutral DatePicker" className="flex-1" />
      <DatePicker
        {...args}
        label="Success DatePicker"
        className="flex-1"
        success
      />
      <DatePicker {...args} label="Error DatePicker" className="flex-1" error />
      <DatePicker
        {...args}
        label="Error DatePicker with message"
        className="flex-1"
        error="Error with message"
      />
    </div>
  ),
  args: {
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
  },
  argTypes: {
    success: { control: false },
    error: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `success` and `error` props to indicate validation state. `error` can be a boolean or a string message.',
      },
      source: {
        code: `
import { DatePicker } from '@mis-design/react';

const SuccessAndError = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
    <DatePicker label="Neutral DatePicker" placeholder="Input Placeholder..." helperText="Input helper text" />
    <DatePicker label="Success DatePicker" placeholder="Input Placeholder..." helperText="Input helper text" success />
    <DatePicker label="Error DatePicker" placeholder="Input Placeholder..." helperText="Input helper text" error />
    <DatePicker label="Error DatePicker with message" placeholder="Input Placeholder..." helperText="Input helper text" error="Error with message" />
  </div>
);

export default SuccessAndError;
        `.trim(),
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex gap-10 flex-wrap">
      <DatePicker
        {...args}
        label="Disabled DatePicker"
        placeholder="Input Placeholder..."
        disabled
      />
      <DatePicker
        {...args}
        label="Disabled with pre-selected value"
        placeholder="Input Placeholder..."
        defaultValue={new Date('2023-12-01')}
        disabled
      />
    </div>
  ),
  args: {
    helperText: 'This field is disabled',
  },
  argTypes: {
    disabled: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Set `disabled` to prevent user interaction. Both empty and pre-selected states are shown.',
      },
      source: {
        code: `
import { DatePicker } from '@mis-design/react';

const Disabled = () => (
  <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
    <DatePicker
      label="Disabled DatePicker"
      placeholder="Input Placeholder..."
      helperText="This field is disabled"
      disabled
    />
    <DatePicker
      label="Disabled with pre-selected value"
      defaultValue={new Date('2023-12-01')}
      helperText="This field is disabled"
      disabled
    />
  </div>
);

export default Disabled;
        `.trim(),
      },
    },
  },
};

export const WithTime: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <DatePicker
        {...args}
        label="Date + Time Picker"
        placeholder="Select date and time..."
        showTime
      />
      <DatePicker
        {...args}
        label="Date + Time with custom format"
        placeholder="Select date and time..."
        showTime
        format="YYYY-MM-DD HH:mm:ss"
      />
    </div>
  ),
  args: {
    helperText: 'Input helper text',
  },
  argTypes: {
    showTime: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enable `showTime` to allow both date and time selection. Use `format` to customize the displayed date-time string.',
      },
      source: {
        code: `
import { DatePicker } from '@mis-design/react';

const WithTime = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <DatePicker
      label="Date + Time Picker"
      placeholder="Select date and time..."
      helperText="Input helper text"
      showTime
    />
    <DatePicker
      label="Date + Time with custom format"
      placeholder="Select date and time..."
      helperText="Input helper text"
      showTime
      format="YYYY-MM-DD HH:mm:ss"
    />
  </div>
);

export default WithTime;
        `.trim(),
      },
    },
  },
};

export const DisabledDate: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    disabledDate: (date) => date.getDate() % 2 === 1,
  },
  render: (args) => <DatePicker {...args} helperText="Disabled Odd Dates" />,
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `disabledDate` to prevent selection of specific dates. The function receives a `Date` and should return `true` to disable it.',
      },
      source: {
        code: `
import { DatePicker } from '@mis-design/react';

const DisabledDate = () => (
  <DatePicker
    label="DatePicker with disabled dates"
    helperText="Disabled Odd Dates"
    disabledDate={(date) => date.getDate() % 2 === 1}
  />
);

export default DisabledDate;
        `.trim(),
      },
    },
  },
};
