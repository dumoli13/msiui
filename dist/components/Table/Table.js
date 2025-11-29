import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import cx from 'classnames';
import { useDebouncedCallback } from 'use-debounce';
import { DEFAULT_ITEMS_PER_PAGE } from '../../const';
import { Skeleton } from '../Displays';
import Checkbox from '../Inputs/Checkbox';
import { Pagination } from '../Navigations';
import TableFilterSearch from './TableFilterSearch';
import TableFilterSelect from './TableFilterSelect';
/**
 * Tables display sets of data. They can be fully customized.
 */
const Table = ({ columns, stickyHeader = false, maxHeight = 680, selectedRows: selectedRowsProp, onRowSelect, sorting, rowClassName, rowStyle, onSort, fullwidth, showSelected = false, size = 'default', verticalAlign, style = 'default', onRowClick, data: dataProps, async, fetchData, paginate, total, pagination: paginationProps, onPageChange, }) => {
    const tableRef = React.useRef(null);
    const paginationRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [loadingFetchData, setLoadingFetchData] = React.useState(false);
    const [internalData, setInternalData] = React.useState(async ? [] : dataProps);
    const [pagination, setPagination] = React.useState(paginationProps ?? {
        page: 1,
        limit: DEFAULT_ITEMS_PER_PAGE[1],
    });
    const [filter, setFilter] = React.useState(columns.reduce((acc, col) => {
        const value = col.filterValue;
        if ('filterValue' in col && value) {
            acc[col.key] = String(typeof value === 'object' && 'value' in value ? value.value : value);
        }
        return acc;
    }, {}));
    const [ordering, setOrdering] = React.useState(sorting || {
        key: columns[0].key,
        direction: null,
    });
    const data = async ? internalData : dataProps;
    const handlePageChange = (data) => {
        setPagination(data);
        onPageChange?.(data);
    };
    const handleKeyDown = (e) => {
        const maxIndex = data.length - 1;
        switch (e.key) {
            case 'ArrowDown':
                if (!onRowClick)
                    break;
                e.preventDefault();
                setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                if (!onRowClick)
                    break;
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
                break;
            case 'ArrowLeft':
                e.preventDefault();
                paginationRef.current?.prev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                paginationRef.current?.next();
                break;
            case 'Enter':
                e.preventDefault();
                onRowClick?.(data[highlightedIndex], highlightedIndex);
                break;
            case 'Escape':
                if (!onRowClick)
                    break;
                e.preventDefault();
                setHighlightedIndex(-1);
                setFocused(false);
                break;
            default:
                break;
        }
    };
    const [internalSelectedRows, setInternalSelectedRows] = React.useState([]);
    const isControlled = selectedRowsProp !== undefined;
    const selectedRows = isControlled ? selectedRowsProp : internalSelectedRows;
    const handleFilter = (columnKey, value) => {
        setFilter((prev) => {
            const next = { ...prev };
            if (value === '') {
                delete next[columnKey];
            }
            else {
                next[columnKey] = value;
            }
            return next;
        });
    };
    const handleSort = (columnKey) => {
        let newConfig;
        if (ordering.key === columnKey) {
            let direction;
            switch (ordering.direction) {
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
        setOrdering(newConfig);
        onSort?.(newConfig);
    };
    const handleRowSelect = (row, isSelected) => {
        const newSelectedRows = isSelected
            ? [...selectedRows, row]
            : selectedRows.filter((selectedRow) => selectedRow !== row);
        onRowSelect?.(row, isSelected, newSelectedRows);
        if (!isControlled) {
            setInternalSelectedRows(newSelectedRows);
        }
    };
    React.useEffect(() => {
        if (!tableRef.current || highlightedIndex < 0)
            return;
        // Find any element that is marked as the highlighted one
        const activeItem = tableRef.current.querySelector('[data-highlighted="true"]');
        if (activeItem) {
            activeItem.scrollIntoView({
                block: 'end',
            });
        }
    }, [highlightedIndex]);
    const fetchDebounced = useDebouncedCallback(async () => {
        setLoadingFetchData(true);
        const newData = await fetchData(filter, pagination, ordering);
        setInternalData(newData);
        setLoadingFetchData(false);
    }, 1000);
    useEffect(() => {
        if (!async || !fetchData)
            return;
        fetchDebounced();
        return () => fetchDebounced.cancel();
    }, [filter, pagination, ordering]);
    return (_jsxs("div", { role: "button", tabIndex: 0, "aria-pressed": "true", className: cx('outline-none cursor-default text-neutral-100 dark:text-neutral-100-dark overflow-x-auto', {
            'w-full': fullwidth,
            'rounded-md ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
        }), onFocus: () => setFocused(true), onBlur: () => setFocused(false), onKeyDown: handleKeyDown, ref: tableRef, children: [loadingFetchData && data.length === 0 ? (_jsx(Skeleton.Table, { column: columns.length, row: pagination.limit })) : (_jsx("div", { className: "overflow-y-auto border border-neutral-30 dark:border-neutral-30-dark rounded-md mb-4", style: stickyHeader ? { maxHeight } : undefined, children: _jsxs("table", { className: "min-w-full border-collapse", style: { tableLayout: 'auto' }, children: [_jsx("thead", { className: cx({
                                'sticky top-0 bg-neutral-10 shadow-md z-10': stickyHeader,
                            }), children: _jsxs("tr", { children: [showSelected && (_jsx("th", { className: cx('font-medium text-left bg-neutral-20 dark:bg-neutral-20-dark border-r border-neutral-30 dark:border-neutral-30-dark last:border-none', {
                                            'px-4 py-3 text-18px': size === 'large',
                                            'px-4 py-3 text-14px': size === 'default',
                                            'px-4 py-2 text-14px': size === 'small',
                                        }), children: _jsx("div", { className: "flex items-center justify-center", children: "Select" }) })), columns.map((col) => (_jsx("th", { className: cx('font-medium bg-neutral-20 dark:bg-neutral-20-dark border-r border-neutral-30 dark:border-neutral-30-dark last:border-none', {
                                            'px-4 py-3 text-18px': size === 'large',
                                            'px-4 py-3 text-14px': size === 'default',
                                            'px-4 py-2 text-14px': size === 'small',
                                            'text-left': col.align === 'left',
                                            'text-right': col.align === 'right',
                                            'text-center': col.align === 'center',
                                        }), style: {
                                            width: col.width,
                                            minWidth: col.width ??
                                                `${Math.max(typeof col.width === 'number' ? col.width : 0, col.minWidth
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
                                                            }), children: [_jsx("div", { children: col.label }), _jsx("div", { children: col.subLabel })] })) : (col.label), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: `w-0 h-0 border-l-4 border-l-transparent dark:border-l-transparent border-r-4 border-r-transparent dark:border-r-transparent border-b-8 transition-colors duration-300 ${col.key === ordering.key &&
                                                                        ordering.direction === 'asc'
                                                                        ? 'border-primary-main dark:border-primary-main-dark'
                                                                        : 'border-neutral-60 dark:border-neutral-60-dark'}` }), _jsx("span", { className: `w-0 h-0 border-l-4 border-l-transparent dark:border-l-transparent border-r-4 border-r-transparent dark:border-r-transparent border-t-8 transition-colors duration-300 ${col.key === ordering.key &&
                                                                        ordering.direction === 'desc'
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
                                                    col.filter === 'textfield' && (_jsx(TableFilterSearch, { label: col.label, value: col.filterValue, onChange: (value) => {
                                                        handleFilter(col.key, value);
                                                        col.onChange?.(value);
                                                    } })), 'filter' in col &&
                                                    (col.filter === 'select' ||
                                                        col.filter === 'autocomplete') && (_jsx(TableFilterSelect, { type: col.filter, label: col.label, value: col.filterValue, option: col.option || [], onChange: (value) => {
                                                        handleFilter(col.key, value?.value);
                                                        col.onChange?.(value);
                                                    } }))] }) }, col.key.toString())))] }) }), _jsx("tbody", { children: data.map((row, rowIndex) => {
                                const isCustomRowClassName = rowClassName?.(row);
                                const isSelected = showSelected && selectedRows.includes(rowIndex);
                                return (_jsxs("tr", { "data-highlighted": rowIndex === highlightedIndex, className: cx('group border-b border-neutral-30 last:border-none', {
                                        'text-18px': size === 'large',
                                        'text-14px': size === 'small' || size === 'default',
                                        'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isCustomRowClassName,
                                        'bg-neutral-10 dark:bg-neutral-10-dark even:bg-neutral-15 dark:even:bg-neutral-15-dark': style === 'default',
                                        'bg-neutral-10 dark:bg-neutral-10-dark': style === 'simple',
                                        '!bg-primary-surface !dark:bg-primary-surface-dark': rowIndex === highlightedIndex,
                                        'cursor-pointer': !!onRowClick,
                                    }, isCustomRowClassName), style: rowStyle?.(row), onClick: () => onRowClick?.(row, rowIndex), children: [showSelected && (_jsx("td", { className: cx('py-1.5 text-center break-words', {
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
                            }) })] }) })), paginate && total && (_jsx(Pagination, { total: total, itemPerPage: DEFAULT_ITEMS_PER_PAGE, currentPage: pagination.page, pageSize: pagination.limit, onPageChange: handlePageChange, paginationRef: paginationRef })), paginate && !total && (_jsx(Pagination, { itemPerPage: DEFAULT_ITEMS_PER_PAGE, currentPage: pagination.page, pageSize: pagination.limit, onPageChange: handlePageChange, hasNext: data.length === pagination.limit, paginationRef: paginationRef }))] }));
};
export default Table;
