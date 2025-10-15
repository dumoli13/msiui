import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import ModalConfirmContainer from './ModalConfirmContainer';
/**
 *
 * A modal component used to display a primary action confirmation with customizable title, content, and confirm/cancel buttons.
 * The modal includes an icon (optional) and allows custom text for both the confirm and cancel buttons.
 * The primary action can be executed by calling an optional `onConfirm` callback function when the confirm button is clicked.
 * The modal is rendered dynamically into the DOM and ensures proper cleanup once it is closed.
 *
 * @property {ReactNode} [icon] - An optional icon to be displayed in the modal. If not provided, no icon is displayed.
 * @property {string} title - The title to be displayed at the top of the modal.
 * @property {ReactNode} content - The content or message to be displayed within the modal.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 *
 */
const PrimaryModal = (_a) => {
    var { content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm } = _a, props = __rest(_a, ["content", "confirmText", "cancelText", "onConfirm"]);
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, Object.assign({}, props, { open: true, onClose: handleClose, onConfirm: onConfirm
            ? () => {
                onConfirm();
                handleClose();
            }
            : undefined, confirmText: confirmText, cancelText: cancelText, confirmButtonColor: "primary", children: content })));
};
export default PrimaryModal;
