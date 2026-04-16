import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button, Popover, PopoverProps } from '../../src';
import '../../src/output.css';

type PopoverStoryArgs = PopoverProps & {
  anchorVertical: 'top' | 'center' | 'bottom';
  anchorHorizontal: 'left' | 'center' | 'right';
  transformVertical: 'top' | 'center' | 'bottom';
  transformHorizontal: 'left' | 'center' | 'right';
};

const meta: Meta<PopoverStoryArgs> = {
  title: 'Display/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Content that triggers the popover.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    open: {
      control: 'boolean',
      description:
        'A controlled flag that determines whether the popover is visible or not.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    elementRef: {
      action: false,
      description: 'Ref of the target element.',
      table: {
        type: { summary: 'React.RefObject<HTMLElement>' },
      },
    },
    onClose: {
      control: false,
      description: 'Callback when popover is closed.',
      table: {
        type: { summary: '() => void' },
      },
    },

    anchorVertical: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: 'Vertical anchor position',
    },

    anchorHorizontal: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Horizontal anchor position',
    },

    transformVertical: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: 'Vertical transform origin',
    },

    transformHorizontal: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Horizontal transform origin',
    },
  },
  args: {
    onClose: fn(),

    anchorVertical: 'bottom',
    anchorHorizontal: 'left',

    transformVertical: 'top',
    transformHorizontal: 'left',
  },
};

export default meta;
type Story = StoryObj<PopoverStoryArgs>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const popOverRef = useRef<HTMLButtonElement>(null);

    return (
      <div>
        <Button onClick={() => setOpen(true)} ref={popOverRef}>
          Open Popover
        </Button>
        <Popover
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          elementRef={popOverRef}
        >
          This is the content of the Popover
        </Popover>
      </div>
    );
  },
  argTypes: {
    open: { control: false },
    elementRef: { control: false },
  },
  parameters: {
    docs: {
      source: {
        code: `
import { useState } from 'react';

const Playground = () => {
    const [open, setOpen] = React.useState(false);
    const popOverRef = useRef<HTMLButtonElement>(null);

    return (
        <div>
            <Button onClick={() => setOpen(true)} ref={popOverRef}>Open Popover</Button>
            <Popover 
                open={open}
                onClose={() => setOpen(false)}
                elementRef={popOverRef}
                horizontalAlign="left"
                verticalAlign="bottom"
                transformOriginHorizontal="left"
                transformOriginVertical="top"
            >
                This is the content of the Popover
            </Popover>
        </div>
    );
};

export default Playground;
          `.trim(),
      },
    },
  },
};
