import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '../Icon';
const NAV_BTN_CLASS = 'p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25';
/**
 * Navigation header bar shared by all date-picker calendar panels.
 * Pass only the handlers you need; others are hidden automatically.
 * Not exported from the library index.
 */
function CalendarHeader({ displayedDate, monthFormatter, onPrevYear, onPrevMonth, onNextMonth, onNextYear, onClickMonth, onClickYear, }) {
    return (_jsxs("div", { className: "flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark", children: [_jsxs("div", { className: "flex items-center", children: [onPrevYear && (_jsx("button", { type: "button", "aria-label": "Previous year", onClick: onPrevYear, className: NAV_BTN_CLASS, children: _jsx(Icon, { name: "chevron-double-left", size: 20, strokeWidth: 2 }) })), onPrevMonth && (_jsx("button", { type: "button", "aria-label": "Previous month", onClick: onPrevMonth, className: NAV_BTN_CLASS, children: _jsx(Icon, { name: "chevron-left", size: 20, strokeWidth: 2 }) }))] }), _jsxs("div", { className: "flex items-center gap-4 text-16px font-semibold text-neutral-100 dark:text-neutral-100-dark", children: [_jsx("button", { type: "button", "aria-label": `Select month: ${monthFormatter.format(displayedDate)}`, className: "shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-[84px]", onClick: onClickMonth, children: monthFormatter.format(displayedDate) }), _jsx("button", { type: "button", "aria-label": `Select year: ${displayedDate.getFullYear()}`, className: "shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-10", onClick: onClickYear, children: displayedDate.getFullYear() })] }), _jsxs("div", { className: "flex items-center", children: [onNextMonth && (_jsx("button", { type: "button", "aria-label": "Next month", onClick: onNextMonth, className: NAV_BTN_CLASS, children: _jsx(Icon, { name: "chevron-right", size: 20, strokeWidth: 2 }) })), onNextYear && (_jsx("button", { type: "button", "aria-label": "Next year", onClick: onNextYear, className: NAV_BTN_CLASS, children: _jsx(Icon, { name: "chevron-double-right", size: 20, strokeWidth: 2 }) }))] })] }));
}
export default CalendarHeader;
