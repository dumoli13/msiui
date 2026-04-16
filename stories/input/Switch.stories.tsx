/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch, SwitchProps, SwitchRef } from '../../src';
import '../../src/output.css';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];

const meta: Meta<SwitchProps> = {
  title: 'Input/Switch',
  component: Switch,
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
        'Name of the Switch input, typically used when submitting form data.',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'A flag to set the initial checked state of the switch.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    initialChecked: {
      control: 'boolean',
      description:
        'The initial checked state used internally by the component. Useful when using the reset() method.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'The checked state of the switch.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
        type: { summary: 'top | left' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function to handle input changes.',
      table: {
        type: { summary: '(checked: boolean) => void' },
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
            'React.RefObject<SwitchRef<T, D>> | React.RefCallback<SwitchRef<T, D>>',
        },
      },
    },
    size: {
      control: 'select',
      options: sizeOption,
      description: 'The size of the input field.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | large' },
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
    loading: {
      control: 'boolean',
      description: 'A flag to display loading state if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    width: {
      control: 'number',
      description: 'Optional custom width for the switch container (px).',
      table: {
        type: { summary: 'number' },
      },
    },
    trueLabel: {
      control: 'text',
      description:
        'The label to display when the switch is in the "on" or "checked" state.',
      table: {
        type: { summary: 'string' },
      },
    },
    falseLabel: {
      control: 'text',
      description:
        'The label to display when the switch is in the "off" or "unchecked" state.',
      table: {
        type: { summary: 'string' },
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
      control: false,
      description:
        'Callback fired when a key is pressed while the switch is focused.',
      table: {
        type: { summary: 'React.KeyboardEventHandler<T>' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<h3 style="margin: 0 0 12px; font-size: 18px;">SwitchRef - API Reference</h3>

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
        A reference to the main input element of the Switch component.
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
        The current value of the Switch. <code>true</code> if on, <code>false</code> if off.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          boolean
        </span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">focus</td>
      <td style="padding:12px;border:none;">
        Focuses the Switch input programmatically.  
        Works the same as clicking the input.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          () => void
        </span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">reset</td>
      <td style="padding:12px;border:none;">
        Resets the Switch value back to the <code>initialValue</code>.  
        Useful when you want to clear or restore the default state.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          () => void
        </span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">disabled</td>
      <td style="padding:12px;border:none;">
        Indicates whether the Switch input is currently disabled.  
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
type Story = StoryObj<SwitchProps>;

export const Playground: Story = {
  args: {
    label: 'Switch Label',
    size: 'default',
    fullWidth: false,
    loading: false,
    error: '',
    labelPosition: 'top',
    helperText: 'Switch helper text',
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Switch Label',
    helperText: 'Switch helper text',
    defaultChecked: true,
  },
  render: (args) => {
    const InputRef = useRef<SwitchRef>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // boolean
    };

    return <Switch {...args} inputRef={InputRef} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an uncontrolled Switch. to access the input field and its value, use the inputRef.',
      },
      source: {
        code: `
import { useState } from 'react';

const UncontrolledValue = () => {
    const InputRef = useRef<SwitchRef>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // boolean
    }

    return (
        <Switch inputRef={InputRef} />
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
    label: 'Switch Label',
    helperText: 'Switch helper text',
  },
  render: (args) => {
    const [value, setValue] = useState<boolean>(false);

    return <Switch {...args} checked={value} onChange={setValue} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled Switch with internal state using useState.',
      },
      source: {
        code: `
import { useState } from 'react';

const ControlledValue = () => {
    const [checked, setChecked] = useState<boolean>(false);
    return 
      <Switch checked={checked} onChange={setChecked} />;
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
          <Switch
            key={size}
            {...args}
            size={size as SwitchProps['size']}
            label={`Size ${size}`}
          />
        ))}
      </div>
    );
  },
  argTypes: {
    size: { control: false },
    label: { control: false },
  },
};

export const LabelPosition: Story = {
  render: (args) => (
    <div className="flex flex-col w-full gap-4">
      {labelPositionOption.map((position) => (
        <Switch
          key={position}
          {...args}
          labelPosition={position as SwitchProps['labelPosition']}
          label={`Position ${position}`}
          width={500}
        />
      ))}
    </div>
  ),
  args: {
    helperText: 'Switch helper text',
  },
  argTypes: {
    size: { control: false },
    label: { control: false },
  },
};

export const ShowError: Story = {
  render: (args) => (
    <div className="flex flex-col gap-10">
      <Switch {...args} label="Switch" className="flex-1" />
      <Switch {...args} label="Switch" className="flex-1" error />
      <Switch
        {...args}
        label="Switch"
        className="flex-1"
        error="Error with message"
      />
    </div>
  ),
  args: {
    helperText: 'Switch helper text',
  },
  argTypes: {
    error: { control: false },
  },
};
