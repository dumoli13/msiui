import React from 'react';
import cx from 'classnames';
import gsap from 'gsap';
import { OverlayContext } from '../../context/OverlayContext';
import { resolveAnimation } from '../../libs/transition';
import type { InputDropdownProps } from '../../types';
import { Portal } from '../Portal';

/**
 *
 * A dropdown component that displays content below or above a reference element, dynamically positioning itself based on available space on the screen.
 * This component supports handling scroll and resize events to adjust the position of the dropdown.
 *
 * @property {boolean} open - A boolean flag to control whether the dropdown is open or closed.
 * @property {ReactNode} children - The content to display inside the dropdown (usually options or items).
 * @property {RefObject<HTMLDivElement>} elementRef - A reference to the element to which the dropdown is attached.
 * @property {RefObject<HTMLDivElement>} dropdownRef - A reference to the dropdown element itself.
 * @property {boolean} [fullWidth=false] - A flag that expand to full container width if set to true.
 * @property {number} [maxHeight=300] - The maximum height of the dropdown, allowing for scroll if content overflows.
 *
 */
const InputDropdown = ({
  id,
  open,
  children,
  elementRef,
  dropdownRef,
  fullWidth,
  maxHeight = 300,
  animation,
}: InputDropdownProps) => {
  const { container: overlayContainer } = React.useContext(OverlayContext);
  const prevOpenRef = React.useRef(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const { animDuration, animEase, animDurationOut, animEaseOut } =
    resolveAnimation(animation, {
      in: { duration: 0.2, ease: 'power2.out' },
      out: { duration: 0.15, ease: 'power2.in' },
    });

  React.useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = open;

    if (open && !wasOpen) {
      // Open: fade in saja — tidak menyentuh transform sama sekali
      setIsClosing(false);
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: animDuration,
          ease: animEase,
          clearProps: 'opacity',
        },
      );
    } else if (!open && wasOpen) {
      // Close: fade out saja
      setIsClosing(true);
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: 0,
        duration: animDurationOut,
        ease: animEaseOut,
        onComplete: () => {
          setIsClosing(false);
          gsap.set(el, { clearProps: 'opacity' });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animation config intentionally excluded
  }, [open]);

  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
    width?: number;
    direction: 'down' | 'up';
  }>({ top: 0, left: 0, width: 0, direction: 'down' });

  const calculatePosition = React.useCallback(() => {
    if (!elementRef.current || !dropdownRef.current) return;

    const anchorRect = elementRef.current.getBoundingClientRect();
    const popperRect = dropdownRef.current.getBoundingClientRect();
    const dropdownHeight = popperRect.height;
    const dropdownWidth = popperRect.width;

    // Determine the containing block's viewport-space origin.
    // When portaled into document.body the offset is (-scrollX, -scrollY).
    // When portaled into a fixed overlay (Modal/Popper) the container's
    // own top/left is the offset (scrolling is irrelevant).
    const containerRect = overlayContainer
      ? overlayContainer.getBoundingClientRect()
      : { top: -window.scrollY, left: -window.scrollX };

    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const spaceAbove = anchorRect.top;
    const spaceRight = window.innerWidth - anchorRect.right;
    const spaceLeft = anchorRect.left;

    const GAP = 4;
    // Determine vertical placement
    let top: number;
    let direction: 'up' | 'down';

    if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
      // Place below
      top = anchorRect.bottom - containerRect.top + GAP;
      direction = 'down';
    } else {
      // Place above
      top = anchorRect.top - dropdownHeight - GAP - containerRect.top;
      direction = 'up';
    }

    // Determine horizontal placement
    let left: number;
    let width: number | undefined;

    if (fullWidth) {
      left = anchorRect.left - containerRect.left;
      width = anchorRect.width;
    } else if (spaceRight >= dropdownWidth || spaceRight > spaceLeft) {
      // Check if dropdown fits to the right
      left = anchorRect.left - containerRect.left;
    } else {
      // Place to the left
      left = anchorRect.right - dropdownWidth - containerRect.left;
    }

    setPosition({ top, left, width, direction });
  }, [elementRef, dropdownRef, fullWidth, overlayContainer]);

  React.useEffect(() => {
    calculatePosition();
    const handleScrollOrResize = () => {
      if (open) calculatePosition();
    };
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [open, children, calculatePosition]);

  return (
    <Portal>
      <div
        id={open ? id : undefined}
        role="none"
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        ref={dropdownRef}
        style={{
          top: 0,
          left: 0,
          transform: `translate(${position.left}px, ${position.top}px)`,
          width: position.width,
          maxHeight,
        }}
        className={cx(
          'absolute z-[2300] bg-neutral-10 dark:bg-neutral-10-dark shadow-box-2 rounded-lg py-1.5 text-neutral-100 dark:text-neutral-100-dark overflow-y-auto cursor-default',
          { invisible: !open && !isClosing },
        )}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
          }
        }}
      >
        {open || isClosing ? children : null}
      </div>
    </Portal>
  );
};

export default InputDropdown;
