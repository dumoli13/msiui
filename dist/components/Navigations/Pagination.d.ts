export declare const DEFAULT_PAGE_SIZE = 10;
export declare const DEFAULT_ITEMS_PER_PAGE: number[];
export interface PaginationButtonProps {
    onClick: () => void;
    disabled?: boolean;
}
export type PaginationDataType = {
    page: number;
    limit: number;
};
export interface PaginationProps {
    total: number;
    currentPage: number;
    pageSize?: number;
    itemPerPage?: Array<number>;
    onPageChange?: (data: PaginationDataType) => void;
}
/**
 * The Pagination component enables the user to select a specific page from a range of pages.
 */
declare const Pagination: {
    ({ total, currentPage, itemPerPage, pageSize, onPageChange, }: PaginationProps): import("react/jsx-runtime").JSX.Element;
    Prev: ({ onClick, disabled }: PaginationButtonProps) => import("react/jsx-runtime").JSX.Element;
    Next: ({ onClick, disabled }: PaginationButtonProps) => import("react/jsx-runtime").JSX.Element;
};
export default Pagination;
//# sourceMappingURL=Pagination.d.ts.map