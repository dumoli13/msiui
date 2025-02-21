import React, { JSX, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertTriangle } from 'react-feather';
import COLORS from '../../libs/color';
import ModalConfirmContainer from './ModalConfirmContainer';

export interface ConfirmModalProps {
  icon?: ReactNode;
  title: string;
  content: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  customAction?: Array<JSX.Element>;
}

/**
 * 
 * A modal dialog to request confirmation from the user for an action, such as deleting or updating
 * an item. This modal typically presents a warning message and two options for the user: Confirm or Cancel.
 *
 * @property {ReactNode} [icon] - Optional icon to display in the modal, default is a warning icon (AlertTriangle).
 * @property {string} title - The title of the modal that describes the action to be confirmed.
 * @property {ReactNode} content - The content of the modal, explaining the action in more detail.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {() => void} [onConfirm] - Callback function called when the user confirms the action.
 * @property {() => void} [onCancel] - Callback function called when the user cancels the action or closes the modal.
 
 */
const ConfirmModal = ({
  icon = (
    <AlertTriangle
      height={48}
      width={48}
      fill={COLORS.neutral[90]}
      stroke={COLORS.neutral[10]}
    />
  ),
  title,
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  customAction,
}: ConfirmModalProps) => {
  const container = document.createElement('div');
  const root = createRoot(container); // Use `!` if you're using TypeScript and are sure `root` exists.
  document.body.appendChild(container);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(container);
  };

  root.render(
    <ModalConfirmContainer
      open
      title={title}
      icon={icon}
      onClose={() => {
        onCancel?.();
        handleClose();
      }}
      onConfirm={() => {
        onConfirm?.();
        handleClose();
      }}
      confirmText={confirmText}
      cancelText={cancelText}
      customAction={customAction}
    >
      {content}
    </ModalConfirmContainer>,
  );
};

export default ConfirmModal;
