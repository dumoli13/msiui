import { ReactNode } from 'react';
import COLORS from '@/libs/color';
import { createRoot } from 'react-dom/client';
import { CheckCircle } from 'react-feather';
import ModalConfirmContainer from './ModalConfirmContainer';

interface SuccessModalProps {
  icon?: ReactNode;
  title: string;
  content: ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
}

/**
 * SuccessModal Component
 *
 * A modal component used to display a success message with a customizable title, content, and a confirm button.
 * The modal includes an icon (default is a success icon) and allows for custom text on the confirm button.
 * It is typically used to inform users that an action has been successfully completed, such as successfully saving data.
 *
 * This component dynamically renders the modal into the DOM and ensures proper cleanup once the modal is closed.
 * It triggers an optional `onConfirm` callback when the user clicks the confirm button.
 *
 * @property {ReactNode} [icon] - An optional icon to be displayed in the modal. If not provided, a default success icon is used.
 * @property {string} title - The title to be displayed at the top of the modal.
 * @property {ReactNode} content - The content or message displayed within the modal.
 * @property {string} [confirmText='OK'] - The text to display on the confirm button (default is "OK").
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 *
 * @example Basic Usage:
 * ```tsx
 * SuccessModal({
 *   title: 'Action Successful',
 *   content: 'Your changes have been saved successfully.',
 *   onConfirm: () => {
 *     console.log('Success action confirmed');
 *   }
 * });
 * ```
 *
 * @returns {void} The modal is rendered directly into the DOM and doesn't return any JSX from the component itself.
 */

const SuccessModal = ({
  icon = (
    <CheckCircle
      height={48}
      width={48}
      strokeWidth={3}
      stroke={COLORS.success.main}
    />
  ),
  title,
  content,
  confirmText = 'OK',
  onConfirm,
}: SuccessModalProps) => {
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
      onConfirm={() => {
        onConfirm?.();
        handleClose();
      }}
      confirmText={confirmText}
      confirmButtonColor="success"
    >
      {content}
    </ModalConfirmContainer>,
  );
};

export default SuccessModal;
