import React from 'react';
export interface TabItem {
    key: string | number;
    label: string;
    disabled?: boolean;
    children: React.ReactNode;
}
export interface TabProps {
    items: TabItem[];
    defaultActiveKey?: string | number;
    activeKey?: string | number;
    onChange?: (key: string | number) => void;
    onTabClick?: (key: string | number) => void;
    onTabClose?: (key: string | number) => void;
}
declare const Tab: ({ items, defaultActiveKey, activeKey: propActiveKey, onChange, onTabClick, onTabClose, }: TabProps) => import("react/jsx-runtime").JSX.Element;
export default Tab;
//# sourceMappingURL=Tab.d.ts.map