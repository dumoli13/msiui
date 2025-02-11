import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import ModalConfirmContainer from './ModalConfirmContainer';

interface PrimaryModalProps {
  icon?: ReactNode;
  title: string;
  content: ReactNode;
  confirmText?: string;
  cancelText?: string;
  action?: (onClose: () => void) => ReactNode;
  onConfirm?: () => Promise<void> | void;
}

/**
 * PrimaryModal Component
 *
 * A modal component used to display a primary action confirmation with customizable title, content, and confirm/cancel buttons.
 * The modal includes an icon (optional) and allows custom text for both the confirm and cancel buttons.
 * The primary action can be executed by calling an optional `onConfirm` callback function when the confirm button is clicked.
 * The modal is rendered dynamically into the DOM and ensures proper cleanup once it is closed.
 *
 * @property {ReactNode} [icon] - An optional icon to be displayed in the modal. If not provided, no icon is displayed.
 * @property {string} title - The title to be displayed at the top of the modal.
 * @property {ReactNode} content - The content or message to be displayed within the modal.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 *
 * @example Basic Usage:
 * ```tsx
 * PrimaryModal({
 *   title: 'Are you sure?',
 *   content: 'This action cannot be undone.',
 *   onConfirm: async () => {
 *     await someAsyncAction();
 *     console.log('Action confirmed');
 *   }
 * });
 * ```
 *
 * @returns {void} The modal is rendered directly into the DOM and doesn't return any JSX from the component itself.
 */

const PrimaryModal = ({
  title,
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  action,
}: PrimaryModalProps) => {
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
      onClose={handleClose}
      onConfirm={
        onConfirm
          ? () => {
              onConfirm();
              handleClose();
            }
          : undefined
      }
      confirmText={confirmText}
      cancelText={cancelText}
      confirmButtonColor="primary"
      action={action ? action(handleClose) : null}
    >
      {content}
    </ModalConfirmContainer>,
  );
};

export default PrimaryModal;
