import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Popper,
  PopperProps,
  Tooltip,
} from '../../src';
import '../../src/output.css';

type PopperStoryArgs = PopperProps & {
  anchorVertical: 'top' | 'center' | 'bottom';
  anchorHorizontal: 'left' | 'center' | 'right';
  transformVertical: 'top' | 'center' | 'bottom';
  transformHorizontal: 'left' | 'center' | 'right';
};

const meta: Meta<PopperStoryArgs> = {
  title: 'Display/Popper',
  component: Popper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable popper interaction',
    },

    content: {
      control: 'text',
      description: 'Content shown inside popper',
    },

    offset: {
      control: 'number',
      description: 'Distance between popper and anchor',
    },

    className: {
      control: 'text',
    },

    style: {
      control: 'object',
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
    disabled: false,
    content: 'Sample Popper',
    offset: 8,

    anchorVertical: 'bottom',
    anchorHorizontal: 'left',

    transformVertical: 'top',
    transformHorizontal: 'left',
  },
};

export default meta;

type Story = StoryObj<PopperStoryArgs>;

/**
 * Demonstrates that a Modal opened from inside a Popper becomes a DOM child
 * of the Popper — not a sibling at document.body. The Modal overlay covers
 * the full viewport and stacks correctly above the Popper content.
 *
 * To verify: open the Popper, click "Open Modal", then inspect the DOM —
 * `div[role=dialog]` should be nested inside the Popper's outer container div.
 */
