import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from 'classnames';
import Icon from '../Icon';
/**
 *
 * This component provides buttons for pagination navigation, specifically for navigating to the next or previous page.
 * It includes button elements styled with icons to indicate the direction of the navigation (left for previous, right for next).
 *
 * @interface PaginationButtonProps
 * @property {() => void} onClick - A callback function to be triggered when the button is clicked.
 * @property {boolean} [disabled] - A flag that disables the button if set to true
 *
 */
const navButtonStyle = cx('text-14px flex items-center gap-2 h-8 px-2 shadow-box-1 rounded-md border border-neutral-40 dark:border-neutral-40-dark text-neutral-100 dark:text-neutral-100-dark bg-neutral-10 dark:bg-neutral-10-dark', 'disabled:bg-neutral-40 dark:disabled:bg-neutral-30-dark disabled:text-neutral-60 dark:disabled:text-neutral-60-dark', 'hover:bg-primary-hover dark:hover:bg-primary-hover-dark hover:text-neutral-100 dark:hover:text-neutral-100-dark');
const PaginationButton = () => {
    return null;
};
const PrevButton = ({ onClick, disabled }) => {
    return (_jsxs("button", { type: "button", className: navButtonStyle, onClick: onClick, disabled: disabled, children: [_jsx(Icon, { name: "chevron-left", size: 16, strokeWidth: 2 }), _jsx("span", { children: "Prev" })] }, "prev"));
};
const NextButton = ({ onClick, disabled }) => {
    return (_jsxs("button", { type: "button", className: navButtonStyle, onClick: onClick, disabled: disabled, children: [_jsx("span", { children: "Next" }), _jsx(Icon, { name: "chevron-right", size: 16, strokeWidth: 2 })] }));
};
PaginationButton.Prev = PrevButton;
PaginationButton.Next = NextButton;
export default PaginationButton;
