import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
/**
 *
 * A modal component designed to display informational messages to the user. It is used to show information or alerts with
 * an optional confirmation action. The modal features customizable title, content, and confirm button text.
 * It renders an Info modal with a customizable icon (default is a warning icon).
 *
 * @property {ReactNode} [icon] - Optional icon to display in the modal. Defaults to a warning icon.
 * @property {string} title - The title of the modal. This should briefly describe the purpose of the modal.
 * @property {ReactNode} content - The content of the modal, where you can include any additional information or message.
 * @property {string} [confirmText='OK'] - The text displayed on the confirm button.
 * @property {() => void} [onConfirm] - The callback function to be executed when the confirm button is clicked.
 *
 */
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
