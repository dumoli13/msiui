import React from 'react';
import cx from 'classnames';
import { OverlayContext } from '../../context/OverlayContext';
import type { PopoverOrigin, PopoverProps } from '../../types';
import { Portal } from '../Portal';

const H_OFFSET: Record<PopoverOrigin['horizontal'], (size: number) => number> =
  {
    left: () => 0,
    center: (size) => size / 2,
    right: (size) => size,
  };

const V_OFFSET: Record<PopoverOrigin['vertical'], (size: number) => number> = {
  top: () => 0,
  center: (size) => size / 2,
  bottom: (size) => size,
};

const DEFAULT_ANCHOR: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};
const DEFAULT_TRANSFORM: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const Popover = ({
  children,
  className,
  open,
  elementRef,
  onClose,
  anchorOrigin = DEFAULT_ANCHOR,
  transformOrigin = DEFAULT_TRANSFORM,
}: PopoverProps) => {
  const popoverRef = React.useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = React.useState({
    top: 0,
    left: 0,
    opacity: 0,
    scale: 0.75,
  });

  // Read parent context: skip scroll offset when inside a fixed container.
  const { isFixed } = React.useContext(OverlayContext);

  // Provide context for children inside Popover: its outer wrapper is
  // `position: fixed; inset: 0`, so children use viewport coordinates.
  const [wrapperEl, setWrapperEl] = React.useState<HTMLDivElement | null>(null);
  const overlayContextValue = React.useMemo(
    () => ({ container: wrapperEl, isFixed: true }),
    [wrapperEl],
  );

  const calculatePosition = React.useCallback(() => {
    if (!elementRef.current || !popoverRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 8;

    const scrollY = isFixed ? 0 : window.scrollY;
    const scrollX = isFixed ? 0 : window.scrollX;

    const anchorX =
      rect.left + scrollX + H_OFFSET[anchorOrigin.horizontal](rect.width);
    const anchorY =
      rect.top + scrollY + V_OFFSET[anchorOrigin.vertical](rect.height);

    const transformX = H_OFFSET[transformOrigin.horizontal](popoverRect.width);
    const transformY = V_OFFSET[transformOrigin.vertical](popoverRect.height);

    const left = Math.max(
      margin,
      Math.min(anchorX - transformX, vw - popoverRect.width - margin),
    );
    const top = Math.max(
      margin,
      Math.min(anchorY - transformY, vh - popoverRect.height - margin),
    );

    setPosition({ top, left, opacity: 1, scale: 1 });
  }, [anchorOrigin, transformOrigin, elementRef, isFixed]);

  React.useEffect(() => {
    if (!open) return;
    const frameId = requestAnimationFrame(() => {
      calculatePosition();
    });
    return () => cancelAnimationFrame(frameId);
  }, [open, calculatePosition]);

  React.useEffect(() => {
    if (!open) return;
    const handleScrollOrResize = () => calculatePosition();
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [open, calculatePosition]);

  // Handle escape key
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const transformOriginCss = `${transformOrigin.vertical} ${transformOrigin.horizontal}`;

  return (
    <Portal>
      <div ref={setWrapperEl} role="none" className="fixed z-[1300] inset-0">
        <OverlayContext.Provider value={overlayContextValue}>
          <div
            aria-hidden="true"
            className="z-[2000] fixed inset-0"
            onClick={() => onClose?.()}
          />
          <div
            ref={popoverRef}
            role="dialog"
            style={{
              top: position.top,
              left: position.left,
              opacity: position.opacity,
              transform: `scale(${position.scale})`,
              transformOrigin: transformOriginCss,
              transition: 'opacity 0.2s ease-out, transform 0.15s ease-out',
            }}
            className={cx(
              'text-neutral-100 dark:text-neutral-100-dark bg-neutral-10 dark:bg-neutral-30-dark shadow-box-2 rounded-lg p-4 absolute z-[2100]',
              className,
            )}
          >
            {children}
          </div>
        </OverlayContext.Provider>
      </div>
    </Portal>
  );
};

export default Popover;
