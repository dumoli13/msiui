import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Avatar from '../../src/components/Displays/avatar';
import '../../src/output.css';
import type { AvatarProps } from '../../src/types/displays/avatar';

const sizeOptions = [32, 40, 56, 72];

const meta: Meta<AvatarProps> = {
  title: 'Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the Avatar, typically used for initials',
      table: {
        type: { summary: 'string' },
      },
    },
    src: {
      control: 'text',
      description: 'URL of the avatar image',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the avatar is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Playground: Story = {
  args: {
    name: '',
    src: '',
    size: 64,
  },
};

export const WithImage: Story = {
  args: {
    name: 'John Doe',
    src: 'https://i.pravatar.cc/300',
    size: 56,
  },
};

export const InitialsFallback: Story = {
  args: {
    name: 'John Doe',
    size: 56,
  },
};

export const Sizes: Story = {
  argTypes: {
    size: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story:
          'All standard avatar sizes (32, 40, 56, 72) displayed side by side.',
      },
      source: {
        language: 'tsx',
        code: `
<div className="flex items-center gap-4">
  {[32, 40, 56, 72].map((size) => (
    <Avatar key={size} size={size} name="John Doe" />
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      {sizeOptions.map((size) => (
        <Avatar key={size} {...args} size={size} name="John Doe" />
      ))}
    </div>
  ),
};
