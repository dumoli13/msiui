import React from 'react';
import { createRoot } from 'react-dom/client';
import { AlertCircle } from 'react-feather';
import { COLORS } from '../../libs';
import ModalConfirmContainer from './ModalConfirmContainer';
/**
 * InfoModal Component
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
 * @example Basic Usage:
 * ```tsx
 * <InfoModal
 *   title="Information"
 *   content="This is an informational message."
 *   onConfirm={() => console.log('Confirmed!')}
 * />
 * ```
 *
 * @returns {void} The modal is rendered to the body element and will be automatically cleaned up when the user confirms.
 */
const InfoModal = ({ icon = (React.createElement(AlertCircle, { height: 48, width: 48, strokeWidth: 3, stroke: COLORS.info.main })), title, content, confirmText = 'OK', onConfirm, }) => {
    const container = document.createElement('div');
    const root = createRoot(container); // Use `!` if you're using TypeScript and are sure `root` exists.
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(React.createElement(ModalConfirmContainer, { open: true, title: title, icon: icon, onConfirm: () => {
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
            handleClose();
        }, confirmText: confirmText, confirmButtonColor: "info" }, content));
};
export default InfoModal;
//# sourceMappingURL=InfoModal.js.map