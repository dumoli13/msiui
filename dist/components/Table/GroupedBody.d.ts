import React from 'react';
import type { TableColumn, TableGroupNode } from '../../types';
import type { PaginationDataType } from '../../types/navigations/pagination';
interface GroupedBodyProps<T, K extends keyof T> {
    groups: TableGroupNode<T>[];
    groupLevel?: string[];
    columns: TableColumn<T>[];
    dataKey: K;
    size: 'small' | 'default' | 'large';
    style: 'default' | 'simple';
    verticalAlign?: 'top' | 'center' | 'bottom';
    showSelected: boolean;
    selectedRows: T[K][];
    isSelectAll?: boolean;
    onRowSelect?: (row: number, value: boolean, selectedRows: T[K][]) => void;
    onRowClick?: (record: T, index: number) => void;
    rowClassName?: (record: T) => string;
    rowStyle?: (record: T) => React.CSSProperties;
    onGroupToggle?: (expanded: boolean, path: T[keyof T][]) => void;
    onGroupPageChange?: (pagination: PaginationDataType, path: T[keyof T][]) => void;
    totalCols: number;
    highlightedNavIndex?: number;
}
declare const GroupedBody: <T, K extends keyof T>({ groups, groupLevel, columns, dataKey, size, style: tableStyle, verticalAlign, showSelected, selectedRows, isSelectAll, onRowSelect, onRowClick, rowClassName, rowStyle, onGroupToggle, onGroupPageChange, totalCols, highlightedNavIndex, }: GroupedBodyProps<T, K>) => import("react/jsx-runtime").JSX.Element;
export default GroupedBody;
//# sourceMappingURL=GroupedBody.d.ts.map