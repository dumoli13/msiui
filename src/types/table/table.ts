import type { SelectValue } from '../inputs';
import type { PaginationDataType } from '../navigations';

type BaseColumnCommon = {
  key: string;
  label: string;
  subLabel?: React.ReactNode;
  sortable?: boolean;
  width?: number | string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
};

type ColumnWithDataIndex<T, K extends keyof T> = BaseColumnCommon & {
  dataIndex: K;
  render?: (value: T[K], record: T, index: number) => React.ReactNode;
};

type ColumnWithoutDataIndex<T> = BaseColumnCommon & {
  dataIndex?: never;
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
};

type TextFieldColumn<T, K extends keyof T> =
  | (ColumnWithDataIndex<T, K> & {
      filter: 'textfield';
      filterValue: string;
      onChange: (value: string) => void;
    })
  | (ColumnWithoutDataIndex<T> & {
      filter: 'textfield';
      filterValue: string;
      onChange: (value: string) => void;
    });

type SelectColumn<T, K extends keyof T, D = undefined> =
  | (ColumnWithDataIndex<T, K> & {
      filter: 'select' | 'autocomplete';
      filterValue: SelectValue<T[K], D> | null;
      onChange: (value: SelectValue<T[K], D> | null) => void;
      option: Array<SelectValue<T[K], D>>;
    })
  | (ColumnWithoutDataIndex<T> & {
      filter: 'select' | 'autocomplete';
      filterValue: unknown;
      onChange: (value: unknown) => void;
      option: Array<SelectValue<unknown, D>>;
    });

type NoFilterColumn<T, K extends keyof T = keyof T> =
  | (ColumnWithDataIndex<T, K> & {
      filter?: 'none';
      filterValue?: T[K] | null;
    })
  | (ColumnWithoutDataIndex<T> & {
      filter?: 'none';
      filterValue?: unknown;
    });

export type TableColumn<T> =
  | { [K in keyof T]: TextFieldColumn<T, K> }[keyof T]
  | { [K in keyof T]: SelectColumn<T, K> }[keyof T]
  | { [K in keyof T]: NoFilterColumn<T, K> }[keyof T];

export type TableSortingProps<T> = {
  direction: 'asc' | 'desc' | null;
  key: keyof T;
};

interface BaseProps<T, K extends keyof T> {
  columns: TableColumn<T>[];
  stickyHeader?: boolean;
  maxHeight?: number | string;
  rowClassName?: (record: T) => string;
  rowStyle?: (record: T) => React.CSSProperties;
  fullwidth?: boolean;
  size?: 'small' | 'default' | 'large';
  verticalAlign?: 'top' | 'center' | 'bottom';
  style?: 'default' | 'simple';
  onRowClick?: (record: T, index: number) => void;
  sorting?: TableSortingProps<T>;
  onSort?: (sort: TableSortingProps<T>) => void;
  dataKey: K;
  loading?: boolean;
  freezeLeftColumns?: number;
  freezeRightColumns?: number;
  freezeTopRows?: number;
  freezeBottomRows?: number;
}

interface SelectableProps<T, K extends keyof T> {
  showSelected: boolean;
  onRowSelect?: (row: number, value: boolean, selectedRows: T[K][]) => void;
  selectedRows?: T[K][];
  isSelectAll?: boolean;
}

interface NoSelectableProps {
  showSelected?: never;
  onRowSelect?: never;
  selectedRows?: never;
  isSelectAll?: never;
}

interface PaginationProps {
  paginate: boolean;
  total?: number;
  pagination?: PaginationDataType;
  onPageChange?: (data: PaginationDataType) => void;
}

interface NoPaginationProps {
  paginate?: false;
  total?: never;
  pagination?: never;
  onPageChange?: never;
}

interface ReorderableProps<T> {
  reorderable: boolean;
  onReorder?: (columns: TableColumn<T>[]) => void;
}

interface NoReorderableProps {
  reorderable?: false;
  onReorder?: never;
}

interface RowReorderableProps<T> {
  rowReorderable: boolean;
  onRowReorder?: (data: T[]) => void;
}

interface NoRowReorderableProps {
  rowReorderable?: false;
  onRowReorder?: never;
}

export type TableGroupNode<T> = {
  value: T[keyof T];
  total: number;
  isLeafGroup?: boolean;
  children?: TableGroupNode<T>[] | T[];
  pagination?: PaginationDataType;
  loading?: boolean;
  expanded: boolean;
};

interface ExpandableProps<T, K extends keyof T> {
  expandable: boolean;
  expandedRowKeys?: T[K][];
  onExpandRow?: (expanded: boolean, record: T, key: T[K]) => void;
  renderExpandedRow?: (record: T, index: number) => React.ReactNode;
}

interface NoExpandableProps {
  expandable?: false;
  expandedRowKeys?: never;
  onExpandRow?: never;
  renderExpandedRow?: never;
}

interface GroupableProps<T> {
  groupable: true;
  data?: never;
  groupLevel: Array<keyof T>;
  groups: TableGroupNode<T>[];
  onGroupToggle?: (expanded: boolean, path: T[keyof T][]) => void;
  onGroupPageChange?: (pagination: PaginationDataType, path: string[]) => void;
}

interface NoGroupableProps<T> {
  groupable?: false;
  data: T[];
  groupLevel?: never;
  groups?: never;
  onGroupToggle?: never;
  onGroupPageChange?: never;
}

export type TableProps<T, K extends keyof T> = BaseProps<T, K> &
  (SelectableProps<T, K> | NoSelectableProps) &
  (PaginationProps | NoPaginationProps) &
  (ReorderableProps<T> | NoReorderableProps) &
  (
    | (GroupableProps<T> & NoRowReorderableProps & NoExpandableProps)
    | (NoGroupableProps<T> &
        (RowReorderableProps<T> | NoRowReorderableProps) &
        (ExpandableProps<T, K> | NoExpandableProps))
  );
