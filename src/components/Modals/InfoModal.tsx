import type { ConfirmModalProps } from '../../types';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';

const InfoModal = ({
  icon = (
    <Icon
      name="alert-circle"
      size={24}
      strokeWidth={3}
      className="text-info-main dark:text-info-main-dark"
    />
  ),
  title,
  content,
  confirmText = 'OK',
  onConfirm,
  animation,
  customAction,
}: ConfirmModalProps) => {
  const modal = createModal();
  if (!modal) return;
  const { root, handleClose } = modal;

  root.render(
    <ModalConfirmContainer
      open
      title={title}
      icon={icon}
      animation={animation}
      onConfirm={() => {
        onConfirm?.();
        handleClose();
      }}
      confirmText={confirmText}
      buttonColor="info"
      customAction={customAction}
    >
      {content}
    </ModalConfirmContainer>,
  );
};

export default InfoModal;
