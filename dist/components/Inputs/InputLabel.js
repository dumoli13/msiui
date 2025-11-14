import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from "classnames";
function InputLabel({ id, children, size = "default", required, }) {
    return (_jsxs("label", { htmlFor: id, className: cx("shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1", {
            "text-12px": size === "default",
            "text-16px": size === "large",
        }), children: [children, required && (_jsx("span", { className: "text-danger-main dark:text-danger-main-dark", children: "*" }))] }));
}
export default InputLabel;
