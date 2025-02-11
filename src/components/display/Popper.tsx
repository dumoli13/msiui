import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';

interface PopperProps {
  className?: string;
  disabled?: boolean;
  content: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  verticalAlign?: 'top' | 'center' | 'bottom'; // Vertical position on the anchor element
  horizontalAlign?: 'left' | 'center' | 'right'; // Horizontal position on the anchor element
  transformOriginVertical?: 'top' | 'center' | 'bottom'; // Vertical position refer to popover element
  transformOriginHorizontal?: 'left' | 'center' | 'right'; // Horizontal position refer to popover element
}

/**
 * Popper Component
 *
 * A flexible and customizable popper component designed to display a floating or dropdown-like content
 * relative to a target element. It can handle positioning and alignment adjustments, including dynamic changes
 * due to screen resizing or scrolling. The popper can also be toggled open or closed, and it supports detecting clicks
 * outside the popper to close it automatically.
 *
 * @interface PopperProps
 * @property {string} [className] - Additional class names to apply to the popper container.
 * @property {boolean} [disabled=false] - A flag that disables the toggle functionality.
 * @property {ReactNode} content - The content to be displayed inside the popper when open.
 * @property {ReactNode} children - The content or elements to which the component's behavior or functionality is applied.
 * @property {boolean} [open] - A controlled flag that determines whether the popper is visible or not.
 * @property {function} [onOpen] - A callback function that is triggered when the popper is opened or closed.
 * @property {('top' | 'center' | 'bottom')} [verticalAlign='bottom'] - The vertical alignment of the popper relative to the target element.
 * @property {('left' | 'center' | 'right')} [horizontalAlign='left'] - The horizontal alignment of the popper relative to the target element.
 * @property {('top' | 'center' | 'bottom')} [transformOriginVertical='top'] - The vertical transform origin for popper animations.
 * @property {('left' | 'center' | 'right')} [transformOriginHorizontal='left'] - The horizontal transform origin for popper animations.
 *
 * @example Basic Usage:
 * ```tsx
 * import Popper from './Popper';
 *
 * const MyComponent = () => {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <Popper
 *       open={open}
 *       onOpen={(openState) => setOpen(openState)}
 *       content={<p>Here is the popper content!</p>}
 *     >
 *       <button>Toggle Popper</button>
 *     </Popper>
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element} The Popper component that displays the content in a portal when open.
 */

const Popper = ({
  className,
  disabled = false,
  content,
  children,
  open: openProp,
  onOpen = () => {},
  verticalAlign = 'bottom',
  horizontalAlign = 'left',
  transformOriginVertical = 'top',
  transformOriginHorizontal = 'left',
}: PopperProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(openProp ?? false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const isDropdownOpen = openProp !== undefined ? openProp : open;

  const calculateDropdownPosition = useCallback(() => {
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

      setDropdownPosition({ top, left, width: rect.width });
    }
  }, [verticalAlign, horizontalAlign]);

  useEffect(() => {
    if (isDropdownOpen) {
      calculateDropdownPosition();
    }
  }, [isDropdownOpen, calculateDropdownPosition]);

  useEffect(() => {
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

  useEffect(() => {
    if (openProp !== undefined) {
      setOpen(openProp);
    }
  }, [openProp]);

  useEffect(() => {
    onOpen(open);
  }, [open, onOpen]);

  const handleDropdownToggle = () => {
    if (!disabled) {
      setOpen((prev) => !prev);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      !popperRef.current?.contains(target) &&
      !elementRef.current?.contains(target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cx('relative', className)}>
      <div ref={elementRef}>
        <div
          role="button"
          tabIndex={-1}
          aria-pressed="true"
          onClick={handleDropdownToggle}
        >
          {children}
        </div>
      </div>
      {isDropdownOpen &&
        createPortal(
          <div
            ref={popperRef}
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              transformOrigin: `${transformOriginHorizontal} ${transformOriginVertical}`,
            }}
            className="bg-neutral-10 shadow-box-2 rounded-lg p-4 mt-1 absolute z-[100]"
          >
            {content}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Popper;
