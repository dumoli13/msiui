/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import cx from 'classnames';
import { iconNames } from '../../const/icon';
import {
  Icon,
  IconNames,
  Select,
  SelectProps,
  SelectRef,
  SelectValue,
} from '../../src';
import '../../src/output.css';
import { options } from '../const/select';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];

const meta: Meta<SelectProps<any>> = {
  title: 'Input/Select',
  component: Select,
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
        'Name of the Select input, typically used when submitting form data.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'object',
      description: 'The controlled value of the input.',
      table: {
        type: { summary: 'SelectValue<T, D> | null' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'The default value when the component is first rendered.',
      table: {
        type: { summary: 'T' },
      },
    },
    initialValue: {
      control: 'text',
      description:
        'Initial internal value for Select when value is not provided.',
      table: {
        type: { summary: 'SelectValue<T, D> | null' },
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
    options: {
      control: 'object',
      description:
        'An array of option objects, each containing a value and a label. Component re-renders every time options change, so make sure to manage options in the state or outside the component to prevent unnecessary re-renders.',
      table: {
        type: { summary: 'SelectValue<T, D>[]' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback function to handle selection changes.',
      table: {
        type: {
          summary: '(value: SelectValue<T, D> | null) => void',
        },
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
            'React.RefObject<SelectRef<T, D>> | React.RefCallback<SelectRef<T, D>>',
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
    renderOption: {
      control: false,
      description:
        'Custom render function for each option in the dropdown list.',
      table: {
        type: {
          summary:
            '(options: SelectValue<T, D>[], onClick: (value: SelectValue<T, D>) => void, selected: SelectValue<T, D> | null, highlightedIndex: number) => React.ReactNode',
        },
      },
    },
    async: {
      control: 'boolean',
      description: 'Flag to enable asynchronous loading of options.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fetchOptions: {
      control: false,
      description:
        'Function to fetch options asynchronously. Required when `async` is true.',
      table: {
        type: {
          summary:
            '(page: number, limit: number) => Promise<SelectValue<T, D>[]>',
        },
      },
    },
    onKeyDown: {
      action: false,
      description:
        'Callback fired when a key is pressed while the Select input is focused. Useful for handling keyboard navigation and selection.',
      table: {
        type: { summary: 'React.KeyboardEventHandler<HTMLInputElement>' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<h3 style="margin: 0 0 12px; font-size: 18px;">SelectValue&lt;T, D&gt; — Type Definition</h3>
<table style="width:100%;border-collapse:collapse;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08);border-radius:8px;overflow:hidden;margin-bottom:24px;">
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
    The selected item value. <br/>
    This is generic type <strong>T</strong>, which can be <i>string</i>, <i>number</i>, or any custom type. <br/>
    Required.
  </td>
  <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
    <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">T</span>
  </td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
  <td style="padding:12px;border:none;">label</td>
  <td style="padding:12px;border:none;">
    The text shown in the UI for the selected item. <br/>
    Required.
  </td>
  <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
    <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">string</span>
  </td>
</tr>
<tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
  <td style="padding:12px;border:none;">detail</td>
  <td style="padding:12px;border:none;">
    Optional extra data linked to the item. <br/>
    This uses generic type <strong>D</strong>. If not provided, it defaults to <code>undefined</code>.
  </td>
  <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
    <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">D</span>
  </td>
</tr>
  </tbody>
</table>

<h3 style="margin: 0 0 12px; font-size: 18px;">SelectRef - API Reference</h3>
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
       A reference to the main input element of the Select component.
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
        The current selected value of the Select.
        Returns <code>null</code> when no item is selected.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          SelectValue&lt;T, D&gt; | null
        </span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">focus</td>
      <td style="padding:12px;border:none;">
        Focuses the Select input programmatically.
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
        Resets the Select value back to the <code>initialValue</code>.
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
        Indicates whether the Select input is currently disabled.
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

type Story = StoryObj<SelectProps<any>>;

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
    labelPosition: 'top',
    value: { label: 'orange', value: 'orange' },
    options,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select components are used for collecting user provided information from a list of options.',
      },
    },
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    defaultValue: 'apple',
    options,
  },
  render: (args) => {
    const InputRef = useRef<SelectRef<string> | null>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // SelectValue<T, D> | null
    };

    return <Select {...args} options={options} inputRef={InputRef} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an uncontrolled Select. To access the input field and its value, use inputRef.',
      },
      source: {
        code: `
import { useRef } from 'react';
import { Select, SelectRef, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Banana', value: 'banana' },
];

const UncontrolledValue = () => {
    const InputRef = useRef<SelectRef<string> | null>(null);

    const _getValueByRef = () => {
        return InputRef.current?.value; // SelectValue<T, D> | null
    };

    return (
        <Select
            label="Input Label"
            placeholder="Input Placeholder..."
            defaultValue="apple"
            options={options}
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
    const [value, setValue] = useState<SelectValue<string> | null>({
      label: 'orange',
      value: 'orange',
    });

    return (
      <Select {...args} value={value} onChange={setValue} options={options} />
    );
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled Select with internal state using useState.',
      },
      source: {
        code: `
import { useState } from 'react';
import { Select, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Banana', value: 'banana' },
];

const ControlledValue = () => {
    const [value, setValue] = useState<SelectValue<string> | null>({ label: 'Orange', value: 'orange' });

    return (
        <Select
            label="Input Label"
            placeholder="Input Placeholder..."
            value={value}
            onChange={setValue}
            options={options}
        />
    );
};

export default ControlledValue;
        `.trim(),
      },
    },
  },
};

export const AsyncAndCustomRender: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
  },
  render: (args) => {
    const fetchData = async (page: number, limit: number) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
      );
      const data = await response.json();
      return data.map((item: any) => ({
        label: item.title,
        value: item.id,
        detail: item,
      }));
    };

    const handleRenderOption = (
      option: Array<SelectValue<number, any>>,
      onClick: (value: SelectValue<number, any>) => void,
      value: SelectValue<number, any> | null,
    ) => {
      return (
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">UserId</th>
              <th className="px-4 py-2">Body</th>
            </tr>
          </thead>
          <tbody>
            {option.map((item) =>
              item.detail ? (
                <tr
                  key={item.value}
                  onClick={() => onClick(item)}
                  className={cx('', {
                    'bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark':
                      item.value === value?.value,
                    'cursor-pointer hover:bg-neutral-20 dark:hover:bg-neutral-20-dark ':
                      item.value !== value?.value,
                  })}
                >
                  <td className="px-4 py-2">{item.detail?.id ?? '-'}</td>
                  <td className="px-4 py-2">{item.detail?.title ?? '-'}</td>
                  <td className="px-4 py-2">{item.detail?.userId ?? '-'}</td>
                  <td className="px-4 py-2">{item.detail?.body ?? '-'}</td>
                </tr>
              ) : (
                '-'
              ),
            )}
          </tbody>
        </table>
      );
    };

    return (
      <Select
        {...args}
        async
        fetchOptions={fetchData}
        renderOption={handleRenderOption}
      />
    );
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates an async Select with custom option rendering. Use `fetchOptions` together with `async` to load options from a remote API.',
      },
      source: {
        code: `
import { Select, SelectValue } from '@mis-design/react';

const AsyncAndCustomRender = () => {
    const fetchData = async (page: number, limit: number) => {
        const response = await fetch(\`https://jsonplaceholder.typicode.com/posts?_limit=\${limit}&_page=\${page}\`);
        const data = await response.json();
        return data.map((item) => ({
            label: item.title,
            value: item.id,
            detail: item,
        }));
    };

    const handleRenderOption = (
        option: Array<SelectValue<number, any>>,
        onClick: (value: SelectValue<number, any>) => void,
        value: SelectValue<number, any> | null
    ) => (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>UserId</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
                {option.map((item) =>
                    item.detail ? (
                        <tr key={item.value} onClick={() => onClick(item)}>
                            <td>{item.detail?.id ?? '-'}</td>
                            <td>{item.detail?.title ?? '-'}</td>
                            <td>{item.detail?.userId ?? '-'}</td>
                            <td>{item.detail?.body ?? '-'}</td>
                        </tr>
                    ) : '-'
                )}
            </tbody>
        </table>
    );

    return (
        <Select
            label="Input Label"
            placeholder="Input Placeholder..."
            async
            fetchOptions={fetchData}
            renderOption={handleRenderOption}
        />
    );
};

export default AsyncAndCustomRender;
        `.trim(),
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-10 flex-wrap">
      {sizeOption.map((size) => (
        <Select
          key={size}
          {...args}
          size={size as SelectProps<any>['size']}
          label={`Size ${size}`}
          options={options}
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
        story: 'Select supports two sizes: default and large.',
      },
      source: {
        code: `
import { Select, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Banana', value: 'banana' },
];

const Sizes = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <Select size="default" label="Size default" placeholder="Input Placeholder..." options={options} />
        <Select size="large" label="Size large" placeholder="Input Placeholder..." options={options} />
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
        <Select
          key={position}
          {...args}
          labelPosition={position as SelectProps<any>['labelPosition']}
          label={`Position ${position}`}
          options={options}
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
import { Select, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Banana', value: 'banana' },
];

const LabelPosition = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <Select labelPosition="top" label="Position top" placeholder="Input Placeholder..." helperText="Input helper text" options={options} width={500} />
        <Select labelPosition="left" label="Position left" placeholder="Input Placeholder..." helperText="Input helper text" options={options} width={500} />
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
      <Select
        {...args}
        label="Neutral Select"
        className="flex-1"
        options={options}
      />
      <Select
        {...args}
        label="Success Select"
        className="flex-1"
        success
        options={options}
      />
      <Select
        {...args}
        label="Error Select"
        className="flex-1"
        error
        options={options}
      />
      <Select
        {...args}
        label="Error Select with message"
        className="flex-1"
        error="Error with message"
        options={options}
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
          'Select can display neutral, success, or error states. Pass a string to `error` to show an error message.',
      },
      source: {
        code: `
import { Select, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Banana', value: 'banana' },
];

const SuccessAndError = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <Select label="Neutral Select" placeholder="Input Placeholder..." helperText="Input helper text" options={options} />
        <Select label="Success Select" placeholder="Input Placeholder..." helperText="Input helper text" options={options} success />
        <Select label="Error Select" placeholder="Input Placeholder..." helperText="Input helper text" options={options} error />
        <Select label="Error Select with message" placeholder="Input Placeholder..." helperText="Input helper text" options={options} error="Error with message" />
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
      <Select
        {...args}
        label="Disabled (empty)"
        placeholder="Input Placeholder..."
        options={options}
        disabled
      />
      <Select
        {...args}
        label="Disabled (with value)"
        value={{ label: 'Orange', value: 'orange' }}
        options={options}
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
          'When `disabled` is true, the Select is not interactive. It can be disabled with or without a pre-selected value.',
      },
      source: {
        code: `
import { Select, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Banana', value: 'banana' },
];

const Disabled = () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <Select label="Disabled (empty)" placeholder="Input Placeholder..." helperText="Input helper text" options={options} disabled />
        <Select label="Disabled (with value)" value={{ label: 'Orange', value: 'orange' }} helperText="Input helper text" options={options} disabled />
    </div>
);

export default Disabled;
        `.trim(),
      },
    },
  },
};

type WithIconControls = SelectProps<any> & {
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

    return (
      <Select {...rest} startIcon={start} endIcon={end} options={options} />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select supports optional icons at the start and/or end of the input.',
      },
      source: {
        code: `
import { Select, SelectValue, Icon } from '@mis-design/react';

const options: SelectValue<string>[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Orange', value: 'orange' },
    { label: 'Banana', value: 'banana' },
];

const WithIcon = () => (
    <Select
        label="Input Label"
        placeholder="Input Placeholder..."
        helperText="Input helper text"
        options={options}
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
