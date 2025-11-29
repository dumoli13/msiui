import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const DangerModal = ({ icon = (_jsx(Icon, { name: "x-mark", size: 24, strokeWidth: 3, className: "text-danger-main dark:text-danger-main-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, ...props }) => {
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
            handleClose();
            onConfirm?.();
        }, confirmText: confirmText, cancelText: cancelText, confirmButtonColor: "danger", children: content }));
};
export default DangerModal;
