import { jsx as _jsx } from "react/jsx-runtime";
import cx from 'classnames';
import Icon from '../Icon';
/**
 * Animated chevron button used by dropdown-style inputs (Select, AutoComplete, etc.).
 * Renders a plain icon when disabled; a focusable button otherwise.
 * Not exported from the library index.
 */
function DropdownChevron({ open, disabled, onClick, }) {
    if (disabled) {
        return (_jsx("span", { "aria-hidden": "true", className: "p-0.5 text-neutral-70 dark:text-neutral-70-dark flex items-center", children: _jsx(Icon, { name: "chevron-down", size: 20, strokeWidth: 2 }) }));
    }
    return (_jsx("button", { type: "button", "aria-label": open ? 'Close options' : 'Open options', "aria-expanded": open, 
        // Prevent the input from losing focus when the chevron is clicked
        onMouseDown: (e) => e.preventDefault(), onClick: onClick, className: cx('flex items-center justify-center rounded-full p-0.5 shrink-0', 'text-neutral-70 dark:text-neutral-70-dark', 'hover:bg-neutral-30 dark:hover:bg-neutral-30-dark', 'transition-[transform,background-color] duration-150', { 'rotate-180': open }), children: _jsx(Icon, { name: "chevron-down", size: 20, strokeWidth: 2 }) }));
}
export default DropdownChevron;
