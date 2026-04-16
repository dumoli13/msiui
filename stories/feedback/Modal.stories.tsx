import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Popper,
  Tooltip,
} from '../../src';
import '../../src/output.css';

const meta: Meta<ModalProps> = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description:
        'Determines whether the modal is open or not. If false, the modal is not rendered.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: 'text',
      description: 'A className to customize the Modal.',
      table: {
        type: { summary: 'string' },
      },
    },
    width: {
      control: 'number',
      description:
        'The width of the modal. If a number is provided, the width will be in px.',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '804' },
      },
    },
    height: {
      control: 'number',
      description:
        'The height of the modal. If a number is provided, the height will be in px.',
      table: {
        type: { summary: 'string | number' },
      },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description:
        'Determines whether the modal should close when the user clicks outside of the modal.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      action: false,
      description: 'Callback when modal is closed.',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    width: 804,
  },
};

export default meta;
type Story = StoryObj<ModalProps>;

/**
 * Demonstrates a Popper (dropdown) nested inside a Modal.
 *
 * The Popper portals into the Modal's container div instead of `document.body`.
 * It inherits `isFixed: true` from the Modal's OverlayContext so position
 * calculation skips scroll offsets (the Modal is `position: fixed`).
 *
 * To verify: open the Modal, click "Open Dropdown" — the Popper should appear
 * above the Modal content, at the correct position, even when the page is scrolled.
 * Inspect the DOM — the Popper div should be a child of `div[role=dialog]`.
 */
export const WithPopper: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A `Popper` dropdown nested inside a Modal. The Popper portals into the Modal's container (not `document.body`) so it appears above the Modal content at the correct position regardless of page scroll.",
      },
      source: {
        language: 'tsx',
        code: `
function ModalWithPopperDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Modal open={open} width={540} onClose={() => setOpen(false)} closeOnOverlayClick>
        <ModalHeader title="Modal with Popper" />
        <ModalBody>
          <Popper
            content={
              <div className="py-1 flex flex-col w-44">
                {['Option A', 'Option B', 'Option C'].map((label) => (
                  <button key={label} className="text-sm text-left px-4 py-2 hover:bg-neutral-20">
                    {label}
                  </button>
                ))}
              </div>
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            offset={4}
          >
            <Button size="small">Open Dropdown</Button>
          </Popper>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
    </>
  );
}
        `.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Modal
          open={open}
          width={540}
          onClose={() => setOpen(false)}
          closeOnOverlayClick
        >
          <ModalHeader title="Modal with Popper" />
          <ModalBody>
            <p className="text-sm text-neutral-80 dark:text-neutral-80-dark mb-4">
              This Modal contains a Popper dropdown. The Popper portals into the
              Modal&apos;s container, appears above the Modal content, and
              positions correctly regardless of page scroll.
            </p>
            <Popper
              content={
                <div className="py-1 flex flex-col w-44">
                  {['Option A', 'Option B', 'Option C'].map((label) => (
                    <button
                      key={label}
                      className="text-sm text-left px-4 py-2 hover:bg-neutral-20 dark:hover:bg-neutral-40-dark"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              }
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              offset={4}
            >
              <Button size="small">Open Dropdown</Button>
            </Popper>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
      </>
    );
  },
};

/**
 * Demonstrates Tooltips nested inside a Modal.
 *
 * Tooltip portals its content into the Modal's container div, inheriting
 * `isFixed: true` so position calculation uses viewport coordinates (no scroll
 * offset). The Tooltip appears above the Modal overlay at the correct position.
 *
 * To verify: open the Modal, hover "Submit" or "Cancel" — the tooltip should
 * appear directly above each button, not clipped by the Modal boundary.
 */
export const WithTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tooltips nested inside a Modal. Each Tooltip portals into the Modal's container and appears above the Modal overlay at the correct viewport position.",
      },
      source: {
        language: 'tsx',
        code: `
function ModalWithTooltipDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Modal open={open} width={540} onClose={() => setOpen(false)} closeOnOverlayClick>
        <ModalHeader title="Modal with Tooltips" />
        <ModalBody>
          <div className="flex gap-3">
            <Tooltip title="Submit and save all changes" verticalAlign="top" horizontalAlign="center" arrow>
              <Button>Submit</Button>
            </Tooltip>
            <Tooltip title="Discard changes and close" verticalAlign="top" horizontalAlign="center" arrow>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </Tooltip>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
    </>
  );
}
        `.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Modal
          open={open}
          width={540}
          onClose={() => setOpen(false)}
          closeOnOverlayClick
        >
          <ModalHeader title="Modal with Tooltips" />
          <ModalBody>
            <p className="text-sm text-neutral-80 dark:text-neutral-80-dark mb-4">
              Hover the buttons below — Tooltips portal into the Modal&apos;s
              container and appear above the Modal overlay, positioned correctly
              in viewport coordinates.
            </p>
            <div className="flex gap-3">
              <Tooltip
                title="Submit and save all changes"
                verticalAlign="top"
                horizontalAlign="center"
                arrow
              >
                <Button>Submit</Button>
              </Tooltip>
              <Tooltip
                title="Discard changes and close"
                verticalAlign="top"
                horizontalAlign="center"
                arrow
              >
                <Button onClick={() => setOpen(false)}>Cancel</Button>
              </Tooltip>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
      </>
    );
  },
};

