import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE_SIZE } from '../../const';
import Icon from '../Icon';
const navButtonStyle = cx('text-14px text-neutral-100 dark:text-neutral-100-dark px-2 shadow-box-1 rounded-md border border-neutral-40 dark:border-neutral-40-dark bg-neutral-10 dark:bg-neutral-10-dark h-8 flex items-center gap-2', 'disabled:bg-neutral-40 dark:disabled:bg-neutral-30-dark disabled:text-neutral-60 dark:disabled:text-neutral-60-dark', 'hover:bg-primary-hover dark:hover:bg-primary-hover-dark hover:text-neutral-10 dark:hover:text-neutral-10-dark');
const pageButtonStyle = cx('text-16px text-neutral-100 dark:text-neutral-100-dark px-2 shadow-box-1 rounded-md border border-neutral-40 dark:border-neutral-40-dark bg-neutral-10 dark:bg-neutral-10-dark h-8 min-w-8', 'disabled:bg-primary-surface dark:disabled:bg-primary-surface-dark disabled:text-primary-main dark:disabled:text-primary-main-dark disabled:border-primary-surface dark:disabled:border-primary-surface-dark disabled:cursor-default', 'hover:bg-primary-hover dark:hover:bg-primary-hover-dark hover:text-neutral-10 dark:hover:text-neutral-10-dark');
const PrevButton = ({ onClick, disabled }) => {
    return (_jsxs("button", { type: "button", className: navButtonStyle, onClick: onClick, disabled: disabled, children: [_jsx(Icon, { name: "chevron-left", size: 16, strokeWidth: 2 }), _jsx("span", { className: "hidden md:block", children: "Prev" })] }, "prev"));
};
const NextButton = ({ onClick, disabled }) => {
    return (_jsxs("button", { type: "button", className: navButtonStyle, onClick: onClick, disabled: disabled, children: [_jsx("span", { className: "hidden md:block", children: "Next" }), _jsx(Icon, { name: "chevron-right", size: 16, strokeWidth: 2 })] }));
};
/**
 * The Pagination component enables the user to select a specific page from a range of pages.
 */
const Pagination = ({ total, hasNext, currentPage, itemPerPage = DEFAULT_ITEMS_PER_PAGE, pageSize = DEFAULT_PAGE_SIZE, onPageChange, paginationRef, }) => {
    const [itemsPerPage, setItemsPerPage] = React.useState(pageSize);
    const totalPages = total ? Math.ceil(total / itemsPerPage) : -1;
    const handlePageChange = (page) => {
        onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange({ page: page, limit: itemsPerPage });
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        handlePageChange(currentPage + 1);
    };
    React.useImperativeHandle(paginationRef, () => ({
        next: handleNextPage,
        prev: handlePrevPage,
    }));
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
    return (_jsxs("div", { className: `flex gap-4 md:gap-10 items-start justify-between ${totalPages > 1 || totalPages < 0 ? 'flex-row' : 'flex-row-reverse'}`, children: [totalPages > 1 ? (_jsxs("div", { className: "flex item-center flex-wrap gap-2", children: [_jsx(PrevButton, { onClick: handlePrevPage, disabled: currentPage === 1 }), renderPageNumbers(), _jsx(NextButton, { onClick: handleNextPage, disabled: currentPage === totalPages })] })) : (_jsxs("div", { className: "flex item-center flex-wrap gap-2", children: [_jsx(PrevButton, { onClick: handlePrevPage, disabled: currentPage === 1 }), _jsx(NextButton, { onClick: handleNextPage, disabled: !hasNext })] })), _jsx("select", { id: "pagination", "aria-label": "items-per-page", value: itemsPerPage, onChange: handleItemsPerPageChange, className: "text-14px flex items-center gap-2 h-8 px-2 shadow-box-1 rounded border border-neutral-40 dark:border-neutral-40-dark text-neutral-100 dark:text-neutral-100-dark bg-neutral-10 dark:bg-neutral-10-dark focus:ring-3 focus:ring-primary-focus dark:focus:ring-primary-focus-dark", children: itemPerPage.map((option) => (_jsx("option", { value: option, className: "p-2", children: `${option}/page` }, option))) })] }));
};
Pagination.Prev = PrevButton;
Pagination.Next = NextButton;
export default Pagination;
