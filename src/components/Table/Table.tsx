/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import cx from 'classnames';
import { DEFAULT_ITEMS_PER_PAGE } from '../../const';
import type {
  TableGroupNode,
  TableProps,
  TableSortingProps,
} from '../../types';
import type {
  PaginationDataType,
  PaginationRef,
} from '../../types/navigations/pagination';
import { Skeleton } from '../Displays';
import Icon from '../Icon';
import Checkbox from '../Inputs/Checkbox';
import { Pagination } from '../Navigations';
import GroupedBody from './GroupedBody';
import SortableHeader from './SortableHeader';
import SortableRow from './SortableRow';
import { useFreezeLayout } from './useFreezeLayout';

const CELL_BASE_CLASS = 'py-1.6 text-center break-words';

type NavItem<T> =
  | { type: 'group'; path: T[keyof T][]; group: TableGroupNode<T> }
  | { type: 'leaf'; row: T };

function buildNavItems<T>(
  nodes: TableGroupNode<T>[],
  parentPath: T[keyof T][],
): NavItem<T>[] {
  const items: NavItem<T>[] = [];
  for (const node of nodes) {
    const path = [...parentPath, node.value];
    items.push({ type: 'group', path, group: node });
    if (node.expanded && node.children) {
      if (node.isLeafGroup) {
        for (const row of node.children as T[]) {
          items.push({ type: 'leaf', row });
        }
      } else {
        items.push(
          ...buildNavItems(node.children as TableGroupNode<T>[], path),
        );
      }
    }
  }
  return items;
}

type DndTransform = { x: number; y: number; scaleX: number; scaleY: number };

const restrictToHorizontalAxis = ({
  transform,
}: {
  transform: DndTransform;
}) => ({ ...transform, y: 0 });

const restrictToVerticalAxis = ({
  transform,
}: {
  transform: DndTransform;
}) => ({ ...transform, x: 0 });

// Stable empty array used as default for the `data` prop when groupable=true.
// Using a module-level constant prevents a new array reference being created on
// every render, which would otherwise cause an infinite useEffect loop.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EMPTY_DATA: any[] = [];

