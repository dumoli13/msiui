import { ConfirmModalProps } from './ConfirmModal';
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
declare const PrimaryModal: ({ title, content, confirmText, cancelText, onConfirm, customAction, }: ConfirmModalProps) => void;
export default PrimaryModal;
//# sourceMappingURL=PrimaryModal.d.ts.map