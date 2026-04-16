/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconNames } from '../../const/icon';
import {
  Icon,
  IconNames,
  TextArea,
  TextAreaProps,
  TextAreaRef,
} from '../../src';
import '../../src/output.css';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];

const meta: Meta<TextAreaProps> = {
  title: 'Input/TextArea',
  component: TextArea,
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
        'Name of the TextArea input, typically used when submitting form data.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'The controlled value of the input.',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'The default value when the component is first rendered.',
      table: {
        type: { summary: 'string' },
      },
    },
    initialValue: {
      control: 'text',
      description:
        'Initial internal value for TextArea when value is not provided.',
      table: {
        type: { summary: 'string' },
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
        type: { summary: '(value: string) => void' },
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
            'React.RefObject<TextAreaRef> | React.RefCallback<TextAreaRef>',
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
    width: {
      control: 'number',
      description: 'Optional custom width for the input field (in px).',
      table: {
        type: { summary: 'number' },
      },
    },
    lines: {
      control: 'number',
      description: 'Number of visible text lines for the TextArea.',
      table: {
        defaultValue: { summary: '2' },
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
<h3 style="margin: 0 0 12px; font-size: 18px;">TextAreaRef - API Reference</h3>

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
        A reference to the main input element of the TextArea component.
It will contain an HTMLTextAreaElement after the component is mounted, and can be null before that.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          HTMLTextAreaElement | null
        </span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">value</td>
      <td style="padding:12px;border:none;">
        The current value of the TextArea. Can be an empty string if not set.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          string
        </span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">focus</td>
      <td style="padding:12px;border:none;">
        Focuses the TextArea input programmatically.
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
        Resets the TextArea value back to the <code>initialValue</code>.
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
        Indicates whether the TextArea input is currently disabled.
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
type Story = StoryObj<TextAreaProps>;

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
    defaultValue: 'lorem ipsum dolor sit amet',
  },
  render: (args) => {
    const InputRef = useRef<TextAreaRef>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // string
    };

    return <TextArea {...args} inputRef={InputRef} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an uncontrolled TextArea. To access the input field and its value, use the inputRef.',
      },
      source: {
        code: `
import { useRef } from 'react';
import { TextArea, TextAreaRef } from '@mis-design/react';

const UncontrolledValue = () => {
    const InputRef = useRef<TextAreaRef>(null);

    const _getValueByRef = () => {
        return InputRef.current?.value; // string
    };

    return (
        <TextArea
            label="Input Label"
            placeholder="Input Placeholder..."
            defaultValue="lorem ipsum dolor sit amet"
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
    const [value, setValue] = useState<string>('');

    return <TextArea {...args} value={value} onChange={setValue} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled TextArea with internal state using useState.',
      },
      source: {
        code: `
import { useState } from 'react';
import { TextArea } from '@mis-design/react';

const ControlledValue = () => {
    const [value, setValue] = useState<string>('');

    return (
        <TextArea
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
  render: (args) => (
    <div className="flex gap-10 flex-wrap">
      {sizeOption.map((size) => (
        <TextArea
          key={size}
          {...args}
          size={size as TextAreaProps['size']}
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
        story: 'TextArea supports two sizes: default and large.',
      },
      source: {
        code: `
import { TextArea } from '@mis-design/react';

const Sizes = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <TextArea size="default" label="Size default" placeholder="Input Placeholder..." />
        <TextArea size="large" label="Size large" placeholder="Input Placeholder..." />
    </div>
);

export default Sizes;
        `.trim(),
      },
    },
  },
};

export const Lines: Story = {
  render: (args) => (
    <div className="flex flex-col gap-10">
      <TextArea {...args} label="2 lines (default)" lines={2} />
      <TextArea {...args} label="4 lines" lines={4} />
      <TextArea {...args} label="8 lines" lines={8} />
    </div>
  ),
  args: {
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
  },
  argTypes: {
    lines: { control: false },
    label: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the `lines` prop to control the number of visible text rows in the TextArea.',
      },
      source: {
        code: `
import { TextArea } from '@mis-design/react';

const Lines = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <TextArea label="2 lines (default)" placeholder="Input Placeholder..." lines={2} />
        <TextArea label="4 lines" placeholder="Input Placeholder..." lines={4} />
        <TextArea label="8 lines" placeholder="Input Placeholder..." lines={8} />
    </div>
);

export default Lines;
        `.trim(),
      },
    },
  },
};

export const LabelPosition: Story = {
  render: (args) => (
    <div className="flex gap-10 flex-col">
      {labelPositionOption.map((position) => (
        <TextArea
          key={position}
          {...args}
          labelPosition={position as TextAreaProps['labelPosition']}
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
import { TextArea } from '@mis-design/react';

const LabelPosition = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <TextArea labelPosition="top" label="Position top" placeholder="Input Placeholder..." helperText="Input helper text" width={500} />
        <TextArea labelPosition="left" label="Position left" placeholder="Input Placeholder..." helperText="Input helper text" width={500} />
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
      <TextArea {...args} label="Neutral TextArea" className="flex-1" />
      <TextArea {...args} label="Success TextArea" className="flex-1" success />
      <TextArea {...args} label="Error TextArea" className="flex-1" error />
      <TextArea
        {...args}
        label="Error TextArea with message"
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
          'TextArea can display neutral, success, or error states. Pass a string to `error` to show an error message.',
      },
      source: {
        code: `
import { TextArea } from '@mis-design/react';

const SuccessAndError = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <TextArea label="Neutral TextArea" placeholder="Input Placeholder..." helperText="Input helper text" />
        <TextArea label="Success TextArea" placeholder="Input Placeholder..." helperText="Input helper text" success />
        <TextArea label="Error TextArea" placeholder="Input Placeholder..." helperText="Input helper text" error />
        <TextArea label="Error TextArea with message" placeholder="Input Placeholder..." helperText="Input helper text" error="Error with message" />
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
      <TextArea
        {...args}
        label="Disabled (empty)"
        placeholder="Input Placeholder..."
        disabled
      />
      <TextArea
        {...args}
        label="Disabled (with value)"
        defaultValue="Pre-filled content"
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
          'When `disabled` is true, the TextArea is not interactive. It can be disabled with or without a pre-filled value.',
      },
      source: {
        code: `
import { TextArea } from '@mis-design/react';

const Disabled = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <TextArea label="Disabled (empty)" placeholder="Input Placeholder..." helperText="Input helper text" disabled />
        <TextArea label="Disabled (with value)" defaultValue="Pre-filled content" helperText="Input helper text" disabled />
    </div>
);

export default Disabled;
        `.trim(),
      },
    },
  },
};

type WithIconControls = TextAreaProps & {
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

    return <TextArea {...rest} startIcon={start} endIcon={end} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'TextArea supports optional icons at the start and/or end of the input.',
      },
      source: {
        code: `
import { TextArea, Icon } from '@mis-design/react';

const WithIcon = () => (
    <TextArea
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
