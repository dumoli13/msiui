/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
/**
 *
 * A predefined skeleton loader for input fields, designed to simulate loading states for forms or inputs.
 * It consists of a title placeholder and a large input field placeholder.
 *
 */
const Skeleton = ({ width, height, type = 'circle' }) => {
    return (React.createElement("div", { className: cx('bg-neutral-30 dark:bg-neutral-30-dark animate-pulse', {
            'rounded-full': type === 'circle',
            'rounded-md': type === 'rounded',
            'shrink-0': !!height || !!width,
        }), style: {
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : '100%',
        } }));
};
Skeleton.input = () => {
    return (React.createElement("div", null,
        React.createElement("div", { className: "w-1/5 h-7 mb-1 bg-neutral-30 dark:bg-neutral-30-dark rounded-full animate-pulse" }),
        React.createElement("div", { className: "w-full h-[57px] bg-neutral-30 dark:bg-neutral-30-dark rounded-full animate-pulse" })));
};
Skeleton.table = ({ column }) => {
    return (React.createElement("div", { className: "overflow-y-auto border border-neutral-30 dark:border-neutral-30-dark rounded-md" },
        React.createElement("table", { className: "w-full" },
            React.createElement("thead", null,
                React.createElement("tr", null, new Array(column).fill(0).map((_col, key) => (React.createElement("th", { key: key, className: "text-left bg-neutral-20 dark:bg-neutral-20-dark px-4 py-3 border-r border-neutral-30 dark:border-neutral-30-dark last:border-none", scope: "col", "aria-label": `Column ${key + 1}` },
                    React.createElement("div", { className: "flex gap-4 items-center justify-between" },
                        React.createElement("div", { className: "w-full flex items-center gap-2.5" },
                            React.createElement("div", { className: "bg-neutral-40 dark:bg-neutral-40-dark rounded-full animate-pulse w-1/3 h-5" }),
                            React.createElement("div", { className: "flex flex-col gap-0.5" },
                                React.createElement("span", { className: "w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-neutral-30 dark:border-neutral-30-dark" }),
                                React.createElement("span", { className: "w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-neutral-30 dark:border-neutral-30-dark" }))))))))),
            React.createElement("tbody", null, new Array(5).fill(0).map((_row, rowIndex) => (React.createElement("tr", { key: rowIndex, className: "border-b border-neutral-30 dark:border-neutral-30-dark last:border-none" }, new Array(column).fill(0).map((_col, colIndex) => (React.createElement("td", { key: colIndex, "aria-label": `Row ${rowIndex + 1}, Column ${colIndex + 1}` },
                React.createElement("div", { className: "flex items-center justify-start px-4 py-2 min-h-[44px]" },
                    React.createElement("div", { className: "bg-neutral-40 dark:bg-neutral-40-dark rounded-full animate-pulse w-4/5 h-4" }))))))))))));
};
export default Skeleton;
