import React from 'react';
import { ConfirmModalProps } from './ConfirmModal';
export interface ModalProps {
    open: boolean;
    children: React.ReactNode;
    className?: string;
    width?: string | number;
    height?: string | number;
    closeOnOverlayClick?: boolean;
    onClose?: () => void;
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
//# sourceMappingURL=Modal.d.ts.map