/**
 * Modal opened from inside another Modal.
 *
 * The inner Modal portals into the outer Modal's container (not document.body)
 * via OverlayContext, so its overlay correctly covers the outer Modal and the
 * stacking order is preserved.
 *
 * To verify: open the outer Modal, click "Open Inner Modal" — the inner Modal
 * overlay should cover the outer Modal, not sit behind it.
 */
export const ModalInModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A Modal opened from inside another Modal. The inner Modal portals into the outer Modal's container via `OverlayContext`, so its overlay correctly covers the outer Modal without manual z-index management.",
      },
      source: {
        language: 'tsx',
        code: `
function ModalInModalDemo() {
  const [outerOpen, setOuterOpen] = React.useState(false);
  const [innerOpen, setInnerOpen] = React.useState(false);

  return (
    <>
      <Modal open={outerOpen} width={540} onClose={() => setOuterOpen(false)} closeOnOverlayClick>
        <ModalHeader title="Outer Modal" />
        <ModalBody>
          <Button size="small" onClick={() => setInnerOpen(true)}>Open Inner Modal</Button>
          <Modal open={innerOpen} width={400} onClose={() => setInnerOpen(false)} closeOnOverlayClick>
            <ModalHeader title="Inner Modal" />
            <ModalBody>This modal is nested inside the outer modal.</ModalBody>
            <ModalFooter>
              <Button onClick={() => setInnerOpen(false)}>Close</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOuterOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
      <Button onClick={() => setOuterOpen(true)}>Open Modal</Button>
    </>
  );
}
        `.trim(),
      },
    },
  },
  render: () => {
    const [outerOpen, setOuterOpen] = React.useState(false);
    const [innerOpen, setInnerOpen] = React.useState(false);

    return (
      <>
        <Modal
          open={outerOpen}
          width={540}
          onClose={() => setOuterOpen(false)}
          closeOnOverlayClick
        >
          <ModalHeader title="Outer Modal" />
          <ModalBody>
            <p className="text-sm text-neutral-80 dark:text-neutral-80-dark mb-4">
              This is the outer modal. Click below to open a second modal on top
              of it.
            </p>
            <Button size="small" onClick={() => setInnerOpen(true)}>
              Open Inner Modal
            </Button>
            <Modal
              open={innerOpen}
              width={400}
              onClose={() => setInnerOpen(false)}
              closeOnOverlayClick
            >
              <ModalHeader title="Inner Modal" />
              <ModalBody>
                <p className="text-sm text-neutral-80 dark:text-neutral-80-dark">
                  This modal is nested inside the outer modal. Its overlay is a
                  DOM child of the outer modal&apos;s container, so stacking is
                  correct without manual z-index tweaking.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setInnerOpen(false)}>Close</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOuterOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
        <Button onClick={() => setOuterOpen(true)}>Open Modal</Button>
      </>
    );
  },
};

