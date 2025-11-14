import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const ModalHeader = ({ icon, title, children }) => {
    return (_jsx("div", { className: "pt-6 pb-2 px-6 flex items-center gap-4", children: children || (_jsxs(_Fragment, { children: [icon, _jsx("div", { className: "text-20px font-semibold text-neutral-100 dark:text-neutral-100-dark w-full break-words", children: title })] })) }));
};
export default ModalHeader;
