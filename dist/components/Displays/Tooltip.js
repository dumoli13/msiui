import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';
/**
 * Tooltips display informative text when users hover over an element
 */
const Tooltip = ({ children, verticalAlign = 'bottom', horizontalAlign = 'center', arrow = true, mouseEnterDelay = 500, mouseLeaveDelay = 0, title, disabled = false, }) => {
    var _a, _b, _c;
    const elementRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [dropdownStyles, setDropdownStyles] = React.useState(null);
    const enterTimeout = React.useRef(null);
    const leaveTimeout = React.useRef(null);
    const calculateDropdownPosition = React.useCallback(() => {
        if (elementRef.current && dropdownRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            let top = rect.top + window.scrollY;
            let left = rect.left + window.scrollX;
            // Vertical alignment
            if (verticalAlign === 'top') {
                top = rect.top + window.scrollY - dropdownRect.height - 12;
                if (top < 0)
                    top = rect.bottom + window.scrollY;
            }
            else if (verticalAlign === 'bottom') {
                top = rect.bottom + window.scrollY;
                if (top + dropdownRect.height > viewportHeight)
                    top = rect.top + window.scrollY - dropdownRect.height;
            }
            else if (verticalAlign === 'center') {
                top =
                    rect.top + window.scrollY + rect.height / 2 - dropdownRect.height / 2;
            }
            // Horizontal alignment
            if (horizontalAlign === 'left') {
                left = rect.left + window.scrollX - 4;
                if (left + dropdownRect.width > viewportWidth)
                    left = rect.right + window.scrollX - dropdownRect.width;
            }
            else if (horizontalAlign === 'right') {
                left = rect.right + window.scrollX - dropdownRect.width + 4;
                if (left < 0)
                    left = rect.left + window.scrollX;
            }
            else if (horizontalAlign === 'center') {
                left =
                    rect.left + window.scrollX + rect.width / 2 - dropdownRect.width / 2;
            }
            setDropdownStyles({
                top,
                left,
                width: rect.width,
                opacity: 1, // Make visible only after position calculation
            });
        }
    }, [verticalAlign, horizontalAlign]);
    React.useEffect(() => {
        if (open) {
            calculateDropdownPosition();
            const handleScrollOrResize = () => calculateDropdownPosition();
            window.addEventListener('scroll', handleScrollOrResize);
            window.addEventListener('resize', handleScrollOrResize);
            return () => {
                window.removeEventListener('scroll', handleScrollOrResize);
                window.removeEventListener('resize', handleScrollOrResize);
            };
        }
        else {
            setDropdownStyles(null);
        }
    }, [open, calculateDropdownPosition]);
    const handleMouseEnter = () => {
        if (leaveTimeout.current)
            clearTimeout(leaveTimeout.current);
        enterTimeout.current = setTimeout(() => setOpen(true), mouseEnterDelay);
    };
    const handleMouseLeave = () => {
        if (enterTimeout.current)
            clearTimeout(enterTimeout.current);
        leaveTimeout.current = setTimeout(() => setOpen(false), mouseLeaveDelay);
    };
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { ref: elementRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, role: "button", tabIndex: -1, className: cx({
                    'cursor-not-allowed': disabled,
                }), children: disabled ? (_jsx("span", { className: "pointer-events-none", children: children })) : (children) }), open &&
                createPortal(_jsxs("div", { ref: dropdownRef, style: {
                        top: (_a = dropdownStyles === null || dropdownStyles === void 0 ? void 0 : dropdownStyles.top) !== null && _a !== void 0 ? _a : 0,
                        left: (_b = dropdownStyles === null || dropdownStyles === void 0 ? void 0 : dropdownStyles.left) !== null && _b !== void 0 ? _b : 0,
                        opacity: (_c = dropdownStyles === null || dropdownStyles === void 0 ? void 0 : dropdownStyles.opacity) !== null && _c !== void 0 ? _c : 0,
                        transformOrigin: 'center center',
                        transition: 'opacity 0.15s ease-out',
                    }, className: "absolute z-[2100] bg-neutral-90 dark:bg-neutral-90-dark text-neutral-10 dark:text-neutral-10-dark rounded-sm px-2 py-1.5 mt-1 text-14px", children: [arrow && (_jsx("div", { className: "absolute bg-neutral-90 dark:bg-neutral-90-dark w-2 h-2 transform rotate-45", style: {
                                top: verticalAlign === 'top'
                                    ? '100%'
                                    : verticalAlign === 'bottom'
                                        ? '-0.375rem'
                                        : '50%',
                                left: horizontalAlign === 'left'
                                    ? '0.75rem'
                                    : horizontalAlign === 'right'
                                        ? 'calc(100% - 0.75rem)'
                                        : '50%',
                                transform: verticalAlign === 'top'
                                    ? 'translate(-50%, -50%) rotate(45deg)'
                                    : verticalAlign === 'bottom'
                                        ? 'translate(-50%, 50%) rotate(45deg)'
                                        : 'rotate(45deg)',
                            } })), title] }), document.body)] }));
};
export default Tooltip;
