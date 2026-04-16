import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper, StepperProps } from '../../src';
import '../../src/output.css';

const meta: Meta<StepperProps> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'number',
      description: 'The index of the currently active step.',
      table: {
        type: { summary: 'number' },
      },
    },
    items: {
      control: 'object',
      description:
        'An array of step items, each containing the following properties:',
      table: {
        type: {
          summary:
            'Array<{ title: string, description?: string, error?: boolean, success?: boolean, available?: boolean, progress?: number }>',
        },
      },
    },
    onChange: {
      action: 'navigate',
      description: 'Callback function triggered when a page is clicked. ',
      table: {
        type: { summary: '(index: number) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'A flag that disables button if set to true.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<StepperProps>;

export const Playground: Story = {
  args: {
    items: [
      {
        title: 'Step 1',
        available: true,
      },
      {
        title: 'Step 2',
        available: true,
      },
      {
        title: 'Step 3',
        available: true,
      },
      {
        title: 'Step 4',
        available: true,
      },
      { title: 'Step 5', available: true },
    ],
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive stepper — click a step to activate it. `active` is managed with `useState`; pass `onChange` to receive the clicked index.',
      },
      source: {
        language: 'tsx',
        code: `
function StepperDemo() {
  const [active, setActive] = React.useState(0);

  return (
    <Stepper
      active={active}
      onChange={setActive}
      items={[
        { title: 'Step 1', available: true },
        { title: 'Step 2', available: true },
        { title: 'Step 3', available: true },
        { title: 'Step 4', available: true },
        { title: 'Step 5', available: true },
      ]}
    />
  );
}
        `.trim(),
      },
    },
  },
  render: (args) => {
    const [active, setActive] = React.useState(0);
    return (
      <Stepper
        {...args}
        active={active}
        items={args.items}
        onChange={setActive}
      />
    );
  },
};
