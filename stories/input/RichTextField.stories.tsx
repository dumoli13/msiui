import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RichTextField from '../../src/components/Inputs/RichTextField';
import type {
  RichTextFieldProps,
  RichTextFieldRef,
} from '../../src/components/Inputs/RichTextField';
import '../../src/output.css';

const sizeOption = ['default', 'large'];
const labelPositionOption = ['top', 'left'];

const meta: Meta<RichTextFieldProps> = {
  title: 'Input/RichTextField',
  component: RichTextField,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled HTML string value.',
      table: { type: { summary: 'string' } },
    },
    defaultValue: {
      control: 'text',
      description: 'Uncontrolled initial HTML string value.',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      action: 'changed',
      description:
        'Callback fired with the updated HTML string on every content change.',
      table: { type: { summary: '(html: string) => void' } },
    },
    inputRef: {
      control: false,
      description:
        'Ref to access the editor imperatively (focus, blur, getHTML, getJSON, clearContent, editor).',
      table: { type: { summary: 'React.Ref<RichTextFieldRef>' } },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above or beside the input field.',
      table: { type: { summary: 'string' } },
    },
    labelPosition: {
      control: 'select',
      options: labelPositionOption,
      description: 'Position of the label relative to the field.',
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: "'top' | 'left'" },
      },
    },
    autoHideLabel: {
      control: 'boolean',
      description: 'Automatically hide the label when not focused.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the editor is empty.',
      table: { type: { summary: 'string' } },
    },
    helperText: {
      control: 'text',
      description: 'Helper message displayed below the field.',
      table: { type: { summary: 'React.ReactNode' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names.',
      table: { type: { summary: 'string' } },
    },
    error: {
      control: 'text',
      description:
        'Shows error state. Pass a string to display an error message below the field.',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'boolean',
      description: 'Shows success state when true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the editor and hides the toolbar.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      options: sizeOption,
      description: 'Controls the text size of the editor content.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'large'" },
      },
    },
    width: {
      control: 'number',
      description: 'Optional custom width in pixels.',
      table: { type: { summary: 'number' } },
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<RichTextFieldProps>;

/* ─── Playground ─────────────────────────────────────────────────────────── */

export const Playground: Story = {
  args: {
    label: 'Rich Text Label',
    placeholder: 'Start typing…',
    helperText: 'Supports bold, italic, tables, images, and more.',
    size: 'default',
    success: false,
    error: '',
    labelPosition: 'top',
  },
};

/* ─── Uncontrolled (ref access) ──────────────────────────────────────────── */

export const UncontrolledRef: Story = {
  render: (args) => {
    const editorRef = useRef<RichTextFieldRef>(null);
    return (
      <div className="flex flex-col gap-4">
        <RichTextField {...args} inputRef={editorRef} />
        <button
          type="button"
          className="self-start px-3 py-1.5 text-14px rounded bg-primary-main text-white"
          onClick={() => alert(editorRef.current?.getHTML())}
        >
          Get HTML via ref
        </button>
      </div>
    );
  },
  args: {
    label: 'Uncontrolled RichTextField',
    placeholder: 'Start typing…',
    helperText: 'Click the button to read HTML via ref.',
  },
  argTypes: { value: { control: false }, defaultValue: { control: false } },
  parameters: {
    docs: {
      description: {
        story:
          'Uncontrolled editor. Use `inputRef` to access the HTML value imperatively.',
      },
      source: {
        code: `
import { useRef } from 'react';
import { RichTextField } from 'mis-design';
import type { RichTextFieldRef } from 'mis-design';

const Example = () => {
  const editorRef = useRef<RichTextFieldRef>(null);

  const handleSave = () => {
    const html = editorRef.current?.getHTML();
    console.log(html);
  };

  return <RichTextField inputRef={editorRef} label="Notes" placeholder="Start typing…" />;
};
`.trim(),
      },
    },
  },
};

/* ─── Default Value ──────────────────────────────────────────────────────── */

export const DefaultValue: Story = {
  args: {
    label: 'Rich Text with Default Content',
    defaultValue:
      '<h2>Welcome</h2><p>This is the <strong>default</strong> content loaded into the editor.</p><ul><li>Item one</li><li>Item two</li></ul>',
  },
  argTypes: { value: { control: false }, defaultValue: { control: false } },
  parameters: {
    docs: {
      description: {
        story:
          'Uncontrolled editor with initial HTML content via `defaultValue`.',
      },
      source: {
        code: `
import { RichTextField } from 'mis-design';

const defaultHtml = '<h2>Welcome</h2><p>This is <strong>default</strong> content.</p>';

const Example = () => (
  <RichTextField label="Notes" defaultValue={defaultHtml} />
);
`.trim(),
      },
    },
  },
};

/* ─── Controlled Value ───────────────────────────────────────────────────── */

export const ControlledValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>(
      '<p>Hello <strong>World</strong>!</p>',
    );
    return (
      <div className="flex flex-col gap-4">
        <RichTextField {...args} value={value} onChange={setValue} />
        <pre className="p-3 text-xs bg-neutral-20 dark:bg-neutral-80-dark rounded overflow-auto max-h-40">
          {value}
        </pre>
      </div>
    );
  },
  args: {
    label: 'Controlled RichTextField',
    helperText: 'The HTML output is shown below.',
  },
  argTypes: { value: { control: false }, defaultValue: { control: false } },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled editor — `value` is an HTML string, `onChange` receives the updated HTML.',
      },
      source: {
        code: `
import { useState } from 'react';
import { RichTextField } from 'mis-design';

const Example = () => {
  const [value, setValue] = useState<string>('');

  return <RichTextField value={value} onChange={setValue} label="Content" />;
};
`.trim(),
      },
    },
  },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      {sizeOption.map((size) => (
        <RichTextField
          key={size}
          {...args}
          size={size as RichTextFieldProps['size']}
          label={`Size: ${size}`}
        />
      ))}
    </div>
  ),
  args: { placeholder: 'Start typing…' },
  argTypes: { size: { control: false }, label: { control: false } },
  parameters: {
    docs: {
      source: {
        code: `
import { RichTextField } from 'mis-design';

const Example = () => (
  <>
    <RichTextField size="default" label="Default" />
    <RichTextField size="large" label="Large" />
  </>
);
`.trim(),
      },
    },
  },
};

