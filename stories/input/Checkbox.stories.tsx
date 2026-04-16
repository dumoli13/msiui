/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, CheckboxProps, CheckboxRef } from '../../src';
import '../../src/output.css';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'bottom', 'left', 'right'];

const meta: Meta<CheckboxProps> = {
  title: 'Input/Checkbox',
  component: Checkbox,
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
        'Name of the Checkbox input, typically used when submitting form data.',
      table: { type: { summary: 'string' } },
    },
    defaultChecked: {
      control: 'text',
      description: 'Sets the initial checked value for an uncontrolled input.',
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
    indeterminate: {
      control: 'boolean',
      description:
        'Controls whether the checkbox is displayed in an indeterminate (mixed) state.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: 'text',
      description:
        'Label displayed for the input. You can position it top or left or right or bottom.',
      table: {
        type: { summary: 'string' },
      },
    },
    labelPosition: {
      control: 'select',
      options: labelPositionOption,
      description: 'The position of the label relative to the field',
      table: {
        defaultValue: { summary: 'right' },
        type: { summary: 'top | bottom | left | right' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the input.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function to handle input changes.',
      table: {
        type: { summary: '(value: boolean) => void' },
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
    inputRef: {
      control: false,
      description:
        'Ref to access input element, value, focus, reset, and disabled state.',
      table: {
        type: {
          summary:
            'React.RefObject<CheckboxRef<T, D>> | React.RefCallback<CheckboxRef<T, D>>',
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
      description: 'Optional custom width for the input field (in px).',
      table: {
        type: { summary: 'number' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<h3 style="margin: 0 0 12px; font-size: 18px;">CheckboxRef - API Reference</h3>
<table style="width:100%;border-collapse:collapse;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08);border-radius:8px;overflow:hidden;">
  <thead>
    <tr>
      <th style="padding:12px;text-align:left;border:none;border-left:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">Name</th>
      <th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;">Description</th>
      <th style="padding:12px;text-align:left;border:none;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">Type</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">element</td>
      <td style="padding:12px;border:none;">A reference to the main input element of the Checkbox component.
It will contain an HTMLInputElement after the component is mounted, and can be null before that.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;"><span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">HTMLInputElement | null</span></td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">value</td>
      <td style="padding:12px;border:none;">Current checked state of the Checkbox. Reflects the controlled value or internal value depending on usage.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;"><span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">boolean</span></td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">focus</td>
      <td style="padding:12px;border:none;">Programmatically focuses the Checkbox input.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;"><span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">() => void</span></td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">reset</td>
      <td style="padding:12px;border:none;">Resets the Checkbox to its initial state (initialChecked value).</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;"><span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">() => void</span></td>
    </tr>
    <tr>
      <td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">disabled</td>
      <td style="padding:12px;border:none;">Indicates whether the Checkbox is disabled. Becomes <code>true</code> if <code>disabled</code> or <code>loading</code> is active.</td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;"><span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">boolean</span></td>
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
type Story = StoryObj<CheckboxProps>;

export const Playground: Story = {
  args: {
    label: 'Input Label',
    helperText: 'Input helper text',
    size: 'default',
    loading: false,
    labelPosition: 'right',
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Input Label',
    helperText: 'Input helper text',
    defaultChecked: true,
  },
  render: (args) => {
    const InputRef = useRef<CheckboxRef>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // boolean
    };

    return <Checkbox {...args} inputRef={InputRef} />;
  },
  argTypes: {
    checked: { control: false },
    defaultChecked: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a uncontrolled Checkbox. to access the input field and its value, use the inputRef.',
      },
      source: {
        code: `
import { useState } from 'react';

const UncontrolledValue = () => {
    const InputRef = useRef<CheckboxRef>(null);

    const getValueByRef = () => {
        return InputRef.current?.value; // boolean
    }

    return (
        <Checkbox inputRef={InputRef} />
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
    helperText: 'Input helper text',
  },
  render: (args) => {
    const [value, setValue] = useState<boolean>(false);

    return <Checkbox {...args} checked={value} onChange={setValue} />;
  },
  argTypes: {
    defaultChecked: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled Checkbox with internal state using useState.',
      },
      source: {
        code: `
import { useState } from 'react';

const ControlledValue = () => {
    const [value, setValue] = useState<string>('');

    return (
        <Checkbox
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
        <Checkbox
          key={size}
          {...args}
          size={size as CheckboxProps['size']}
          label={`Size ${size}`}
        />
      ))}
    </div>
  ),
  argTypes: {
    size: { control: false },
    label: { control: false },
  },
};

export const LabelPosition: Story = {
  render: (args) => (
    <div className="flex flex-col w-full gap-4">
      {labelPositionOption.map((position) => (
        <Checkbox
          key={position}
          {...args}
          labelPosition={position as CheckboxProps['labelPosition']}
          label={`Position ${position}`}
          className="flex-1"
          width={500}
        />
      ))}
    </div>
  ),
  args: {
    helperText: 'Input helper text',
  },
  argTypes: {
    size: { control: false },
    label: { control: false },
  },
};

export const SuccessAndError: Story = {
  render: (args) => (
    <div className="flex flex-col gap-10">
      <Checkbox {...args} label="Neutral Text Field size" className="flex-1" />
      <Checkbox
        {...args}
        label="Success Text Field size"
        className="flex-1"
        error
      />
      <Checkbox
        {...args}
        label="Success Text Field size"
        className="flex-1"
        error="Error with message"
      />
    </div>
  ),
  args: {
    helperText: 'Input helper text',
  },
  argTypes: {
    error: { control: false },
  },
};
