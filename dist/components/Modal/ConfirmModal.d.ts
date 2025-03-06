import { JSX, ReactNode } from 'react';
export interface ConfirmModalProps {
    icon?: ReactNode;
    title: string;
    content: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
    customAction?: Array<JSX.Element>;
}
/**
 *
 * A modal dialog to request confirmation from the user for an action, such as deleting or updating
 * an item. This modal typically presents a warning message and two options for the user: Confirm or Cancel.
 *
 * @property {ReactNode} [icon] - Optional icon to display in the modal, default is a warning icon (AlertTriangle).
 * @property {string} title - The title of the modal that describes the action to be confirmed.
 * @property {ReactNode} content - The content of the modal, explaining the action in more detail.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {() => void} [onConfirm] - Callback function called when the user confirms the action.
 * @property {() => void} [onCancel] - Callback function called when the user cancels the action or closes the modal.
 *
 */
declare const ConfirmModal: ({ icon, title, content, confirmText, cancelText, onConfirm, onCancel, customAction, }: ConfirmModalProps) => void;
export default ConfirmModal;
