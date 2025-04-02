import React from 'react';
export declare const DEFAULT_PAGE_SIZE = 10;
export declare const DEFAULT_ITEMS_PER_PAGE: number[];
export type Pagination<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};
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
declare const Pagination: ({ total, currentPage, itemPerPage, pageSize, onPageChange, }: PaginationProps) => React.JSX.Element;
export default Pagination;
//# sourceMappingURL=Pagination.d.ts.map