const POINTER_SENSOR_OPTIONS = { activationConstraint: { distance: 5 } };
const TOUCH_SENSOR_OPTIONS = {
  activationConstraint: { delay: 250, tolerance: 5 },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<string, any>, K extends keyof T>({
  columns,
  stickyHeader = false,
  maxHeight = 680,
  rowClassName,
  rowStyle,
  fullwidth,
  size = 'default',
  verticalAlign,
  style = 'default',
  onRowClick,
  sorting,
  onSort,
  dataKey,
  data = EMPTY_DATA as T[],
  loading,
  showSelected = false,
  onRowSelect,
  selectedRows: selectedRowsProp,
  isSelectAll,
  paginate,
  total,
  pagination: paginationProps,
  onPageChange,
  reorderable = false,
  onReorder,
  rowReorderable = false,
  onRowReorder,
  groupable = false,
  groupLevel,
  groups,
  onGroupToggle,
  onGroupPageChange,
  freezeLeftColumns = 0,
  freezeRightColumns = 0,
  freezeTopRows = 0,
  freezeBottomRows = 0,
  expandable = false,
  expandedRowKeys: expandedRowKeysProp,
  onExpandRow,
  renderExpandedRow,
}: TableProps<T, K>) => {
  const tableRef = React.useRef<HTMLDivElement>(null);
  const paginationRef = React.useRef<PaginationRef>(null);

  const [focused, setFocused] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const [internalColumns, setInternalColumns] = React.useState(columns);
  React.useEffect(() => {
    setInternalColumns(columns);
  }, [columns]);

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeColumnWidth = React.useRef<number>(150);
  const columnsBeforeDragRef = React.useRef(internalColumns);
  const activeColumn = React.useMemo(
    () => internalColumns.find((col) => String(col.key) === activeId) ?? null,
    [activeId, internalColumns],
  );

  // Row DnD state
  const [activeRowId, setActiveRowId] = React.useState<string | null>(null);
  const [internalData, setInternalData] = React.useState(data);
  React.useEffect(() => {
    setInternalData(data);
  }, [data]);
  const dataBeforeDragRef = React.useRef(internalData);

  // Collect visible leaf rows from groups tree (for select all in grouped mode)
  const getVisibleLeafRows = React.useCallback(
    (nodes: TableGroupNode<T>[]): T[] => {
      const result: T[] = [];
      for (const node of nodes) {
        if (!node.expanded || !node.children) continue;
        if (node.isLeafGroup) {
          result.push(...(node.children as T[]));
        } else {
          result.push(
            ...getVisibleLeafRows(node.children as TableGroupNode<T>[]),
          );
        }
      }
      return result;
    },
    [],
  );

  const visibleRows = groupable && groups ? getVisibleLeafRows(groups) : data;

  const navItems = React.useMemo<NavItem<T>[]>(
    () => (groupable && groups ? buildNavItems(groups, []) : []),
    [groupable, groups],
  );

  const sortableColumnItems = React.useMemo(
    () => internalColumns.map((col) => String(col.key)),
    [internalColumns],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, POINTER_SENSOR_OPTIONS),
    useSensor(TouchSensor, TOUCH_SENSOR_OPTIONS),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const extraColsBefore =
    (expandable ? 1 : 0) + (rowReorderable ? 1 : 0) + (showSelected ? 1 : 0);

  const { getCellStyle, getRowStyle } = useFreezeLayout({
    tableRef,
    freezeLeftColumns,
    freezeRightColumns,
    freezeTopRows,
    freezeBottomRows,
    checkboxFrozen: extraColsBefore > 0,
    totalDataCols:
      internalColumns.length + (rowReorderable && showSelected ? 1 : 0),
    stickyHeader,
    columnOrderSignal: internalColumns.map((col) => col.key).join(','),
  });

  const [pagination, setPagination] = React.useState<PaginationDataType>(
    paginationProps ?? {
      page: 1,
      limit: DEFAULT_ITEMS_PER_PAGE[1],
    },
  );

  useEffect(() => {
    setPagination(
      paginationProps ?? {
        page: 1,
        limit: DEFAULT_ITEMS_PER_PAGE[1],
      },
    );
  }, [paginationProps]);

  const [ordering, setOrdering] = React.useState<TableSortingProps<T>>(
    sorting || {
      key: columns[0].key,
      direction: null,
    },
  );

  const handlePageChange = (pageData: PaginationDataType) => {
    setPagination(pageData);
    onPageChange?.(pageData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const maxIndex = groupable ? navItems.length - 1 : visibleRows.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
        break;

      case 'ArrowUp':
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

      case ' ':
        e.preventDefault();
        if (highlightedIndex < 0 || highlightedIndex > maxIndex) break;
        if (groupable) {
          const item = navItems[highlightedIndex];
          if (item.type === 'group') {
            onGroupToggle?.(!item.group.expanded, item.path);
          }
        } else if (expandable && renderExpandedRow) {
          handleExpandRow(visibleRows[highlightedIndex]);
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex < 0 || highlightedIndex > maxIndex) break;
        if (groupable) {
          const item = navItems[highlightedIndex];
          if (item.type === 'leaf') {
            if (showSelected) {
              handleRowSelect(
                highlightedIndex,
                item.row,
                !selectedRows.includes(item.row[dataKey]),
              );
            }
            onRowClick?.(item.row, highlightedIndex);
          } else {
            onGroupToggle?.(!item.group.expanded, item.path);
          }
        } else {
          if (showSelected) {
            handleRowSelect(
              highlightedIndex,
              visibleRows[highlightedIndex],
              !selectedRows.includes(visibleRows[highlightedIndex][dataKey]),
            );
          }
          onRowClick?.(visibleRows[highlightedIndex], highlightedIndex);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setHighlightedIndex(-1);
        setFocused(false);
        break;

      default:
        break;
    }
  };

  const [internalSelectedRows, setInternalSelectedRows] = React.useState<
    T[K][]
  >([]);

  const isControlled = selectedRowsProp !== undefined;
  const selectedRows = isControlled ? selectedRowsProp : internalSelectedRows;

  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<
    T[K][]
  >([]);
  const isExpandControlled = expandedRowKeysProp !== undefined;
  const expandedRowKeys = isExpandControlled
    ? expandedRowKeysProp
    : internalExpandedKeys;

  const handleExpandRow = (row: T) => {
    const key = row[dataKey];
    const isExpanded = expandedRowKeys.includes(key);
    const newKeys = isExpanded
      ? expandedRowKeys.filter((k) => k !== key)
      : [...expandedRowKeys, key];
    onExpandRow?.(!isExpanded, row, key);
    if (!isExpandControlled) {
      setInternalExpandedKeys(newKeys);
    }
  };

  const handleSort = (columnKey: keyof T) => {
    let newConfig: TableSortingProps<T>;

    if (ordering.key === columnKey) {
      let direction: 'asc' | 'desc' | null;
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
    } else {
      newConfig = { key: columnKey, direction: 'asc' };
    }
    setOrdering(newConfig);
    onSort?.(newConfig);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const id = String(active.id);
    setActiveId(id);
    // Save column order so we can restore it if the drag is cancelled
    columnsBeforeDragRef.current = internalColumns;
    // Capture the actual rendered width of the column header
    const th = tableRef.current?.querySelector<HTMLElement>(
      `th[data-col-key="${id}"]`,
    );
    if (th) activeColumnWidth.current = th.getBoundingClientRect().width;
  };

  // Reorder columns live during drag so the entire column (header + body cells)
  // moves together as the user drags.
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return;
    setInternalColumns((prev) => {
      const oldIndex = prev.findIndex(
        (col) => String(col.key) === String(active.id),
      );
      const newIndex = prev.findIndex(
        (col) => String(col.key) === String(over.id),
      );
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  // Restore the original column order when drag is cancelled
  const handleDragCancel = () => {
    setActiveId(null);
    setInternalColumns(columnsBeforeDragRef.current);
  };

  // Columns are already in the correct order from handleDragOver; just notify parent
  const handleDragEnd = ({ over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;
    onReorder?.(internalColumns);
  };

  // ── Row DnD handlers ──────────────────────────────────────────────────────
  const handleRowDragStart = ({ active }: DragStartEvent) => {
    setActiveRowId(String(active.id));
    dataBeforeDragRef.current = internalData;
  };

  const handleRowDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return;
    setInternalData((prev) => {
      const oldIndex = prev.findIndex(
        (row) => String(row[dataKey]) === String(active.id),
      );
      const newIndex = prev.findIndex(
        (row) => String(row[dataKey]) === String(over.id),
      );
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleRowDragEnd = () => {
    setActiveRowId(null);
    onRowReorder?.(internalData);
  };

  const handleRowDragCancel = () => {
    setActiveRowId(null);
    setInternalData(dataBeforeDragRef.current);
  };

  const handleSelectAll = (isSelected: boolean) => {
    const currentPageKeys = visibleRows.map((r) => r[dataKey]);
    const allCurrentPageSelected = visibleRows.every((row) =>
      selectedRows.includes(row[dataKey]),
    );

    let newSelectedRows: T[K][];
    if (allCurrentPageSelected) {
      newSelectedRows = selectedRows.filter(
        (sr) => !currentPageKeys.includes(sr),
      );
    } else {
      const toAdd = currentPageKeys.filter((k) => !selectedRows.includes(k));
      newSelectedRows = [...selectedRows, ...toAdd];
    }

    onRowSelect?.(-1, isSelected, newSelectedRows);
    if (!isControlled) {
      setInternalSelectedRows(newSelectedRows);
    }
  };

  const handleRowSelect = (rowIndex: number, row: T, checked: boolean) => {
    const newSelectedRows = checked
      ? [...selectedRows, row[dataKey]]
      : selectedRows.filter((selectedRow) => selectedRow !== row[dataKey]);
    onRowSelect?.(rowIndex, checked, newSelectedRows);

    if (!isControlled) {
      setInternalSelectedRows(newSelectedRows);
    }
  };

  const handleRowClick = (row: T, rowIndex: number) => {
    const selection = window.getSelection()?.toString();
    if (selection && selection.length > 0) return;
    onRowClick?.(row, rowIndex);
  };

  React.useEffect(() => {
    if (!tableRef.current || highlightedIndex < 0) return;

    // Find any element that is marked as the highlighted one
    const activeItem = tableRef.current.querySelector(
      '[data-highlighted="true"]',
    );

    if (activeItem) {
      activeItem.scrollIntoView({
        block: 'end',
      });
    }
  }, [highlightedIndex]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed="true"
      className={cx(
        'outline-none cursor-default text-neutral-100 dark:text-neutral-100-dark overflow-x-auto',
        {
          'w-full': fullwidth,
          'rounded-md ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark':
            focused,
        },
      )}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeyDown}
      ref={tableRef}
    >
      {loading && data.length === 0 ? (
        <Skeleton.Table column={columns.length} row={pagination.limit} />
      ) : (
        <DndContext
          sensors={sensors}
          modifiers={[
            rowReorderable ? restrictToVerticalAxis : restrictToHorizontalAxis,
          ]}
          collisionDetection={closestCenter}
          onDragStart={rowReorderable ? handleRowDragStart : handleDragStart}
          onDragOver={rowReorderable ? handleRowDragOver : handleDragOver}
          onDragEnd={rowReorderable ? handleRowDragEnd : handleDragEnd}
          onDragCancel={rowReorderable ? handleRowDragCancel : handleDragCancel}
        >
          <div
            className="overflow-y-auto border border-neutral-30 dark:border-neutral-30-dark rounded-md mb-4"
            style={
              stickyHeader || freezeTopRows > 0 || freezeBottomRows > 0
                ? { maxHeight }
                : undefined
            }
          >
            <SortableContext
              items={sortableColumnItems}
              strategy={horizontalListSortingStrategy}
            >
              <table className="w-full border-collapse table-auto">
                <thead
                  className={cx({
                    'sticky top-0 bg-neutral-10 shadow-md z-10': stickyHeader,
                  })}
                >
                  <tr>
                    {expandable && (
                      <th
                        aria-label="Expand"
                        className={cx(
                          'w-10 font-medium bg-neutral-20 dark:bg-neutral-20-dark border-r border-neutral-30 dark:border-neutral-30-dark',
                          {
                            'px-2 py-3 text-18px': size === 'large',
                            'px-2 py-3 text-14px': size === 'default',
                            'px-2 py-2 text-14px': size === 'small',
                          },
                        )}
                      />
                    )}
                    {rowReorderable && (
                      <th
                        aria-label="Reorder"
                        className={cx(
                          'w-10 font-medium bg-neutral-20 dark:bg-neutral-20-dark border-r border-neutral-30 dark:border-neutral-30-dark',
                          {
                            'px-2 py-3 text-18px': size === 'large',
                            'px-2 py-3 text-14px': size === 'default',
                            'px-2 py-2 text-14px': size === 'small',
                          },
                        )}
                      />
                    )}

                    {showSelected && (
                      <th
                        className={cx(
                          'w-14 font-medium text-left bg-neutral-20 dark:bg-neutral-20-dark border-r border-neutral-30 dark:border-neutral-30-dark last:border-none',
                          {
                            'px-4 py-3 text-18px': size === 'large',
                            'px-4 py-3 text-14px': size === 'default',
                            'px-4 py-2 text-14px': size === 'small',
                          },
                        )}
                        style={getCellStyle(0, -1)}
                      >
                        <div className="flex items-center justify-center">
                          <Checkbox
                            id="select_all"
                            checked={
                              isSelectAll ||
                              (visibleRows.length > 0 &&
                                visibleRows.every((row) =>
                                  selectedRows.includes(row[dataKey]),
                                ))
                            }
                            onChange={handleSelectAll}
                            disabled={!onRowSelect}
                            className="h-5"
                            aria-label="select_all"
                          />
                        </div>
                      </th>
                    )}

                    {internalColumns.map((col, colIdx) => {
                      const absoluteColIndex = colIdx + extraColsBefore;
                      return (
                        <SortableHeader
                          key={String(col.key)}
                          col={col}
                          size={size}
                          reorderable={reorderable}
                          isFrozen={
                            colIdx < freezeLeftColumns ||
                            colIdx >=
                              internalColumns.length - freezeRightColumns
                          }
                          onOrder={handleSort}
                          ordering={ordering}
                          freezeStyle={getCellStyle(absoluteColIndex, -1)}
                        />
                      );
                    })}
                  </tr>
                </thead>
                {groupable && groups && (
                  <GroupedBody
                    groups={groups}
                    groupLevel={(groupLevel ?? []) as string[]}
                    columns={internalColumns}
                    dataKey={dataKey}
                    size={size}
                    style={style}
                    verticalAlign={verticalAlign}
                    showSelected={showSelected}
                    selectedRows={selectedRows}
                    isSelectAll={isSelectAll}
                    onRowSelect={onRowSelect}
                    onRowClick={onRowClick}
                    rowClassName={rowClassName}
                    rowStyle={rowStyle}
                    onGroupToggle={onGroupToggle}
                    onGroupPageChange={onGroupPageChange}
                    totalCols={internalColumns.length + (showSelected ? 1 : 0)}
                    highlightedNavIndex={highlightedIndex}
                  />
                )}
                {!(groupable && groups) && rowReorderable && (
                  <SortableContext
                    items={internalData.map((row) => String(row[dataKey]))}
                    strategy={verticalListSortingStrategy}
                  >
                    <tbody>
                      {internalData.map((row, rowIndex) => {
                        const isCustomRowClassName = rowClassName?.(row);
                        const isSelected =
                          showSelected && selectedRows.includes(row[dataKey]);
                        const rowId = String(row[dataKey]);

                        const isRowExpanded =
                          expandable && expandedRowKeys.includes(row[dataKey]);

                        const rowCells = (
                          <>
                            {expandable && (
                              <td
                                className={cx(CELL_BASE_CLASS, {
                                  '!bg-neutral-40 !dark:bg-neutral-40-dark':
                                    rowIndex === highlightedIndex,
                                })}
                                style={{ verticalAlign }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleExpandRow(row);
                                }}
                                onKeyDown={(e) => e.stopPropagation()}
                              >
                                <div className="flex items-center justify-center cursor-pointer">
                                  <Icon
                                    name={
                                      isRowExpanded
                                        ? 'chevron-down'
                                        : 'chevron-right'
                                    }
                                    size={16}
                                    strokeWidth={2}
                                    className="text-neutral-60 dark:text-neutral-60-dark"
                                  />
                                </div>
                              </td>
                            )}
                            {showSelected && (
                              <td
                                className={cx(CELL_BASE_CLASS, {
                                  'bg-primary-surface dark:bg-primary-surface-dark':
                                    isSelected,
                                  '!bg-neutral-40 !dark:bg-neutral-40-dark':
                                    rowIndex === highlightedIndex,
                                })}
                                style={{
                                  verticalAlign,
                                  ...getCellStyle(1, rowIndex),
                                }}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                              >
                                <div
                                  className={cx({
                                    'flex items-center justify-center':
                                      isSelected,
                                    'px-4 py-3':
                                      size === 'default' || size === 'large',
                                    'px-4 py-0.5': size === 'small',
                                  })}
                                >
                                  <Checkbox
                                    id={`select_row_${rowIndex}`}
                                    checked={isSelectAll || isSelected}
                                    onChange={(checked) =>
                                      handleRowSelect(rowIndex, row, checked)
                                    }
                                    disabled={!onRowSelect}
                                    className="h-5"
                                    aria-label={`select_row_${rowIndex}`}
                                  />
                                </div>
                              </td>
                            )}
                            {internalColumns.map((col, colIdx) => {
                              const absoluteColIndex = colIdx + extraColsBefore;
                              const rowCol = col.dataIndex
                                ? row[col.dataIndex]
                                : null;
                              const value =
                                rowCol == null || rowCol === '' ? '-' : rowCol;
                              return (
                                <td
                                  key={col.key.toString()}
                                  data-col-key={col.key.toString()}
                                  className={cx(CELL_BASE_CLASS, {
                                    'bg-primary-surface dark:bg-primary-surface-dark':
                                      isSelected,
                                    '!bg-neutral-40 !dark:bg-neutral-40-dark':
                                      rowIndex === highlightedIndex,
                                  })}
                                  style={{
                                    verticalAlign,
                                    ...getCellStyle(absoluteColIndex, rowIndex),
                                  }}
                                >
                                  <div
                                    className={cx({
                                      'px-4 py-3':
                                        size === 'default' || size === 'large',
                                      'px-4 py-0.5': size === 'small',
                                      'text-left':
                                        !col.align || col.align === 'left',
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
                                        {value}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </>
                        );

                        return (
                          <React.Fragment key={rowId}>
                            <SortableRow
                              id={rowId}
                              size={size}
                              className={cx(
                                'group border-b border-neutral-30 last:border-none',
                                {
                                  'text-18px': size === 'large',
                                  'text-14px':
                                    size === 'small' || size === 'default',
                                  'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                                    !isCustomRowClassName,
                                  'bg-neutral-10 dark:bg-neutral-10-dark even:bg-neutral-15 dark:even:bg-neutral-15-dark':
                                    style === 'default',
                                  'bg-neutral-10 dark:bg-neutral-10-dark':
                                    style === 'simple',
                                  'cursor-pointer': !!onRowClick,
                                },
                                isCustomRowClassName,
                              )}
                              style={{
                                ...rowStyle?.(row),
                                ...getRowStyle(rowIndex),
                              }}
                              onClick={() => handleRowClick(row, rowIndex)}
                            >
                              {rowCells}
                            </SortableRow>
                            {isRowExpanded && renderExpandedRow && (
                              <tr>
                                <td
                                  colSpan={
                                    internalColumns.length + extraColsBefore
                                  }
                                >
                                  {renderExpandedRow(row, rowIndex)}
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </SortableContext>
                )}
                {!(groupable && groups) && !rowReorderable && (
                  <tbody>
                    {data.map((row, rowIndex) => {
                      const isCustomRowClassName = rowClassName?.(row);
                      const isSelected =
                        showSelected && selectedRows.includes(row[dataKey]);
                      const isRowExpanded =
                        expandable && expandedRowKeys.includes(row[dataKey]);

                      return (
                        <React.Fragment key={rowIndex}>
                          <tr
                            data-highlighted={rowIndex === highlightedIndex}
                            className={cx(
                              'group border-b border-neutral-30 last:border-none',
                              {
                                'text-18px': size === 'large',
                                'text-14px':
                                  size === 'small' || size === 'default',
                                'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                                  !isCustomRowClassName,
                                'bg-neutral-10 dark:bg-neutral-10-dark even:bg-neutral-15 dark:even:bg-neutral-15-dark':
                                  style === 'default',
                                'bg-neutral-10 dark:bg-neutral-10-dark':
                                  style === 'simple',
                                'cursor-pointer': !!onRowClick,
                              },
                              isCustomRowClassName,
                            )}
                            style={{
                              ...rowStyle?.(row),
                              ...getRowStyle(rowIndex),
                            }}
                            onClick={() => handleRowClick(row, rowIndex)}
                          >
                            {expandable && (
                              <td
                                className={cx(CELL_BASE_CLASS, {
                                  '!bg-neutral-40 !dark:bg-neutral-40-dark':
                                    rowIndex === highlightedIndex,
                                })}
                                style={{ verticalAlign }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleExpandRow(row);
                                }}
                                onKeyDown={(e) => e.stopPropagation()}
                              >
                                <div
                                  className={cx('cursor-pointer', {
                                    'flex items-center justify-center':
                                      isSelected,
                                    'px-4 py-3':
                                      size === 'default' || size === 'large',
                                    'px-4 py-0.5': size === 'small',
                                  })}
                                >
                                  <Icon
                                    name={
                                      isRowExpanded
                                        ? 'chevron-down'
                                        : 'chevron-right'
                                    }
                                    size={16}
                                    strokeWidth={2}
                                    className="text-neutral-60 dark:text-neutral-60-dark"
                                  />
                                </div>
                              </td>
                            )}
                            {showSelected && (
                              <td
                                className={cx(CELL_BASE_CLASS, {
                                  'bg-primary-surface dark:bg-primary-surface-dark':
                                    isSelected,
                                  '!bg-neutral-40 !dark:bg-neutral-40-dark':
                                    rowIndex === highlightedIndex,
                                })}
                                style={{
                                  verticalAlign,
                                  ...getCellStyle(0, rowIndex),
                                }}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                              >
                                <div
                                  className={cx({
                                    'flex items-center justify-center':
                                      isSelected,
                                    'px-4 py-3':
                                      size === 'default' || size === 'large',
                                    'px-4 py-0.5': size === 'small',
                                  })}
                                >
                                  <Checkbox
                                    id={`select_row_${rowIndex}`}
                                    checked={isSelectAll || isSelected}
                                    onChange={(checked) =>
                                      handleRowSelect(rowIndex, row, checked)
                                    }
                                    disabled={!onRowSelect}
                                    className="h-5"
                                    aria-label={`select_row_${rowIndex}`}
                                  />
                                </div>
                              </td>
                            )}
                            {internalColumns.map((col, colIdx) => {
                              const absoluteColIndex = colIdx + extraColsBefore;
                              const rowCol = col.dataIndex
                                ? row[col.dataIndex]
                                : null;
                              const value =
                                rowCol == null || rowCol === '' ? '-' : rowCol;
                              return (
                                <td
                                  key={col.key.toString()}
                                  data-col-key={col.key.toString()}
                                  className={cx(CELL_BASE_CLASS, {
                                    'bg-primary-surface dark:bg-primary-surface-dark':
                                      isSelected,
                                    '!bg-neutral-40 !dark:bg-neutral-40-dark':
                                      rowIndex === highlightedIndex,
                                  })}
                                  style={{
                                    verticalAlign,
                                    opacity:
                                      activeId === String(col.key)
                                        ? 0
                                        : undefined,
                                    ...getCellStyle(absoluteColIndex, rowIndex),
                                  }}
                                >
                                  <div
                                    className={cx({
                                      'px-4 py-3':
                                        size === 'default' || size === 'large',
                                      'px-4 py-0.5': size === 'small',
                                      'text-left':
                                        !col.align || col.align === 'left',
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
                                        {value}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          {isRowExpanded && renderExpandedRow && (
                            <tr>
                              <td
                                colSpan={
                                  internalColumns.length + extraColsBefore
                                }
                              >
                                {renderExpandedRow(row, rowIndex)}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </SortableContext>
          </div>
          <DragOverlay dropAnimation={null}>
            {activeRowId
              ? (() => {
                  const activeRow = internalData.find(
                    (row) => String(row[dataKey]) === activeRowId,
                  );
                  if (!activeRow) return null;
                  return (
                    <table
                      className="border-collapse shadow-2xl rounded overflow-hidden cursor-grabbing select-none opacity-90 w-full"
                      style={{ tableLayout: 'auto' }}
                    >
                      <tbody>
                        <tr
                          className={cx(
                            'border border-neutral-30 dark:border-neutral-30-dark',
                            {
                              'bg-neutral-10 dark:bg-neutral-10-dark':
                                style === 'default' || style === 'simple',
                            },
                          )}
                        >
                          <td
                            className={cx('text-center', {
                              'px-2 py-3':
                                size === 'default' || size === 'large',
                              'px-2 py-0.5': size === 'small',
                            })}
                            style={{ width: 40 }}
                          >
                            <Icon
                              name="drag-nine-dots"
                              size={16}
                              className="text-neutral-60"
                            />
                          </td>
                          {showSelected && (
                            <td
                              className="py-1.5 text-center"
                              style={{ width: 56 }}
                            >
                              <div className="flex items-center justify-center">
                                <Checkbox
                                  id="overlay_checkbox"
                                  checked={selectedRows.includes(
                                    activeRow[dataKey],
                                  )}
                                  onChange={() => {}}
                                  disabled
                                  className="h-5"
                                  aria-label="overlay_checkbox"
                                />
                              </div>
                            </td>
                          )}
                          {internalColumns.map((col) => {
                            const rowCol = col.dataIndex
                              ? activeRow[col.dataIndex]
                              : null;
                            const value =
                              rowCol == null || rowCol === '' ? '-' : rowCol;
                            return (
                              <td key={col.key.toString()}>
                                <div
                                  className={cx({
                                    'px-4 py-3':
                                      size === 'default' || size === 'large',
                                    'px-4 py-0.5': size === 'small',
                                    'text-left':
                                      !col.align || col.align === 'left',
                                    'text-right': col.align === 'right',
                                    'text-center': col.align === 'center',
                                  })}
                                >
                                  {col.render ? (
                                    col.render(
                                      rowCol as NonNullable<typeof rowCol>,
                                      activeRow,
                                      0,
                                    )
                                  ) : (
                                    <div className="line-clamp-3">{value}</div>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  );
                })()
              : activeColumn && (
                  <table
                    className="border-collapse shadow-2xl rounded overflow-hidden cursor-grabbing select-none opacity-90"
                    style={{
                      tableLayout: 'fixed',
                      width: activeColumnWidth.current,
                    }}
                  >
                    <thead>
                      <tr aria-label="Dragged column header">
                        <th
                          aria-label="Dragged column"
                          className={cx(
                            'font-medium bg-neutral-20 dark:bg-neutral-20-dark border border-neutral-30 dark:border-neutral-30-dark',
                            {
                              'px-4 py-3 text-18px': size === 'large',
                              'px-4 py-3 text-14px': size === 'default',
                              'px-4 py-2 text-14px': size === 'small',
                              'text-left':
                                activeColumn.align === 'left' ||
                                !activeColumn.align,
                              'text-right': activeColumn.align === 'right',
                              'text-center': activeColumn.align === 'center',
                            },
                          )}
                        >
                          <div className="flex gap-2 items-center">
                            <Icon
                              name="drag-nine-dots"
                              size={16}
                              className="text-neutral-60"
                            />
                            <span>{activeColumn.label}</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, rowIndex) => {
                        const rowCol = activeColumn.dataIndex
                          ? row[activeColumn.dataIndex]
                          : null;
                        const value =
                          rowCol == null || rowCol === '' ? '-' : rowCol;
                        return (
                          <tr
                            key={rowIndex}
                            aria-label="Dragged column row"
                            className={cx(
                              'border-b border-neutral-30 dark:border-neutral-30-dark last:border-none',
                              {
                                'bg-neutral-10 dark:bg-neutral-10-dark even:bg-neutral-15 dark:even:bg-neutral-15-dark':
                                  style === 'default',
                                'bg-neutral-10 dark:bg-neutral-10-dark':
                                  style === 'simple',
                              },
                            )}
                          >
                            <td>
                              <div
                                className={cx({
                                  'px-4 py-3':
                                    size === 'default' || size === 'large',
                                  'px-4 py-0.5': size === 'small',
                                  'text-left':
                                    !activeColumn.align ||
                                    activeColumn.align === 'left',
                                  'text-right': activeColumn.align === 'right',
                                  'text-center':
                                    activeColumn.align === 'center',
                                })}
                              >
                                {activeColumn.render ? (
                                  activeColumn.render(
                                    rowCol as NonNullable<typeof rowCol>,
                                    row,
                                    rowIndex,
                                  )
                                ) : (
                                  <div className="line-clamp-3">{value}</div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
          </DragOverlay>
        </DndContext>
      )}

      {paginate &&
        (data.length > 0 || (groupable && groups && groups.length > 0)) &&
        !!total &&
        total > 0 && (
          <Pagination
            total={total}
            itemPerPage={DEFAULT_ITEMS_PER_PAGE}
            currentPage={pagination.page}
            pageSize={pagination.limit}
            onPageChange={handlePageChange}
            paginationRef={paginationRef}
          />
        )}
      {paginate &&
        (data.length > 0 || (groupable && groups && groups.length > 0)) &&
        !total && (
          <Pagination
            itemPerPage={DEFAULT_ITEMS_PER_PAGE}
            currentPage={pagination.page}
            pageSize={pagination.limit}
            onPageChange={handlePageChange}
            hasNext={data.length === pagination.limit}
            paginationRef={paginationRef}
          />
        )}
    </div>
  );
};

export default Table;
