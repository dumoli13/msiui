import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from 'classnames';
/**
 *
 * A predefined skeleton loader for input fields, designed to simulate loading states for forms or inputs.
 * It consists of a title placeholder and a large input field placeholder.
 *
 */
const Skeleton = ({ width, height, type = 'circle' }) => {
    return (_jsx("div", { className: cx('bg-neutral-40  dark:bg-neutral-40-dark animate-pulse', {
            'rounded-full': type === 'circle',
            'rounded-md': type === 'rounded',
            'shrink-0': !!height || !!width,
        }), style: {
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : '100%',
        } }));
};
const SkeletonInput = ({ size = 'default', height }) => (_jsxs("div", { children: [_jsx("div", { className: "w-1/5 h-5 mb-1 bg-neutral-40 dark:bg-neutral-40-dark rounded-full animate-pulse" }), _jsx("div", { className: cx('w-full bg-neutral-40 dark:bg-neutral-40-dark rounded-full animate-pulse', {
                'h-[32px]': size === 'default',
                'h-[44px]': size === 'large',
            }), style: { height: height } })] }));
SkeletonInput.displayName = 'SkeletonInput';
Skeleton.Input = SkeletonInput;
const SkeletonTable = ({ column = 2, row = 3, size = 'default', }) => {
    return (_jsx("div", { className: "overflow-y-auto border border-neutral-30 dark:border-neutral-30-dark rounded-md", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsx("tr", { children: new Array(column < 1 ? 1 : column).fill(0).map((_col, key) => (_jsx("th", { className: "text-left bg-neutral-20 dark:bg-neutral-20-dark px-4 py-3 border-r border-neutral-30 dark:border-neutral-30-dark last:border-none", scope: "col", "aria-label": `Column ${key + 1}`, children: _jsx("div", { className: "flex gap-4 items-center justify-between", children: _jsxs("div", { className: "w-full flex items-center gap-2.5", children: [_jsx("div", { className: "bg-neutral-40 dark:bg-neutral-40-dark rounded-full animate-pulse w-1/3 h-5" }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-neutral-30 dark:border-neutral-30-dark" }), _jsx("span", { className: "w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-neutral-30 dark:border-neutral-30-dark" })] })] }) }) }, key))) }) }), _jsx("tbody", { children: new Array(row < 1 ? 1 : row).fill(0).map((_row, rowIndex) => (_jsx("tr", { className: "border-b border-neutral-30 dark:border-neutral-30-dark last:border-none", children: new Array(column).fill(0).map((_col, colIndex) => (_jsx("td", { "aria-label": `Row ${rowIndex + 1}, Column ${colIndex + 1}`, children: _jsx("div", { className: cx('flex items-center justify-start px-4 py-2', {
                                    'h-[36px]': size === 'small',
                                    'h-[56px]': size === 'default',
                                    'h-[62px]': size === 'large',
                                }), children: _jsx("div", { className: "bg-neutral-40 dark:bg-neutral-40-dark rounded-full animate-pulse w-4/5 h-5" }) }) }, colIndex))) }, rowIndex))) })] }) }));
};
SkeletonTable.displayName = 'SkeletonTable';
Skeleton.Table = SkeletonTable;
export default Skeleton;
