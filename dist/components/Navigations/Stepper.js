import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';
import Icon from '../Icon';
function Stepper({ active, items, onChange, disabled = false, }) {
    return (_jsx("div", { className: "flex items-center justify-start gap-2", children: items.map((item, index) => {
            const { title, available } = item;
            return (_jsxs(Fragment, { children: [active > index && (_jsxs("button", { className: "shrink-0 flex gap-2 relative rounded-2xl items-center text-neutral-70 dark:text-neutral-70-dark group", type: "button", disabled: disabled || !onChange, onClick: () => {
                            onChange?.(index);
                        }, children: [_jsx("div", { className: "relative flex items-center justify-center w-5 h-5", children: _jsx("div", { className: "text-neutral-10 dark:text-neutral-10-dark bg-success-main dark:bg-success-main-dark rounded-full w-4 h-4 flex items-center justify-center", children: _jsx(Icon, { name: "check", strokeWidth: 4, size: 12 }) }) }), _jsx("p", { className: "text-14px text-success-main dark:text-success-main-dark", children: title })] }, index)), active === index && (_jsxs("div", { className: "shrink-0 flex gap-2 relative items-center text-primary-main dark:text-primary-main-dark", children: [_jsxs("div", { className: "relative flex items-center justify-center w-5 h-5 rounded-full text-12px", children: [_jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-primary-main dark:border-primary-main-dark" }), index + 1] }), _jsx("p", { className: "text-14px", children: title })] }, index)), active < index && (_jsxs("button", { className: "shrink-0 flex gap-2 relative rounded-2xl items-center text-neutral-70 dark:text-neutral-70-dark group", type: "button", disabled: !available || disabled || !onChange, onClick: () => {
                            onChange?.(index);
                        }, children: [_jsxs("div", { className: "relative flex items-center justify-center w-5 h-5 text-12px", children: [_jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-neutral-70 dark:border-neutral-70-dark group-hover:border-primary-hover dark:group-hover:border-primary-hover-dark" }), index + 1] }), _jsx("p", { className: "text-14px", children: title })] }, index)), index < items.length - 1 && (_jsx("div", { className: "w-5 h-5 text-neutral-70 dark:text-neutral-70-dark flex items-center justify-center", children: _jsx(Icon, { name: "chevron-right", strokeWidth: 1.5 }) }))] }, index));
        }) }));
}
export default Stepper;
