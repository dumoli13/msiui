import React from 'react';
import { ModalProps } from '.';
/**
 * ModalContainer Component
 *
 * A flexible modal component that can be used to display content in a modal with customizable title, content, and actions.
 * It supports focus trapping, keyboard navigation (Escape to close, Tab for focus cycling),
 * and the ability to close on overlay click or using a custom close button.
 * It also provides support for confirming actions with a customizable confirm button.
 *
 * @property {boolean} open - Determines whether the modal is open or not. If false, the modal is not rendered.
 * @property {string} title - The title of the modal.
 * @property {ReactNode} children - The content to be displayed inside the modal.
 * @property {ReactNode} [icon] - Optional icon to display next to the title.
 * @property {string} [className] - Optional additional class names for custom styling.
 * @property {number} [width=804] - Optional custom width for the input field.
 * @property {boolean} [closeOnOverlayClick=false] - Whether the modal should close when the overlay (background) is clicked. Defaults to false.
 * @property {Function} [onClose] - Optional callback function triggered when the notification is closed manually.
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {string} [cancelButtonColor='primary'] - The color for the cancel button.
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 * @property {boolean} [confirmLoading=false] - Whether the confirm button should display a loading spinner.
 * @property {boolean} [confirmDisabled=false] - Whether the confirm button should be disabled.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [confirmButtonColor='primary'] - The color for the confirm button.
 *
 * @example Basic Usage:
 * ```tsx
 * <ModalContainer
 *   open={isOpen}
 *   title="Modal Title"
 *   onClose={closeModal}
 *   onConfirm={handleConfirm}
 * >
 *   <p>Modal Content</p>
 * </ModalContainer>
 * ```
 *
 * @returns {JSX.Element|null} The modal component or null if `open` is false.
 */
declare const ModalContainer: ({ open, title, children, icon, className, width, closeOnOverlayClick, onClose, cancelText, cancelButtonColor, onConfirm, confirmLoading, confirmDisabled, confirmText, confirmButtonColor, }: ModalProps) => React.JSX.Element | null;
export default ModalContainer;
