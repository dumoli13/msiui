import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { useNotification } from '../Notification';
const BreadcrumbLink = ({ item, isLast = false, isFormEdited, }) => {
    const notify = useNotification();
    const navigate = useNavigate();
    const handleRoute = (href) => {
        if (!navigate) {
            notify({
                color: 'danger',
                title: 'Error',
                description: 'Breadcrumb navigation is not supported in this browser.',
            });
            return;
        }
        if (isFormEdited) {
            Modal.danger({
                title: 'Unsaved Changes',
                content: 'You have unsaved changes. Going back now will discard them.',
                confirmText: 'Discard',
                onConfirm: () => {
                    navigate(href);
                },
            });
        }
        else {
            navigate(href);
        }
    };
    return isLast ? (_jsx("div", { className: "font-bold text-neutral-100 dark:text-neutral-100-dark", children: item.label })) : (_jsxs(_Fragment, { children: [item.href ? (_jsx("div", { role: "link", tabIndex: 0, onClick: () => handleRoute(item.href), className: "cursor-pointer", children: item.label })) : (_jsx("div", { children: item.label })), _jsx("div", { children: "/" })] }));
};
/**
 *
 * Displays a list of breadcrumb items with support for truncating when the item count exceeds the maximum display value.
 * If more than `maxDisplay` items are provided, it will show the first few, followed by an ellipsis, and then the last few.
 *
 * @property {BreadcrumbItem[]} items - Array of breadcrumb items.
 * @property {number} [maxDisplay=4] - The maximum number of breadcrumb items to display before truncation.
 *
 */
const Breadcrumb = ({ items, maxDisplay = 4, isFormEdited = false, }) => {
    const parsedItem = items.map((item, index) => ({
        key: index,
        label: item.label,
        href: item.href,
    }));
    const shouldTruncate = items.length > maxDisplay;
    const renderItems = () => {
        if (!shouldTruncate) {
            return parsedItem.map((item, index) => (_jsx(BreadcrumbLink, { item: item, isLast: index === parsedItem.length - 1, isFormEdited: isFormEdited }, item.key)));
        }
        const leftCount = Math.floor(maxDisplay / 2);
        const rightCount = maxDisplay % 2 === 0 ? leftCount : leftCount + 1;
        const firstItems = parsedItem.slice(0, leftCount);
        const lastItems = parsedItem.slice(parsedItem.length - rightCount);
        return [
            ...firstItems.map((item) => (_jsx(BreadcrumbLink, { item: item, isLast: false, isFormEdited: isFormEdited }, item.key))),
            _jsxs(React.Fragment, { children: [_jsx("span", { className: "mx-2", children: "..." }), _jsx("span", { children: "/" })] }, "ellipsis"),
            ...lastItems.map((item, index) => (_jsx(BreadcrumbLink, { item: item, isLast: index === lastItems.length - 1, isFormEdited: isFormEdited }, item.key))),
        ];
    };
    return (_jsx("nav", { "aria-label": "breadcrumb", className: "flex items-center gap-2.5 font-medium text-neutral-60 dark:text-neutral-60-dark text-24px", children: renderItems() }));
};
export default Breadcrumb;
