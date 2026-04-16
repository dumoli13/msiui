import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '../Icon';
function InputEndIconWrapper({ loading = false, error = false, success = false, clearable = false, onClear, endIcon, children, }) {
    if (!clearable && !loading && !success && !error && !endIcon && !children)
        return null;
    return (_jsxs("div", { className: "flex gap-0.5 items-center shrink-0", children: [children, clearable && (_jsx("button", { type: "button", "aria-label": "Clear value", 
                // Prevent the input from losing focus when clicking the clear button
                onMouseDown: (e) => e.preventDefault(), onClick: onClear, className: "rounded-full p-[3px] text-neutral-70 dark:text-neutral-70-dark hover:bg-neutral-30 dark:hover:bg-neutral-30-dark transition-colors duration-150 cursor-pointer", children: _jsx(Icon, { name: "x-mark", size: 18, strokeWidth: 2 }) })), loading && (
            // aria-hidden: loading state should be communicated via aria-busy on the form, not here
            _jsx("span", { "aria-hidden": "true", children: _jsx(Icon, { name: "loader", animation: "spin", strokeWidth: 2, className: "text-neutral-70 dark:text-neutral-70-dark" }) })), success && !error && (
            // aria-hidden: success state is conveyed via the field value / form feedback, not this icon
            _jsx("span", { "aria-hidden": "true", className: "shrink-0 rounded-full bg-success-main dark:bg-success-main-dark text-neutral-10 dark:text-neutral-10-dark flex items-center justify-center p-0.5 m-0.5", children: _jsx(Icon, { name: "check", strokeWidth: 3, size: 12 }) })), error && (
            // aria-hidden: error state is conveyed via aria-invalid + aria-describedby on the input
            _jsx("span", { "aria-hidden": "true", className: "h-4 w-4 text-12px shrink-0 rounded-full bg-danger-main dark:bg-danger-main-dark text-neutral-10 dark:text-neutral-10-dark font-bold flex items-center justify-center leading-none", children: "!" })), endIcon && (_jsx("span", { "aria-hidden": "true", className: "text-neutral-70 dark:text-neutral-70-dark", children: endIcon }))] }));
}
export default InputEndIconWrapper;
