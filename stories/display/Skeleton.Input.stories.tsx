import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, type SkeletonInputProps } from '../../src';
import '../../src/output.css';

const sizeOption = ['default', 'large'];

const meta: Meta<SkeletonInputProps> = {
  title: 'Display/Skeleton.Input',
  component: Skeleton.Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Predefined skeleton for input forms, simulating label and input loading. Skeleton size is based on the size of the container.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: sizeOption,
      description: 'The size of the skeleton.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | large' },
      },
    },
    height: {
      control: { type: 'number' },
      description: 'The height of the skeleton',
      type: 'number',
    },
  },
  args: {
    size: 'default',
  },
};
export default meta;

type Story = StoryObj<SkeletonInputProps>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <Skeleton.Input {...args} />
    </div>
  ),
};
