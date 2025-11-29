import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const WarningModal = ({ icon = (_jsx(Icon, { name: "alert-circle", size: 24, strokeWidth: 3, className: "text-warning-main dark:text-warning-main-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, ...props }) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, { ...props, open: true, icon: icon, onClose: handleClose, onConfirm: () => {
            onConfirm?.();
            handleClose();
        }, confirmText: confirmText, cancelText: cancelText, confirmButtonColor: "warning", children: content }));
};
export default WarningModal;
