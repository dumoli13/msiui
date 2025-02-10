import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';

interface PopoverProps {
  children: ReactNode;
  className?: string;
  open: boolean;
  elementRef: RefObject<HTMLDivElement>;
  onClose?: () => void;
  verticalAlign?: 'top' | 'center' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  transformOriginVertical?: 'top' | 'center' | 'bottom';
  transformOriginHorizontal?: 'left' | 'center' | 'right';
}

/**
 * Popover Component
 *
 * A customizable popover component that can display a dropdown or floating content
 * relative to a target element on the page. It allows you to configure the position,
 * alignment, and transformation origin of the popover. This component supports open/close functionality
 * and can adapt to viewport boundaries to prevent overflow.
 *
 * @interface PopoverProps
 * @property {ReactNode} children - The content or elements to which the component's behavior or functionality is applied.
 * @property {string} [className] - Additional class names to apply to the popover.
 * @property {boolean} open - A flag that determines whether the popover is visible or not.
 * @property {RefObject<HTMLDivElement>} elementRef - A reference to the target element the popover is anchored to.
 * @property {function} [onClose] - A function that is called when the popover is closed.
 * @property {('top' | 'center' | 'bottom')} [verticalAlign='bottom'] - The vertical alignment of the popover relative to the target element.
 * @property {('left' | 'center' | 'right')} [horizontalAlign='left'] - The horizontal alignment of the popover relative to the target element.
 * @property {('top' | 'center' | 'bottom')} [transformOriginVertical='top'] - The vertical transform origin for the popover's animation.
 * @property {('left' | 'center' | 'right')} [transformOriginHorizontal='left'] - The horizontal transform origin for the popover's animation.
 *
 * @example Basic Usage:
 * ```tsx
 * import Popover from './Popover';
 *
 * const MyComponent = () => {
 *   const [open, setOpen] = useState(false);
 *   const targetElementRef = useRef<HTMLDivElement>(null);
 *
 *   return (
 *     <div>
 *       <button ref={targetElementRef} onClick={() => setOpen(!open)}>Toggle Popover</button>
 *       <Popover
 *         open={open}
 *         elementRef={targetElementRef}
 *         onClose={() => setOpen(false)}
 *       >
 *         <p>Popover content goes here!</p>
 *       </Popover>
 *     </div>
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element | null} The popover content wrapped in a portal, or `null` if `open` is `false`.
 */

const Popover = ({
  children,
  className,
  open,
  elementRef,
  onClose,
  verticalAlign = 'bottom',
  horizontalAlign = 'left',
  transformOriginVertical = 'top',
  transformOriginHorizontal = 'left',
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const calculateDropdownPosition = useCallback(() => {
    if (elementRef.current && popoverRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const dropdownRect = popoverRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let top = rect.top + window.scrollY;
      let left = rect.left + window.scrollX;

      // Check and adjust for vertical alignment
      if (verticalAlign === 'top') {
        top = rect.top + window.scrollY - dropdownRect.height - 8;
        if (top < 0) {
          // If overflow at top, flip to bottom
          top = rect.bottom + window.scrollY;
        }
      } else if (verticalAlign === 'bottom') {
        top = rect.bottom + window.scrollY;
        if (top + dropdownRect.height > viewportHeight) {
          // If overflow at bottom, flip to top
          top = rect.top + window.scrollY - dropdownRect.height;
        }
      } else if (verticalAlign === 'center') {
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
      } else if (horizontalAlign === 'right') {
        left = rect.right + window.scrollX - dropdownRect.width;
        if (left < 0) {
          // If overflow on left, flip to right
          left = rect.left + window.scrollX;
        }
      } else if (horizontalAlign === 'center') {
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

  useEffect(() => {
    if (open) {
      calculateDropdownPosition();
    }
  }, [open, calculateDropdownPosition]);

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (open) {
        calculateDropdownPosition();
      }
    };
    window.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [open, calculateDropdownPosition]);

  return open ? (
    <div role="presentation" className="fixed z-[1300] inset-0">
      <div
        aria-hidden="true"
        className="z-[2000] fixed inset-0 bg-neutral-10/0"
        onClick={() => onClose?.()}
      />

      {createPortal(
        <div
          ref={popoverRef}
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            transformOrigin: `${transformOriginHorizontal} ${transformOriginVertical}`,
          }}
          className={cx(
            'bg-neutral-10 shadow-box-2 rounded-lg p-4 mt-1 absolute z-[2100]',
            className,
          )}
        >
          {children}
        </div>,
        document.body,
      )}
    </div>
  ) : null;
};

export default Popover;
