import { FormEvent, ReactNode } from 'react';
import { ButtonColor } from '../Button';
import ConfirmModal from './ConfirmModal';
import DangerModal from './DangerModal';
import InfoModal from './InfoModal';
import ModalContainer from './ModalContainer';
import PrimaryModal from './PrimaryModal';
import SuccessModal from './SuccessModal';
import WarningModal from './WarningModal';

export interface ModalProps {
  open: boolean;
  title?: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  width?: number;

  closeOnOverlayClick?: boolean;
  onClose?: () => void;
  cancelText?: string;
  cancelButtonColor?: ButtonColor;

  onConfirm?: (e: FormEvent<HTMLFormElement>) => Promise<void> | void;
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
  confirmText?: string;
  confirmButtonColor?: ButtonColor;
  action?: ReactNode;
}

const Modal = ({ open, ...props }: ModalProps) => {
  return <ModalContainer {...props} open={open} />;
};

Modal.confirm = ConfirmModal;
Modal.success = SuccessModal;
Modal.info = InfoModal;
Modal.warning = WarningModal;
Modal.danger = DangerModal;
Modal.primary = PrimaryModal;

export default Modal;
