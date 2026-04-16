import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Tag, TagProps } from '../../src';
import '../../src/output.css';

const colorOption = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'neutral',
];
const sizeOption = ['small', 'default', 'large'];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<TagProps> = {
  title: 'Display/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colorOption,
      description: 'The color theme for the tag.',
      table: {
        defaultValue: { summary: 'primary' },
        type: {
          summary: 'primary | success | danger | warning | info | neutral',
        },
      },
    },
    size: {
      control: { type: 'select' },
      options: sizeOption,
      description: 'Size of the tag.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'small | default | large' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names to customize the component style.',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Content inside the tag.',
    },
    onRemove: {
      action: 'removeClicked',
      description: 'Callback triggered when remove button is clicked.',
    },
  },
  args: {
    color: 'primary',
    size: 'default',
    children: 'Sample Tag',
    onRemove: fn(),
  },
};

export default meta;
type Story = StoryObj<TagProps>;

export const Playground: Story = {
  args: {
    children: 'Sample Tag',
    color: 'primary',
    size: 'default',
  },
};

export const Color: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All six color variants of Tag — use `color` to convey semantic meaning.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex flex-wrap gap-2">
  {['primary', 'success', 'danger', 'warning', 'info', 'neutral'].map((color) => (
    <Tag key={color} color={color as TagProps['color']}>
      {color}
    </Tag>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {colorOption.map((color) => (
        <Tag key={color} {...args} color={color as TagProps['color']}>
          {color}
        </Tag>
      ))}
    </div>
  ),
  args: {
    onRemove: undefined,
  },
  argTypes: {
    onRemove: {
      action: false,
    },
  },
};

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three tag sizes — small, default, and large.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex flex-wrap gap-2 items-center">
  {['small', 'default', 'large'].map((size) => (
    <Tag key={size} size={size as TagProps['size']}>
      {size}
    </Tag>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {sizeOption.map((size) => (
        <Tag key={size} {...args} size={size as TagProps['size']}>
          {size}
        </Tag>
      ))}
    </div>
  ),
  args: {
    onRemove: undefined,
  },
  argTypes: {
    onRemove: {
      action: false,
    },
  },
};

export const WithRemoveButton: Story = {
  argTypes: {
    onRemove: {
      action: 'removeClicked',
      description: 'Callback when remove button is clicked',
    },
  },
  args: {
    children: 'Removable Tag',
    onRemove: fn(),
  },
};
