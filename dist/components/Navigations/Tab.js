import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
const Tab = ({ items, defaultActiveKey, activeKey: propActiveKey, fillParentWidth, textAlign = 'left', mountAllTabs = false, onTabClick, onTabClose, }) => {
    const [activeKey, setActiveKey] = React.useState(propActiveKey ?? defaultActiveKey ?? items[0]?.key);
    const tabsRef = React.useRef(null);
    const indicatorRef = React.useRef(null);
    React.useEffect(() => {
        if (propActiveKey !== undefined) {
            setActiveKey(propActiveKey);
        }
    }, [propActiveKey]);
    const handleTabClick = (key, index, detail) => {
        if (propActiveKey === undefined) {
            setActiveKey(key);
        }
        onTabClick?.(key, index, detail);
    };
    const handleClose = (key, index) => (e) => {
        e.stopPropagation();
        onTabClose?.(key, index);
    };
    const activeTab = items.find((tab) => tab.key === activeKey) || items[0];
    const closeable = !!onTabClose;
    // Move underline
    React.useLayoutEffect(() => {
        const container = tabsRef.current;
        const indicator = indicatorRef.current;
        if (!container || !indicator)
            return;
        const activeEl = container.querySelector(`[data-tab-key="${activeKey}"]`);
        if (!activeEl)
            return;
        indicator.style.width = `${activeEl.offsetWidth}px`;
        indicator.style.transform = `translateX(${activeEl.offsetLeft}px)`;
    }, [activeKey, items]);
    return (_jsxs("div", { className: "flex flex-col w-full", children: [_jsxs("div", { ref: tabsRef, className: "relative flex gap-1 border-b border-neutral-30 mb-4", role: "tablist", children: [_jsx("div", { ref: indicatorRef, className: "absolute bottom-0 h-1 bg-primary-main transition-all duration-300 ease-out", style: { width: 0 } }), items.map((tab, index) => {
                        const isActive = activeKey === tab.key;
                        return (_jsxs("button", { type: "button", "data-tab-key": tab.key, role: "tab", "aria-selected": isActive ? 'true' : 'false', onClick: () => !tab.disabled && handleTabClick(tab.key, index, tab), onKeyDown: (e) => !tab.disabled &&
                                (e.key === 'Enter' || e.key === ' ') &&
                                handleTabClick(tab.key, index, tab), className: cx('relative text-14px font-semibold flex items-center justify-between gap-2 px-4 pb-4 cursor-pointer select-none', {
                                'text-primary-main': isActive,
                                'text-neutral-90 hover:text-primary-hover': !isActive && !tab.disabled,
                                'text-neutral-40 cursor-not-allowed': tab.disabled,
                                'flex-1': fillParentWidth,
                            }), style: { textAlign }, children: [_jsx("div", { className: "w-full", children: tab.label }), closeable && (_jsx(Icon, { name: "x-mark", size: 16, onClick: handleClose(tab.key, index), "aria-label": `Close ${tab.label}`, className: "text-neutral-60", strokeWidth: 1 }))] }, tab.key));
                    })] }), mountAllTabs ? (items.map((tab) => (_jsx("div", { role: "tabpanel", "aria-labelledby": `tab-${tab.key}`, id: `tabpanel-${tab.key}`, style: { display: activeKey === tab.key ? undefined : 'none' }, children: tab.children }, tab.key)))) : (_jsx("div", { role: "tabpanel", "aria-labelledby": `tab-${activeTab?.key}`, id: `tabpanel-${activeTab?.key}`, children: activeTab?.children ?? (_jsx("div", { className: "text-neutral-50", children: "No content available" })) }))] }));
};
export default Tab;
