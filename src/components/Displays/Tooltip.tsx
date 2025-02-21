import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  children: ReactNode;
  onOpen?: (open: boolean) => void;
  verticalAlign?: 'top' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  arrow?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  title: string;
}

/**
 * Tooltip Component
 *
 * A customizable tooltip component that displays a small overlay with a message when the user hovers over a target element.
 * The tooltip can have customizable alignment, delay times, and an optional arrow indicator. The position of the tooltip
 * is dynamically calculated based on the target element's position on the screen and the viewport size.
 *
 * @interface TooltipProps
 * @property {ReactNode} children - The content or elements to which the component's behavior or functionality is applied.
 * @property {function} [onOpen] - A callback function triggered when the tooltip opens or closes.
 * @property {string} [verticalAlign='bottom'] - The vertical alignment of the tooltip relative to the target element. Can be 'top', 'bottom', or 'center'.
 * @property {string} [horizontalAlign='center'] - The horizontal alignment of the tooltip relative to the target element. Can be 'left', 'center', or 'right'.
 * @property {boolean} [arrow=true] - A flag to control whether the tooltip shows an arrow indicating its direction.
 * @property {number} [mouseEnterDelay=500] - The delay (in milliseconds) before the tooltip appears after the mouse enters the target element.
 * @property {number} [mouseLeaveDelay=0] - The delay (in milliseconds) before the tooltip disappears after the mouse leaves the target element.
 * @property {string} title - The content of the tooltip, which will be displayed inside the tooltip box.
 *
 * @example Basic Usage:
 * ```tsx
 * import Tooltip from './Tooltip';
 *
 * const MyComponent = () => {
 *   return (
 *     <Tooltip title="This is a tooltip" verticalAlign="top" horizontalAlign="right">
 *       <button>Hover over me!</button>
 *     </Tooltip>
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element} The Tooltip component that displays the tooltip when hovered over the child element.
 */

const Tooltip = ({
  children,
  verticalAlign = 'bottom',
  horizontalAlign = 'center',
  arrow = true,
  mouseEnterDelay = 500,
  mouseLeaveDelay = 0,
  title,
}: TooltipProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState<{
    top: number;
    left: number;
    width: number | undefined;
  } | null>(null); // Set to `null` initially
  const enterTimeout = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const calculateDropdownPosition = useCallback(() => {
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
        if (top < 0) top = rect.bottom + window.scrollY;
      } else if (verticalAlign === 'bottom') {
        top = rect.bottom + window.scrollY;
        if (top + dropdownRect.height > viewportHeight)
          top = rect.top + window.scrollY - dropdownRect.height;
      } else if (verticalAlign === 'center') {
        top =
          rect.top + window.scrollY + rect.height / 2 - dropdownRect.height / 2;
      }

      // Horizontal alignment
      if (horizontalAlign === 'left') {
        left = rect.left + window.scrollX - 4;
        if (left + dropdownRect.width > viewportWidth)
          left = rect.right + window.scrollX - dropdownRect.width;
      } else if (horizontalAlign === 'right') {
        left = rect.right + window.scrollX - dropdownRect.width + 4;
        if (left < 0) left = rect.left + window.scrollX;
      } else if (horizontalAlign === 'center') {
        left =
          rect.left + window.scrollX + rect.width / 2 - dropdownRect.width / 2;
      }

      setDropdownStyles({
        top,
        left,
        width: rect.width,
      });
    }
  }, [verticalAlign, horizontalAlign]);

  useEffect(() => {
    if (open) {
      calculateDropdownPosition();
      const handleScrollOrResize = () => calculateDropdownPosition();
      window.addEventListener('scroll', handleScrollOrResize);
      window.addEventListener('resize', handleScrollOrResize);
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    } else {
      setDropdownStyles(null);
    }
  }, [open, calculateDropdownPosition]);

  const handleMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    enterTimeout.current = setTimeout(() => setOpen(true), mouseEnterDelay);
  };

  const handleMouseLeave = () => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    leaveTimeout.current = setTimeout(() => setOpen(false), mouseLeaveDelay);
  };

  return (
    <div className="relative">
      <div
        ref={elementRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        // tabIndex={0}
        tabIndex={-1}
        aria-pressed="true"
      >
        {children}
      </div>
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              top: dropdownStyles?.top || 0,
              left: dropdownStyles?.left || 0,
              transformOrigin: 'center center',
            }}
            className="absolute z-[100] bg-neutral-90 text-neutral-10 rounded-sm px-2 py-1.5 mt-1 text-14px"
          >
            {arrow && (
              <div
                className="absolute bg-neutral-90 w-2 h-2 transform rotate-45"
                style={{
                  top:
                    verticalAlign === 'top'
                      ? '100%'
                      : verticalAlign === 'bottom'
                        ? '-0.375rem'
                        : '50%',
                  left:
                    horizontalAlign === 'left'
                      ? '0.75rem'
                      : horizontalAlign === 'right'
                        ? 'calc(100% - 0.75rem)'
                        : '50%',
                  transform:
                    verticalAlign === 'top'
                      ? 'translate(-50%, -50%) rotate(45deg)'
                      : verticalAlign === 'bottom'
                        ? 'translate(-50%, 50%) rotate(45deg)'
                        : 'rotate(45deg)',
                }}
              />
            )}
            {title}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Tooltip;
