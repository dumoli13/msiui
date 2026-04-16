import type { ConfirmModalProps } from '../../types';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';

const DangerModal = ({
  icon = (
    <Icon
      name="x-mark"
      size={24}
      strokeWidth={3}
      className="text-danger-main dark:text-danger-main-dark"
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
        handleClose();
        onConfirm?.();
      }}
      confirmText={confirmText}
      cancelText={cancelText}
      buttonColor="danger"
    >
      {content}
    </ModalConfirmContainer>,
  );
};
export default DangerModal;
