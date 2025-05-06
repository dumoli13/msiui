import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';
/**
 *
 * A flexible and customizable popper component designed to display a floating or dropdown-like content
 * relative to a target element. It can handle positioning and alignment adjustments, including dynamic changes
 * due to screen resizing or scrolling. The popper can also be toggled open or closed, and it supports detecting clicks
 * outside the popper to close it automatically.
 *
 * @interface PopperProps
 * @property {string} [className] - Additional class names to apply to the popper container.
 * @property {boolean} [disabled=false] - A flag that disables the toggle functionality if set to true.
 * @property {ReactNode} content - The content to be displayed inside the popper when open.
 * @property {ReactNode} children - The content or elements to which the component's behavior or functionality is applied.
 * @property {boolean} [open] - A controlled flag that determines whether the popper is visible or not.
 * @property {function} [onOpen] - A callback function that is triggered when the popper is opened or closed.
 * @property {('top' | 'center' | 'bottom')} [verticalAlign='bottom'] - The vertical alignment of the popper relative to the target element.
 * @property {('left' | 'center' | 'right')} [horizontalAlign='left'] - The horizontal alignment of the popper relative to the target element.
 * @property {('top' | 'center' | 'bottom')} [transformOriginVertical='top'] - The vertical transform origin for popper animations.
 * @property {('left' | 'center' | 'right')} [transformOriginHorizontal='left'] - The horizontal transform origin for popper animations.
 *
 */
const Popper = ({ className, disabled = false, content, children, open: openProp, onOpen = () => { }, verticalAlign = 'bottom', horizontalAlign = 'left', transformOriginVertical = 'top', transformOriginHorizontal = 'left', }) => {
    const elementRef = React.useRef(null);
    const popperRef = React.useRef(null);
    const [open, setOpen] = React.useState(openProp !== null && openProp !== void 0 ? openProp : false);
    const [dropdownPosition, setDropdownPosition] = React.useState({
        top: 0,
        left: 0,
        width: 0,
    });
    const isDropdownOpen = openProp !== undefined ? openProp : open;
    const calculateDropdownPosition = React.useCallback(() => {
        if (elementRef.current && popperRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const dropdownRect = popperRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            let top = rect.top + window.scrollY;
            let left = rect.left + window.scrollX;
            // Check and adjust for vertical alignment
            if (verticalAlign === 'top') {
                top = rect.top + window.scrollY - dropdownRect.height;
                if (top < 0) {
                    // If overflow at top, flip to bottom
                    top = rect.bottom + window.scrollY;
                }
            }
            else if (verticalAlign === 'bottom') {
                top = rect.bottom + window.scrollY;
                if (top + dropdownRect.height > viewportHeight) {
                    // If overflow at bottom, flip to top
                    top = rect.top + window.scrollY - dropdownRect.height;
                }
            }
            else if (verticalAlign === 'center') {
                top =
                    rect.top + window.scrollY + rect.height / 2 - dropdownRect.height / 2;
            }
            // Check and adjust for horizontal alignment
            if (horizontalAlign === 'left') {
                left = rect.left + window.scrollX;
                if (left + dropdownRect.width > viewportWidth) {
                    // If overflow on right, flip to left
                    left = rect.right + window.scrollX - dropdownRect.width;
                }
            }
            else if (horizontalAlign === 'right') {
                left = rect.right + window.scrollX - dropdownRect.width;
                if (left < 0) {
                    // If overflow on left, flip to right
                    left = rect.left + window.scrollX;
                }
            }
            else if (horizontalAlign === 'center') {
                left =
                    rect.left + window.scrollX + rect.width / 2 - dropdownRect.width / 2;
            }
            setDropdownPosition({
                top,
                left,
                width: rect.width,
            });
        }
    }, [verticalAlign, horizontalAlign]);
    React.useEffect(() => {
        if (isDropdownOpen) {
            calculateDropdownPosition();
        }
    }, [isDropdownOpen, calculateDropdownPosition]);
    React.useEffect(() => {
        const handleScrollOrResize = () => {
            if (isDropdownOpen) {
                calculateDropdownPosition();
            }
        };
        window.addEventListener('scroll', handleScrollOrResize);
        window.addEventListener('resize', handleScrollOrResize);
        return () => {
            window.removeEventListener('scroll', handleScrollOrResize);
            window.removeEventListener('resize', handleScrollOrResize);
        };
    }, [isDropdownOpen, calculateDropdownPosition]);
    React.useEffect(() => {
        if (openProp !== undefined) {
            setOpen(openProp);
        }
    }, [openProp]);
    React.useEffect(() => {
        onOpen(open);
    }, [open, onOpen]);
    const handleDropdownToggle = () => {
        if (!disabled) {
            setOpen((prev) => !prev);
        }
    };
    const handleClickOutside = (event) => {
        var _a, _b;
        const target = event.target;
        if (!((_a = popperRef.current) === null || _a === void 0 ? void 0 : _a.contains(target)) &&
            !((_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.contains(target))) {
            setOpen(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (_jsxs("div", { className: cx('relative', className), children: [_jsx("div", { ref: elementRef, children: _jsx("div", { role: "button", tabIndex: -1, "aria-pressed": isDropdownOpen ? 'true' : 'false', onClick: handleDropdownToggle, children: children }) }), isDropdownOpen &&
                createPortal(_jsx("div", { ref: popperRef, style: {
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                        transformOrigin: `${transformOriginHorizontal} ${transformOriginVertical}`,
                    }, className: "text-neutral-100 dark:text-neutral-100-dark bg-neutral-10 dark:bg-neutral-30-dark shadow-box-2 rounded-lg p-4 mt-1 absolute z-[100]", children: content }), document.body)] }));
};
export default Popper;
