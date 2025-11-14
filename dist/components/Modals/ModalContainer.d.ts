import React from 'react';
import { ModalProps } from '../../types';
/**
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
 * @property {string | number} [width=804] - Optional custom width for the input field.
 * @property {string | number} - Optional custom height for the input field.
 * @property {boolean} [closeOnOverlayClick=false] - Whether the modal should close when the overlay (background) is clicked. Defaults to false.
 * @property {Function} [onClose] - Optional callback function triggered when the notification is closed manually.
 *
 */
declare const ModalContainer: ({ open, children, className, width, height, closeOnOverlayClick, onClose, }: ModalProps) => React.ReactPortal | null;
export default ModalContainer;
//# sourceMappingURL=ModalContainer.d.ts.map