export const WithModal: Story = {
  render: () => {
    const [modal1Open, setModal1Open] = React.useState(false);
    const [modal2Open, setModal2Open] = React.useState(false);

    return (
      <>
        <Popper
          content={
            <div className="p-4 flex flex-col gap-3 w-[600px]">
              <p className="text-sm text-neutral-80 dark:text-neutral-80-dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                vitae tincidunt turpis. Suspendisse potenti. Ut efficitur
                pulvinar mauris nec venenatis. Aliquam erat volutpat. Mauris
                commodo lacus facilisis lectus consectetur ornare. Etiam
                molestie elit aliquam, pulvinar nulla sed, pulvinar libero.
                Quisque in rutrum elit. Aliquam vel leo erat. Mauris posuere,
                mauris sit amet ullamcorper dapibus, erat sapien hendrerit
                lorem, sit amet feugiat purus risus congue odio.
              </p>
              <Button size="small" onClick={() => setModal1Open(true)}>
                Open Modal
              </Button>
              <Modal
                open={modal1Open}
                width={480}
                onClose={() => setModal1Open(false)}
                closeOnOverlayClick
              >
                <ModalHeader title="Modal inside Popper" />
                <ModalBody>
                  <p className="text-sm">
                    This Modal is a <strong>DOM child</strong> of the Popper —
                    not a sibling at <code>document.body</code>. The overlay
                    covers the full viewport and the Popper does not appear on
                    top.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Tooltip
                    title="This is a tooltip"
                    verticalAlign="top"
                    horizontalAlign="center"
                  >
                    <Button>Hover Me</Button>
                  </Tooltip>
                  <Button onClick={() => setModal1Open(false)}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          offset={8}
        >
          <Button className="ml-20">
            Button That has a very very long width
          </Button>
        </Popper>
        <Popper
          content={
            <div className="p-4 flex flex-col gap-3 w-[600px]">
              <p className="text-sm text-neutral-80 dark:text-neutral-80-dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                vitae tincidunt turpis. Suspendisse potenti. Ut efficitur
                pulvinar mauris nec venenatis. Aliquam erat volutpat. Mauris
                commodo lacus facilisis lectus consectetur ornare. Etiam
                molestie elit aliquam, pulvinar nulla sed, pulvinar libero.
                Quisque in rutrum elit. Aliquam vel leo erat. Mauris posuere,
                mauris sit amet ullamcorper dapibus, erat sapien hendrerit
                lorem, sit amet feugiat purus risus congue odio.
              </p>
              <Button size="small" onClick={() => setModal2Open(true)}>
                Open Modal
              </Button>
              <Modal
                open={modal2Open}
                width={480}
                onClose={() => setModal2Open(false)}
                closeOnOverlayClick
              >
                <ModalHeader title="Modal inside Popper" />
                <ModalBody>
                  <p className="text-sm">
                    This Modal is a <strong>DOM child</strong> of the Popper —
                    not a sibling at <code>document.body</code>. The overlay
                    covers the full viewport and the Popper does not appear on
                    top.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Tooltip
                    title="This is a tooltip"
                    verticalAlign="top"
                    horizontalAlign="center"
                  >
                    <Button>Hover Me</Button>
                  </Tooltip>
                  <Button onClick={() => setModal2Open(false)}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          offset={8}
        >
          <Button className="ml-20">Open Popper</Button>
        </Popper>
      </>
    );
  },
};

/**
 * Demonstrates Tooltip nested inside Popper content.
 *
 * Both components portal their content — Tooltip portals into Popper's container
 * (not document.body), inherits the same viewport coordinate space (`isFixed: true`),
 * and therefore positions correctly relative to its anchor.
 *
 * To verify: open the Popper, hover each button — the tooltip should appear directly
 * above the button at the correct position, never clipped or offset.
 */
export const WithTooltip: Story = {
  render: () => (
    <Popper
      content={
        <div className="p-4 flex flex-col gap-3 w-64">
          <p className="text-sm text-neutral-80 dark:text-neutral-80-dark">
            Hover the buttons — Tooltips appear above the Popper and are
            positioned inside the Popper&apos;s coordinate space.
          </p>
          <div className="flex gap-2">
            <Tooltip
              title="Save your changes"
              verticalAlign="top"
              horizontalAlign="center"
              arrow
            >
              <Button size="small">Save</Button>
            </Tooltip>
            <Tooltip
              title="Cancel and go back"
              verticalAlign="top"
              horizontalAlign="center"
              arrow
            >
              <Button size="small">Cancel</Button>
            </Tooltip>
            <Tooltip
              title="Delete permanently"
              verticalAlign="top"
              horizontalAlign="center"
              arrow
            >
              <Button size="small">Delete</Button>
            </Tooltip>
          </div>
        </div>
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      offset={8}
    >
      <Button>Open Popper</Button>
    </Popper>
  ),
};

/**
 * Popper nested inside another Popper.
 * Verifies that the child Popper's position is computed relative to the
 * viewport, not the parent Popper's div (which is position:absolute).
 * To verify: open the outer Popper, then open the inner Popper — the inner
 * panel should appear directly below its anchor button, not offset by the
 * parent portal's position.
 */
export const Nested: Story = {
  render: () => (
    <Popper
      content={
        <div className="p-4 flex flex-col gap-2 w-48">
          <p className="text-xs text-neutral-60">Outer popper content</p>
          <Popper
            content={
              <div className="p-3 w-40">
                <p className="text-xs text-neutral-60">Inner popper content</p>
              </div>
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            offset={4}
          >
            <Button size="small">Open inner</Button>
          </Popper>
        </div>
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      offset={8}
    >
      <Button>Open outer</Button>
    </Popper>
  ),
};

/**
 * Infinitely recursive Popper — each level opens another Popper on top.
 *
 * Demonstrates that OverlayContext nesting is unbounded: every child Popper
 * portals into the nearest parent Popper's container div and positions itself
 * correctly relative to its own anchor, no matter how deep the nesting goes
 * (capped at 6 levels here for practicality).
 */
const RecursivePopper: React.FC<{ depth: number; maxDepth: number }> = ({
  depth,
  maxDepth,
}) => {
  if (depth >= maxDepth) {
    return (
      <p className="text-xs text-neutral-60 dark:text-neutral-60-dark italic px-3 py-2">
        Maximum depth ({maxDepth}) reached.
      </p>
    );
  }

  return (
    <Popper
      content={
        <div className="p-3 flex flex-col gap-2 w-44">
          <p className="text-xs text-neutral-60 dark:text-neutral-60-dark">
            Level {depth + 1} of {maxDepth}
          </p>
          <RecursivePopper depth={depth + 1} maxDepth={maxDepth} />
        </div>
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      offset={4}
    >
      <Button size="small">Open level {depth + 1}</Button>
    </Popper>
  );
};

export const InfinitePopper: Story = {
  render: () => <RecursivePopper depth={0} maxDepth={6} />,
};

export const Playground: Story = {
  render: (args) => (
    <Popper
      disabled={args.disabled}
      content={args.content}
      offset={args.offset}
      className={args.className}
      style={args.style}
      anchorOrigin={{
        vertical: args.anchorVertical,
        horizontal: args.anchorHorizontal,
      }}
      transformOrigin={{
        vertical: args.transformVertical,
        horizontal: args.transformHorizontal,
      }}
    >
      <Icon name="camera" color="currentColor" size={24} />
    </Popper>
  ),
};
