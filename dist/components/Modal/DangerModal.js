import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
/**
 *
 * A modal dialog that represents a dangerous or critical action that requires confirmation.
 * Typically used for actions like deleting or disabling items, where the user is warned about
 * the potential consequences of their action.
 *
 * @property {ReactNode} [icon] - Optional icon to display in the modal, default is a danger icon (XCircle).
 * @property {string} title - Title of the modal that describes the action.
 * @property {ReactNode} content - The content of the modal, explaining the action in detail.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {() => void | Promise<void>} [onConfirm] - Callback function when the user confirms the action.
 * @property {() => void} [onCancel] - Callback function when the user cancels the action.
 *
 */
const DangerModal = ({ icon = (_jsx(Icon, { name: "x-mark", size: 24, strokeWidth: 3, className: "text-danger-main dark:text-danger-main-dark" })), title, content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, customAction, }) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, { open: true, title: title, icon: icon, onClose: () => {
            onCancel === null || onCancel === void 0 ? void 0 : onCancel();
            handleClose();
        }, onConfirm: () => {
            handleClose();
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
        }, confirmText: confirmText, cancelText: cancelText, confirmButtonColor: "danger", customAction: customAction, children: content }));
};
export default DangerModal;
