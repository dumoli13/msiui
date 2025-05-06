import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
const Tab = ({ items, defaultActiveKey, activeKey: propActiveKey, onChange, onTabClick, onTabClose, }) => {
    var _a, _b;
    const [activeKey, setActiveKey] = React.useState((_a = propActiveKey !== null && propActiveKey !== void 0 ? propActiveKey : defaultActiveKey) !== null && _a !== void 0 ? _a : (_b = items[0]) === null || _b === void 0 ? void 0 : _b.key);
    // Sync internal state with prop changes
    React.useEffect(() => {
        if (propActiveKey !== undefined) {
            setActiveKey(propActiveKey);
        }
    }, [propActiveKey]);
    const handleTabClick = (key) => {
        if (propActiveKey === undefined) {
            setActiveKey(key);
        }
        onTabClick === null || onTabClick === void 0 ? void 0 : onTabClick(key);
        onChange === null || onChange === void 0 ? void 0 : onChange(key);
    };
    const handleClose = (key, e) => {
        e.stopPropagation();
        onTabClose === null || onTabClose === void 0 ? void 0 : onTabClose(key);
    };
    const activeTab = React.useMemo(() => items.find((tab) => tab.key === activeKey) || items[0], [activeKey]);
    const closeable = React.useMemo(() => !!onTabClose, [onTabClose]);
    return (_jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "flex gap-1", role: "tablist", children: items.map((tab) => {
                    const isActive = activeKey === tab.key;
                    return isActive ? (_jsxs("div", { role: "none", className: cx('text-14px font-bold flex items-center gap-2 border rounded-md px-4 py-2 cursor-default', 'text-primary-main bg-primary-surface border-primary-surface', 'dark:text-primary-main-dark dark:bg-primary-surface-dark dark:border-primary-surface-dark'), children: [_jsx("div", { role: "tab", children: tab.label }), closeable && (_jsx(Icon, { name: "x-mark", size: 16, onClick: (e) => handleClose(tab.key, e), "aria-label": `Close ${tab.label}`, className: "text-neutral-60 dark:text-neutral-60-dark", strokeWidth: 3 }))] }, tab.key)) : (_jsxs("div", { role: "none", className: cx('text-14px font-bold flex items-center gap-2 border rounded-md px-4 py-2 cursor-pointer', 'bg-primary-15 dark:bg-primary-15-dark border-neutral-40 dark:border-neutral-40-dark', {
                            'text-neutral-100 dark:text-neutral-100-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark hover:text-neutral-10 dark:hover:text-neutral-10-dark': !tab.disabled,
                            'text-neutral-40 dark:text-neutral-40-dark ': tab.disabled,
                        }), onClick: () => handleTabClick(tab.key), children: [_jsx("div", { role: "tab", children: tab.label }), closeable && (_jsx(Icon, { name: "x-mark", size: 16, onClick: (e) => handleClose(tab.key, e), "aria-label": `Close ${tab.label}`, className: "text-neutral-60 dark:text-neutral-60-dark", strokeWidth: 3 }))] }, tab.key));
                }) }), _jsx("div", { className: "p-4", role: "tabpanel", "aria-labelledby": `tab-${activeTab.key}`, id: `tabpanel-${activeTab.key}`, children: (activeTab === null || activeTab === void 0 ? void 0 : activeTab.children) || (_jsx("div", { className: "text-gray-500", children: "No content available" })) })] }));
};
export default Tab;
