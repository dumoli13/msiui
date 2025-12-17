'use client';

import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
} from 'react';
import cx from 'classnames';
import { PopoverProps } from '../../types';
import { Portal } from '../Portal';

const Popover = ({
  children,
  className,
  open,
  elementRef,
  onClose,
  verticalAlign = 'bottom',
  horizontalAlign = 'left',
}: PopoverProps) => {
  const [ready, setReady] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [popoverEl, setPopoverEl] = useState<HTMLDivElement | null>(null);

  const setPopoverRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setPopoverEl(node);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /** -------------------------------------------------
   * Position calculation
   * ------------------------------------------------- */
  const calculatePosition = useCallback(() => {
    if (!elementRef.current || !popoverEl) return;

    const trigger = elementRef.current.getBoundingClientRect();
    const popover = popoverEl.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    // Vertical alignment
    switch (verticalAlign) {
      case 'top':
        top = trigger.top - popover.height - 8;
        if (top < 0) top = trigger.bottom;
        break;

      case 'center':
        top = trigger.top + trigger.height / 2 - popover.height / 2;
        break;

      case 'bottom':
      default:
        top = trigger.bottom;
        if (top + popover.height > viewportHeight) {
          top = trigger.top - popover.height;
        }
    }

    // Horizontal alignment
    switch (horizontalAlign) {
      case 'right':
        left = trigger.right - popover.width;
        if (left < 0) left = trigger.left;
        break;

      case 'center':
        left = trigger.left + trigger.width / 2 - popover.width / 2;
        break;

      case 'left':
      default:
        left = trigger.left;
        if (left + popover.width > viewportWidth) {
          left = trigger.right - popover.width;
        }
    }

    setPosition({
      top: Math.max(8, top),
      left: Math.max(8, left),
      width: trigger.width,
    });
    setReady(true);
  }, [elementRef, popoverEl, verticalAlign, horizontalAlign]);

  useLayoutEffect(() => {
    if (!open || !popoverEl) return;

    // 2nd frame guarantees size is correct
    requestAnimationFrame(calculatePosition);
  }, [open, popoverEl, calculatePosition]);

  useEffect(() => {
    if (!open || !popoverEl) return;

    window.addEventListener('scroll', calculatePosition, true);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [open, popoverEl, calculatePosition]);

  if (!open) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[1300]">
        {/* Click outside */}
        <div
          aria-hidden="true"
          className="fixed inset-0"
          onClick={() => onClose?.()}
        />

        {/* Popover */}
        <div
          ref={setPopoverRef}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            visibility: ready ? 'visible' : 'hidden',
          }}
          className={cx(
            'fixed z-[2100] rounded-lg shadow-box-2 p-4',
            'bg-neutral-10 dark:bg-neutral-30-dark',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Popover;
