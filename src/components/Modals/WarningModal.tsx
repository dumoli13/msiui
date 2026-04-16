import type { ConfirmModalProps } from '../../types';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';

const WarningModal = ({
  icon = (
    <Icon
      name="alert-circle"
      size={24}
      strokeWidth={3}
      className="text-warning-main dark:text-warning-main-dark"
    />
  ),
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
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
      onClose={handleClose}
      animation={animation}
      onConfirm={() => {
        onConfirm?.();
        handleClose();
      }}
      confirmText={confirmText}
      cancelText={cancelText}
      buttonColor="warning"
    >
      {content}
    </ModalConfirmContainer>,
  );
};

export default WarningModal;
