import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { RadioGroupProps } from '../../src';
import RadioGroup from '../../src/components/Inputs/RadioGroup';
import '../../src/output.css';

const options = [
  { label: 'RadioGroup1', value: 'RadioGroup1' },
  { label: 'RadioGroup2', value: 'RadioGroup2' },
  { label: 'RadioGroup3', value: 'RadioGroup3' },
];

const meta: Meta<RadioGroupProps<any>> = {
  title: 'Input/RadioGroup',
  component: RadioGroup,
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
        'Name of the RadioGroup input, typically used when submitting form data.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: { type: 'select' },
      options: ['RadioGroup1', 'RadioGroup2', 'RadioGroup3'],
      description: 'The controlled value of the input.',
      table: {
        defaultValue: { summary: 'RadioGroup1' },
        type: { summary: 'SelectValue<T, D>' },
      },
    },
    defaultValue: {
      control: { type: 'select' },
      options: ['RadioGroup1', 'RadioGroup2', 'RadioGroup3'],
      description: 'The default value when the component is first rendered.',
      table: {
        defaultValue: { summary: 'RadioGroup1' },
        type: { summary: 'T' },
      },
    },
    initialValue: {
      control: { type: 'select' },
      options: ['RadioGroup1', 'RadioGroup2', 'RadioGroup3'],
      description:
        'Initial internal value for AutoComplete when value is not provided.',
      table: {
        defaultValue: { summary: 'RadioGroup1' },
        type: { summary: 'T' },
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
      control: { type: 'select' },
      description: 'The position of the label relative to the field',
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: 'top | left' },
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
    options: {
      control: false,
      description:
        'An array of option objects, each containing a value and a label. Component re-renders every time options change, so make sure manage options in the state or outside the component to prevent unnecessary re-renders.',
      table: {
        type: { summary: 'SelectValue<T, D>[] ' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback function to handle input changes.',
      table: {
        type: { summary: '(value: SelectValue<T, D>) => void' },
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
    inputRef: {
      control: false,
      description:
        'Ref to access input element, value, focus, reset, and disabled state.',
      table: {
        type: {
          summary:
            'React.RefObject<RadioGroupRef<T, D>> | React.RefCallback<RadioGroupRef<T, D>>',
        },
      },
    },
    size: {
      control: { type: 'select' },
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
    direction: {
      control: { type: 'select' },
      description: 'The layout direction of the radio options.',
      table: {
        defaultValue: { summary: 'column' },
        type: { summary: 'row | column' },
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
<h3 style="margin: 0 0 12px; font-size: 18px;">SelectValue&lt;T, D&gt; — Type Definition</h3>
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
      <td style="padding:12px;border:none;">value</td>
      <td style="padding:12px;border:none;">
        The value of the option. <br/>
        Generic type <strong>T</strong> (e.g., <i>string</i>, <i>number</i>, or custom type). <br/>
        Required.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">T</span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">label</td>
      <td style="padding:12px;border:none;">
        The text displayed in the UI for the option. <br/>
        Required.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">string</span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">detail</td>
      <td style="padding:12px;border:none;">
        Optional additional data associated with the option. <br/>
        Generic type <strong>D</strong>. Defaults to <code>undefined</code> if not provided.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">D</span>
      </td>
    </tr>
  </tbody>
</table>

<h3 style="margin: 0 0 12px; font-size: 18px;">RadioGroupRef - API Reference</h3>
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
        Reference to the main container div of the RadioGroup. <br/>
        Can be null before the component mounts.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">HTMLDivElement | null</span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">value</td>
      <td style="padding:12px;border:none;">
        The currently selected option. <br/>
        Returns <code>null</code> if no option is selected.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">SelectValue&lt;T, D&gt; | null</span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">focus</td>
      <td style="padding:12px;border:none;">
        Programmatically focuses the first radio input. <br/>
        Equivalent to clicking on the radio input.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">() =&gt; void</span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">reset</td>
      <td style="padding:12px;border:none;">
        Resets the selected value to the initial value provided via <code>initialValue</code>.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">() =&gt; void</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;border:none;border-left:1px solid #e5e7eb;">disabled</td>
      <td style="padding:12px;border:none;">
        Indicates whether the RadioGroup is disabled. <br/>
        If <code>true</code>, user cannot interact with the options.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">boolean</span>
      </td>
    </tr>
  </tbody>
</table>
      `,
      },
    },
  },

  args: {
    label: 'Radio Group',
    options,
    onChange: fn(),
    disabled: false,
    loading: false,
    success: false,
    error: '',
    fullWidth: false,
    direction: 'column',
    size: 'default',
  },
};

export default meta;

type Story = StoryObj<RadioGroupProps<any>>;

export const Playground: Story = {
  args: {
    defaultValue: 'RadioGroup1',
    helperText: 'Helper text goes here',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <RadioGroup
        {...args}
        size="default"
        label="Default"
        defaultValue="RadioGroup1"
      />
      <RadioGroup
        {...args}
        size="large"
        label="Large"
        defaultValue="RadioGroup1"
      />
    </div>
  ),
  args: { options },
  argTypes: { size: { control: false } },
};

export const Directions: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <RadioGroup
        {...args}
        direction="column"
        label="Column"
        defaultValue="RadioGroup1"
      />
      <RadioGroup
        {...args}
        direction="row"
        label="Row"
        defaultValue="RadioGroup2"
      />
    </div>
  ),
  argTypes: { direction: { control: false } },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <RadioGroup
        {...args}
        disabled
        label="Disabled"
        defaultValue="RadioGroup1"
      />
      <RadioGroup
        {...args}
        loading
        label="Loading"
        defaultValue="RadioGroup2"
      />
    </div>
  ),
  argTypes: {
    disabled: { control: false },
    loading: { control: false },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup
        label="Success state"
        success
        helperText="Everything looks good!"
        defaultValue="RadioGroup1"
        options={options}
      />

      <RadioGroup
        label="Error state"
        error
        helperText="Something went wrong"
        defaultValue="RadioGroup2"
        options={options}
      />
    </div>
  ),
  argTypes: {
    success: { control: false },
    error: { control: false },
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Select one option',
    required: true,
    helperText: 'This field is required',
    defaultValue: 'RadioGroup1',
  },
};
