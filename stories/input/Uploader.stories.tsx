import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Uploader,
  type UploaderMultipleProps,
  type UploaderMultipleValue,
  type UploaderProps,
  type UploaderRef,
  type UploaderSingleProps,
  type UploaderSingleValue,
} from '../../src';
import '../../src/output.css';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];

const meta: Meta<UploaderProps> = {
  title: 'Input/Uploader',
  component: Uploader,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label displayed for the uploader field.',
      table: { type: { summary: 'string' } },
    },
    helperText: {
      control: 'text',
      description: 'Helper message displayed below the uploader.',
      table: { type: { summary: 'React.ReactNode' } },
    },
    value: {
      control: false,
      description: 'Controlled selected value.',
      table: { type: { summary: 'File | string | (File | string)[] | null' } },
    },
    defaultValue: {
      control: false,
      description: 'Default selected value for uncontrolled usage.',
      table: { type: { summary: 'File | string | (File | string)[] | null' } },
    },
    initialValue: {
      control: false,
      description: 'Initial value used by `reset()` in `inputRef`.',
      table: { type: { summary: 'File | string | (File | string)[] | null' } },
    },
    onChange: {
      action: 'changed',
      description: 'Returns selected file(s) based on `multiple` mode.',
      table: {
        type: {
          summary: '(value: File | string | (File | string)[] | null) => void',
        },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow selecting more than one file.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    accept: {
      control: 'text',
      description:
        'Accepted file types, for example `.xlsx,.csv` or `image/*`.',
      table: { type: { summary: 'string' } },
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear action for selected files.',
      table: { type: { summary: 'boolean' } },
    },
    inputRef: {
      control: false,
      description:
        'Ref to access `element`, `value`, `focus`, `reset`, and `disabled`.',
      table: {
        type: {
          summary:
            'React.RefObject<UploaderRef> | React.RefCallback<UploaderRef>',
        },
      },
    },
    labelPosition: {
      control: 'select',
      options: labelPositionOption,
      description: 'The position of the label relative to the uploader.',
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: 'top | left' },
      },
    },
    size: {
      control: 'select',
      options: sizeOption,
      description: 'The size of the uploader field.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | large' },
      },
    },
  },
  args: {
    label: 'Upload File',
    helperText: 'Input helper text',
    size: 'default',
    clearable: true,
    multiple: false,
    accept: '',
    disabled: false,
    loading: false,
    success: false,
    error: '',
    labelPosition: 'top',
  },
};

export default meta;
type Story = StoryObj<UploaderProps>;

export const Playground: Story = {};

export const SingleFile: Story = {
  args: {
    multiple: false,
    accept: '.xlsx,.csv',
  },
  render: (args: UploaderProps) => {
    const [value, setValue] = useState<UploaderSingleValue>(null);

    return (
      <div className="flex flex-col gap-3">
        <Uploader
          {...(args as UploaderSingleProps)}
          value={value}
          onChange={setValue}
        />
        <div className="text-14px text-neutral-80 dark:text-neutral-80-dark">
          Selected file:{' '}
          {value ? (typeof value === 'string' ? value : value.name) : '-'}
        </div>
      </div>
    );
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
};

export const MultipleFiles: Story = {
  args: {
    label: 'Upload Multiple Files',
    multiple: true,
  },
  render: (args: UploaderProps) => {
    const [value, setValue] = useState<UploaderMultipleValue>([]);

    return (
      <div className="flex flex-col gap-3">
        <Uploader
          {...(args as UploaderMultipleProps)}
          value={value}
          onChange={setValue}
        />
        <div className="text-14px text-neutral-80 dark:text-neutral-80-dark">
          Total files: {value.length}
        </div>
      </div>
    );
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
};

export const UrlDefaultValue: Story = {
  args: {
    label: 'Existing Uploaded File',
    defaultValue:
      'https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=600',
  },
  render: (args: UploaderProps) => {
    return (
      <div className="flex flex-col gap-3 max-w-[520px]">
        <Uploader {...args} />
        <div className="text-14px text-neutral-80 dark:text-neutral-80-dark">
          Value can be a URL string for existing files.
        </div>
      </div>
    );
  },
  argTypes: {
    value: { control: false },
  },
};

export const WithRefMethods: Story = {
  args: {
    helperText: 'Use buttons below to trigger focus and reset via ref.',
  },
  render: (args: UploaderProps) => {
    const uploaderRef = useRef<UploaderRef>(null);

    return (
      <div className="flex flex-col gap-3 max-w-[520px]">
        <Uploader {...args} inputRef={uploaderRef} />

        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-2 rounded border border-neutral-40"
            onClick={() => uploaderRef.current?.focus()}
          >
            Focus Input
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded border border-neutral-40"
            onClick={() => uploaderRef.current?.reset()}
          >
            Reset
          </button>
        </div>
      </div>
    );
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
  },
};
