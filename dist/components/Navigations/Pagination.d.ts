import { PaginationButtonProps, PaginationProps } from '../../types';
/**
 * The Pagination component enables the user to select a specific page from a range of pages.
 */
declare const Pagination: {
    ({ total, hasNext, currentPage, itemPerPage, pageSize, onPageChange, paginationRef, }: PaginationProps): import("react/jsx-runtime").JSX.Element;
    Prev: ({ onClick, disabled }: PaginationButtonProps) => import("react/jsx-runtime").JSX.Element;
    Next: ({ onClick, disabled }: PaginationButtonProps) => import("react/jsx-runtime").JSX.Element;
};
export default Pagination;
//# sourceMappingURL=Pagination.d.ts.map