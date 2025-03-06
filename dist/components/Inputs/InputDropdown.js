import React, { useCallback, useEffect, useState, } from 'react';
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
    const [dropdownStyles, setDropdownStyles] = useState(null);
    const calculateDropdownPosition = useCallback(() => {
        var _a;
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const dropdownHeight = ((_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            setDropdownStyles({
                top: spaceBelow >= dropdownHeight || spaceBelow > spaceAbove
                    ? rect.bottom + window.scrollY
                    : rect.top - dropdownHeight - 10 + window.scrollY,
                left: rect.left + window.scrollX,
                width: fullWidth ? rect.width : undefined,
                direction: spaceBelow >= dropdownHeight || spaceBelow > spaceAbove
                    ? 'down'
                    : 'up',
            });
        }
    }, [elementRef, dropdownRef, fullWidth]);
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
        }
        else {
            setDropdownStyles(null); // Reset styles when closed
        }
    }, [open, calculateDropdownPosition]);
    // Don't render until position is calculated
    if (!open || !dropdownStyles)
        return null;
    return createPortal(React.createElement("div", { role: "button", tabIndex: 0, onMouseDown: (e) => e.stopPropagation(), ref: dropdownRef, style: {
            position: 'absolute',
            top: dropdownStyles.top,
            left: dropdownStyles.left,
            width: dropdownStyles.width,
            maxHeight,
        }, className: cx('bg-neutral-10 shadow-box-2 rounded-lg py-1.5 text-neutral-80 overflow-y-auto z-[1999] cursor-default', {
            'mt-1': dropdownStyles.direction === 'down',
            'mb-1': dropdownStyles.direction === 'up',
        }), onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
            }
        } }, children), document.body);
};
export default InputDropdown;
//# sourceMappingURL=InputDropdown.js.map