import { useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconNames } from '../../const/icon';
import {
  Icon,
  IconNames,
  NumberTextField,
  NumberTextFieldProps,
  NumberTextfieldRef,
} from '../../src';
import '../../src/output.css';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];

const meta: Meta<NumberTextFieldProps> = {
  title: 'Input/NumberTextField',
  component: NumberTextField,
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
        'Name of the NumberTextField input, typically used when submitting form data.',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'number',
      description: 'The controlled value of the input.',
      table: {
        type: { summary: 'number' },
      },
    },
    defaultValue: {
      control: 'number',
      description: 'The default value when the component is first rendered.',
      table: {
        type: { summary: 'number' },
      },
    },
    initialValue: {
      control: 'number',
      description:
        'Initial internal value for NumberTextField when value is not provided.',
      table: {
        defaultValue: { summary: 'null' },
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
            'React.RefObject<NumberTextfieldRef> | React.RefCallback<NumberTextfieldRef>',
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
    max: {
      control: 'number',
      description: 'The maximum value allowed for the input field.',
      table: {
        type: { summary: 'number' },
      },
    },
    min: {
      control: 'number',
      description: 'The minimum value allowed for the input field.',
      table: {
        type: { summary: 'number' },
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Callback function triggered when the input receives focus.',
      table: {
        type: { summary: 'React.FocusEventHandler<HTMLInputElement>' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Callback function triggered when the input loses focus.',
      table: {
        type: { summary: 'React.FocusEventHandler<HTMLInputElement>' },
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
<h3 style="margin: 0 0 12px; font-size: 18px;">NumberTextfieldRef — API Reference</h3>
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
        A reference to the main input element of the NumberTextField component.
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
        The current numeric value inside the NumberTextfield. <br/>
        Returns <code>null</code> if the field is empty or contains no valid number.
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
       Focuses the NumberTextfield input programmatically.
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
       Resets the NumberTextfield value back to the <code>initialValue</code>.
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
        Indicates whether the NumberTextfield input is currently disabled.
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
type Story = StoryObj<NumberTextFieldProps>;

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
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    defaultValue: 888,
  },
  render: (args) => {
    const InputRef = useRef<NumberTextfieldRef>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // number | null
    };

    return <NumberTextField {...args} inputRef={InputRef} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an uncontrolled NumberTextField. To access the input field and its value, use the inputRef.',
      },
      source: {
        code: `
import { useRef } from 'react';
import { NumberTextField, NumberTextfieldRef } from '@mis-design/react';

const UncontrolledValue = () => {
    const InputRef = useRef<NumberTextfieldRef>(null);

    const _getValueByRef = () => {
        return InputRef.current?.value; // number | null
    };

    return (
        <NumberTextField
            label="Input Label"
            placeholder="Input Placeholder..."
            defaultValue={888}
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
    const [value, setValue] = useState<number | null>(null);

    return <NumberTextField {...args} value={value} onChange={setValue} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled NumberTextField with internal state using useState.',
      },
      source: {
        code: `
import { useState } from 'react';
import { NumberTextField } from '@mis-design/react';

const ControlledValue = () => {
    const [value, setValue] = useState<number | null>(null);

    return (
        <NumberTextField
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
          <NumberTextField
            key={size}
            {...args}
            size={size as NumberTextFieldProps['size']}
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
        story: 'NumberTextField supports two sizes: default and large.',
      },
      source: {
        code: `
import { NumberTextField } from '@mis-design/react';

const Sizes = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <NumberTextField size="default" label="Size default" placeholder="Input Placeholder..." />
        <NumberTextField size="large" label="Size large" placeholder="Input Placeholder..." />
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
    <div className="flex gap-10 flex-wrap">
      {labelPositionOption.map((position) => (
        <NumberTextField
          key={position}
          {...args}
          labelPosition={position as NumberTextFieldProps['labelPosition']}
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
import { NumberTextField } from '@mis-design/react';

const LabelPosition = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <NumberTextField labelPosition="top" label="Position top" placeholder="Input Placeholder..." helperText="Input helper text" width={500} />
        <NumberTextField labelPosition="left" label="Position left" placeholder="Input Placeholder..." helperText="Input helper text" width={500} />
    </div>
);

export default LabelPosition;
        `.trim(),
      },
    },
  },
};

export const SuccessAndError: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col gap-10">
        <NumberTextField
          {...args}
          label="Neutral NumberTextField"
          className="flex-1"
        />
        <NumberTextField
          {...args}
          label="Success NumberTextField"
          className="flex-1"
          success
        />
        <NumberTextField
          {...args}
          label="Error NumberTextField"
          className="flex-1"
          error
        />
        <NumberTextField
          {...args}
          label="Error NumberTextField with message"
          className="flex-1"
          error="Error with message"
        />
      </div>
    );
  },
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
          'NumberTextField can display neutral, success, or error states. Pass a string to `error` to show an error message.',
      },
      source: {
        code: `
import { NumberTextField } from '@mis-design/react';

const SuccessAndError = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <NumberTextField label="Neutral NumberTextField" placeholder="Input Placeholder..." helperText="Input helper text" />
        <NumberTextField label="Success NumberTextField" placeholder="Input Placeholder..." helperText="Input helper text" success />
        <NumberTextField label="Error NumberTextField" placeholder="Input Placeholder..." helperText="Input helper text" error />
        <NumberTextField label="Error NumberTextField with message" placeholder="Input Placeholder..." helperText="Input helper text" error="Error with message" />
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
      <NumberTextField
        {...args}
        label="Disabled (empty)"
        placeholder="Input Placeholder..."
        disabled
      />
      <NumberTextField
        {...args}
        label="Disabled (with value)"
        defaultValue={42}
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
          'When `disabled` is true, the NumberTextField is not interactive. It can be disabled with or without a pre-filled value.',
      },
      source: {
        code: `
import { NumberTextField } from '@mis-design/react';

const Disabled = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <NumberTextField label="Disabled (empty)" placeholder="Input Placeholder..." helperText="Input helper text" disabled />
        <NumberTextField label="Disabled (with value)" defaultValue={42} helperText="Input helper text" disabled />
    </div>
);

export default Disabled;
        `.trim(),
      },
    },
  },
};

export const MinMax: Story = {
  render: (args) => (
    <div className="flex gap-10 flex-wrap">
      <NumberTextField
        {...args}
        label="Min: 0, Max: 100"
        helperText="Enter a number between 0 and 100"
        min={0}
        max={100}
      />
      <NumberTextField
        {...args}
        label="Min: -50, Max: 50"
        helperText="Enter a number between -50 and 50"
        min={-50}
        max={50}
      />
    </div>
  ),
  args: {
    placeholder: 'Input Placeholder...',
  },
  argTypes: {
    min: { control: false },
    max: { control: false },
    label: { control: false },
    helperText: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `min` and `max` to restrict the range of accepted numeric values.',
      },
      source: {
        code: `
import { NumberTextField } from '@mis-design/react';

const MinMax = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <NumberTextField
            label="Min: 0, Max: 100"
            placeholder="Input Placeholder..."
            helperText="Enter a number between 0 and 100"
            min={0}
            max={100}
        />
        <NumberTextField
            label="Min: -50, Max: 50"
            placeholder="Input Placeholder..."
            helperText="Enter a number between -50 and 50"
            min={-50}
            max={50}
        />
    </div>
);

export default MinMax;
        `.trim(),
      },
    },
  },
};

type WithIconControls = NumberTextFieldProps & {
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

    return <NumberTextField {...rest} startIcon={start} endIcon={end} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'NumberTextField supports optional icons at the start and/or end of the input.',
      },
      source: {
        code: `
import { NumberTextField, Icon } from '@mis-design/react';

const WithIcon = () => (
    <NumberTextField
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
