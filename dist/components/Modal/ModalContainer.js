import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { Button } from '../Inputs';
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
 * @property {number} [width=804] - Optional custom width for the input field (in px).
 * @property {boolean} [closeOnOverlayClick=false] - Whether the modal should close when the overlay (background) is clicked. Defaults to false.
 * @property {Function} [onClose] - Optional callback function triggered when the notification is closed manually.
 * @property {string} [cancelText='Cancel'] - The text to display on the cancel button (default is "Cancel").
 * @property {string} [cancelButtonColor='primary'] - The color for the cancel button.
 * @property {Function} [onConfirm] - An optional callback function that is called when the confirm button is clicked.
 * @property {boolean} [confirmLoading=false] - Whether the confirm button should display a loading spinner.
 * @property {boolean} [confirmDisabled=false] - Whether the confirm button should be disabled.
 * @property {string} [confirmText='Confirm'] - The text to be displayed on the confirm button (default is "Confirm").
 * @property {string} [confirmButtonColor='primary'] - The color for the confirm button.
 * @property {ReactNode} [footer] - Optional footer content to be displayed at the bottom of the modal.
 *
 */
const ModalContainer = ({ open, title, children, icon, className, width = 804, closeOnOverlayClick = false, onClose, cancelText = 'Cancel', cancelButtonColor = 'primary', onConfirm, confirmLoading = false, confirmDisabled = false, confirmText = 'Confirm', confirmButtonColor = 'primary', customAction, footer, }) => {
    const modalRef = React.useRef(null);
    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && onClose) {
            onClose();
        }
        else if (e.key === 'Tab' && open) {
            trapFocus(e);
        }
    };
    const trapFocus = (e) => {
        if (!modalRef.current)
            return;
        const focusableElements = modalRef.current.querySelectorAll("a, button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])");
        if (focusableElements.length === 0)
            return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
        else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    };
    React.useEffect(() => {
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
    return (_jsxs("div", { role: "none", id: "modal-container", className: "flex items-center justify-center z-[1300] inset-0 fixed", onKeyDown: handleKeyDown, ref: modalRef, children: [closeOnOverlayClick ? (_jsx("div", { role: "button", "aria-label": "Close Modal", onClick: onClose, className: "fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50" })) : (_jsx("div", { className: "fixed top-0 left-0 bottom-0 right-0 bg-neutral-100/50" })), _jsxs("form", { className: cx('border border-neutral-40 dark:border-neutral-50-dark rounded-md drop-shadow-sm bg-neutral-10 dark:bg-neutral-10-dark m-8 flex flex-col max-h-[90vh] ', className), style: { width }, tabIndex: -1, onSubmit: onConfirm, children: [_jsxs("div", { className: "pt-6 pb-2 px-6 flex items-center gap-4", children: [icon, _jsx("div", { className: "text-20px font-semibold text-neutral-100 dark:text-neutral-100-dark w-full break-words", children: title })] }), _jsx("div", { className: cx('pb-4 px-6 h-full text-neutral-80 dark:text-neutral-90-dark text-14px flex-1 overflow-auto', { 'ml-16': !!icon }), children: children }), footer || (_jsx("div", { className: "px-6 py-3 bg-neutral-20 dark:bg-neutral-30-dark flex justify-end items-center gap-3 rounded-b-md", children: customAction ? (customAction.map((action) => action)) : (_jsxs(_Fragment, { children: [onClose && (_jsx(Button, { variant: "outlined", onClick: onClose, color: cancelButtonColor, size: "large", children: cancelText })), onConfirm && (_jsx(Button, { type: "submit", variant: "contained", color: confirmButtonColor, loading: confirmLoading, disabled: confirmDisabled, size: "large", children: confirmText }))] })) }))] })] }));
};
export default ModalContainer;
