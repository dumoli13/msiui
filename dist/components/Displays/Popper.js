import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import gsap from 'gsap';
import { createPortal } from 'react-dom';
import { OverlayContext } from '../../context/OverlayContext';
import getTransitionVars, { resolveAnimation } from '../../libs/transition';
const flipHorizontal = (h) => {
    if (h === 'left')
        return 'right';
    if (h === 'right')
        return 'left';
    return 'center';
};
const flipVertical = (v) => {
    if (v === 'top')
        return 'bottom';
    if (v === 'bottom')
        return 'top';
    return 'center';
};
/**
 * Module-level registry: portal div → anchor element.
 *
 * Each open Popper registers its portal div here so that parent Poppers
 * can detect clicks inside a child portal (which is a DOM sibling of the
 * parent portal, not a descendant, because both are portaled to document.body).
 */
const openPopperRegistry = new Map();
const Popper = ({ disabled = false, trigger = 'click', content, children, open: openProp, onOpen, anchorOrigin = { vertical: 'bottom', horizontal: 'left' }, transformOrigin = { vertical: 'top', horizontal: 'left' }, offset = 0, className, style, onClickOutside, animation = [
    {
        duration: 0.3,
        ease: 'power2.in',
        transition: 'grow',
        transformOrigin: 'top left',
    },
    {
        duration: 0.25,
        ease: 'power2.in',
        transition: 'grow',
        transformOrigin: 'top left',
    },
], }) => {
    const elementRef = React.useRef(null);
    const popperRef = React.useRef(null);
    const [isClosing, setIsClosing] = React.useState(false);
    const { animDuration, animEase, animTransition, animTransformOrigin, animDurationOut, animEaseOut, animTransformOriginOut, } = resolveAnimation(animation);
    const vars = getTransitionVars(animTransition, animTransformOrigin, animTransformOriginOut);
    // Read parent overlay context: where to portal + which coordinate space.
    const { container: parentContainer, isFixed: parentIsFixed } = React.useContext(OverlayContext);
    // useState so OverlayContext consumers re-render when the element mounts.
    const [popperContainer, setPopperContainer] = React.useState(null);
    // Dual ref: keeps popperRef.current in sync (for synchronous reads in
    // click-outside / registry / position calc) and triggers a state update
    // so OverlayContext gets the real element after first render.
    const setPopperRef = React.useCallback((el) => {
        popperRef.current = el;
        setPopperContainer(el);
        if (el) {
            const inner = el.firstElementChild;
            if (inner && !isClosing) {
                gsap.fromTo(inner, vars.from, {
                    ...vars.to,
                    duration: animDuration,
                    ease: animEase,
                });
            }
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animation config intentionally excluded
    [isClosing]);
    const triggerClose = React.useCallback(() => {
        if (!popperRef.current)
            return;
        const inner = popperRef.current.firstElementChild;
        setIsClosing(true);
        if (openProp === undefined) {
            setInternalOpen(false);
        }
        if (inner) {
            gsap.to(inner, {
                ...vars.fromOut,
                duration: animDurationOut,
                ease: animEaseOut,
                onComplete: () => {
                    setIsClosing(false);
                    if (openProp === undefined) {
                        setInternalOpen(false);
                    }
                },
            });
        }
        else {
            setIsClosing(false);
            if (openProp === undefined) {
                setInternalOpen(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- animation config intentionally excluded
    }, [openProp]);
    const [internalOpen, setInternalOpen] = React.useState(openProp ?? false);
    const [position, setPosition] = React.useState({
        top: 0,
        left: 0,
    });
    const isDropdownOpen = openProp ?? internalOpen;
    const shouldRender = isDropdownOpen || isClosing;
    const getAnchorPoint = (rect, origin) => {
        let x = rect.left;
        let y = rect.top;
        if (origin.horizontal === 'center') {
            x = rect.left + rect.width / 2;
        }
        if (origin.horizontal === 'right') {
            x = rect.right;
        }
        if (origin.vertical === 'center') {
            y = rect.top + rect.height / 2;
        }
        if (origin.vertical === 'bottom') {
            y = rect.bottom;
        }
        return { x, y };
    };
    const getTransformOffset = (rect, origin) => {
        let x = 0;
        let y = 0;
        if (origin.horizontal === 'center') {
            x = rect.width / 2;
        }
        if (origin.horizontal === 'right') {
            x = rect.width;
        }
        if (origin.vertical === 'center') {
            y = rect.height / 2;
        }
        if (origin.vertical === 'bottom') {
            y = rect.height;
        }
        return { x, y };
    };
    const calculatePosition = React.useCallback(() => {
        if (!elementRef.current || !popperRef.current) {
            return;
        }
        const anchorRect = elementRef.current.getBoundingClientRect();
        const popperRect = popperRef.current.getBoundingClientRect();
        // Determine the containing block's viewport-space origin.
        //
        // CSS `position: absolute` is offset from the nearest positioned ancestor.
        // The child Popper's portal div may live inside:
        //   • document.body  → containing block is the ICB, whose viewport origin
        //                       is (-scrollX, -scrollY).
        //   • a parent Popper's div (position:absolute) or a Modal overlay
        //                     (position:fixed) → use its getBoundingClientRect().
        //
        // Unified formula:  cssTop = vp.y − containerViewportTop
        //                   cssLeft = vp.x − containerViewportLeft
        const containerRect = parentContainer
            ? parentContainer.getBoundingClientRect()
            : { top: -window.scrollY, left: -window.scrollX };
        // Compute viewport-space position for edge detection and final offset.
        const computeViewport = (ao, to) => {
            const ap = getAnchorPoint(anchorRect, ao);
            const tOffset = getTransformOffset(popperRect, to);
            return { x: ap.x - tOffset.x, y: ap.y - tOffset.y + offset };
        };
        let effAnchor = anchorOrigin;
        let effTransform = transformOrigin;
        let vp = computeViewport(effAnchor, effTransform);
        // Flip both origins horizontally if the popper overflows the right edge.
        if (vp.x + popperRect.width > window.innerWidth) {
            effAnchor = {
                ...effAnchor,
                horizontal: flipHorizontal(effAnchor.horizontal),
            };
            effTransform = {
                ...effTransform,
                horizontal: flipHorizontal(effTransform.horizontal),
            };
            vp = computeViewport(effAnchor, effTransform);
        }
        // Flip both origins vertically if the popper overflows the bottom edge.
        if (vp.y + popperRect.height > window.innerHeight) {
            effAnchor = { ...effAnchor, vertical: flipVertical(effAnchor.vertical) };
            effTransform = {
                ...effTransform,
                vertical: flipVertical(effTransform.vertical),
            };
            vp = computeViewport(effAnchor, effTransform);
        }
        const newPosition = {
            top: vp.y - containerRect.top,
            left: vp.x - containerRect.left,
        };
        setPosition((prev) => {
            if (prev.top === newPosition.top && prev.left === newPosition.left) {
                return prev;
            }
            return newPosition;
        });
    }, [anchorOrigin, transformOrigin, offset, parentContainer]);
    // useLayoutEffect runs synchronously after DOM mutations, before the browser
    // paints. This ensures the popper never flashes at (0,0) and that the flip
    // check uses the correct rendered dimensions before the first paint.
    React.useLayoutEffect(() => {
        calculatePosition();
    }, [isDropdownOpen, calculatePosition]);
    React.useEffect(() => {
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
            setInternalOpen(openProp);
        }
    }, [openProp]);
    React.useEffect(() => {
        onOpen?.(internalOpen);
    }, [internalOpen, onOpen]);
    // Register this portal in the global registry while it is open so that
    // ancestor Poppers can recognise clicks inside this (child) portal.
    React.useEffect(() => {
        const portalEl = popperRef.current;
        const anchorEl = elementRef.current;
        if (isDropdownOpen && portalEl && anchorEl) {
            openPopperRegistry.set(portalEl, anchorEl);
            return () => {
                openPopperRegistry.delete(portalEl);
            };
        }
    }, [isDropdownOpen]);
    const handleDropdownToggle = () => {
        if (!disabled && openProp === undefined) {
            if (internalOpen) {
                triggerClose();
            }
            else {
                setInternalOpen(true);
            }
        }
    };
    const hoverCloseTimerRef = React.useRef(null);
    React.useEffect(() => {
        return () => {
            if (hoverCloseTimerRef.current !== null) {
                clearTimeout(hoverCloseTimerRef.current);
            }
        };
    }, []);
    const cancelHoverClose = () => {
        if (hoverCloseTimerRef.current !== null) {
            clearTimeout(hoverCloseTimerRef.current);
            hoverCloseTimerRef.current = null;
        }
    };
    const handleMouseEnter = () => {
        if (!disabled && trigger === 'hover' && openProp === undefined) {
            cancelHoverClose();
            // Kill any in-progress close animation so onComplete doesn't fire late
            if (popperRef.current?.firstElementChild) {
                gsap.killTweensOf(popperRef.current.firstElementChild);
            }
            setIsClosing(false);
            setInternalOpen(true);
        }
    };
    const handleMouseLeave = () => {
        if (!disabled && trigger === 'hover' && openProp === undefined) {
            hoverCloseTimerRef.current = setTimeout(() => {
                hoverCloseTimerRef.current = null;
                triggerClose();
            }, animDurationOut * 100);
        }
    };
    // Keep the handler in a ref so the document listener is registered only
    // once while always calling the latest version (no stale closure).
    const handleClickOutsideRef = React.useRef(null);
    handleClickOutsideRef.current = (event) => {
        const target = event.target;
        // Click inside this popper's own portal or anchor element — ignore.
        if (popperRef.current?.contains(target) ||
            elementRef.current?.contains(target)) {
            return;
        }
        // Click inside a child popper that was opened from within our content.
        // Child portals are DOM siblings (both attached to document.body), so
        // a plain `contains` check misses them — we use the registry instead.
        for (const [portalDiv, anchorEl] of openPopperRegistry.entries()) {
            if (portalDiv === popperRef.current) {
                continue;
            }
            if (popperRef.current?.contains(anchorEl) && portalDiv.contains(target)) {
                return;
            }
        }
        if (openProp === undefined && trigger === 'click') {
            triggerClose();
        }
        onClickOutside?.();
    };
    React.useEffect(() => {
        const handler = (event) => handleClickOutsideRef.current?.(event);
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);
    const anchorElement = React.cloneElement(children, {
        ['ref']: (node) => {
            elementRef.current = node;
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
            const childProps = children.props;
            if (childProps.onClick) {
                childProps.onClick(e);
            }
            if (!e.isPropagationStopped() && !disabled && trigger === 'click') {
                handleDropdownToggle();
            }
        },
        ['onMouseEnter']: (e) => {
            const childProps = children.props;
            childProps.onMouseEnter?.(e);
            handleMouseEnter();
        },
        ['onMouseLeave']: (e) => {
            const childProps = children.props;
            childProps.onMouseLeave?.(e);
            handleMouseLeave();
        },
        ['aria-expanded']: isDropdownOpen ? 'true' : 'false',
        ['aria-haspopup']: 'dialog',
        ['role']: 'button',
    });
    // Popper is `position: absolute` — it preserves its parent's coordinate
    // space. Pass parentIsFixed through so nested overlays (Tooltip, Modal, etc.)
    // inside this Popper use the same coordinate space.
    const overlayContextValue = React.useMemo(() => ({ container: popperContainer, isFixed: parentIsFixed }), [popperContainer, parentIsFixed]);
    if (disabled) {
        return children;
    }
    return (_jsxs(_Fragment, { children: [anchorElement, shouldRender &&
                createPortal(
                // Outer div: positioning only — no `transform` so that any
                // `fixed`-positioned descendant (e.g. Modal overlay) is still
                // positioned relative to the viewport, not this element.
                _jsx(OverlayContext.Provider, { value: overlayContextValue, children: _jsx("div", { ref: setPopperRef, style: {
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                            // opacity: position.left > 0 && position.top > 0 ? 1 : 0,
                            ...style,
                        }, className: cx('absolute z-[1300]', className), onMouseEnter: trigger === 'hover' ? () => cancelHoverClose() : undefined, onMouseLeave: trigger === 'hover' ? handleMouseLeave : undefined, children: _jsx("div", { className: "bg-neutral-10 dark:bg-neutral-30-dark shadow-box-2 rounded-lg overflow-hidden", children: content }) }) }), parentContainer ?? document.body)] }));
};
export default Popper;
