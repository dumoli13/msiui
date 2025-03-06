import { JSX, ReactNode } from 'react';
import { ButtonColor } from '../Inputs/Button';
export interface ModalProps {
    open: boolean;
    title?: ReactNode;
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
    width?: number;
    closeOnOverlayClick?: boolean;
    onClose?: () => void;
    cancelText?: string;
    cancelButtonColor?: ButtonColor;
    onConfirm?: () => Promise<void> | void;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
    confirmText?: string;
    confirmButtonColor?: ButtonColor;
    customAction?: Array<JSX.Element>;
}
/**
 * ModalConfirmContainer Component
 *
 * A flexible and customizable modal container that can display various content inside a modal with customizable buttons for
 * confirm and cancel actions. It supports closing the modal when clicking on the overlay and handling keyboard interactions.
 *
 * This modal includes focus management, trapping focus inside the modal when it's open, and providing options to customize
 * the modal's width, title, icon, and button actions.
 *
 * @property {boolean} open - A boolean value to determine if the modal should be displayed.
 * @property {ReactNode} [title] - Optional title of the modal.
 * @property {ReactNode} children - Content to be displayed inside the modal.
 * @property {ReactNode} [icon] - Optional icon to be displayed next to the title.
 * @property {string} [className] - Optional additional CSS classes for custom styling.
 * @property {number} [width=804] - Optional custom width for the input field.
 * @property {boolean} [closeOnOverlayClick=false] - Determines whether the modal should close when clicking on the overlay (background).
 * @property {Function} [onClose] - Optional callback function triggered when the notification is closed manually.
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {ButtonColor} [cancelButtonColor='primary'] - The color for the cancel button.
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 * @property {boolean} [confirmLoading=false] - Determines whether the confirm button should show a loading spinner.
 * @property {boolean} [confirmDisabled=false] - Determines whether the confirm button should be disabled.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {ButtonColor} [confirmButtonColor='primary'] - The color for the confirm button.
 *
 */
declare const ModalConfirmContainer: ({ open, title, children, icon, className, width, closeOnOverlayClick, onClose, cancelText, cancelButtonColor, onConfirm, confirmLoading, confirmDisabled, confirmText, confirmButtonColor, customAction, }: ModalProps) => JSX.Element | null;
export default ModalConfirmContainer;
