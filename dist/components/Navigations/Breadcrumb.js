import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Tooltip } from '..';
const MAX_LABEL_LENGTH = 32;
const truncateLabel = (label) => {
    const isTruncated = typeof label === 'string' && label.length > MAX_LABEL_LENGTH;
    return {
        display: isTruncated
            ? `${label.slice(0, MAX_LABEL_LENGTH)}...`
            : label,
        fullLabel: isTruncated ? label : '',
        isTruncated,
    };
};
const BreadcrumbLink = ({ item, isLast = false, isFormEdited, onNavigate, }) => {
    const handleRoute = (href) => (e) => {
        e.preventDefault();
        if (!onNavigate)
            return;
        Modal.danger({
            title: 'Unsaved Changes',
            content: 'You have unsaved changes. Going back now will discard them.',
            confirmText: 'Discard',
            onConfirm: () => {
                onNavigate(href);
            },
        });
    };
    const { display, fullLabel, isTruncated } = truncateLabel(item.label);
    const wrapWithTooltip = (node) => isTruncated ? (_jsx(Tooltip, { title: fullLabel, verticalAlign: "bottom", horizontalAlign: "center", arrow: true, children: node })) : (_jsx(_Fragment, { children: node }));
    return isLast ? (wrapWithTooltip(_jsx("div", { className: "text-neutral-70 dark:text-neutral-70-dark", children: display }))) : (_jsxs(_Fragment, { children: [item.href &&
                isFormEdited &&
                wrapWithTooltip(_jsx(Link, { to: item.href, onClick: handleRoute(item.href), className: "cursor-pointer", children: display })), item.href &&
                !isFormEdited &&
                wrapWithTooltip(_jsx(Link, { to: item.href, children: display })), !item.href && wrapWithTooltip(_jsx("div", { children: display })), _jsx("div", { children: "/" })] }));
};
/**
 * Displays a list of breadcrumb items with support for truncating when the item count exceeds the maximum display value.
 * If more than `maxDisplay` items are provided, it will show the first few, followed by an ellipsis, and then the last few.
 */
const Breadcrumb = ({ items, maxDisplay = 4, ...props }) => {
    const parsedItem = items.map((item, index) => ({
        key: index,
        label: item.label,
        href: item.href,
    }));
    const shouldTruncate = items.length > maxDisplay;
    const renderItems = () => {
        if (!shouldTruncate) {
            return parsedItem.map((item, index) => (_jsx(BreadcrumbLink, { item: item, isLast: index === parsedItem.length - 1, ...props }, item.key)));
        }
        const leftCount = Math.floor(maxDisplay / 2);
        const rightCount = maxDisplay % 2 === 0 ? leftCount : leftCount + 1;
        const firstItems = parsedItem.slice(0, leftCount);
        const lastItems = parsedItem.slice(parsedItem.length - rightCount);
        return [
            ...firstItems.map((item) => (_jsx(BreadcrumbLink, { item: item, isLast: false, ...props }, item.key))),
            _jsxs(React.Fragment, { children: [_jsx("span", { className: "mx-2.5", children: "..." }), _jsx("span", { children: "/" })] }, "ellipsis"),
            ...lastItems.map((item, index) => (_jsx(BreadcrumbLink, { item: item, isLast: index === lastItems.length - 1, ...props }, item.key))),
        ];
    };
    return (_jsx("nav", { "aria-label": "breadcrumb", className: "flex items-center gap-2.5 font-medium text-neutral-100 dark:text-neutral-100-dark text-14px", children: renderItems() }));
};
export default Breadcrumb;
