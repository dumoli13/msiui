import type { ConfirmModalProps } from '../../types';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';

const ConfirmModal = ({
  icon = (
    <Icon
      name="alert-triangle"
      size={24}
      strokeWidth={2}
      className="text-neutral-90 dark:text-neutral-90-dark"
    />
  ),
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  animation,
  ...props
}: ConfirmModalProps) => {
  const modal = createModal();
  if (!modal) return;
  const { root, handleClose } = modal;

  root.render(
    <ModalConfirmContainer
      {...props}
      open
      icon={icon}
      animation={animation}
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
    >
      {content}
    </ModalConfirmContainer>,
  );
};

export default ConfirmModal;
