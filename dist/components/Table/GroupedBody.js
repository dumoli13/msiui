import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import { DEFAULT_ITEMS_PER_PAGE } from '../../const';
import { Skeleton } from '../Displays';
import Icon from '../Icon';
import Checkbox from '../Inputs/Checkbox';
import { Pagination } from '../Navigations';
/**
 * Normalize PascalCase keys returned by OData grouped responses to camelCase,
 * so column render functions (which expect camelCase) work correctly.
 *
 * { Fullname: 'ALICE', BadgeNo: '001' } → { fullname: 'ALICE', badgeNo: '001' }
 */
function normalizeObjectKeys(obj) {
    const result = {};
    for (const k in obj) {
        const camelKey = k.charAt(0).toLowerCase() + k.slice(1);
        result[camelKey] = obj[k];
    }
    return result;
}
/**
 * Build a human-readable string from an object value when there is no column
 * render function.  Non-null values are joined with ' • '.
 */
const GROUP_INDENT_STEP = 24;
const GROUP_INDENT_BASE = 16;
function objectToDisplayString(obj) {
    const parts = Object.values(obj).filter((v) => v !== null && v !== undefined && v !== '');
    return parts.length > 0 ? parts.join(' • ') : '-';
}
const GroupedBody = ({ groups, groupLevel, columns, dataKey, size, style: tableStyle, verticalAlign, showSelected, selectedRows, isSelectAll, onRowSelect, onRowClick, rowClassName, rowStyle, onGroupToggle, onGroupPageChange, totalCols, highlightedNavIndex = -1, }) => {
    // Flat counter reset on each render; increments for every group header and
    // every leaf row in document order — must mirror the order of buildNavItems.
    const navCounter = { current: 0 };
    const handleRowSelect = (rowIndex, row, checked) => {
        const newSelectedRows = checked
            ? [...selectedRows, row[dataKey]]
            : selectedRows.filter((sr) => sr !== row[dataKey]);
        onRowSelect?.(rowIndex, checked, newSelectedRows);
    };
    const renderLeafRows = (rows, depth) => {
        return rows.map((row, rowIndex) => {
            const navIndex = navCounter.current++;
            const isHighlighted = navIndex === highlightedNavIndex;
            const isCustomRowClassName = rowClassName?.(row);
            const isSelected = showSelected && selectedRows.includes(row[dataKey]);
            return (_jsxs("tr", { "data-highlighted": isHighlighted, className: cx('group border-b border-neutral-30 dark:border-neutral-30-dark last:border-none', {
                    'text-18px': size === 'large',
                    'text-14px': size === 'small' || size === 'default',
                    'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isCustomRowClassName && !isHighlighted,
                    'bg-neutral-10 dark:bg-neutral-10-dark even:bg-neutral-15 dark:even:bg-neutral-15-dark': tableStyle === 'default' && !isHighlighted,
                    'bg-neutral-10 dark:bg-neutral-10-dark': tableStyle === 'simple' && !isHighlighted,
                    '!bg-neutral-40 dark:!bg-neutral-40-dark': isHighlighted,
                    'cursor-pointer': !!onRowClick,
                }, isCustomRowClassName), style: rowStyle?.(row), onClick: () => {
                    const selection = window.getSelection()?.toString();
                    if (selection && selection.length > 0)
                        return;
                    onRowClick?.(row, rowIndex);
                }, children: [showSelected && (_jsx("td", { className: cx('py-1.5 text-center break-words', {
                            'bg-primary-surface dark:bg-primary-surface-dark': isSelected && !isHighlighted,
                            '!bg-neutral-40 dark:!bg-neutral-40-dark': isHighlighted,
                        }), style: { verticalAlign }, onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), children: _jsx("div", { className: cx({
                                'flex items-center justify-center': isSelected,
                                'px-4 py-3': size === 'default' || size === 'large',
                                'px-4 py-0.5': size === 'small',
                            }), children: _jsx(Checkbox, { id: `select_group_row_${depth}_${rowIndex}`, checked: isSelectAll || isSelected, onChange: (checked) => handleRowSelect(rowIndex, row, checked), disabled: !onRowSelect, className: "h-5", "aria-label": `select_group_row_${depth}_${rowIndex}` }) }) })), columns.map((col) => {
                        const rowCol = col.dataIndex ? row[col.dataIndex] : null;
                        return (_jsx("td", { "data-col-key": col.key.toString(), className: cx('py-1.5 text-center break-words', {
                                'bg-primary-surface dark:bg-primary-surface-dark': isSelected && !isHighlighted,
                                '!bg-neutral-40 dark:!bg-neutral-40-dark': isHighlighted,
                            }), style: { verticalAlign }, children: _jsx("div", { className: cx({
                                    'px-4 py-3': size === 'default' || size === 'large',
                                    'px-4 py-0.5': size === 'small',
                                    'text-left': !col.align || col.align === 'left',
                                    'text-right': col.align === 'right',
                                    'text-center': col.align === 'center',
                                }), children: col.render ? (col.render(rowCol, row, rowIndex)) : (_jsx("div", { className: "line-clamp-3", children: typeof rowCol === 'object' && rowCol !== null
                                        ? objectToDisplayString(rowCol)
                                        : String(rowCol ?? '-') })) }) }, col.key.toString()));
                    })] }, rowIndex));
        });
    };
    /** Resolve the display metadata for a group node at a given depth. */
    const resolveGroupMeta = (group, depth, index) => {
        const rootField = (groupLevel?.[depth] ?? '').split('/')[0];
        const col = columns.find((item) => String(item.dataIndex ?? item.key).toLowerCase() ===
            rootField.toLowerCase());
        // Normalize PascalCase keys (grouped API response) to camelCase so column
        // render functions work correctly.
        const normalizedValue = typeof group.value === 'object' && group.value !== null
            ? normalizeObjectKeys(group.value)
            : group.value;
        // Human-readable text used as React key and aria-label fallback.
        const displayValue = typeof group.value === 'object' && group.value !== null
            ? objectToDisplayString(group.value)
            : String(group.value);
        const label = col?.render ? (col.render(normalizedValue, normalizedValue, index)) : (_jsxs("div", { className: "line-clamp-3", children: [displayValue ? displayValue : '-', " "] }));
        // Use serialized raw value as key so null-object groups ('{ Fullname: null, BadgeNo: null }')
        // don't collide with each other or with other groups that display as '-'.
        let stableKey;
        if (typeof group.value === 'object' && group.value !== null) {
            stableKey = JSON.stringify(group.value);
        }
        else if (group.value === null || group.value === undefined) {
            stableKey = '__null__';
        }
        else {
            stableKey = String(group.value);
        }
        return { displayValue, stableKey, label };
    };
    const renderGroupRow = (group, depth, index, toggleExpand, path) => {
        const { displayValue, stableKey, label } = resolveGroupMeta(group, depth, index);
        const groupNavIndex = navCounter.current++;
        const isGroupHighlighted = groupNavIndex === highlightedNavIndex;
        return (_jsxs(React.Fragment, { children: [_jsx("tr", { role: "button", "data-highlighted": isGroupHighlighted, className: cx('border-b border-neutral-30 dark:border-neutral-30-dark cursor-pointer', {
                        'text-18px': size === 'large',
                        'text-14px': size === 'small' || size === 'default',
                        'bg-neutral-10 dark:bg-neutral-10-dark hover:bg-neutral-20 dark:hover:bg-neutral-20-dark': !isGroupHighlighted,
                        '!bg-neutral-40 dark:!bg-neutral-40-dark': isGroupHighlighted,
                    }), onClick: () => {
                        const selection = window.getSelection()?.toString();
                        if (selection && selection.length > 0)
                            return;
                        toggleExpand();
                    }, "aria-label": `Group: ${displayValue}`, children: _jsx("td", { colSpan: totalCols, children: _jsxs("div", { className: cx('flex items-center gap-2 font-medium', {
                                'px-4 py-3': size === 'default' || size === 'large',
                                'px-4 py-2': size === 'small',
                            }), style: {
                                paddingLeft: depth * GROUP_INDENT_STEP + GROUP_INDENT_BASE,
                            }, children: [_jsx(Icon, { name: group.expanded ? 'chevron-down' : 'chevron-right', size: 16, strokeWidth: 2, className: "shrink-0 text-neutral-60 dark:text-neutral-60-dark" }), label, _jsxs("span", { className: "text-neutral-60 dark:text-neutral-60-dark font-normal", children: ["(", group.total, ")"] })] }) }) }), group.expanded && group.loading && (_jsx("tr", { children: _jsx("td", { colSpan: totalCols, "aria-label": "Loading group data", children: _jsx("div", { className: "px-4 py-2", style: {
                                paddingLeft: (depth + 1) * GROUP_INDENT_STEP + GROUP_INDENT_BASE,
                            }, children: _jsx(Skeleton, { width: 200, height: 20, type: "rounded" }) }) }) })), group.expanded &&
                    !group.loading &&
                    group.children &&
                    (group.isLeafGroup
                        ? renderLeafRows(group.children, depth + 1)
                        : renderGroups(group.children, depth + 1, path)), group.expanded && !group.loading && group.pagination && (_jsx("tr", { "aria-label": "Group Pagination", children: _jsx("td", { colSpan: totalCols, children: _jsx("div", { className: "py-2", style: {
                                paddingLeft: (depth + 1) * GROUP_INDENT_STEP + GROUP_INDENT_BASE,
                            }, children: _jsx(Pagination, { total: group.total, itemPerPage: DEFAULT_ITEMS_PER_PAGE, currentPage: group.pagination.page, pageSize: group.pagination.limit, onPageChange: (p) => onGroupPageChange?.(p, path) }) }) }) }))] }, stableKey));
    };
    const renderGroups = (nodes, depth, parentPath) => {
        return nodes.map((group, index) => {
            const path = [...parentPath, group.value];
            const toggleExpand = () => onGroupToggle?.(!group.expanded, path);
            return renderGroupRow(group, depth, index, toggleExpand, path);
        });
    };
    return _jsx("tbody", { children: renderGroups(groups, 0, []) });
};
export default GroupedBody;
