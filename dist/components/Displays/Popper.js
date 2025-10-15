import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';
const Popper = ({ disabled = false, content, children, open: openProp, onOpen, placement = 'bottom-left', offset = 8, className, style, closeOnClickChild = false, onClickOutside, }) => {
    const elementRef = React.useRef(null);
    const popperRef = React.useRef(null);
    const [open, setOpen] = React.useState(openProp !== null && openProp !== void 0 ? openProp : false);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const isDropdownOpen = openProp !== null && openProp !== void 0 ? openProp : open;
    const calculatePosition = React.useCallback(() => {
        if (!elementRef.current || !popperRef.current)
            return;
        const anchorRect = elementRef.current.getBoundingClientRect();
        const popperRect = popperRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        let newPosition = { top: 0, left: 0 };
        let fixPlacement = placement;
        const { top, bottom, left, right } = anchorRect;
        const { width, height } = popperRect;
        if (top - height - offset < 0) {
            fixPlacement = fixPlacement.replace('top', 'bottom');
        }
        else if (bottom + height + offset > window.innerHeight) {
            fixPlacement = fixPlacement.replace('bottom', 'top');
        }
        if (left + width + offset > window.innerWidth) {
            fixPlacement = fixPlacement.replace('left', 'right');
        }
        else if (right - width - offset < 0) {
            fixPlacement = fixPlacement.replace('right', 'left');
        }
        // Calculate position based on effective placement
        switch (fixPlacement) {
            case 'top':
                newPosition = {
                    top: anchorRect.top + scrollY - popperRect.height - offset,
                    left: anchorRect.left +
                        scrollX +
                        anchorRect.width / 2 -
                        popperRect.width / 2,
                };
                break;
            case 'top-left':
                newPosition = {
                    top: anchorRect.top + scrollY - popperRect.height - offset,
                    left: anchorRect.left + scrollX,
                };
                break;
            case 'top-right':
                newPosition = {
                    top: anchorRect.top + scrollY - popperRect.height - offset,
                    left: anchorRect.right + scrollX - popperRect.width,
                };
                break;
            case 'bottom':
                newPosition = {
                    top: anchorRect.bottom + scrollY + offset,
                    left: anchorRect.left +
                        scrollX +
                        anchorRect.width / 2 -
                        popperRect.width / 2,
                };
                break;
            case 'bottom-left':
                newPosition = {
                    top: anchorRect.bottom + scrollY + offset,
                    left: anchorRect.left + scrollX,
                };
                break;
            case 'bottom-right':
                newPosition = {
                    top: anchorRect.bottom + scrollY + offset,
                    left: anchorRect.right + scrollX - popperRect.width,
                };
                break;
            case 'left':
                newPosition = {
                    top: anchorRect.top +
                        scrollY +
                        anchorRect.height / 2 -
                        popperRect.height / 2,
                    left: anchorRect.left + scrollX - popperRect.width - offset,
                };
                break;
            case 'left-top':
                newPosition = {
                    top: anchorRect.top + scrollY,
                    left: anchorRect.left + scrollX - popperRect.width - offset,
                };
                break;
            case 'left-bottom':
                newPosition = {
                    top: anchorRect.bottom + scrollY - popperRect.height,
                    left: anchorRect.left + scrollX - popperRect.width - offset,
                };
                break;
            case 'right':
                newPosition = {
                    top: anchorRect.top +
                        scrollY +
                        anchorRect.height / 2 -
                        popperRect.height / 2,
                    left: anchorRect.right + scrollX + offset,
                };
                break;
            case 'right-top':
                newPosition = {
                    top: anchorRect.top + scrollY,
                    left: anchorRect.right + scrollX + offset,
                };
                break;
            case 'right-bottom':
                newPosition = {
                    top: anchorRect.bottom + scrollY - popperRect.height,
                    left: anchorRect.right + scrollX + offset,
                };
                break;
        }
        setPosition(newPosition);
    }, [elementRef, placement, offset]);
    React.useEffect(() => {
        calculatePosition();
    }, [isDropdownOpen, calculatePosition]);
    React.useEffect(() => {
        calculatePosition();
        const handleScrollOrResize = () => {
            if (isDropdownOpen) {
                calculatePosition();
            }
        };
        window.addEventListener('scroll', handleScrollOrResize, true);
        window.addEventListener('resize', handleScrollOrResize);
        return () => {
            window.removeEventListener('scroll', handleScrollOrResize, true);
            window.removeEventListener('resize', handleScrollOrResize);
        };
    }, [isDropdownOpen, calculatePosition]);
    React.useEffect(() => {
        if (openProp !== undefined) {
            setOpen(openProp);
        }
    }, [openProp]);
    React.useEffect(() => {
        onOpen === null || onOpen === void 0 ? void 0 : onOpen(open);
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
            onClickOutside === null || onClickOutside === void 0 ? void 0 : onClickOutside();
        }
    };
    const handleContentClick = (e) => {
        // Prevent event from bubbling to document
        e.stopPropagation();
        // Close when any content is clicked
        if (closeOnClickChild)
            setOpen(false);
    };
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const anchorElement = React.cloneElement(children, {
        ['ref']: (node) => {
            elementRef.current = node;
            // Handle original ref if exists
            const childRef = children.ref;
            if (childRef) {
                if (typeof childRef === 'function') {
                    childRef(node);
                }
                else {
                    childRef.current = node;
                }
            }
        },
        ['onClick']: (e) => {
            // Call original onClick handler if it exists
            const childProps = children.props;
            if (childProps.onClick) {
                childProps.onClick(e);
            }
            if (!e.isPropagationStopped() && !disabled) {
                handleDropdownToggle();
            }
        },
        ['aria-expanded']: isDropdownOpen ? 'true' : 'false',
        ['aria-haspopup']: 'dialog',
        ['role']: 'button',
    });
    if (disabled) {
        return children;
    }
    return (_jsxs(_Fragment, { children: [anchorElement, open &&
                createPortal(_jsx("div", { ref: popperRef, style: Object.assign({ top: 0, left: 0, transform: `translate(${position.left}px, ${position.top}px)` }, style), onClick: handleContentClick, className: cx('absolute z-[2200] bg-neutral-10 dark:bg-neutral-30-dark shadow-box-2 rounded-lg', className, {
                        invisible: !open,
                    }), children: content }), document.body)] }));
};
export default Popper;
