import { ReactNode } from 'react';
export interface DangerModalProps {
    icon?: ReactNode;
    title: string;
    content: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
}
/**
 * DangerModal Component
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
 * @example Basic Usage:
 * ```tsx
 * <DangerModal
 *   title="Are you sure?"
 *   content="This action cannot be undone. Do you wish to continue?"
 *   onConfirm={() => deleteItem(itemId)}
 *   onCancel={() => console.log("Action canceled")}
 * />
 * ```
 *
 * @returns {JSX.Element} The rendered danger modal component.
 */
declare const DangerModal: ({ icon, title, content, confirmText, cancelText, onConfirm, onCancel, }: DangerModalProps) => void;
export default DangerModal;
