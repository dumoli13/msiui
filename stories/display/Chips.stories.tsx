import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Icon } from '../../src';
import Chip from '../../src/components/Displays/Chip';
import '../../src/output.css';
import { ChipProps } from '../../src/types/displays/Chip';

const colorOption = ['primary', 'neutral'];
const sizeOption = ['small', 'default', 'large'];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ChipProps> = {
  title: 'Display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colorOption,
      description: 'The color theme for the chip.',
      table: {
        defaultValue: { summary: 'primary' },
        type: {
          summary: 'primary | neutral',
        },
      },
    },
    size: {
      control: { type: 'select' },
      options: sizeOption,
      description: 'Size of the chip.',
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
      description: 'Content inside the chip.',
    },
    onRemove: {
      action: 'removeClicked',
      description: 'Callback triggered when remove button is clicked.',
    },
  },
  args: {
    color: 'neutral',
    size: 'default',
    children: 'Label',
    onRemove: fn(),
  },
};

export default meta;
type Story = StoryObj<ChipProps>;

export const Playground: Story = {
  args: {
    children: 'Label',
    color: 'neutral',
    size: 'default',
  },
};

export const Color: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Both available chip colors — `primary` and `neutral`.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex flex-wrap gap-2">
  {['primary', 'neutral'].map((color) => (
    <Chip key={color} color={color as ChipProps['color']}>
      {color}
    </Chip>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {colorOption.map((color) => (
        <Chip key={color} {...args} color={color as ChipProps['color']}>
          {color}
        </Chip>
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

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Chips with different content: text only, with a leading icon, and with an avatar image.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex flex-col gap-4">
  <div className="flex gap-3">
    <Chip color="neutral">Label</Chip>
    <Chip color="neutral" startIcon={<Icon name="map-pin" variant="solid" size={16} />}>Label</Chip>
    <Chip
      color="neutral"
      startIcon={
        <img alt="avatar" src="https://i.pravatar.cc/24" className="w-6 h-6 rounded-md -ml-0.5 -mr-0.5 -mb-0.5" />
      }
    >
      Label
    </Chip>
  </div>
  <div className="flex gap-3">
    <Chip color="primary">Label</Chip>
    <Chip color="primary" startIcon={<Icon name="map-pin" variant="solid" size={16} />}>Label</Chip>
    <Chip
      color="primary"
      startIcon={<img alt="avatar" src="https://i.pravatar.cc/24" className="w-6 h-6 rounded-md" />}
    >
      Label
    </Chip>
  </div>
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Chip {...args} color="neutral">
          Label
        </Chip>

        <Chip
          {...args}
          color="neutral"
          startIcon={<Icon name="map-pin" variant="solid" size={16} />}
        >
          Label
        </Chip>

        <Chip
          {...args}
          color="neutral"
          startIcon={
            <img
              alt="avatar"
              src="https://i.pravatar.cc/24"
              className="w-6 h-6 rounded-md -ml-0.5 -mr-0.5 -mb-0.5"
            />
          }
        >
          Label
        </Chip>
      </div>

      <div className="flex gap-3">
        <Chip {...args} color="primary">
          Label
        </Chip>

        <Chip
          {...args}
          color="primary"
          startIcon={<Icon name="map-pin" variant="solid" size={16} />}
        >
          Label
        </Chip>

        <Chip
          {...args}
          color="primary"
          startIcon={
            <img
              alt="avatar"
              src="https://i.pravatar.cc/24"
              className="w-6 h-6 rounded-md"
            />
          }
        >
          Label
        </Chip>
      </div>
    </div>
  ),
  args: {
    onRemove: fn(),
  },
};

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three chip sizes — small, default, and large.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex flex-wrap gap-2 items-center">
  {['small', 'default', 'large'].map((size) => (
    <Chip key={size} size={size as ChipProps['size']}>
      {size}
    </Chip>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {sizeOption.map((size) => (
        <Chip key={size} {...args} size={size as ChipProps['size']}>
          {size}
        </Chip>
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
    children: 'Removable Chip',
    onRemove: fn(),
  },
};
