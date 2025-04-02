/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import Checkbox from '../Inputs/Checkbox';
import FilterSearch from './FilterSearch';
import FilterSelect from './FilterSelect';
/**
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
 *
 */
const Table = ({ columns, data, stickyHeader = false, maxHeight = 680, selectedRows: selectedRowsProp, onRowSelect, sorting, showDanger, onSort, fullwidth, showSelected = false, size = 'default', verticalAlign, }) => {
    const [sortConfig, setSortConfig] = React.useState(sorting || { key: columns[0].key, direction: null });
    const [internalSelectedRows, setInternalSelectedRows] = React.useState([]);
    const isControlled = selectedRowsProp !== undefined;
    const selectedRows = isControlled ? selectedRowsProp : internalSelectedRows;
    const handleSort = (columnKey) => {
        let newConfig;
        if (sortConfig.key === columnKey) {
            newConfig = {
                key: columnKey,
                direction: sortConfig.direction === 'asc'
                    ? 'desc'
                    : sortConfig.direction === 'desc'
                        ? null
                        : 'asc',
            };
        }
        else {
            newConfig = { key: columnKey, direction: 'asc' };
        }
        setSortConfig(newConfig);
        onSort === null || onSort === void 0 ? void 0 : onSort(newConfig);
    };
    const handleRowSelect = (row, isSelected) => {
        const newSelectedRows = isSelected
            ? [...selectedRows, row]
            : selectedRows.filter((selectedRow) => selectedRow !== row);
        onRowSelect === null || onRowSelect === void 0 ? void 0 : onRowSelect(row, isSelected, newSelectedRows);
        if (!isControlled) {
            setInternalSelectedRows(newSelectedRows);
        }
    };
    return (React.createElement("div", { className: cx('text-neutral-100 dark:text-neutral-100-dark overflow-x-auto', { 'w-full': fullwidth }) },
        React.createElement("div", { className: "overflow-y-auto border border-neutral-30 dark:border-neutral-30-dark rounded-md", style: stickyHeader ? { maxHeight } : undefined },
            React.createElement("table", { className: "min-w-full border-collapse", style: { tableLayout: 'auto' } },
                React.createElement("thead", { className: cx({
                        'sticky top-0 bg-neutral-10 shadow-md z-10': stickyHeader,
                    }) },
                    React.createElement("tr", null,
                        showSelected && (React.createElement("th", { className: cx('font-medium text-left bg-neutral-20 dark:bg-neutral-20-dark px-4 py-3 border-r border-neutral-30 dark:border-neutral-30-dark last:border-none', {
                                'text-18px': size === 'large',
                                'text-14px': size === 'default',
                            }) },
                            React.createElement("div", { className: "flex items-center justify-center" }, "Select"))),
                        columns.map((col) => (React.createElement("th", { key: col.key.toString(), className: cx('font-medium text-left bg-neutral-20 dark:bg-neutral-20-dark px-4 py-3 border-r border-neutral-30 dark:border-neutral-30-dark last:border-none', {
                                'text-18px': size === 'large',
                                'text-14px': size === 'default',
                            }), style: {
                                width: col.width,
                                minWidth: col.width ||
                                    `${Math.max(typeof col.width === 'number' ? col.width : 0, col.minWidth
                                        ? parseInt(col.minWidth.toString(), 10)
                                        : 0, 150)}px`,
                            } },
                            React.createElement("div", { className: "flex gap-4 items-center justify-between" },
                                col.sortable ? (React.createElement("div", { role: "button", className: "w-full flex items-center gap-2.5", onClick: () => col.sortable && handleSort(col.key) },
                                    col.subLabel ? (React.createElement("div", { className: "flex flex-col items-center" },
                                        col.label,
                                        React.createElement("span", { className: "text-16px" }, col.subLabel))) : (col.label),
                                    col.sortable && (React.createElement("div", { className: "flex flex-col gap-0.5" },
                                        React.createElement("span", { className: `w-0 h-0 border-l-4 border-l-transparent dark:border-l-transparent border-r-4 border-r-transparent dark:border-r-transparent border-b-8 transition-colors duration-300 ${col.key === sortConfig.key &&
                                                sortConfig.direction === 'asc'
                                                ? 'border-primary-main dark:border-primary-main-dark'
                                                : 'border-neutral-60 dark:border-neutral-60-dark'}` }),
                                        React.createElement("span", { className: `w-0 h-0 border-l-4 border-l-transparent dark:border-l-transparent border-r-4 border-r-transparent dark:border-r-transparent border-t-8 transition-colors duration-300 ${col.key === sortConfig.key &&
                                                sortConfig.direction === 'desc'
                                                ? 'border-primary-main dark:border-primary-main-dark'
                                                : 'border-neutral-60 dark:border-neutral-60-dark'}` }))))) : (React.createElement("div", { className: "w-full flex items-center" }, col.subLabel ? (React.createElement("div", { className: "flex flex-col items-start" },
                                    col.label,
                                    React.createElement("span", { className: "text-16px" }, col.subLabel))) : (col.label))),
                                col.filter !== undefined && col.filter === 'textfield' && (React.createElement(FilterSearch, { label: col.label, value: col.filterValue, onChange: (value) => { var _a; return (_a = col.onChange) === null || _a === void 0 ? void 0 : _a.call(col, value); } })),
                                (col.filter === 'select' ||
                                    col.filter === 'autocomplete') && (React.createElement(FilterSelect, { type: col.filter, label: col.label, value: col.filterValue, option: col.option || [], onChange: (value) => { var _a; return (_a = col.onChange) === null || _a === void 0 ? void 0 : _a.call(col, value); } })))))))),
                React.createElement("tbody", null, data.map((row, rowIndex) => {
                    const isDanger = showDanger && showDanger(row);
                    const isSelected = showSelected &&
                        selectedRows.some((index) => index === rowIndex);
                    return (React.createElement("tr", { key: rowIndex, className: cx('group border-b border-neutral-30 last:border-none', {
                            'text-18px': size === 'large',
                            'text-14px': size === 'default',
                            'bg-danger-surface dark:bg-danger-surface-dark hover:bg-danger-border/20 dark:hover:bg-danger-border/20-dark': isDanger,
                            'bg-neutral-10 dark:bg-neutral-10-dark even:bg-neutral-15 dark:even:bg-neutral-15-dark hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isDanger,
                        }) },
                        showSelected && (React.createElement("td", { className: "py-1.5 text-center break-words", style: { verticalAlign: verticalAlign } },
                            React.createElement("div", { className: cx('px-4 py-3', {
                                    'bg-primary-surface dark:bg-primary-surface-dark': isSelected,
                                }) },
                                React.createElement(Checkbox, { id: `select_row_${rowIndex}`, checked: isSelected, onChange: (isChecked) => handleRowSelect(rowIndex, isChecked), disabled: !onRowSelect, className: "h-5", "aria-label": `select_row_${rowIndex}` })))),
                        columns.map((col) => {
                            const rowCol = col.dataIndex ? row[col.dataIndex] : null;
                            const value = rowCol == null || rowCol === '' ? '-' : rowCol;
                            return (React.createElement("td", { key: col.key.toString(), className: "py-1.5 break-words", style: { verticalAlign: verticalAlign } },
                                React.createElement("div", { className: cx('px-4 py-3', {
                                        'bg-primary-surface dark:bg-primary-surface-dark': isSelected,
                                    }) }, col.render ? (col.render(rowCol, row, rowIndex)) : (React.createElement("div", { className: "line-clamp-3" }, value)))));
                        })));
                }))))));
};
export default Table;
