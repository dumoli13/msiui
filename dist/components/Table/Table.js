import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import Checkbox from '../Inputs/Checkbox';
import TableFilterSearch from './TableFilterSearch';
import TableFilterSelect from './TableFilterSelect';
/**
 * Tables display sets of data. They can be fully customized.
 */
const Table = ({ columns, data, stickyHeader = false, maxHeight = 680, selectedRows: selectedRowsProp, onRowSelect, sorting, rowClassName, rowStyle, onSort, fullwidth, showSelected = false, size = 'default', verticalAlign, style = 'default', onRowClick, }) => {
    const [sortConfig, setSortConfig] = React.useState(sorting || { key: columns[0].key, direction: null });
    const [internalSelectedRows, setInternalSelectedRows] = React.useState([]);
    const isControlled = selectedRowsProp !== undefined;
    const selectedRows = isControlled ? selectedRowsProp : internalSelectedRows;
    const handleSort = (columnKey) => {
        let newConfig;
        if (sortConfig.key === columnKey) {
            let direction;
            switch (sortConfig.direction) {
                case 'asc':
                    direction = 'desc';
                    break;
                case 'desc':
                    direction = null;
                    break;
                default:
                    direction = 'asc';
                    break;
            }
            newConfig = {
                key: columnKey,
                direction,
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
    return (_jsx("div", { className: cx('text-neutral-100 dark:text-neutral-100-dark overflow-x-auto', { 'w-full': fullwidth }), children: _jsx("div", { className: "overflow-y-auto border border-neutral-30 dark:border-neutral-30-dark rounded-md", style: stickyHeader ? { maxHeight } : undefined, children: _jsxs("table", { className: "min-w-full border-collapse", style: { tableLayout: 'auto' }, children: [_jsx("thead", { className: cx({
                            'sticky top-0 bg-neutral-10 shadow-md z-10': stickyHeader,
                        }), children: _jsxs("tr", { children: [showSelected && (_jsx("th", { className: cx('font-medium text-left bg-neutral-20 dark:bg-neutral-20-dark border-r border-neutral-30 dark:border-neutral-30-dark last:border-none', {
                                        'px-4 py-3 text-18px': size === 'large',
                                        'px-4 py-3 text-14px': size === 'default',
                                        'px-4 py-2 text-14px': size === 'small',
                                    }), children: _jsx("div", { className: "flex items-center justify-center", children: "Select" }) })), columns.map((col) => {
                                    var _a;
                                    return (_jsx("th", { className: cx('font-medium bg-neutral-20 dark:bg-neutral-20-dark border-r border-neutral-30 dark:border-neutral-30-dark last:border-none', {
                                            'px-4 py-3 text-18px': size === 'large',
                                            'px-4 py-3 text-14px': size === 'default',
                                            'px-4 py-2 text-14px': size === 'small',
                                            'text-left': col.align === 'left',
                                            'text-right': col.align === 'right',
                                            'text-center': col.align === 'center',
                                        }), style: {
                                            width: col.width,
                                            minWidth: (_a = col.width) !== null && _a !== void 0 ? _a : `${Math.max(typeof col.width === 'number' ? col.width : 0, col.minWidth
                                                ? parseInt(col.minWidth.toString(), 10)
                                                : 0, 150)}px`,
                                        }, children: _jsxs("div", { className: cx('flex gap-4 items-center justify-between', {}), children: [col.sortable && (_jsxs("div", { role: "button", className: cx('flex gap-2.5 items-center w-full', {
                                                        'justify-start': !col.align || col.align === 'left',
                                                        'justify-end': col.align === 'right',
                                                        'justify-center': col.align === 'center',
                                                    }), onClick: () => handleSort(col.key), children: [col.subLabel ? (_jsxs("div", { className: cx('flex flex-col', {
                                                                'items-start': !col.align || col.align === 'left',
                                                                'items-end': col.align === 'right',
                                                                'items-center': col.align === 'center',
                                                            }), children: [_jsx("div", { children: col.label }), _jsx("div", { children: col.subLabel })] })) : (col.label), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: `w-0 h-0 border-l-4 border-l-transparent dark:border-l-transparent border-r-4 border-r-transparent dark:border-r-transparent border-b-8 transition-colors duration-300 ${col.key === sortConfig.key &&
                                                                        sortConfig.direction === 'asc'
                                                                        ? 'border-primary-main dark:border-primary-main-dark'
                                                                        : 'border-neutral-60 dark:border-neutral-60-dark'}` }), _jsx("span", { className: `w-0 h-0 border-l-4 border-l-transparent dark:border-l-transparent border-r-4 border-r-transparent dark:border-r-transparent border-t-8 transition-colors duration-300 ${col.key === sortConfig.key &&
                                                                        sortConfig.direction === 'desc'
                                                                        ? 'border-primary-main dark:border-primary-main-dark'
                                                                        : 'border-neutral-60 dark:border-neutral-60-dark'}` })] })] })), !col.sortable && col.subLabel && (_jsxs("div", { className: cx('w-full flex flex-col', {
                                                        'items-start': !col.align || col.align === 'left',
                                                        'items-end': col.align === 'right',
                                                        'items-center': col.align === 'center',
                                                    }), children: [_jsx("div", { children: col.label }), _jsx("div", { children: col.subLabel })] })), !col.sortable && !col.subLabel && (_jsx("div", { className: cx('w-full', {
                                                        'text-left': !col.align || col.align === 'left',
                                                        'text-right': col.align === 'right',
                                                        'text-center': col.align === 'center',
                                                    }), children: col.label })), 'filter' in col &&
                                                    col.filter !== undefined &&
                                                    col.filter === 'textfield' && (_jsx(TableFilterSearch, { label: col.label, value: col.filterValue, onChange: (value) => { var _a; return (_a = col.onChange) === null || _a === void 0 ? void 0 : _a.call(col, value); } })), 'filter' in col &&
                                                    (col.filter === 'select' ||
                                                        col.filter === 'autocomplete') && (_jsx(TableFilterSelect, { type: col.filter, label: col.label, value: col.filterValue, option: col.option || [], onChange: (value) => { var _a; return (_a = col.onChange) === null || _a === void 0 ? void 0 : _a.call(col, value); } }))] }) }, col.key.toString()));
                                })] }) }), _jsx("tbody", { children: data.map((row, rowIndex) => {
                            const isCustomRowClassName = rowClassName === null || rowClassName === void 0 ? void 0 : rowClassName(row);
                            const isSelected = showSelected &&
                                selectedRows.some((index) => index === rowIndex);
                            return (_jsxs("tr", { className: cx('group border-b border-neutral-30 last:border-none', {
                                    'text-18px': size === 'large',
                                    'text-14px': size === 'small' || size === 'default',
                                    'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isCustomRowClassName,
                                    'bg-neutral-10 dark:bg-neutral-10-dark even:bg-neutral-15 dark:even:bg-neutral-15-dark': style === 'default',
                                    'bg-neutral-10 dark:bg-neutral-10-dark': style === 'simple',
                                    'cursor-pointer': !!onRowClick,
                                }, isCustomRowClassName), style: rowStyle === null || rowStyle === void 0 ? void 0 : rowStyle(row), onClick: () => onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(row, rowIndex), children: [showSelected && (_jsx("td", { className: cx('py-1.5 text-center break-words', {
                                            'bg-primary-surface dark:bg-primary-surface-dark': isSelected,
                                        }), style: { verticalAlign }, children: _jsx("div", { className: cx({
                                                'bg-primary-surface dark:bg-primary-surface-dark': isSelected,
                                                'px-4 py-3': size === 'default' || size === 'large',
                                                'px-4 py-0.5': size === 'small',
                                            }), children: _jsx(Checkbox, { id: `select_row_${rowIndex}`, checked: isSelected, onChange: (isChecked) => handleRowSelect(rowIndex, isChecked), disabled: !onRowSelect, className: "h-5", "aria-label": `select_row_${rowIndex}` }) }) })), columns.map((col) => {
                                        const rowCol = col.dataIndex ? row[col.dataIndex] : null;
                                        const value = rowCol == null || rowCol === '' ? '-' : rowCol;
                                        return (_jsx("td", { className: cx('py-1.5 text-center break-words', {
                                                'bg-primary-surface dark:bg-primary-surface-dark': isSelected,
                                            }), style: { verticalAlign }, children: _jsx("div", { className: cx({
                                                    'px-4 py-3': size === 'default' || size === 'large',
                                                    'px-4 py-0.5': size === 'small',
                                                    'text-left': !col.align || col.align === 'left',
                                                    'text-right': col.align === 'right',
                                                    'text-center': col.align === 'center',
                                                }), children: col.render ? (col.render(rowCol, row, rowIndex)) : (_jsx("div", { className: "line-clamp-3", children: value })) }) }, col.key.toString()));
                                    })] }, rowIndex));
                        }) })] }) }) }));
};
export default Table;
