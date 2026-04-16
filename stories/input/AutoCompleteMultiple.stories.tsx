/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import cx from 'classnames';
import { action } from 'storybook/actions';
import { iconNames } from '../../const/icon';
import {
  AutoCompleteMultiple,
  AutoCompleteMultipleProps,
  AutoCompleteMultipleRef,
  Icon,
  IconNames,
} from '../../src';
import { SelectValue } from '../../src';
import '../../src/output.css';
import { options } from '../const/select';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];

const meta: Meta<AutoCompleteMultipleProps<any>> = {
  title: 'Input/AutoCompleteMultiple',
  component: AutoCompleteMultiple,
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
        'Name of the AutoCompleteMultiple input, typically used when submitting form data.',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'object',
      description:
        'The controlled value of the input (array of selected items).',
      table: {
        type: { summary: 'SelectValue<T, D>[]' },
      },
    },
    defaultValue: {
      control: 'object',
      description:
        'The default selected values when the component is first rendered.',
      table: {
        type: { summary: 'T[]' },
      },
    },
    initialValue: {
      control: 'object',
      description:
        'Initial internal value for **AutoCompleteMultiple** when value is not provided.',
      table: {
        type: { summary: 'SelectValue<T, D>[]' },
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
        'An array of option objects, each containing a value and a label. Component re-renders every time options change, so make sure manage options in the state or outside the component to prevent unnecessary re-renders.',
      table: {
        type: { summary: 'SelectValue<T, D>[]' },
      },
    },
    onChange: {
      action: false,
      description: 'Callback function to handle selection changes.',
      table: {
        type: {
          summary: '(value: SelectValue<T, D>[]) => void',
        },
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
            'React.RefObject<AutoCompleteMultipleRef<T, D>> | React.RefCallback<AutoCompleteMultipleRef<T, D>>',
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
        'A flag that show clear button of input field if set to true. It allows the user to clear all selections with one click.',
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
    appendIfNotFound: {
      control: 'boolean',
      description:
        'If true, the input will be appended with the first option if the user types a new value that is not in the options list.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onAppend: {
      control: false,
      description: 'Callback function to handle appending options.',
      table: {
        type: { summary: '(input: SelectValue<T, D>) => void' },
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
      description: 'Render function for each option in the dropdown list.',
      table: {
        type: {
          summary:
            '(options: Array<SelectValue<T, D>>, onClick: (value: SelectValue<T, D>) => void, selected: SelectValue<T, D>[], highlightedIndex: number) => React.ReactNode',
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
      description: 'Function to fetch options asynchronously.',
      table: {
        type: {
          summary:
            '(keyword: string, page: number, limit: number) => Promise<SelectValue<T, D>[]>',
        },
      },
    },
    onKeyDown: {
      action: false,
      description:
        'Callback fired when a key is pressed while the AutoCompleteMultiple input is focused. Useful for handling keyboard navigation and selection.',
      table: {
        type: { summary: 'React.KeyboardEventHandler<HTMLInputElement>' },
      },
    },
    onPaste: {
      action: false,
      description:
        'Callback fired when the user pastes content into the AutoCompleteMultiple input.',
      table: {
        type: {
          summary: '(event: React.ClipboardEvent<HTMLInputElement>) => void',
        },
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

<h3 style="margin: 0 0 12px; font-size: 18px;">AutoCompleteMultipleRef - API Reference</h3>
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
        A reference to the main input element of the AutoCompleteMultiple component.
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
        The current list of selected values of the AutoCompleteMultiple.
        Returns an empty array when nothing is selected.
      </td>
      <td style="padding:12px;border:none;border-right:1px solid #e5e7eb;">
        <span style="background:#f2f4f5;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;border:1px solid #d0d7de;">
          SelectValue&lt;T, D&gt;[]
        </span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #f2f2f2;border-left:1px solid #e5e7eb;">
      <td style="padding:12px;border:none;">focus</td>
      <td style="padding:12px;border:none;">
        Focuses the AutoCompleteMultiple input programmatically.
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
        Resets the AutoCompleteMultiple value back to the <code>initialValue</code>.
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
        Indicates whether the AutoCompleteMultiple input is currently disabled.
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

type Story = StoryObj<AutoCompleteMultipleProps<any>>;

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
    options,
    onChange: action('value-changed'),
    onKeyDown: action('key-down'),
    onPaste: action('paste'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The AutoCompleteMultiple is a normal text input enhanced by a panel of suggested options. Multiple items can be selected and displayed as chips.',
      },
    },
  },
};

export const AppendableOption: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    defaultValue: ['apple'],
    options,
    appendIfNotFound: true,
  },
  render: (args) => {
    const InputRef = useRef<AutoCompleteMultipleRef<string>>(null);
    const [localOptions, setLocalOptions] =
      useState<SelectValue<string>[]>(options);

    const handleAppend = (input: SelectValue<string>) => {
      setLocalOptions((prev) => [...prev, input]);
    };

    return (
      <AutoCompleteMultiple
        {...args}
        options={localOptions}
        inputRef={InputRef}
        onAppend={handleAppend}
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
          'When `appendIfNotFound` is true, typing a value not in the list will offer the option to append it. Use `onAppend` to persist the new entry.',
      },
      source: {
        code: `
import { useRef, useState } from 'react';
import { AutoCompleteMultiple, AutoCompleteMultipleRef, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Banana', value: 'banana' },
];

const AppendableOption = () => {
  const inputRef = useRef<AutoCompleteMultipleRef<string>>(null);
  const [localOptions, setLocalOptions] = useState<SelectValue<string>[]>(options);

  const handleAppend = (input: SelectValue<string>) => {
    setLocalOptions((prev) => [...prev, input]);
  };

  return (
    <AutoCompleteMultiple
      label="Appendable AutoCompleteMultiple"
      placeholder="Type to search or add..."
      defaultValue={['apple']}
      options={localOptions}
      inputRef={inputRef}
      appendIfNotFound
      onAppend={handleAppend}
    />
  );
};

export default AppendableOption;
        `.trim(),
      },
    },
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
    defaultValue: ['apple', 'pineapple'],
    options,
  },
  render: (args) => {
    const InputRef = useRef<AutoCompleteMultipleRef<string>>(null);

    const _getValueByRef = () => {
      return InputRef.current?.value; // SelectValue<T, D>[]
    };

    return (
      <AutoCompleteMultiple {...args} options={options} inputRef={InputRef} />
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
          'This story demonstrates an uncontrolled AutoCompleteMultiple. Use `defaultValue` as an array of value keys. Access the current selections at any time via `inputRef`.',
      },
      source: {
        code: `
import { useRef } from 'react';
import { AutoCompleteMultiple, AutoCompleteMultipleRef, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Banana', value: 'banana' },
];

const DefaultValue = () => {
  const inputRef = useRef<AutoCompleteMultipleRef<string>>(null);

  const getValueByRef = () => {
    return inputRef.current?.value; // SelectValue<string>[]
  };

  return (
    <AutoCompleteMultiple
      label="This is label"
      placeholder="Input Placeholder..."
      defaultValue={['apple', 'banana']}
      options={options}
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

export const AsyncFetch: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
  },
  render: (args) => {
    const fetchData = async (keyword: string, page: number, limit: number) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}${
          keyword ? `&title_like=${keyword}` : ''
        }`,
      );
      const data = await response.json();
      return data.map((item: any) => ({
        label: item.title,
        value: item.id,
        detail: item,
      }));
    };

    return <AutoCompleteMultiple {...args} async fetchOptions={fetchData} />;
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates AutoCompleteMultiple with async fetch. Enable `async` and provide `fetchOptions` to load options dynamically with pagination and keyword filtering.',
      },
      source: {
        code: `
import { AutoCompleteMultiple, SelectValue } from '@mis-design/react';

const AsyncFetch = () => {
  const fetchData = async (keyword: string, page: number, limit: number): Promise<SelectValue<number, any>[]> => {
    const response = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_limit=\${limit}&_page=\${page}\${keyword ? \`&title_like=\${keyword}\` : ''}\`
    );
    const data = await response.json();
    return data.map((item) => ({
      label: item.title,
      value: item.id,
      detail: item,
    }));
  };

  return (
    <AutoCompleteMultiple
      label="Async AutoCompleteMultiple"
      placeholder="Search and select multiple..."
      async
      fetchOptions={fetchData}
    />
  );
};

export default AsyncFetch;
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
    const fetchData = async (keyword: string, page: number, limit: number) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}${
          keyword ? `&title_like=${keyword}` : ''
        }`,
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
      value: Array<SelectValue<number, any>>,
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
            {option.map((item) => {
              const selected = value?.some((v) => v.value === item.value);

              return item.detail ? (
                <tr
                  key={item.value}
                  onClick={() => onClick(item)}
                  className={cx('', {
                    'bg-primary-surface dark:bg-primary-surface-dark text-primary-main dark:text-primary-main-dark':
                      selected,
                    'cursor-pointer hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                      !selected,
                  })}
                >
                  <td className="px-4 py-2">{item.detail?.id ?? '-'}</td>
                  <td className="px-4 py-2">{item.detail?.title ?? '-'}</td>
                  <td className="px-4 py-2">{item.detail?.userId ?? '-'}</td>
                  <td className="px-4 py-2">{item.detail?.body ?? '-'}</td>
                </tr>
              ) : (
                '-'
              );
            })}
          </tbody>
        </table>
      );
    };

    return (
      <AutoCompleteMultiple
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
          'This story demonstrates AutoCompleteMultiple with both async fetch and a custom `renderOption`. Use `renderOption` to display extra detail columns in the dropdown.',
      },
      source: {
        code: `
import { AutoCompleteMultiple, SelectValue } from '@mis-design/react';

const AsyncAndCustomRender = () => {
  const fetchData = async (keyword: string, page: number, limit: number): Promise<SelectValue<number, any>[]> => {
    const response = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_limit=\${limit}&_page=\${page}\${keyword ? \`&title_like=\${keyword}\` : ''}\`
    );
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
    selected: Array<SelectValue<number, any>>
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
            <tr
              key={item.value}
              onClick={() => onClick(item)}
              style={{ background: selected.some((v) => v.value === item.value) ? '#e8f0fe' : undefined, cursor: 'pointer' }}
            >
              <td style={{ padding: '4px 12px' }}>{item.detail?.id ?? '-'}</td>
              <td style={{ padding: '4px 12px' }}>{item.detail?.title ?? '-'}</td>
              <td style={{ padding: '4px 12px' }}>{item.detail?.userId ?? '-'}</td>
              <td style={{ padding: '4px 12px' }}>{item.detail?.body ?? '-'}</td>
            </tr>
          ) : '-'
        )}
      </tbody>
    </table>
  );

  return (
    <AutoCompleteMultiple
      label="Async + Custom Render"
      placeholder="Search and select multiple..."
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

export const ControlledValue: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Input Placeholder...',
    helperText: 'Input helper text',
  },
  render: (args) => {
    const [value, setValue] = useState<SelectValue<string>[]>([
      { label: 'orange', value: 'orange' },
    ]);

    return (
      <AutoCompleteMultiple
        {...args}
        value={value}
        onChange={setValue}
        options={options}
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
          'This story demonstrates a controlled AutoCompleteMultiple with internal state using useState.',
      },
      source: {
        code: `
import { useState } from 'react';
import { AutoCompleteMultiple, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Banana', value: 'banana' },
];

const ControlledValue = () => {
  const [value, setValue] = useState<SelectValue<string>[]>([{ label: 'Orange', value: 'orange' }]);

  return (
    <AutoCompleteMultiple
      label="This is label"
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

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-10 flex-wrap">
      {sizeOption.map((size) => (
        <AutoCompleteMultiple
          key={size}
          {...args}
          size={size as AutoCompleteMultipleProps<any>['size']}
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
        story:
          'AutoCompleteMultiple supports two sizes: `default` and `large`.',
      },
      source: {
        code: `
import { AutoCompleteMultiple, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Banana', value: 'banana' },
];

const Sizes = () => (
  <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
    <AutoCompleteMultiple label="Size default" placeholder="Input Placeholder..." size="default" options={options} />
    <AutoCompleteMultiple label="Size large" placeholder="Input Placeholder..." size="large" options={options} />
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
        <AutoCompleteMultiple
          key={position}
          {...args}
          labelPosition={
            position as AutoCompleteMultipleProps<any>['labelPosition']
          }
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
          'The label can be placed either on `top` (default) or to the `left` of the input.',
      },
      source: {
        code: `
import { AutoCompleteMultiple, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
];

const LabelPosition = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
    <AutoCompleteMultiple label="Position top" placeholder="Input Placeholder..." labelPosition="top" options={options} width={500} helperText="Input helper text" />
    <AutoCompleteMultiple label="Position left" placeholder="Input Placeholder..." labelPosition="left" options={options} width={500} helperText="Input helper text" />
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
      <AutoCompleteMultiple
        {...args}
        label="Neutral AutoCompleteMultiple"
        className="flex-1"
        options={options}
      />
      <AutoCompleteMultiple
        {...args}
        label="Success AutoCompleteMultiple"
        className="flex-1"
        success
        options={options}
      />
      <AutoCompleteMultiple
        {...args}
        label="Error AutoCompleteMultiple"
        className="flex-1"
        error
        options={options}
      />
      <AutoCompleteMultiple
        {...args}
        label="Error AutoCompleteMultiple with message"
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
          'Use `success` and `error` props to indicate validation state. `error` can be a boolean or a string message.',
      },
      source: {
        code: `
import { AutoCompleteMultiple, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
];

const SuccessAndError = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
    <AutoCompleteMultiple label="Neutral AutoCompleteMultiple" placeholder="Input Placeholder..." helperText="Input helper text" options={options} />
    <AutoCompleteMultiple label="Success AutoCompleteMultiple" placeholder="Input Placeholder..." helperText="Input helper text" options={options} success />
    <AutoCompleteMultiple label="Error AutoCompleteMultiple" placeholder="Input Placeholder..." helperText="Input helper text" options={options} error />
    <AutoCompleteMultiple label="Error AutoCompleteMultiple with message" placeholder="Input Placeholder..." helperText="Input helper text" options={options} error="Error with message" />
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
      <AutoCompleteMultiple
        {...args}
        label="Disabled AutoCompleteMultiple"
        placeholder="Input Placeholder..."
        options={options}
        disabled
      />
      <AutoCompleteMultiple
        {...args}
        label="Disabled with pre-selected values"
        placeholder="Input Placeholder..."
        options={options}
        value={[
          { label: 'Apple', value: 'apple' },
          { label: 'Orange', value: 'orange' },
        ]}
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
import { AutoCompleteMultiple, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
];

const Disabled = () => (
  <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
    <AutoCompleteMultiple
      label="Disabled AutoCompleteMultiple"
      placeholder="Input Placeholder..."
      options={options}
      helperText="This field is disabled"
      disabled
    />
    <AutoCompleteMultiple
      label="Disabled with pre-selected values"
      placeholder="Input Placeholder..."
      options={options}
      value={[{ label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }]}
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

type WithIconControls = AutoCompleteMultipleProps<any> & {
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
      <AutoCompleteMultiple
        {...rest}
        startIcon={start}
        endIcon={end}
        options={options}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `startIcon` and `endIcon` to display icons inside the AutoCompleteMultiple field.',
      },
      source: {
        code: `
import { AutoCompleteMultiple, Icon, SelectValue } from '@mis-design/react';

const options: SelectValue<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Banana', value: 'banana' },
];

const WithIcon = () => (
  <AutoCompleteMultiple
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
