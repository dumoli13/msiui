import React, { ReactNode } from 'react';
import { SelectValue } from '../Inputs/Select';
export type TableColumn<T, D = unknown, FilterType = string | SelectValue<T[keyof T], D> | null> = {
    filter: 'textfield';
    key: string;
    dataIndex?: keyof T;
    label: string;
    subLabel?: string;
    sortable?: boolean;
    width?: number | string;
    minWidth?: number;
    render?: (value: T[keyof T] | null, record: T, index: number) => ReactNode;
    filterValue: string;
    onChange: (value: string) => void;
} | {
    filter: 'select' | 'autocomplete';
    key: string;
    dataIndex?: keyof T;
    label: string;
    subLabel?: string;
    sortable?: boolean;
    width?: number | string;
    minWidth?: number;
    render?: (value: T[keyof T] | null, record: T, index: number) => ReactNode;
    filterValue: FilterType;
    onChange: (value: FilterType) => void;
    option: Array<SelectValue<T[keyof T], D>>;
} | {
    filter?: 'none';
    key: string;
    dataIndex?: keyof T;
    label: string;
    subLabel?: string;
    sortable?: boolean;
    width?: number | string;
    minWidth?: number;
    render?: (value: T[keyof T] | null, record: T, index: number) => ReactNode;
    filterValue?: FilterType;
};
export type TableSortingProps<T> = {
    direction: 'asc' | 'desc' | null;
    key: keyof T;
};
export type TableFilterProps<T> = {
    [key in keyof T]?: string | SelectValue<T[keyof T]> | null;
};
interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    stickyHeader?: boolean;
    maxHeight?: number | string;
    selectedRows?: number[];
    onRowSelect?: (row: number, value: boolean, selectedRows: number[]) => void;
    sorting?: TableSortingProps<T> | null;
    onSort?: (sort: TableSortingProps<T>) => void;
    render?: (value: any, record: T) => ReactNode;
    showDanger?: (record: T) => boolean;
    fullwidth?: boolean;
    showSelected?: boolean;
    size?: 'default' | 'large';
    verticalAlign?: 'top' | 'center' | 'bottom';
}
/**
 * @component Table
 *
 * A dynamic and customizable table component for rendering tabular data with features such as sorting, filtering, row selection, and responsive design.
 *
 * @template T - Generic type `T` represents the structure of the data rows.
 * Property
 * @property {TableColumn<T>[]} columns - An array of column configurations, where each column can define its label, key, filter type, sortability, and rendering logic.
 * @property {T[]} data - The array of data rows to display in the table. Each object in the array should align with the column definitions.
 * @property {boolean} [stickyHeader=false] - If `true`, the table header will remain fixed at the top when scrolling.
 * @property {number|string} [maxHeight=680] - The maximum height of the table's scrollable area. Applies only when `stickyHeader` is `true`.
 * @property {number[]} [selectedRows] - An array of indices for the selected rows. Enables controlled row selection.
 * @property {(row: number, value: boolean, selectedRows: number[]) => void} [onRowSelect] - Callback triggered when a row is selected or deselected. Provides the index of the row, its new selected state, and the updated selected rows array.
 * @property {TableSortingProps<T>} [sorting] - Initial sorting configuration. Defines the key to sort by and the direction (`asc`, `desc`, or `null`).
 * @property {(sort: TableSortingProps<T>) => void} [onSort] - Callback triggered when a column header is clicked for sorting. Provides the new sorting configuration.
 * @property {(record: T) => boolean} [showDanger] - Function to determine if a row should be highlighted as "danger". Returns `true` to apply danger styling.
 * @property {boolean} [fullwidth=false] - If `true`, the table spans the full width of its container.
 * @property {boolean} [showSelected=false] - If `true`, includes a column for row selection with checkboxes.
 * @property {'default' | 'large'} [size='default'] - Determines the size of the table cells and typography.
 * @property {'top' | 'center' | 'bottom'} [verticalAlign] - Controls the vertical alignment of cell content. Defaults to `top`.
 *
 * @example Basic Usage:
 * ```tsx
 * import React, { useState } from 'react';
 * import Table from './Table';
 *
 * type DataRow = { id: number; name: string; age: number; status: string };
 *
 * const data: DataRow[] = [
 *   { id: 1, name: 'Alice', age: 30, status: 'Active' },
 *   { id: 2, name: 'Bob', age: 25, status: 'Inactive' },
 *   { id: 3, name: 'Charlie', age: 35, status: 'Active' },
 * ];
 *
 * const columns = [
 *   { key: 'name', label: 'Name', sortable: true },
 *   { key: 'age', label: 'Age', sortable: true },
 *   { key: 'status', label: 'Status', filter: 'select', option: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
 * ];
 *
 * const App = () => {
 *   const [sorting, setSorting] = useState(null);
 *   const [selectedRows, setSelectedRows] = useState<number[]>([]);
 *
 *   return (
 *     <Table
 *       columns={columns}
 *       data={data}
 *       sorting={sorting}
 *       onSort={setSorting}
 *       showSelected
 *       selectedRows={selectedRows}
 *       onRowSelect={(row, isSelected, newSelectedRows) =>
 *         setSelectedRows(newSelectedRows)
 *       }
 *     />
 *   );
 * };
 *
 * export default App;
 * ```
 *
 */
declare const Table: <T extends {
    [key: string]: any;
}>({ columns, data, stickyHeader, maxHeight, selectedRows: selectedRowsProp, onRowSelect, sorting, showDanger, onSort, fullwidth, showSelected, size, verticalAlign, }: TableProps<T>) => React.JSX.Element;
export default Table;
