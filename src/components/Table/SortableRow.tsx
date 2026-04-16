import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import cx from 'classnames';
import Icon from '../Icon';

interface SortableRowProps {
  id: string;
  size: 'small' | 'default' | 'large';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}

const SortableRow = ({
  id,
  size,
  disabled = false,
  className,
  style,
  onClick,
  children,
}: SortableRowProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id,
    animateLayoutChanges: () => true,
    disabled,
  });

  const styleDrag: React.CSSProperties = {
    opacity: isDragging ? 0 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      {...attributes}
      className={className}
      style={{ ...styleDrag, ...style }}
      onClick={onClick}
    >
      <td
        className={cx('py-1.5 text-center', {
          'px-2 py-3': size === 'default' || size === 'large',
          'px-2 py-0.5': size === 'small',
        })}
        style={{ verticalAlign: 'middle', width: 40 }}
      >
        <span
          {...listeners}
          data-row-drag-handle
          className="select-none cursor-grab text-neutral-60 inline-flex items-center justify-center"
        >
          <Icon name="drag-nine-dots" size={16} />
        </span>
      </td>
      {children}
    </tr>
  );
};

export default SortableRow;
