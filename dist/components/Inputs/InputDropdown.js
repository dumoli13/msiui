import React from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';
/**
 *
 * A dropdown component that displays content below or above a reference element, dynamically positioning itself based on available space on the screen.
 * This component supports handling scroll and resize events to adjust the position of the dropdown.
 *
 * @property {boolean} open - A boolean flag to control whether the dropdown is open or closed.
 * @property {ReactNode} children - The content to display inside the dropdown (usually options or items).
 * @property {RefObject<HTMLDivElement>} elementRef - A reference to the element to which the dropdown is attached.
 * @property {RefObject<HTMLDivElement>} dropdownRef - A reference to the dropdown element itself.
 * @property {boolean} [fullWidth=false] - Whether the input should take up the full width of its container.
 * @property {number} [maxHeight=300] - The maximum height of the dropdown, allowing for scroll if content overflows.
 *
 */
const InputDropdown = ({ open, children, elementRef, dropdownRef, fullWidth, maxHeight = 300, }) => {
    const [dropdownStyles, setDropdownStyles] = React.useState(null);
    const calculateDropdownPosition = React.useCallback(() => {
        if (!elementRef.current || !dropdownRef.current)
            return;
        const rect = elementRef.current.getBoundingClientRect();
        const dropdown = dropdownRef.current;
        // Calculate dimensions
        const desiredWidth = fullWidth ? rect.width : dropdown.offsetWidth;
        const dropdownHeight = dropdown.offsetHeight || 0;
        // Calculate available space
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        // Calculate initial positions
        let newLeft = rect.left + window.scrollX;
        const newTop = spaceBelow >= dropdownHeight || spaceBelow > spaceAbove
            ? rect.bottom + window.scrollY
            : rect.top - dropdownHeight - 10 + window.scrollY;
        // Prevent right overflow
        const viewportRight = window.innerWidth;
        const dropdownRightEdge = newLeft + desiredWidth;
        if (dropdownRightEdge > viewportRight) {
            // Shift left by the overflow amount
            newLeft = Math.max(viewportRight - desiredWidth, // Keep dropdown in viewport
            window.scrollX);
        }
        // Prevent left overflow
        if (newLeft < window.scrollX) {
            newLeft = window.scrollX;
        }
        setDropdownStyles({
            top: newTop,
            left: newLeft,
            width: fullWidth ? rect.width : undefined,
            direction: spaceBelow >= dropdownHeight || spaceBelow > spaceAbove ? 'down' : 'up',
            visibility: 'visible',
        });
    }, [elementRef, dropdownRef, fullWidth]);
    React.useEffect(() => {
        if (open) {
            setDropdownStyles((prev) => (Object.assign(Object.assign({}, prev), { visibility: 'hidden' }))); // Hide before calculation
            setTimeout(() => calculateDropdownPosition(), 10); // Delay execution until the DOM is updated
            const handleScrollOrResize = () => calculateDropdownPosition();
            window.addEventListener('scroll', handleScrollOrResize);
            window.addEventListener('resize', handleScrollOrResize);
            return () => {
                window.removeEventListener('scroll', handleScrollOrResize);
                window.removeEventListener('resize', handleScrollOrResize);
            };
        }
        else {
            setDropdownStyles(null);
        }
    }, [open, calculateDropdownPosition]);
    if (!open)
        return null;
    return createPortal(React.createElement("div", { role: "button", tabIndex: 0, onMouseDown: (e) => e.stopPropagation(), ref: dropdownRef, style: {
            position: 'absolute',
            top: dropdownStyles === null || dropdownStyles === void 0 ? void 0 : dropdownStyles.top,
            left: dropdownStyles === null || dropdownStyles === void 0 ? void 0 : dropdownStyles.left,
            width: dropdownStyles === null || dropdownStyles === void 0 ? void 0 : dropdownStyles.width,
            maxHeight,
        }, className: cx('bg-neutral-10 dark:bg-neutral-30-dark shadow-box-2 rounded-lg py-1.5 text-neutral-80 dark:text-neutral-80-dark overflow-y-auto z-[1999] cursor-default', {
            'mt-1': (dropdownStyles === null || dropdownStyles === void 0 ? void 0 : dropdownStyles.direction) === 'down',
            'mb-1': (dropdownStyles === null || dropdownStyles === void 0 ? void 0 : dropdownStyles.direction) === 'up',
        }), onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
            }
        } }, children), document.body);
};
export default InputDropdown;
