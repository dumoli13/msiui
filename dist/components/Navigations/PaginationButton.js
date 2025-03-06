import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
/**
 * PaginationButton Component
 *
 * This component provides buttons for pagination navigation, specifically for navigating to the next or previous page.
 * It includes button elements styled with icons to indicate the direction of the navigation (left for previous, right for next).
 *
 * @interface PaginationButtonProps
 * @property {() => void} onClick - A callback function to be triggered when the button is clicked.
 * @property {boolean} [disabled] - An optional boolean that disables the button if set to true
 * @returns {JSX.Element} Pagination navigation buttons (Previous and Next).
 *
 */
const navButtonStyle = cx('text-14px flex items-center gap-2 h-8 px-2 shadow-box-1 rounded border border-neutral-40 text-neutral-100 bg-neutral-10', 'disabled:bg-neutral-40 disabled:text-neutral-60', 'hover:bg-primary-hover hover:text-neutral-10');
const PaginationButton = () => {
    return null;
};
PaginationButton.prev = ({ onClick, disabled }) => {
    return (React.createElement("button", { key: "prev", type: "button", className: navButtonStyle, onClick: onClick, disabled: disabled },
        React.createElement(Icon, { name: "chevron-left", size: 16, strokeWidth: 2 }),
        React.createElement("span", null, "Prev")));
};
PaginationButton.next = ({ onClick, disabled }) => {
    return (React.createElement("button", { type: "button", className: navButtonStyle, onClick: onClick, disabled: disabled },
        React.createElement("span", null, "Next"),
        React.createElement(Icon, { name: "chevron-right", size: 16, strokeWidth: 2 })));
};
export default PaginationButton;
//# sourceMappingURL=PaginationButton.js.map