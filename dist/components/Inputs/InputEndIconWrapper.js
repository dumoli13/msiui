import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from 'classnames';
import Icon from '../Icon';
const InputEndIconWrapper = ({ loading = false, error = false, success = false, clearable = false, onClear, endIcon, children, }) => {
    return (_jsxs("div", { className: "flex gap-0.5 items-center", children: [children, clearable && (_jsx(Icon, { name: "x-mark", size: 18, strokeWidth: 2, onClick: onClear, className: "rounded-full p-[3px] text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark cursor-pointer transition-color" })), loading && (_jsx(Icon, { name: "loader", animation: "spin", strokeWidth: 2, className: "text-neutral-70 dark:text-neutral-70-dark" })), success && (_jsx(Icon, { name: "check", strokeWidth: 3, size: 12, className: "shrink-0 rounded-full bg-success-main dark:bg-success-main-dark text-neutral-10 dark:text-neutral-10-dark flex items-center justify-center p-0.5 m-0.5" })), error && (_jsx("div", { className: "h-4 w-4 text-12px shrink-0 rounded-full bg-danger-main dark:bg-danger-main-dark text-neutral-10 dark:text-neutral-10-dark font-bold flex items-center justify-center leading-none", children: "!" })), !!endIcon && (_jsx("div", { className: cx('text-neutral-70 dark:text-neutral-70-dark'), children: endIcon }))] }));
};
export default InputEndIconWrapper;
