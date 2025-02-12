import React, { FormEvent, ReactNode } from 'react';
import { ButtonColor } from '../Inputs/Button';
import { ConfirmModalProps } from './ConfirmModal';
import { DangerModalProps } from './DangerModal';
import { InfoModalProps } from './InfoModal';
import { PrimaryModalProps } from './PrimaryModal';
import { SuccessModalProps } from './SuccessModal';
import { WarningModalProps } from './WarningModal';
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
declare const Modal: ExtendedModal;
export default Modal;
