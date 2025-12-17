import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const ConfirmModal = ({ icon = (_jsx(Icon, { name: "alert-triangle", size: 24, strokeWidth: 2, className: "text-neutral-90 dark:text-neutral-90-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, ...props }) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, { ...props, open: true, icon: icon, onClose: () => {
            onCancel?.();
            handleClose();
        }, onConfirm: () => {
            onConfirm?.();
            handleClose();
        }, confirmText: confirmText, cancelText: cancelText, children: content }));
};
export default ConfirmModal;
