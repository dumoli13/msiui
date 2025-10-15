import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';
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
const ModalContainer = ({ open, children, className, width = 804, height, closeOnOverlayClick = false, onClose, }) => {
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
    }, [open, document.body.style.overflow]);
    React.useEffect(() => {
        if (open && modalRef.current) {
            const timer = setTimeout(() => {
                var _a;
                (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 10);
            return () => clearTimeout(timer);
        }
    }, [open, modalRef.current]);
    if (!open)
        return null;
    return createPortal(_jsxs("div", { role: "dialog", id: "modal-container", className: "flex items-center justify-center z-[1300] inset-0 fixed", onKeyDown: handleKeyDown, ref: modalRef, "aria-modal": "true", tabIndex: -1, children: [closeOnOverlayClick ? (_jsx("div", { role: "button", "aria-label": "Close Modal", onClick: onClose, className: "fixed top-0 left-0 bottom-0 right-0 bg-[#00000080]" })) : (_jsx("div", { className: "fixed top-0 left-0 bottom-0 right-0 bg-[#00000080]" })), _jsx("div", { className: cx('border border-neutral-40 dark:border-neutral-50-dark rounded-md drop-shadow-sm bg-neutral-10 dark:bg-neutral-10-dark m-8 flex flex-col max-h-[90vh] ', className), style: { width, height }, children: children })] }), document.body);
};
export default ModalContainer;
