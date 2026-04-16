import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Icon } from '../../src';
import Alert from '../../src/components/Displays/Alert';
import '../../src/output.css';
import { AlertProps } from '../../src/types/displays/alert';

const colorOption = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'neutral',
];

const meta: Meta<AlertProps> = {
  title: 'Display/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colorOption,
      description: 'The color theme for the alert.',
      table: {
        defaultValue: { summary: 'primary' },
        type: {
          summary: 'primary | success | danger | warning | info | neutral',
        },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names to customize the component style.',
    },
    children: {
      control: { type: 'text' },
      description: 'Content inside the alert.',
    },
    onRemove: {
      action: 'removeClicked',
      description: 'Callback triggered when close button is clicked.',
    },
    startIcon: {
      control: false,
      description: 'An optional icon to display at the start of the alert.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
  args: {
    color: 'primary',
    children: 'A simple content alert—check it out!',
    onRemove: fn(),
  },
};

export default meta;

type Story = StoryObj<AlertProps>;

export const Playground: Story = {
  args: {
    color: 'primary',
    children: 'A simple content alert—check it out!',
    startIcon: <Icon name="exclamation-triangle" size={16} variant="solid" />,
    onRemove: fn(),
  },
};

export const Color: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All six color variants of Alert shown together — use `color` to convey semantic meaning.',
      },
      source: {
        language: 'tsx',
        code: `
const colorOption = ['primary', 'success', 'danger', 'warning', 'info', 'neutral'];

<div className="flex flex-col gap-4">
  {colorOption.map((color) => (
    <Alert
      key={color}
      color={color as AlertProps['color']}
      startIcon={<Icon name="exclamation-triangle" size={16} variant="solid" />}
      onRemove={() => {}}
    >
      A simple content alert—check it out!
    </Alert>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {colorOption.map((color) => (
        <Alert key={color} {...args} color={color as AlertProps['color']}>
          A simple content alert—check it out!
        </Alert>
      ))}
    </div>
  ),
  args: {
    startIcon: <Icon name="exclamation-triangle" size={16} variant="solid" />,
    onRemove: fn(),
  },
};

export const WithCloseButton: Story = {
  args: {
    children: 'A simple content alert—check it out!',
    onRemove: fn(),
  },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All color variants with a `startIcon` and no close button — use `startIcon` to reinforce the semantic meaning.',
      },
      source: {
        language: 'tsx',
        code: `
const colorOption = ['primary', 'success', 'danger', 'warning', 'info', 'neutral'];

<div className="flex flex-col gap-4">
  {colorOption.map((color) => (
    <Alert
      key={color}
      color={color as AlertProps['color']}
      startIcon={<Icon name="exclamation-triangle" size={16} variant="solid" />}
    >
      A simple content alert—check it out!
    </Alert>
  ))}
</div>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {colorOption.map((color) => (
        <Alert
          key={color}
          {...args}
          color={color as AlertProps['color']}
          startIcon={
            <Icon name="exclamation-triangle" size={16} variant="solid" />
          }
        >
          A simple content alert—check it out!
        </Alert>
      ))}
    </div>
  ),
  args: {
    onRemove: undefined,
  },
};
