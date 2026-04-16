import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { Portal } from '../Portal';
/**
 * Tooltips display informative text when users hover over an element
 */
const Tooltip = ({ children, verticalAlign = 'bottom', horizontalAlign = 'center', arrow = true, mouseEnterDelay = 500, mouseLeaveDelay = 0, title, disabled = false, }) => {
    const tooltipId = React.useId();
    const elementRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [dropdownStyles, setDropdownStyles] = React.useState(null);
    const enterTimeout = React.useRef(null);
    const leaveTimeout = React.useRef(null);
    const calculateDropdownPosition = React.useCallback(() => {
        if (!elementRef.current || !dropdownRef.current)
            return;
        const rect = elementRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        // Tooltip uses `position: fixed` — coordinates are always viewport-relative.
        // getBoundingClientRect() already returns viewport coordinates, so scroll
        // offsets are never needed regardless of where the tooltip is portaled.
        let top = rect.top;
        let left = rect.left;
        // Vertical alignment
        if (verticalAlign === 'top') {
            top = rect.top - dropdownRect.height - 12;
            if (top < 0)
                top = rect.bottom;
        }
        else if (verticalAlign === 'bottom') {
            top = rect.bottom;
            if (top + dropdownRect.height > viewportHeight)
                top = rect.top - dropdownRect.height;
        }
        else if (verticalAlign === 'center') {
            top = rect.top + rect.height / 2 - dropdownRect.height / 2;
        }
        // Horizontal alignment
        if (horizontalAlign === 'left') {
            left = rect.left - 4;
            if (left + dropdownRect.width > viewportWidth)
                left = rect.right - dropdownRect.width;
        }
        else if (horizontalAlign === 'right') {
            left = rect.right - dropdownRect.width + 4;
            if (left < 0)
                left = rect.left;
        }
        else if (horizontalAlign === 'center') {
            left = rect.left + rect.width / 2 - dropdownRect.width / 2;
        }
        setDropdownStyles({
            top,
            left,
            width: rect.width,
            opacity: 1,
        });
    }, [verticalAlign, horizontalAlign]);
    React.useEffect(() => {
        if (open) {
            const frameId = requestAnimationFrame(() => {
                calculateDropdownPosition();
            });
            const handleScrollOrResize = () => {
                calculateDropdownPosition();
            };
            window.addEventListener('scroll', handleScrollOrResize);
            window.addEventListener('resize', handleScrollOrResize);
            return () => {
                cancelAnimationFrame(frameId);
                window.removeEventListener('scroll', handleScrollOrResize);
                window.removeEventListener('resize', handleScrollOrResize);
            };
        }
        setDropdownStyles(null);
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
    return (_jsxs("div", { className: "relative", children: [_jsx("span", { ref: elementRef, role: "button", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onFocus: handleMouseEnter, onBlur: handleMouseLeave, "aria-describedby": open ? tooltipId : undefined, tabIndex: 0, className: cx({
                    'cursor-not-allowed': disabled,
                }), children: disabled ? (_jsx("span", { className: "pointer-events-none", children: children })) : (children) }), open && (_jsx(Portal, { children: _jsxs("div", { ref: dropdownRef, style: {
                        top: dropdownStyles?.top ?? 0,
                        left: dropdownStyles?.left ?? 0,
                        opacity: dropdownStyles?.opacity ?? 0,
                        transformOrigin: 'center center',
                        transition: 'opacity 0.15s ease-out',
                    }, role: "tooltip", id: tooltipId, className: "fixed z-[2100] bg-neutral-90 dark:bg-neutral-90-dark text-neutral-10 dark:text-neutral-10-dark rounded-sm px-2 py-1.5 mt-1 text-14px", children: [arrow && (_jsx("div", { className: "absolute bg-neutral-90 dark:bg-neutral-90-dark w-2 h-2 transform rotate-45", style: {
                                top: (() => {
                                    if (verticalAlign === 'top')
                                        return '100%';
                                    if (verticalAlign === 'bottom')
                                        return '-0.375rem';
                                    return '50%';
                                })(),
                                left: (() => {
                                    if (horizontalAlign === 'left')
                                        return '0.75rem';
                                    if (horizontalAlign === 'right')
                                        return 'calc(100% - 0.75rem)';
                                    return '50%';
                                })(),
                                transform: (() => {
                                    if (verticalAlign === 'top')
                                        return 'translate(-50%, -50%) rotate(45deg)';
                                    if (verticalAlign === 'bottom')
                                        return 'translate(-50%, 50%) rotate(45deg)';
                                    return 'rotate(45deg)';
                                })(),
                            } })), title] }) }))] }));
};
export default Tooltip;
