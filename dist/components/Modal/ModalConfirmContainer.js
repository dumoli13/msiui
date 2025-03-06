import React, { useEffect } from 'react';
import cx from 'classnames';
import Button from '../Inputs/Button';
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
const ModalConfirmContainer = ({ open, title, children, icon, className, width = 804, closeOnOverlayClick = false, onClose, cancelText = 'Cancel', cancelButtonColor = 'primary', onConfirm, confirmLoading = false, confirmDisabled = false, confirmText = 'Confirm', confirmButtonColor = 'primary', customAction, }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && onClose) {
            onClose();
        }
        else if (e.key === 'Enter' && onConfirm) {
            onConfirm();
        }
        else if (e.key === 'Tab' && open) {
            e.preventDefault();
        }
    };
    useEffect(() => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.focus();
    }, []);
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);
    if (!open)
        return null;
    return (React.createElement("div", { role: "presentation", id: "modal-container", className: "flex items-center justify-center z-[1300] inset-0 fixed", onKeyDown: handleKeyDown, tabIndex: 0 },
        closeOnOverlayClick ? (React.createElement("div", { role: "button", "aria-label": "Close Modal", onClick: onClose, className: "fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50" })) : (React.createElement("div", { className: "fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50" })),
        React.createElement("div", { className: cx('border border-neutral-40 rounded-xl drop-shadow-sm bg-neutral-10 m-8 flex flex-col max-h-[90vh]', className), style: { width }, tabIndex: -1, onSubmit: onConfirm },
            title && (React.createElement("div", { className: "pt-12 pb-4 px-12 flex items-center gap-4" },
                icon,
                React.createElement("div", { className: "text-40px font-semibold text-neutral-100 w-full break-words" }, title))),
            React.createElement("div", { className: cx('pb-12 px-12 h-full text-neutral-80 text-28px flex-1 overflow-auto', { 'ml-16': !!icon }) }, children),
            React.createElement("div", { className: "px-12 py-6 bg-neutral-20 flex justify-end items-center gap-6 rounded-b-xl" },
                onClose && (React.createElement(Button, { variant: "outlined", onClick: onClose, color: cancelButtonColor }, cancelText)),
                onConfirm && (React.createElement(Button, { type: "button", variant: "contained", onClick: onConfirm, color: confirmButtonColor, loading: confirmLoading, disabled: confirmDisabled }, confirmText)),
                customAction && customAction.map((action) => action)))));
};
export default ModalConfirmContainer;
//# sourceMappingURL=ModalConfirmContainer.js.map