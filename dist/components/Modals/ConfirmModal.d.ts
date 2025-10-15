import React from 'react';
export interface ConfirmModalProps {
    icon?: React.ReactNode;
    title: string;
    content: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
    customAction?: Array<React.JSX.Element>;
    size?: 'default' | 'large';
}
declare const ConfirmModal: ({ icon, content, confirmText, cancelText, onConfirm, onCancel, ...props }: ConfirmModalProps) => void;
export default ConfirmModal;
//# sourceMappingURL=ConfirmModal.d.ts.map