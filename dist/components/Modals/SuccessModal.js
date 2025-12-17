import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const SuccessModal = ({ icon = (_jsx(Icon, { name: "check", size: 24, strokeWidth: 3, className: "text-success-main dark:text-success-main-dark" })), content, confirmText = 'OK', onConfirm, customAction, ...props }) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, { ...props, open: true, icon: icon, onConfirm: () => {
            onConfirm?.();
            handleClose();
        }, confirmText: confirmText, confirmButtonColor: "success", customAction: customAction, children: content }));
};
export default SuccessModal;
