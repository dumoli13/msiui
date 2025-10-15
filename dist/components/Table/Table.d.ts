import React from 'react';
import { SelectValue } from '../../types/input';
type BaseColumnCommon = {
    key: string;
    label: string;
    subLabel?: React.ReactNode;
    sortable?: boolean;
    width?: number | string;
    minWidth?: number;
    align?: 'left' | 'center' | 'right';
};
type ColumnWithDataIndex<T, K extends keyof T> = BaseColumnCommon & {
    dataIndex: K;
    render?: (value: T[K], record: T, index: number) => React.ReactNode;
};
type ColumnWithoutDataIndex<T> = BaseColumnCommon & {
    dataIndex?: never;
    render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
};
type TextFieldColumn<T, K extends keyof T> = (ColumnWithDataIndex<T, K> & {
    filter: 'textfield';
    filterValue: string;
    onChange: (value: string) => void;
}) | (ColumnWithoutDataIndex<T> & {
    filter: 'textfield';
    filterValue: string;
    onChange: (value: string) => void;
});
type SelectColumn<T, K extends keyof T, D = undefined> = (ColumnWithDataIndex<T, K> & {
    filter: 'select' | 'autocomplete';
    filterValue: SelectValue<T[K], D> | null;
    onChange: (value: SelectValue<T[K], D> | null) => void;
    option: Array<SelectValue<T[K], D>>;
}) | (ColumnWithoutDataIndex<T> & {
    filter: 'select' | 'autocomplete';
    filterValue: unknown;
    onChange: (value: unknown) => void;
    option: Array<SelectValue<any, D>>;
});
type NoFilterColumn<T, K extends keyof T = keyof T> = (ColumnWithDataIndex<T, K> & {
    filter?: 'none';
    filterValue?: T[K] | null;
}) | (ColumnWithoutDataIndex<T> & {
    filter?: 'none';
    filterValue?: unknown;
});
export type TableColumn<T> = {
    [K in keyof T]: TextFieldColumn<T, K>;
}[keyof T] | {
    [K in keyof T]: SelectColumn<T, K>;
}[keyof T] | {
    [K in keyof T]: NoFilterColumn<T, K>;
}[keyof T];
export type TableSortingProps<T> = {
    direction: 'asc' | 'desc' | null;
    key: keyof T;
};
export type TableFilterProps<T> = {
    [key in keyof T]?: string | SelectValue<T[keyof T]> | null;
};
export interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    stickyHeader?: boolean;
    maxHeight?: number | string;
    selectedRows?: number[];
    onRowSelect?: (row: number, value: boolean, selectedRows: number[]) => void;
    sorting?: TableSortingProps<T> | null;
    onSort?: (sort: TableSortingProps<T>) => void;
    rowClassName?: (record: T) => string;
    rowStyle?: (record: T) => React.CSSProperties;
    fullwidth?: boolean;
    showSelected?: boolean;
    size?: 'small' | 'default' | 'large';
    verticalAlign?: 'top' | 'center' | 'bottom';
    style?: 'default' | 'simple';
    onRowClick?: (record: T, index: number) => void;
}
/**
 * Tables display sets of data. They can be fully customized.
 */
declare const Table: <T extends {
    [key: string]: any;
}>({ columns, data, stickyHeader, maxHeight, selectedRows: selectedRowsProp, onRowSelect, sorting, rowClassName, rowStyle, onSort, fullwidth, showSelected, size, verticalAlign, style, onRowClick, }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
//# sourceMappingURL=Table.d.ts.map