import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import PaginationButton from './PaginationButton';
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_ITEMS_PER_PAGE = [5, 10, 20, 30, 40, 50, 100];
/**
 *
 * This component provides a pagination UI to navigate through paginated data. It allows users to select a page, change the number of items per page, and navigate between pages using next and previous buttons.
 *
 * @interface PaginationProps
 * @property {number} total - The total number of items to paginate through.
 * @property {number} currentPage - The current page being viewed.
 * @property {number} [pageSize] - The initial number of items to display per page.
 * @property {Array<number>} [itemPerPage] - An array of options for the number of items per page (e.g., [10, 20, 50]).
 * @property {(data: PaginationDataType) => void} [onPageChange] - A callback function to handle page change with `page` and `limit` data.
 *
 */
const pageButtonStyle = cx('text-neutral-100 dark:text-neutral-100-dark text-16px h-8 min-w-8 px-2 shadow-box-1 rounded border border-neutral-40 dark:border-neutral-40-dark bg-neutral-10 dark:bg-neutral-10-dark', 'disabled:bg-primary-surface dark:disabled:bg-primary-surface-dark disabled:text-primary-main dark:disabled:text-primary-main-dark disabled:border-primary-surface dark:disabled:border-primary-surface-dark disabled:cursor-default disabled:font-semibold', 'hover:bg-primary-hover hover:text-neutral-10');
const Pagination = ({ total, currentPage, itemPerPage = DEFAULT_ITEMS_PER_PAGE, pageSize, onPageChange, }) => {
    const [itemsPerPage, setItemsPerPage] = React.useState(pageSize !== null && pageSize !== void 0 ? pageSize : itemPerPage[0]);
    const totalPages = Math.ceil(total / itemsPerPage);
    const handlePageChange = (page) => {
        onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange({ page: page, limit: itemsPerPage });
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };
    const handleItemsPerPageChange = (e) => {
        const limit = Number(e.target.value);
        setItemsPerPage(limit);
        onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange({ page: 1, limit });
    };
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        pages.push(_jsx("button", { type: "button", className: pageButtonStyle, onClick: () => handlePageChange(1), disabled: 1 === currentPage, children: "1" }, 1));
        if (totalPages <= maxVisiblePages) {
            for (let item = 2; item <= totalPages; item++) {
                pages.push(_jsx("button", { type: "button", className: pageButtonStyle, onClick: () => handlePageChange(item), disabled: item === currentPage, children: item }, item));
            }
        }
        else {
            if (currentPage <= 3) {
                for (let item = 2; item <= 4; item++) {
                    pages.push(_jsx("button", { type: "button", className: pageButtonStyle, onClick: () => handlePageChange(item), disabled: item === currentPage, children: item }, item));
                }
                if (totalPages > 5) {
                    pages.push(_jsx("span", { className: "px-2", children: "..." }, "end-ellipsis"));
                }
            }
            else if (currentPage > 3 && currentPage < totalPages - 2) {
                pages.push(_jsx("span", { className: "px-2", children: "..." }, "start-ellipsis"));
                for (let item = currentPage - 1; item <= currentPage + 1; item++) {
                    pages.push(_jsx("button", { type: "button", className: pageButtonStyle, onClick: () => handlePageChange(item), disabled: item === currentPage, children: item }, item));
                }
                pages.push(_jsx("span", { className: "px-2", children: "..." }, "end-ellipsis"));
            }
            else {
                pages.push(_jsx("span", { className: "px-2", children: "..." }, "start-ellipsis"));
                for (let item = totalPages - 3; item <= totalPages - 1; item++) {
                    pages.push(_jsx("button", { type: "button", className: pageButtonStyle, onClick: () => handlePageChange(item), disabled: item === currentPage, children: item }, item));
                }
            }
            pages.push(_jsx("button", { type: "button", className: pageButtonStyle, onClick: () => handlePageChange(totalPages), disabled: totalPages === currentPage, children: totalPages }, totalPages));
        }
        return pages;
    };
    return (_jsxs("div", { className: `flex gap-10 items-center justify-between ${totalPages > 1 ? 'flex-row' : 'flex-row-reverse'}`, children: [totalPages > 1 && (_jsxs("div", { className: "flex item-center flex-wrap gap-2", children: [_jsx(PaginationButton.Prev, { onClick: handlePrevPage, disabled: currentPage === 1 }), renderPageNumbers(), _jsx(PaginationButton.Next, { onClick: handleNextPage, disabled: currentPage === totalPages })] })), _jsx("select", { id: "pagination", "aria-label": "items-per-page", value: itemsPerPage, onChange: handleItemsPerPageChange, className: "text-14px flex items-center gap-2 h-8 px-2 shadow-box-1 rounded border border-neutral-40 dark:border-neutral-40-dark text-neutral-100 dark:text-neutral-100-dark bg-neutral-10 dark:bg-neutral-10-dark focus:ring-3 focus:ring-primary-focus dark:focus:ring-primary-focus-dark", children: itemPerPage.map((option) => (_jsx("option", { value: option, className: "p-2", children: `${option}/page` }, option))) })] }));
};
export default Pagination;
