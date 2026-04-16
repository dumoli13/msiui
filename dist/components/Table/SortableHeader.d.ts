import type { TableColumn, TableSortingProps } from '../../types';
interface SortableHeaderProps<T> {
    col: TableColumn<T>;
    size: 'small' | 'default' | 'large';
    reorderable: boolean;
    isFrozen?: boolean;
    onOrder: (key: string) => void;
    ordering: TableSortingProps<T>;
    freezeStyle?: React.CSSProperties;
}
declare const SortableHeader: <T>({ col, size, reorderable, isFrozen, onOrder, ordering, freezeStyle, }: SortableHeaderProps<T>) => import("react/jsx-runtime").JSX.Element;
export default SortableHeader;
//# sourceMappingURL=SortableHeader.d.ts.map