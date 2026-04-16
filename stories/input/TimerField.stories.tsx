/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconNames } from '../../const/icon';
import {
  Icon,
  IconNames,
  TimerField,
  TimerFieldProps,
  TimerFieldRef,
} from '../../src';
import '../../src/output.css';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];

const meta: Meta<TimerFieldProps> = {
  title: 'Input/TimerField',
  component: TimerField,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description:
        'Unique identifier for the input. Useful when there are multiple inputs in a form.',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description:
        'Name of the TimerField input, typically used when submitting form data.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'number',
      description: 'The controlled value of the input (in seconds).',
      table: {
        type: { summary: 'number | null' },
      },
    },
    defaultValue: {
      control: 'number',
      description:
        'The default value when the component is first rendered (in seconds).',
      table: {
        type: { summary: 'number' },
      },
    },
    initialValue: {
      control: 'number',
      description:
        'Initial internal value for TimerField when value is not provided (in seconds).',
      table: {
        type: { summary: 'number' },
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
      description: 'Callback function to handle input changes.',
      table: {
        type: { summary: '(value: number | null) => void' },
      },
    },
    className: {
      control: false,
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
    startIcon: {
      control: false,
      description:
        'An optional icon to display at the start of the input field.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    endIcon: {
      control: false,
      description: 'An optional icon to display at the end of the input field.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    inputRef: {
      control: false,
      description:
        'Ref to access input element, value, focus, reset, and disabled state.',
      table: {
        type: {
          summary:
            'React.RefObject<TimerFieldRef> | React.RefCallback<TimerFieldRef>',
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
    required: {
      control: 'boolean',
      description: 'A flag to set if input is required.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<h3 style="margin: 0 0 12px; font-size: 18px;">TimerFieldRef - API Reference</h3>
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
        A reference to the main input element of the TimerField component.
It will contain an HTMLInputElement after the component is mounted, and can be null before that.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          HTMLInputElement | null
        </span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">value</td>
      <td style="padding:12px;border:none;">
        The current value of the timer field (in seconds).
        Returns <code>null</code> if the timer is not set.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          number | null
        </span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">focus</td>
      <td style="padding:12px;border:none;">
        Focuses the TimerField input programmatically.
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
        Resets the TimerField value back to the <code>initialValue</code>.
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
        Indicates whether the TimerField input is currently disabled.
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
type Story = StoryObj<TimerFieldProps>;

export const Playground: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    size: 'default',
    fullWidth: false,
    loading: false,
    success: false,
    error: '',
    labelPosition: 'top',
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    defaultValue: 90061,
  },
  render: (args) => {
    const InputRef = useRef<TimerFieldRef>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // number | null
    };

    return <TimerField {...args} inputRef={InputRef} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an uncontrolled TimerField. To access the input field and its value, use the inputRef. The value `90061` represents 1 day, 1 hour, 1 minute, and 1 second.',
      },
      source: {
        code: `
import { useRef } from 'react';
import { TimerField, TimerFieldRef } from '@mis-design/react';

const UncontrolledValue = () => {
    const InputRef = useRef<TimerFieldRef>(null);

    const _getValueByRef = () => {
        return InputRef.current?.value; // number | null
    };

    return (
        <TimerField
            label="Input Label"
            placeholder="Input Placeholder..."
            defaultValue={90061}
            inputRef={InputRef}
        />
    );
};

export default UncontrolledValue;
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
    const [value, setValue] = useState<number | null>(90061);

    return <TimerField {...args} value={value} onChange={setValue} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled TimerField with internal state using useState.',
      },
      source: {
        code: `
import { useState } from 'react';
import { TimerField } from '@mis-design/react';

const ControlledValue = () => {
    const [value, setValue] = useState<number | null>(90061);

    return (
        <TimerField
            label="Input Label"
            placeholder="Input Placeholder..."
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
  render: (args) => {
    return (
      <div className="flex gap-10 flex-wrap">
        {sizeOption.map((size) => (
          <TimerField
            key={size}
            {...args}
            size={size as TimerFieldProps['size']}
            label={`Size ${size}`}
          />
        ))}
      </div>
    );
  },
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
        story: 'TimerField supports two sizes: default and large.',
      },
      source: {
        code: `
import { TimerField } from '@mis-design/react';

const Sizes = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <TimerField size="default" label="Size default" placeholder="Input Placeholder..." />
        <TimerField size="large" label="Size large" placeholder="Input Placeholder..." />
    </div>
);

export default Sizes;
        `.trim(),
      },
    },
  },
};

export const LabelPosition: Story = {
  render: (args) => (
    <div className="flex flex-col w-full gap-4">
      {labelPositionOption.map((position) => (
        <TimerField
          key={position}
          {...args}
          labelPosition={position as TimerFieldProps['labelPosition']}
          label={`Position ${position}`}
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
          'The label can be positioned at the top (default) or to the left of the input.',
      },
      source: {
        code: `
import { TimerField } from '@mis-design/react';

const LabelPosition = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TimerField labelPosition="top" label="Position top" placeholder="Input Placeholder..." helperText="Input helper text" width={500} />
        <TimerField labelPosition="left" label="Position left" placeholder="Input Placeholder..." helperText="Input helper text" width={500} />
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
      <TimerField {...args} label="Neutral TimerField" className="flex-1" />
      <TimerField
        {...args}
        label="Success TimerField"
        className="flex-1"
        success
      />
      <TimerField {...args} label="Error TimerField" className="flex-1" error />
      <TimerField
        {...args}
        label="Error TimerField with message"
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
          'TimerField can display neutral, success, or error states. Pass a string to `error` to show an error message.',
      },
      source: {
        code: `
import { TimerField } from '@mis-design/react';

const SuccessAndError = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <TimerField label="Neutral TimerField" placeholder="Input Placeholder..." helperText="Input helper text" />
        <TimerField label="Success TimerField" placeholder="Input Placeholder..." helperText="Input helper text" success />
        <TimerField label="Error TimerField" placeholder="Input Placeholder..." helperText="Input helper text" error />
        <TimerField label="Error TimerField with message" placeholder="Input Placeholder..." helperText="Input helper text" error="Error with message" />
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
      <TimerField
        {...args}
        label="Disabled (empty)"
        placeholder="Input Placeholder..."
        disabled
      />
      <TimerField
        {...args}
        label="Disabled (with value)"
        defaultValue={90061}
        disabled
      />
    </div>
  ),
  args: {
    helperText: 'Input helper text',
  },
  argTypes: {
    disabled: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `disabled` is true, the TimerField is not interactive. It can be disabled with or without a pre-filled value.',
      },
      source: {
        code: `
import { TimerField } from '@mis-design/react';

const Disabled = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <TimerField label="Disabled (empty)" placeholder="Input Placeholder..." helperText="Input helper text" disabled />
        <TimerField label="Disabled (with value)" defaultValue={90061} helperText="Input helper text" disabled />
    </div>
);

export default Disabled;
        `.trim(),
      },
    },
  },
};

type WithIconControls = TimerFieldProps & {
  startIconName: IconNames;
  endIconName: IconNames;
};
export const WithIcon: StoryObj<WithIconControls> = {
  args: {
    startIconName: 'arrow-up',
    endIconName: 'arrow-down',
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
  },
  argTypes: {
    startIconName: {
      control: { type: 'select' },
      options: iconNames,
      description: 'Name of the start icon',
      table: {
        category: 'Icons',
      },
    },
    endIconName: {
      control: { type: 'select' },
      options: iconNames,
      description: 'Name of the end icon',
      table: {
        category: 'Icons',
      },
    },
  },
  render: (args) => {
    const { startIconName, endIconName, ...rest } = args;
    const start = useMemo(
      () => <Icon name={startIconName} color="currentColor" />,
      [startIconName],
    );
    const end = useMemo(
      () => <Icon name={endIconName} color="currentColor" />,
      [endIconName],
    );

    return <TimerField {...rest} startIcon={start} endIcon={end} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'TimerField supports optional icons at the start and/or end of the input.',
      },
      source: {
        code: `
import { TimerField, Icon } from '@mis-design/react';

const WithIcon = () => (
    <TimerField
        label="Input Label"
        placeholder="Input Placeholder..."
        helperText="Input helper text"
        startIcon={<Icon name="arrow-up" color="currentColor" />}
        endIcon={<Icon name="arrow-down" color="currentColor" />}
    />
);

export default WithIcon;
        `.trim(),
      },
    },
  },
};
