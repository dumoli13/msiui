import React, { FormEvent, ReactNode } from 'react';
import { ButtonColor } from '../Input/Button';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';
import DangerModal, { DangerModalProps } from './DangerModal';
import InfoModal, { InfoModalProps } from './InfoModal';
import ModalContainer from './ModalContainer';
import PrimaryModal, { PrimaryModalProps } from './PrimaryModal';
import SuccessModal, { SuccessModalProps } from './SuccessModal';
import WarningModal, { WarningModalProps } from './WarningModal';

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

interface ExtendedModal extends React.FC<ModalProps> {
  confirm: (props: ConfirmModalProps) => void;
  success: (props: SuccessModalProps) => void;
  info: (props: InfoModalProps) => void;
  warning: (props: WarningModalProps) => void;
  danger: (props: DangerModalProps) => void;
  primary: (props: PrimaryModalProps) => void;
}

const Modal: ExtendedModal = ({ open, ...props }: ModalProps) => {
  return <ModalContainer {...props} open={open} />;
};

Modal.confirm = ConfirmModal;
Modal.success = SuccessModal;
Modal.info = InfoModal;
Modal.warning = WarningModal;
Modal.danger = DangerModal;
Modal.primary = PrimaryModal;

export default Modal;