/* ─── Label Position ─────────────────────────────────────────────────────── */

export const LabelPosition: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      {labelPositionOption.map((position) => (
        <RichTextField
          key={position}
          {...args}
          labelPosition={position as RichTextFieldProps['labelPosition']}
          label={`Label position: ${position}`}
          width={600}
        />
      ))}
    </div>
  ),
  args: { placeholder: 'Start typing…', helperText: 'Helper text' },
  argTypes: { labelPosition: { control: false }, label: { control: false } },
  parameters: {
    docs: {
      source: {
        code: `
import { RichTextField } from 'mis-design';

const Example = () => (
  <>
    <RichTextField labelPosition="top" label="Top label" />
    <RichTextField labelPosition="left" label="Left label" />
  </>
);
`.trim(),
      },
    },
  },
};

/* ─── Success & Error ────────────────────────────────────────────────────── */

export const SuccessAndError: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <RichTextField {...args} label="Neutral RichTextField" />
      <RichTextField {...args} label="Success RichTextField" success />
      <RichTextField {...args} label="Error RichTextField" error />
      <RichTextField
        {...args}
        label="Error RichTextField with message"
        error="This field is required."
      />
    </div>
  ),
  args: { placeholder: 'Start typing…', helperText: 'Helper text' },
  argTypes: { success: { control: false }, error: { control: false } },
  parameters: {
    docs: {
      source: {
        code: `
import { RichTextField } from 'mis-design';

const Example = () => (
  <>
    <RichTextField label="Neutral" />
    <RichTextField label="Success" success />
    <RichTextField label="Error" error />
    <RichTextField label="Error with message" error="This field is required." />
  </>
);
`.trim(),
      },
    },
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <RichTextField {...args} label="Disabled (empty)" disabled />
      <RichTextField
        {...args}
        label="Disabled (with content)"
        disabled
        defaultValue="<p>This content is <strong>read-only</strong> and cannot be edited.</p>"
      />
    </div>
  ),
  args: { placeholder: 'Start typing…' },
  argTypes: { disabled: { control: false } },
  parameters: {
    docs: {
      description: {
        story:
          'When disabled, the toolbar is hidden and the editor is not editable.',
      },
      source: {
        code: `
import { RichTextField } from 'mis-design';

const Example = () => (
  <RichTextField
    label="Read-only notes"
    disabled
    defaultValue="<p>This content is <strong>read-only</strong>.</p>"
  />
);
`.trim(),
      },
    },
  },
};
