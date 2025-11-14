import React from 'react';
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
    onConfirm?: () => Promise<void> | void;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
    confirmText?: string;
    confirmButtonColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    customAction?: Array<React.JSX.Element>;
    size?: 'default' | 'large';
}
declare const ModalConfirmContainer: ({ open, title, children, icon, className, width, closeOnOverlayClick, onClose, cancelText, cancelButtonColor, onConfirm, confirmLoading, confirmDisabled, confirmText, confirmButtonColor, customAction, size, }: ModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default ModalConfirmContainer;
//# sourceMappingURL=ModalConfirmContainer.d.ts.map