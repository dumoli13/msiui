import React, { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { iconNames } from '../../const/icon';
import {
  Button,
  ConfirmModalProps,
  Icon,
  IconNames,
  Modal,
  ModalBody,
  ModalConfirmContainer,
  ModalFooter,
  ModalHeader,
  Popper,
} from '../../src';
import '../../src/output.css';

const meta: Meta<ConfirmModalProps> = {
  title: 'Feedback/ModalConfirmation',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'An optional icon to display beside the title.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    title: {
      control: 'text',
      description:
        'The title of the modal that describes the action to be confirmed.',
      table: {
        type: { summary: 'string' },
      },
    },
    content: {
      control: 'text',
      description:
        'The content of the modal, explaining the action in more detail.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    confirmText: {
      control: 'text',
      description:
        'Custom text for the primary confirmation button. Best Practice: Use a specific action verb (e.g., "Delete", "Yes, Log Out") instead of the generic default to provide clearer context to the user. (Default: "Confirm").',
      table: {
        defaultValue: { summary: 'Confirm' },
        type: { summary: 'string' },
      },
    },
    cancelText: {
      control: 'text',
      description:
        'Custom text for the secondary/cancel button. This button is used to dismiss the modal and abort the action. (Default: "Cancel")',
      table: {
        defaultValue: { summary: 'Cancel' },
        type: { summary: 'string' },
      },
    },
    onConfirm: {
      control: false,
      description:
        'The callback function executed when the user confirms the action.',
      table: {
        type: { summary: '() => void' },
      },
    },
    onCancel: {
      control: false,
      description:
        'The callback function executed when the user cancels the action or dismisses the modal.',
      table: {
        type: { summary: '() => void' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'large'],
      description:
        "Sets the size of the modal's action buttons. This does not affect the modal's overall size.",
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | large' },
      },
    },
  },
  args: {
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export default meta;

type WithIconControls = ConfirmModalProps & {
  iconName: IconNames;
};
export const Playground: StoryObj<WithIconControls> = {
  args: {
    // iconName: 'arrow-up',
    title: 'Confirmation Title',
    content: 'Are you sure?',
  },
  argTypes: {
    iconName: {
      control: { type: 'select' },
      options: iconNames,
      description: 'Name of the start icon',
      table: {
        category: 'Icons',
      },
    },
  },
  render: (args) => {
    const { iconName, ...rest } = args;
    const modalIcon = useMemo(
      () => (iconName ? <Icon name={iconName} /> : undefined),
      [iconName],
    );

    const handleOpenModal = (
      type: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'confirm',
    ) => {
      Modal[type]({
        ...rest,
        icon: modalIcon,
      });
    };

    return (
      <div className="flex items-center gap-4">
        <Button color="success" onClick={() => handleOpenModal('success')}>
          Success modal
        </Button>
        <Button color="info" onClick={() => handleOpenModal('info')}>
          Info modal
        </Button>
        <Button color="warning" onClick={() => handleOpenModal('warning')}>
          Warning modal
        </Button>
        <Button color="danger" onClick={() => handleOpenModal('danger')}>
          Danger modal
        </Button>
        <Button color="primary" onClick={() => handleOpenModal('confirm')}>
          Confirm
        </Button>
        <Button
          color="primary"
          variant="secondary"
          onClick={() => handleOpenModal('primary')}
        >
          Primary modal
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const Playground = () => {  
    const { iconName, ...rest } = args;
    const modalIcon = useMemo(() => <Icon name={iconName}>, [iconName]);

    const handleOpenModal = (type: 'success' | 'info' | 'warning' | 'danger' | 'primary') => {
        Modal[type]({
            icon: modalIcon,
            title: 'Confirmation Title',
            description: 'Are you sure?',
            confirmText: "OK",
            cancelText: "Cancel",
            size: 'default',
            onConfirm: () => {},
            onCancel: () => {},
        });
    }

    return (
        <div className="flex items-center gap-4">
            <Button color="success" onClick={() => handleOpenModal('success')}>Success modal</Button>
            <Button color="info" onClick={() => handleOpenModal('info')}>Info modal</Button>
            <Button color="warning" onClick={() => handleOpenModal('warning')}>Warning modal</Button>
            <Button color="danger" onClick={() => handleOpenModal('danger')}>Danger modal</Button>
            <Button color="primary" onClick={() => handleOpenModal('primary')}>Primary modal</Button>
        </div>
    )
};

    export default Playground;
                    `.trim(),
      },
    },
  },
};

/**
 * A `ModalConfirmContainer` (declarative) nested inside a `Modal`.
 *
 * The confirmation dialog portals into the parent Modal's container via
 * `OverlayContext`, so its overlay correctly covers the parent Modal without
 * z-index conflicts.
 *
 * To verify: open the Modal, click "Delete Item" — the confirmation dialog
 * should appear on top of the outer Modal.
 */
export const ConfirmationInModal: StoryObj<ConfirmModalProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A `ModalConfirmContainer` nested inside a `Modal`. The confirmation dialog portals into the parent Modal's container via `OverlayContext`, so its overlay correctly covers the parent Modal.",
      },
    },
  },
  render: () => {
    const [outerOpen, setOuterOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
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
              Click the button below to trigger a confirmation dialog nested
              inside this modal.
            </p>
            <Button
              size="small"
              color="danger"
              onClick={() => setConfirmOpen(true)}
            >
              Delete Item
            </Button>
            <ModalConfirmContainer
              open={confirmOpen}
              title="Confirm Delete"
              buttonColor="danger"
              confirmText="Delete"
              onConfirm={() => setConfirmOpen(false)}
              onClose={() => setConfirmOpen(false)}
            >
              Are you sure you want to delete this item? This action cannot be
              undone.
            </ModalConfirmContainer>
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
 * A `ModalConfirmContainer` nested inside a `Popper`.
 *
 * The confirmation dialog portals into the Popper's container via
 * `OverlayContext`, so it correctly overlays the dropdown menu.
 *
 * To verify: click "Actions", then click "Delete" — the confirmation dialog
 * should appear on top of the Popper dropdown.
 */
export const ConfirmationInPopper: StoryObj<ConfirmModalProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A `ModalConfirmContainer` nested inside a `Popper`. The confirmation dialog portals into the Popper's container via `OverlayContext`, correctly overlaying the dropdown.",
      },
    },
  },
  render: () => {
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    return (
      <Popper
        content={
          <div className="py-1 flex flex-col w-44">
            <button className="text-sm text-left px-4 py-2 hover:bg-neutral-20 dark:hover:bg-neutral-40-dark">
              Edit
            </button>
            <button
              className="text-sm text-left px-4 py-2 hover:bg-neutral-20 dark:hover:bg-neutral-40-dark text-danger-main"
              onClick={() => setConfirmOpen(true)}
            >
              Delete
            </button>
            <ModalConfirmContainer
              open={confirmOpen}
              title="Confirm Delete"
              buttonColor="danger"
              confirmText="Delete"
              onConfirm={() => setConfirmOpen(false)}
              onClose={() => setConfirmOpen(false)}
            >
              Are you sure you want to delete this item?
            </ModalConfirmContainer>
          </div>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        offset={4}
      >
        <Button>Actions</Button>
      </Popper>
    );
  },
};
