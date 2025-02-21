import React, { FormEvent, JSX, ReactNode } from 'react';
import { ButtonColor } from '../Inputs/Button';
import { ConfirmModalProps } from './ConfirmModal';
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
    customAction?: Array<JSX.Element>;
}
interface ExtendedModal extends React.FC<ModalProps> {
    confirm: (props: ConfirmModalProps) => void;
    success: (props: ConfirmModalProps) => void;
    info: (props: ConfirmModalProps) => void;
    warning: (props: ConfirmModalProps) => void;
    danger: (props: ConfirmModalProps) => void;
    primary: (props: ConfirmModalProps) => void;
}
declare const Modal: ExtendedModal;
export default Modal;
