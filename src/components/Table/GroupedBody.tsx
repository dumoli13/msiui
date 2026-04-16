/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import { DEFAULT_ITEMS_PER_PAGE } from '../../const';
import type { TableColumn, TableGroupNode } from '../../types';
import type { PaginationDataType } from '../../types/navigations/pagination';
import { Skeleton } from '../Displays';
import Icon from '../Icon';
import Checkbox from '../Inputs/Checkbox';
import { Pagination } from '../Navigations';

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
  onGroupPageChange?: (
    pagination: PaginationDataType,
    path: T[keyof T][],
  ) => void;
  totalCols: number;
  highlightedNavIndex?: number;
}

/**
 * Normalize PascalCase keys returned by OData grouped responses to camelCase,
 * so column render functions (which expect camelCase) work correctly.
 *
 * { Fullname: 'ALICE', BadgeNo: '001' } → { fullname: 'ALICE', badgeNo: '001' }
 */
function normalizeObjectKeys(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
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

function objectToDisplayString(obj: Record<string, unknown>): string {
  const parts = Object.values(obj).filter(
    (v) => v !== null && v !== undefined && v !== '',
  );
  return parts.length > 0 ? parts.join(' • ') : '-';
}

const GroupedBody = <T, K extends keyof T>({
  groups,
  groupLevel,
  columns,
  dataKey,
  size,
  style: tableStyle,
  verticalAlign,
  showSelected,
  selectedRows,
  isSelectAll,
  onRowSelect,
  onRowClick,
  rowClassName,
  rowStyle,
  onGroupToggle,
  onGroupPageChange,
  totalCols,
  highlightedNavIndex = -1,
}: GroupedBodyProps<T, K>) => {
  // Flat counter reset on each render; increments for every group header and
  // every leaf row in document order — must mirror the order of buildNavItems.
  const navCounter = { current: 0 };

  const handleRowSelect = (rowIndex: number, row: T, checked: boolean) => {
    const newSelectedRows = checked
      ? [...selectedRows, row[dataKey]]
      : selectedRows.filter((sr) => sr !== row[dataKey]);
    onRowSelect?.(rowIndex, checked, newSelectedRows);
  };

  const renderLeafRows = (rows: T[], depth: number) => {
    return rows.map((row, rowIndex) => {
      const navIndex = navCounter.current++;
      const isHighlighted = navIndex === highlightedNavIndex;
      const isCustomRowClassName = rowClassName?.(row);
      const isSelected = showSelected && selectedRows.includes(row[dataKey]);

      return (
        <tr
          key={rowIndex}
          data-highlighted={isHighlighted}
          className={cx(
            'group border-b border-neutral-30 dark:border-neutral-30-dark last:border-none',
            {
              'text-18px': size === 'large',
              'text-14px': size === 'small' || size === 'default',
              'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                !isCustomRowClassName && !isHighlighted,
              'bg-neutral-10 dark:bg-neutral-10-dark even:bg-neutral-15 dark:even:bg-neutral-15-dark':
                tableStyle === 'default' && !isHighlighted,
              'bg-neutral-10 dark:bg-neutral-10-dark':
                tableStyle === 'simple' && !isHighlighted,
              '!bg-neutral-40 dark:!bg-neutral-40-dark': isHighlighted,
              'cursor-pointer': !!onRowClick,
            },
            isCustomRowClassName,
          )}
          style={rowStyle?.(row)}
          onClick={() => {
            const selection = window.getSelection()?.toString();
            if (selection && selection.length > 0) return;
            onRowClick?.(row, rowIndex);
          }}
        >
          {showSelected && (
            <td
              className={cx('py-1.5 text-center break-words', {
                'bg-primary-surface dark:bg-primary-surface-dark':
                  isSelected && !isHighlighted,
                '!bg-neutral-40 dark:!bg-neutral-40-dark': isHighlighted,
              })}
              style={{ verticalAlign }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <div
                className={cx({
                  'flex items-center justify-center': isSelected,
                  'px-4 py-3': size === 'default' || size === 'large',
                  'px-4 py-0.5': size === 'small',
                })}
              >
                <Checkbox
                  id={`select_group_row_${depth}_${rowIndex}`}
                  checked={isSelectAll || isSelected}
                  onChange={(checked) =>
                    handleRowSelect(rowIndex, row, checked)
                  }
                  disabled={!onRowSelect}
                  className="h-5"
                  aria-label={`select_group_row_${depth}_${rowIndex}`}
                />
              </div>
            </td>
          )}
          {columns.map((col) => {
            const rowCol = col.dataIndex ? row[col.dataIndex] : null;
            return (
              <td
                key={col.key.toString()}
                data-col-key={col.key.toString()}
                className={cx('py-1.5 text-center break-words', {
                  'bg-primary-surface dark:bg-primary-surface-dark':
                    isSelected && !isHighlighted,
                  '!bg-neutral-40 dark:!bg-neutral-40-dark': isHighlighted,
                })}
                style={{ verticalAlign }}
              >
                <div
                  className={cx({
                    'px-4 py-3': size === 'default' || size === 'large',
                    'px-4 py-0.5': size === 'small',
                    'text-left': !col.align || col.align === 'left',
                    'text-right': col.align === 'right',
                    'text-center': col.align === 'center',
                  })}
                >
                  {col.render ? (
                    col.render(
                      rowCol as NonNullable<typeof rowCol>,
                      row,
                      rowIndex,
                    )
                  ) : (
                    <div className="line-clamp-3">
                      {typeof rowCol === 'object' && rowCol !== null
                        ? objectToDisplayString(
                            rowCol as Record<string, unknown>,
                          )
                        : String(rowCol ?? '-')}
                    </div>
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  };

  /** Resolve the display metadata for a group node at a given depth. */
  const resolveGroupMeta = (
    group: TableGroupNode<T>,
    depth: number,
    index: number,
  ) => {
    const rootField = (groupLevel?.[depth] ?? '').split('/')[0];

    const col = columns.find(
      (item) =>
        String(item.dataIndex ?? item.key).toLowerCase() ===
        rootField.toLowerCase(),
    );

    // Normalize PascalCase keys (grouped API response) to camelCase so column
    // render functions work correctly.
    const normalizedValue =
      typeof group.value === 'object' && group.value !== null
        ? normalizeObjectKeys(group.value as Record<string, unknown>)
        : group.value;

    // Human-readable text used as React key and aria-label fallback.
    const displayValue =
      typeof group.value === 'object' && group.value !== null
        ? objectToDisplayString(group.value as Record<string, unknown>)
        : String(group.value);

    const label = col?.render ? (
      col.render(
        normalizedValue as T[keyof T],
        normalizedValue as unknown as T,
        index,
      )
    ) : (
      <div className="line-clamp-3">{displayValue ? displayValue : '-'} </div>
    );

    // Use serialized raw value as key so null-object groups ('{ Fullname: null, BadgeNo: null }')
    // don't collide with each other or with other groups that display as '-'.
    let stableKey: string;
    if (typeof group.value === 'object' && group.value !== null) {
      stableKey = JSON.stringify(group.value);
    } else if (group.value === null || group.value === undefined) {
      stableKey = '__null__';
    } else {
      stableKey = String(group.value);
    }

    return { displayValue, stableKey, label };
  };

  const renderGroupRow = (
    group: TableGroupNode<T>,
    depth: number,
    index: number,
    toggleExpand: () => void,
    path: T[keyof T][],
  ) => {
    const { displayValue, stableKey, label } = resolveGroupMeta(
      group,
      depth,
      index,
    );

    const groupNavIndex = navCounter.current++;
    const isGroupHighlighted = groupNavIndex === highlightedNavIndex;

    return (
      <React.Fragment key={stableKey}>
        {/* Group header row */}
        <tr
          role="button"
          data-highlighted={isGroupHighlighted}
          className={cx(
            'border-b border-neutral-30 dark:border-neutral-30-dark cursor-pointer',
            {
              'text-18px': size === 'large',
              'text-14px': size === 'small' || size === 'default',
              'bg-neutral-10 dark:bg-neutral-10-dark hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                !isGroupHighlighted,
              '!bg-neutral-40 dark:!bg-neutral-40-dark': isGroupHighlighted,
            },
          )}
          onClick={() => {
            const selection = window.getSelection()?.toString();
            if (selection && selection.length > 0) return;
            toggleExpand();
          }}
          aria-label={`Group: ${displayValue}`}
        >
          <td colSpan={totalCols}>
            <div
              className={cx('flex items-center gap-2 font-medium', {
                'px-4 py-3': size === 'default' || size === 'large',
                'px-4 py-2': size === 'small',
              })}
              style={{
                paddingLeft: depth * GROUP_INDENT_STEP + GROUP_INDENT_BASE,
              }}
            >
              <Icon
                name={group.expanded ? 'chevron-down' : 'chevron-right'}
                size={16}
                strokeWidth={2}
                className="shrink-0 text-neutral-60 dark:text-neutral-60-dark"
              />
              {label}
              <span className="text-neutral-60 dark:text-neutral-60-dark font-normal">
                ({group.total})
              </span>
            </div>
          </td>
        </tr>

        {/* Loading state */}
        {group.expanded && group.loading && (
          <tr>
            <td colSpan={totalCols} aria-label="Loading group data">
              <div
                className="px-4 py-2"
                style={{
                  paddingLeft:
                    (depth + 1) * GROUP_INDENT_STEP + GROUP_INDENT_BASE,
                }}
              >
                <Skeleton width={200} height={20} type="rounded" />
              </div>
            </td>
          </tr>
        )}

        {/* Expanded content */}
        {group.expanded &&
          !group.loading &&
          group.children &&
          (group.isLeafGroup
            ? renderLeafRows(group.children as T[], depth + 1)
            : renderGroups(
                group.children as TableGroupNode<T>[],
                depth + 1,
                path,
              ))}

        {/* Per-group pagination */}
        {group.expanded && !group.loading && group.pagination && (
          <tr aria-label="Group Pagination">
            <td colSpan={totalCols}>
              <div
                className="py-2"
                style={{
                  paddingLeft:
                    (depth + 1) * GROUP_INDENT_STEP + GROUP_INDENT_BASE,
                }}
              >
                <Pagination
                  total={group.total}
                  itemPerPage={DEFAULT_ITEMS_PER_PAGE}
                  currentPage={group.pagination.page}
                  pageSize={group.pagination.limit}
                  onPageChange={(p) => onGroupPageChange?.(p, path)}
                />
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  const renderGroups = (
    nodes: TableGroupNode<T>[],
    depth: number,
    parentPath: T[keyof T][],
  ): React.ReactNode => {
    return nodes.map((group, index) => {
      const path = [...parentPath, group.value];
      const toggleExpand = () => onGroupToggle?.(!group.expanded, path);
      return renderGroupRow(group, depth, index, toggleExpand, path);
    });
  };

  return <tbody>{renderGroups(groups, 0, [])}</tbody>;
};

export default GroupedBody;
