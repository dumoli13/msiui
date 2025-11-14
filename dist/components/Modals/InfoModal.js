import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const InfoModal = ({ icon = (_jsx(Icon, { name: "alert-circle", size: 24, strokeWidth: 3, className: "text-info-main dark:text-info-main-dark" })), title, content, confirmText = 'OK', onConfirm, customAction, }) => {
    const container = document.createElement('div');
    const root = createRoot(container); // Use `!` if you're using TypeScript and are sure `root` exists.
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, { open: true, title: title, icon: icon, onConfirm: () => {
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
            handleClose();
        }, confirmText: confirmText, confirmButtonColor: "info", customAction: customAction, children: content }));
};
export default InfoModal;
