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
    return (React.createElement("div", { className: "flex flex-col" },
        React.createElement("div", { className: "flex gap-1", role: "tablist" }, items.map((tab) => {
            const isActive = activeKey === tab.key;
            return isActive ? (React.createElement("div", { key: tab.key, role: "none", className: cx('text-14px font-bold flex items-center gap-2 border rounded-md px-4 py-2 cursor-default', 'text-primary-main bg-primary-surface border-primary-surface', 'dark:text-primary-main-dark dark:bg-primary-surface-dark dark:border-primary-surface-dark') },
                React.createElement("div", { role: "tab" }, tab.label),
                closeable && (React.createElement(Icon, { name: "x-mark", size: 16, onClick: (e) => handleClose(tab.key, e), "aria-label": `Close ${tab.label}`, className: "text-neutral-60 dark:text-neutral-60-dark", strokeWidth: 3 })))) : (React.createElement("div", { key: tab.key, role: "none", className: cx('text-14px font-bold flex items-center gap-2 border rounded-md px-4 py-2 cursor-pointer', 'bg-primary-15 dark:bg-primary-15-dark border-neutral-40 dark:border-neutral-40-dark', {
                    'text-neutral-100 dark:text-neutral-100-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark hover:text-neutral-10 dark:hover:text-neutral-10-dark': !tab.disabled,
                    'text-neutral-40 dark:text-neutral-40-dark ': tab.disabled,
                }), onClick: () => handleTabClick(tab.key) },
                React.createElement("div", { role: "tab" }, tab.label),
                closeable && (React.createElement(Icon, { name: "x-mark", size: 16, onClick: (e) => handleClose(tab.key, e), "aria-label": `Close ${tab.label}`, className: "text-neutral-60 dark:text-neutral-60-dark", strokeWidth: 3 }))));
        })),
        React.createElement("div", { className: "p-4", role: "tabpanel", "aria-labelledby": `tab-${activeTab.key}`, id: `tabpanel-${activeTab.key}` }, (activeTab === null || activeTab === void 0 ? void 0 : activeTab.children) || (React.createElement("div", { className: "text-gray-500" }, "No content available")))));
};
export default Tab;
//# sourceMappingURL=Tab.js.map