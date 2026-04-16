import React from 'react';
// ─── Shadow tokens ─────────────────────────────────────────────────────────────
const SHADOW_RIGHT = '4px 0 8px -2px rgba(0,0,0,0.15)';
const SHADOW_LEFT = '-4px 0 8px -2px rgba(0,0,0,0.15)';
const SHADOW_BOTTOM = '0 4px 8px -2px rgba(0,0,0,0.15)';
const SHADOW_TOP = '0 -4px 8px -2px rgba(0,0,0,0.15)';
// ─── DOM measurement helpers ───────────────────────────────────────────────────
function measureColWidths(tableRef) {
    if (!tableRef.current)
        return [];
    const firstRow = tableRef.current.querySelector('thead tr:first-child');
    if (!firstRow)
        return [];
    return Array.from(firstRow.querySelectorAll('th')).map((th) => th.getBoundingClientRect().width);
}
function measureRowHeights(tableRef) {
    if (!tableRef.current)
        return [];
    const tbody = tableRef.current.querySelector('tbody');
    if (!tbody)
        return [];
    return Array.from(tbody.querySelectorAll('tr')).map((tr) => tr.getBoundingClientRect().height);
}
function measureTheadHeight(tableRef) {
    if (!tableRef.current)
        return 0;
    const thead = tableRef.current.querySelector('thead');
    return thead ? thead.getBoundingClientRect().height : 0;
}
// ─── Offset accumulation helpers ───────────────────────────────────────────────
function buildLeftOffsets(widths) {
    const result = [];
    let cumulative = 0;
    for (let i = 0; i < widths.length; i++) {
        result.push(cumulative);
        cumulative += widths[i];
    }
    return result;
}
function buildRightOffsets(widths) {
    const result = new Array(widths.length).fill(0);
    let cumulative = 0;
    for (let i = widths.length - 1; i >= 0; i--) {
        result[i] = cumulative;
        cumulative += widths[i];
    }
    return result;
}
function buildTopOffsets(heights, baseOffset) {
    const result = [];
    let cumulative = baseOffset;
    for (let i = 0; i < heights.length; i++) {
        result.push(cumulative);
        cumulative += heights[i];
    }
    return result;
}
function buildBottomOffsets(heights) {
    const result = new Array(heights.length).fill(0);
    let cumulative = 0;
    for (let i = heights.length - 1; i >= 0; i--) {
        result[i] = cumulative;
        cumulative += heights[i];
    }
    return result;
}
// ─── Hook ───────────────────────────────────────────────────────────────────────
export function useFreezeLayout({ tableRef, freezeLeftColumns, freezeRightColumns, freezeTopRows, freezeBottomRows, checkboxFrozen, totalDataCols, stickyHeader, columnOrderSignal, }) {
    const totalFreezeLeft = freezeLeftColumns + (checkboxFrozen ? 1 : 0);
    const totalCols = totalDataCols + (checkboxFrozen ? 1 : 0);
    const isActive = totalFreezeLeft > 0 ||
        freezeRightColumns > 0 ||
        freezeTopRows > 0 ||
        freezeBottomRows > 0;
    // ── Measured state ──────────────────────────────────────────────────────────
    const [colWidths, setColWidths] = React.useState([]);
    const [rowHeights, setRowHeights] = React.useState([]);
    const [theadHeight, setTheadHeight] = React.useState(0);
    // Track previous measured values so we can bail out of state updates when
    // nothing has changed, preventing a ResizeObserver → setState → re-render loop.
    const prevColWidths = React.useRef([]);
    const prevRowHeights = React.useRef([]);
    const prevTheadHeight = React.useRef(0);
    // ── ResizeObserver — observes the outer tableRef div ────────────────────────
    React.useLayoutEffect(() => {
        if (!isActive)
            return;
        const measure = () => {
            const newColWidths = measureColWidths(tableRef);
            const newRowHeights = measureRowHeights(tableRef);
            const newTheadHeight = measureTheadHeight(tableRef);
            const colChanged = prevColWidths.current.length !== newColWidths.length ||
                prevColWidths.current.some((v, i) => v !== newColWidths[i]);
            if (colChanged) {
                prevColWidths.current = newColWidths;
                setColWidths(newColWidths);
            }
            const rowChanged = prevRowHeights.current.length !== newRowHeights.length ||
                prevRowHeights.current.some((v, i) => v !== newRowHeights[i]);
            if (rowChanged) {
                prevRowHeights.current = newRowHeights;
                setRowHeights(newRowHeights);
            }
            if (prevTheadHeight.current !== newTheadHeight) {
                prevTheadHeight.current = newTheadHeight;
                setTheadHeight(newTheadHeight);
            }
        };
        measure();
        const observer = new ResizeObserver(measure);
        if (tableRef.current) {
            observer.observe(tableRef.current);
        }
        return () => observer.disconnect();
    }, [isActive, totalDataCols, checkboxFrozen, columnOrderSignal, tableRef]);
    // ── Derived offset arrays ────────────────────────────────────────────────────
    const leftOffsets = React.useMemo(() => buildLeftOffsets(colWidths), [colWidths]);
    const rightOffsets = React.useMemo(() => buildRightOffsets(colWidths), [colWidths]);
    const topRowBase = stickyHeader ? theadHeight : 0;
    const topOffsets = React.useMemo(() => buildTopOffsets(rowHeights, topRowBase), [rowHeights, topRowBase]);
    const bottomOffsets = React.useMemo(() => buildBottomOffsets(rowHeights), [rowHeights]);
    // ── Boundary predicates ──────────────────────────────────────────────────────
    const isFreezeLeftBoundary = React.useCallback((colIndex) => totalFreezeLeft > 0 && colIndex === totalFreezeLeft - 1, [totalFreezeLeft]);
    const isFreezeRightBoundary = React.useCallback((colIndex) => freezeRightColumns > 0 && colIndex === totalCols - freezeRightColumns, [freezeRightColumns, totalCols]);
    const isFreezeTopBoundary = React.useCallback((rowIndex) => freezeTopRows > 0 && rowIndex === freezeTopRows - 1, [freezeTopRows]);
    const isFreezeBottomBoundary = React.useCallback((rowIndex) => freezeBottomRows > 0 && rowIndex === rowHeights.length - freezeBottomRows, [freezeBottomRows, rowHeights.length]);
    // ── getCellStyle ─────────────────────────────────────────────────────────────
    const getCellStyle = React.useCallback((colIndex, rowIndex) => {
        if (!isActive)
            return {};
        const isHeader = rowIndex === -1;
        const isFrozenLeft = totalFreezeLeft > 0 && colIndex < totalFreezeLeft;
        const isFrozenRight = freezeRightColumns > 0 && colIndex >= totalCols - freezeRightColumns;
        const isFrozenTop = !isHeader && freezeTopRows > 0 && rowIndex < freezeTopRows;
        const isFrozenBottom = !isHeader &&
            freezeBottomRows > 0 &&
            rowIndex >= rowHeights.length - freezeBottomRows;
        const isFrozenCol = isFrozenLeft || isFrozenRight;
        const isFrozenRow = isFrozenTop || isFrozenBottom;
        // Only apply cell-level sticky for column freezing.
        // Row freezing is handled by <tr> via getRowStyle.
        if (!isFrozenCol)
            return {};
        const style = { position: 'sticky' };
        // ── horizontal offsets ──────────────────────────────────────────────────
        if (isFrozenLeft && leftOffsets[colIndex] !== undefined)
            style.left = leftOffsets[colIndex];
        if (isFrozenRight && rightOffsets[colIndex] !== undefined)
            style.right = rightOffsets[colIndex];
        // ── z-index ─────────────────────────────────────────────────────────────
        if (isHeader) {
            style.zIndex = stickyHeader ? 30 : 20;
        }
        else if (isFrozenRow) {
            style.zIndex = 4; // column-frozen cell inside a frozen row — on top of row's z-index 3
        }
        else {
            style.zIndex = 2; // column-frozen cell in a normal row
        }
        // ── background (must be opaque to occlude scrolling content) ────────────
        // `inherit` propagates the <tr>'s Tailwind bg-* class, which is always
        // a solid color. Tailwind `!important` classes on <td> (highlighted/selected)
        // override inline styles, so those states still render correctly.
        if (!isHeader) {
            style.backgroundColor = 'inherit';
        }
        // ── box-shadow on freeze boundaries (column-axis only) ───────────────────
        // Row boundary shadows are handled by getRowStyle on the <tr>.
        const shadowParts = [];
        if (isFreezeLeftBoundary(colIndex))
            shadowParts.push(SHADOW_RIGHT);
        if (isFreezeRightBoundary(colIndex))
            shadowParts.push(SHADOW_LEFT);
        if (shadowParts.length > 0)
            style.boxShadow = shadowParts.join(', ');
        return style;
    }, [
        isActive,
        totalFreezeLeft,
        freezeRightColumns,
        freezeTopRows,
        freezeBottomRows,
        totalCols,
        leftOffsets,
        rightOffsets,
        rowHeights.length,
        stickyHeader,
        isFreezeLeftBoundary,
        isFreezeRightBoundary,
    ]);
    // ── getRowStyle ───────────────────────────────────────────────────────────
    const getRowStyle = React.useCallback((rowIndex) => {
        if (!isActive)
            return {};
        const isFrozenTop = freezeTopRows > 0 && rowIndex < freezeTopRows;
        const isFrozenBottom = freezeBottomRows > 0 &&
            rowIndex >= rowHeights.length - freezeBottomRows;
        if (!isFrozenTop && !isFrozenBottom)
            return {};
        const style = { position: 'sticky', zIndex: 3 };
        if (isFrozenTop && topOffsets[rowIndex] !== undefined)
            style.top = topOffsets[rowIndex];
        if (isFrozenBottom && bottomOffsets[rowIndex] !== undefined)
            style.bottom = bottomOffsets[rowIndex];
        // Row-boundary shadow (visual separator below last frozen-top / above first frozen-bottom row)
        if (isFreezeTopBoundary(rowIndex))
            style.boxShadow = SHADOW_BOTTOM;
        if (isFreezeBottomBoundary(rowIndex))
            style.boxShadow = SHADOW_TOP;
        return style;
    }, [
        isActive,
        freezeTopRows,
        freezeBottomRows,
        rowHeights.length,
        topOffsets,
        bottomOffsets,
        isFreezeTopBoundary,
        isFreezeBottomBoundary,
    ]);
    return {
        getCellStyle,
        getRowStyle,
        isFreezeLeftBoundary,
        isFreezeRightBoundary,
        isActive,
    };
}
