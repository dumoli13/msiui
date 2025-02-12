import { ReactNode } from 'react';
export interface InfoModalProps {
    icon?: ReactNode;
    title: string;
    content: ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
}
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
declare const InfoModal: ({ icon, title, content, confirmText, onConfirm, }: InfoModalProps) => void;
export default InfoModal;
