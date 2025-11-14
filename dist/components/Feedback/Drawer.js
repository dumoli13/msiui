import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';
/**
 * The navigation drawers (or "sidebars") provide ergonomic access to destinations
 * in a site or app functionality such as switching accounts.
 */
const Drawer = ({ className, position = 'left', open, onClose, children, width = 250, height = 'auto', disableBackdropClick = false, disableEscapeKeyDown = false, }) => {
    const drawerRef = React.useRef(null);
    const previouslyFocusedElement = React.useRef(null);
    // Handle escape key press
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && !disableEscapeKeyDown) {
                onClose === null || onClose === void 0 ? void 0 : onClose();
            }
        };
        if (open) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose, disableEscapeKeyDown]);
    // Manage focus when drawer opens/closes
    React.useEffect(() => {
        var _a, _b, _c;
        if (open) {
            previouslyFocusedElement.current = document.activeElement;
            (_a = drawerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
        else {
            (_c = (_b = previouslyFocusedElement.current) === null || _b === void 0 ? void 0 : _b.focus) === null || _c === void 0 ? void 0 : _c.call(_b);
        }
    }, [open]);
    // Prevent body scroll when drawer is open
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
    const drawerStyle = {
        width: position === 'left' || position === 'right' ? width : '100%',
        height: position === 'top' || position === 'bottom' ? height : '100%',
    };
    // Calculate transform based on position
    const getTransform = () => {
        if (!open) {
            switch (position) {
                case 'left':
                    return 'translateX(-100%)';
                case 'right':
                    return 'translateX(100%)';
                case 'top':
                    return 'translateY(-100%)';
                case 'bottom':
                    return 'translateY(100%)';
                default:
                    return '';
            }
        }
        return '';
    };
    return createPortal(_jsxs("div", { className: cx('fixed inset-0 z-[1300] transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0 pointer-events-none'), children: [_jsx("div", { className: cx('fixed inset-0 bg-neutral-100/50 transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0'), "aria-hidden": "true", onClick: disableBackdropClick ? undefined : onClose }), _jsx("div", { ref: drawerRef, className: cx('bg-neutral-15 dark:bg-neutral-15-dark fixed shadow-xl', 'transition-all duration-300 ease-in-out transform', 'focus:outline-none', // for accessibility
                {
                    'left-0 top-0': position === 'left',
                    'right-0 top-0': position === 'right',
                    'top-0 left-0 right-0': position === 'top',
                    'bottom-0 left-0 right-0': position === 'bottom',
                }, className), style: Object.assign(Object.assign(Object.assign({}, drawerStyle), { transform: getTransform() }), (open ? { transform: 'translateX(0)' } : {})), role: "dialog", "aria-modal": "true", tabIndex: -1, children: children })] }), document.body);
};
export default Drawer;
