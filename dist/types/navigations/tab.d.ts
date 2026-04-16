export interface TabItem {
    key: string | number;
    label: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
}
export interface TabProps {
    items: TabItem[];
    defaultActiveKey?: string | number;
    activeKey?: string | number;
    fillParentWidth?: boolean;
    textAlign?: 'left' | 'center' | 'right';
    mountAllTabs?: boolean;
    onTabClick?: (key: string | number, index: number, detail: TabItem) => void;
    onTabClose?: (key: string | number, index: number) => void;
}
//# sourceMappingURL=tab.d.ts.map