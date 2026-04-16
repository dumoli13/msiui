import { useSortable } from '@dnd-kit/sortable';
import cx from 'classnames';
import type { SelectValue, TableColumn, TableSortingProps } from '../../types';
import Icon from '../Icon';
import TableFilterSearch from './TableFilterSearch';
import TableFilterSelect from './TableFilterSelect';

interface SortableHeaderProps<T> {
  col: TableColumn<T>;
  size: 'small' | 'default' | 'large';
  reorderable: boolean;
  isFrozen?: boolean;
  onOrder: (key: string) => void;
  ordering: TableSortingProps<T>;
  freezeStyle?: React.CSSProperties;
}
const SortableHeader = <T,>({
  col,
  size,
  reorderable,
  isFrozen = false,
  onOrder,
  ordering,
  freezeStyle,
}: SortableHeaderProps<T>) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: String(col.key),
    animateLayoutChanges: () => true,
    disabled: isFrozen,
  });

  // We do live column reordering via onDragOver (updating internalColumns), so the
  // actual DOM order already reflects the sorted position for both headers AND body cells.
  // Applying useSortable's displacement transform to headers would make them slide to a
  // position the body cells have already snapped to, causing a visual desync.
  // Solution: ignore the transform entirely — just hide the dragging item in-place
  // (the DragOverlay shows the floating ghost) and let DOM order drive all positioning.
  const styleDrag: React.CSSProperties = {
    opacity: isDragging ? 0 : 1,
  };

  return (
    <th
      ref={setNodeRef}
      {...attributes}
      style={{
        ...styleDrag,
        ...freezeStyle,
        width: col.width,
        minWidth:
          col.width ??
          `${Math.max(
            typeof col.width === 'number' ? col.width : 0,
            col.minWidth ? parseInt(col.minWidth.toString(), 10) : 0,
            150,
          )}px`,
        // When dragging, the drag zIndex (50) must always win over freeze zIndex
        ...(isDragging ? { zIndex: 50, position: 'relative' } : {}),
      }}
      className={cx(
        'font-medium bg-neutral-20 dark:bg-neutral-20-dark border-r border-neutral-30 dark:border-neutral-30-dark last:border-none',
        {
          'px-4 py-3 text-18px': size === 'large',
          'px-4 py-3 text-14px': size === 'default',
          'px-4 py-2 text-14px': size === 'small',
          'text-left': col.align === 'left',
          'text-right': col.align === 'right',
          'text-center': col.align === 'center',
        },
      )}
    >
      <div className="flex gap-2 items-center justify-between">
        {reorderable && !isFrozen && (
          <span
            {...(isFrozen ? {} : listeners)}
            className={cx('select-none', {
              'cursor-grab text-neutral-60': !isFrozen,
              'cursor-not-allowed text-neutral-40 dark:text-neutral-40-dark':
                isFrozen,
            })}
            title={isFrozen ? 'Frozen columns cannot be reordered' : undefined}
          >
            <Icon name="drag-nine-dots" size={16} />
          </span>
        )}

        <div className="flex gap-4 items-center justify-between w-full">
          {col.sortable && (
            <button
              type="button"
              className={cx('flex gap-2.5 items-center w-full', {
                'justify-start': !col.align || col.align === 'left',
                'justify-end': col.align === 'right',
                'justify-center': col.align === 'center',
              })}
              onClick={() => onOrder(col.key)}
            >
              {col.subLabel ? (
                <div
                  className={cx('flex flex-col', {
                    'items-start': !col.align || col.align === 'left',
                    'items-end': col.align === 'right',
                    'items-center': col.align === 'center',
                  })}
                >
                  <div>{col.label}</div>
                  <div>{col.subLabel}</div>
                </div>
              ) : (
                col.label
              )}

              <div className="flex flex-col gap-0.5">
                <span
                  className={`w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-6 transition-colors duration-300 ${
                    col.key === ordering.key && ordering.direction === 'asc'
                      ? 'border-primary-main'
                      : 'border-neutral-60'
                  }`}
                />
                <span
                  className={`w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-6 transition-colors duration-300 ${
                    col.key === ordering.key && ordering.direction === 'desc'
                      ? 'border-primary-main'
                      : 'border-neutral-60'
                  }`}
                />
              </div>
            </button>
          )}

          {!col.sortable && col.subLabel && (
            <div
              className={cx('w-full flex flex-col', {
                'items-start': !col.align || col.align === 'left',
                'items-end': col.align === 'right',
                'items-center': col.align === 'center',
              })}
            >
              <div>{col.label}</div>
              <div>{col.subLabel}</div>
            </div>
          )}

          {!col.sortable && !col.subLabel && (
            <div
              className={cx('w-full', {
                'text-left': !col.align || col.align === 'left',
                'text-right': col.align === 'right',
                'text-center': col.align === 'center',
              })}
            >
              {col.label}
            </div>
          )}

          {'filter' in col && col.filter === 'textfield' && (
            <TableFilterSearch
              label={col.label}
              value={col.filterValue}
              onChange={(value) => col.onChange?.(value)}
            />
          )}

          {'filter' in col &&
            (col.filter === 'select' || col.filter === 'autocomplete') && (
              <TableFilterSelect
                type={col.filter}
                label={col.label}
                value={col.filterValue as SelectValue<T[keyof T]> | null}
                option={col.option || []}
                onChange={(value) =>
                  col.onChange?.(value as SelectValue<T[keyof T]>)
                }
              />
            )}
        </div>
      </div>
    </th>
  );
};

export default SortableHeader;
