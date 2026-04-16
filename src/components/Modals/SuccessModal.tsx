import type { ConfirmModalProps } from '../../types';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';

const SuccessModal = ({
  icon = (
    <Icon
      name="check"
      size={24}
      strokeWidth={3}
      className="text-success-main dark:text-success-main-dark"
    />
  ),
  content,
  confirmText = 'OK',
  onConfirm,
  customAction,
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
      onConfirm={() => {
        onConfirm?.();
        handleClose();
      }}
      confirmText={confirmText}
      buttonColor="success"
      customAction={customAction}
    >
      {content}
    </ModalConfirmContainer>,
  );
};

export default SuccessModal;
