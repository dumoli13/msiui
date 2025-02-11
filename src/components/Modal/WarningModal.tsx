import { ReactNode } from 'react';
import COLORS from '@/libs/color';
import { createRoot } from 'react-dom/client';
import { AlertCircle } from 'react-feather';
import ModalConfirmContainer from './ModalConfirmContainer';

interface WarningModalProps {
  icon?: ReactNode;
  title: string;
  content: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

/**
 * WarningModal Component
 *
 * A modal component used to display a warning message with a customizable title, content, and action buttons (confirm and cancel).
 * The modal includes an icon (default is a warning icon) and allows for custom text on the confirm and cancel buttons.
 * It is typically used for alerting users about actions that require confirmation, such as deleting or modifying critical data.
 *
 * This component renders the modal dynamically into the DOM and ensures proper cleanup once the modal is closed.
 * The modal will also trigger an optional `onConfirm` callback when the user confirms the action.
 *
 * @property {ReactNode} [icon] - An optional icon to be displayed in the modal. If not provided, a default warning icon is used.
 * @property {string} title - The title to be displayed at the top of the modal.
 * @property {ReactNode} content - The content or message displayed within the modal.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 *
 * @example Basic Usage:
 * ```tsx
 * WarningModal({
 *   title: 'Are you sure?',
 *   content: 'This action cannot be undone.',
 *   onConfirm: () => {
 *     console.log('Action confirmed');
 *   }
 * });
 * ```
 *
 * @returns {void} The modal is rendered directly into the DOM and doesn't return any JSX from the component itself.
 */

const WarningModal = ({
  icon = (
    <AlertCircle
      height={48}
      width={48}
      strokeWidth={3}
      stroke={COLORS.warning.main}
    />
  ),
  title,
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
}: WarningModalProps) => {
  const container = document.createElement('div');
  const root = createRoot(container);
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
      onClose={handleClose}
      onConfirm={() => {
        onConfirm?.();
        handleClose();
      }}
      confirmText={confirmText}
      cancelText={cancelText}
      confirmButtonColor="warning"
    >
      {content}
    </ModalConfirmContainer>,
  );
};

export default WarningModal;
