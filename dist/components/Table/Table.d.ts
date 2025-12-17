import { TableProps } from '../../types';
/**
 * Tables display sets of data. They can be fully customized.
 */
declare const Table: <T extends {
    [key: string]: any;
}>({ columns, stickyHeader, maxHeight, selectedRows: selectedRowsProp, onRowSelect, sorting, rowClassName, rowStyle, onSort, fullwidth, showSelected, size, verticalAlign, style, onRowClick, data: dataProps, async, fetchData, paginate, total, pagination: paginationProps, onPageChange, }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
//# sourceMappingURL=Table.d.ts.map