import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
/**
 *
 * A modal component used to display a success message with a customizable title, content, and a confirm button.
 * The modal includes an icon (default is a success icon) and allows for custom text on the confirm button.
 * It is typically used to inform users that an action has been successfully completed, such as successfully saving data.
 *
 * This component dynamically renders the modal into the DOM and ensures proper cleanup once the modal is closed.
 * It triggers an optional `onConfirm` callback when the user clicks the confirm button.
 *
 * @property {ReactNode} [icon] - An optional icon to be displayed in the modal. If not provided, a default success icon is used.
 * @property {string} title - The title to be displayed at the top of the modal.
 * @property {ReactNode} content - The content or message displayed within the modal.
 * @property {string} [confirmText='OK'] - The text to display on the confirm button (default is "OK").
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 *
 */
const SuccessModal = ({ icon = (_jsx(Icon, { name: "check", size: 24, strokeWidth: 3, className: "text-success-main dark:text-success-main-dark" })), title, content, confirmText = 'OK', onConfirm, customAction, }) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, { open: true, title: title, icon: icon, onConfirm: () => {
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
            handleClose();
        }, confirmText: confirmText, confirmButtonColor: "success", customAction: customAction, children: content }));
};
export default SuccessModal;
