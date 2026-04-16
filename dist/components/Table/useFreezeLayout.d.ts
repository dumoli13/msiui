import React from 'react';
export interface UseFreezeLayoutConfig {
    tableRef: React.RefObject<HTMLDivElement | null>;
    freezeLeftColumns: number;
    freezeRightColumns: number;
    freezeTopRows: number;
    freezeBottomRows: number;
    /** True when showSelected=true; checkbox col is implicitly frozen-left */
    checkboxFrozen: boolean;
    /** internalColumns.length — does NOT include the checkbox column */
    totalDataCols: number;
    stickyHeader: boolean;
    /**
     * A string that changes whenever column order changes (e.g. after DnD reorder).
     * Including this in the effect deps ensures widths are remeasured after reorder.
     */
    columnOrderSignal: string;
}
export interface UseFreezeLayoutReturn {
    /**
     * Returns merged CSSProperties for a single cell.
     * colIndex: 0-based across the full column list (checkbox = 0 when showSelected).
     * rowIndex: -1 = header row; 0..N = tbody rows.
     */
    getCellStyle: (colIndex: number, rowIndex: number) => React.CSSProperties;
    /**
     * Returns merged CSSProperties for a <tr> row element.
     * Handles vertical sticky positioning so the entire row background sticks as a unit.
     */
    getRowStyle: (rowIndex: number) => React.CSSProperties;
    isFreezeLeftBoundary: (colIndex: number) => boolean;
    isFreezeRightBoundary: (colIndex: number) => boolean;
    isActive: boolean;
}
export declare function useFreezeLayout({ tableRef, freezeLeftColumns, freezeRightColumns, freezeTopRows, freezeBottomRows, checkboxFrozen, totalDataCols, stickyHeader, columnOrderSignal, }: UseFreezeLayoutConfig): UseFreezeLayoutReturn;
//# sourceMappingURL=useFreezeLayout.d.ts.map