/**
 * Infinitely recursive Modal — each level opens another Modal on top.
 *
 * Demonstrates that OverlayContext nesting is unbounded: every Modal portals
 * into the nearest parent Modal's container, so overlays stack cleanly no
 * matter how deep the nesting goes (capped at 6 levels here for practicality).
 */
const RecursiveModal: React.FC<{ depth: number; maxDepth: number }> = ({
  depth,
  maxDepth,
}) => {
  const [open, setOpen] = React.useState(false);

  if (depth >= maxDepth) {
    return (
      <p className="text-xs text-neutral-60 dark:text-neutral-60-dark italic">
        Maximum depth ({maxDepth}) reached.
      </p>
    );
  }

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Open level {depth + 1}
      </Button>
      <Modal
        open={open}
        width={Math.max(320, 520 - depth * 40)}
        onClose={() => setOpen(false)}
        closeOnOverlayClick
      >
        <ModalHeader title={`Modal — level ${depth + 1}`} />
        <ModalBody>
          <p className="text-sm text-neutral-80 dark:text-neutral-80-dark mb-4">
            Depth {depth + 1} of {maxDepth}. Each overlay portals into the
            parent modal&apos;s container via OverlayContext.
          </p>
          <RecursiveModal depth={depth + 1} maxDepth={maxDepth} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const InfiniteModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates unbounded `OverlayContext` nesting — each Modal portals into its parent Modal's container, stacking cleanly up to any depth (capped at 6 here).",
      },
      source: {
        language: 'tsx',
        code: `
const RecursiveModal: React.FC<{ depth: number; maxDepth: number }> = ({ depth, maxDepth }) => {
  const [open, setOpen] = React.useState(false);

  if (depth >= maxDepth) {
    return <p className="text-xs italic">Maximum depth ({maxDepth}) reached.</p>;
  }

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>Open level {depth + 1}</Button>
      <Modal
        open={open}
        width={Math.max(320, 520 - depth * 40)}
        onClose={() => setOpen(false)}
        closeOnOverlayClick
      >
        <ModalHeader title={\`Modal — level \${depth + 1}\`} />
        <ModalBody>
          <RecursiveModal depth={depth + 1} maxDepth={maxDepth} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

// Usage
<RecursiveModal depth={0} maxDepth={6} />
        `.trim(),
      },
    },
  },
  render: () => <RecursiveModal depth={0} maxDepth={6} />,
};

export const Playground: Story = {
  render: (args) => {
    const [openModal, setOpenModal] = React.useState(false);
    return (
      <>
        <Modal {...args} open={openModal} width={600}>
          <ModalHeader title="Use Google's location service?" />
          <ModalBody>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={() => setOpenModal(false)}>
              Disagree
            </Button>
            <Button>Agree</Button>
          </ModalFooter>
        </Modal>
        <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const Playground = () => {  
    const [openModal, setOpenModal] = React.useState(false);
    return (
        <>
            <Modal {...args} open={openModal} width={600}>
                <ModalHeader title="Use Google's location service?" />
                <ModalBody>
                    Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                </ModalBody>
                <ModalFooter>
                    <Button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    >
                    Disagree
                    </Button>
                    <Button >Agree</Button>
                </ModalFooter>
            </Modal>
            <Button onClick={()=>setOpenModal(true)}>Open Modal</Button>
        </>
    )
};

export default Playground;          
                `.trim(),
      },
    },
  },
};
