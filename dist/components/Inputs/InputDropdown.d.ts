import React from 'react';
export interface InputDropdownProps {
    open: boolean;
    children: React.ReactNode;
    elementRef: React.RefObject<HTMLDivElement | null>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    fullWidth?: boolean;
    maxHeight?: number;
}
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
declare const InputDropdown: ({ open, children, elementRef, dropdownRef, fullWidth, maxHeight, }: InputDropdownProps) => React.ReactPortal | null;
export default InputDropdown;
//# sourceMappingURL=InputDropdown.d.ts.map