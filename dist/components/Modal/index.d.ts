import React from 'react';
import { ConfirmModalProps } from './ConfirmModal';
export interface ModalProps {
    open: boolean;
    title?: React.ReactNode;
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    width?: number;
    closeOnOverlayClick?: boolean;
    onClose?: () => void;
    cancelText?: string;
    cancelButtonColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    onConfirm?: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
    confirmText?: string;
    confirmButtonColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    customAction?: Array<React.JSX.Element>;
    footer?: React.ReactNode;
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
//# sourceMappingURL=index.d.ts.map