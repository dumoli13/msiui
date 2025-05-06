import React from 'react';
export type BreadcrumbItem = {
    label: React.ReactNode;
    href?: string;
};
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    maxDisplay?: number;
    isFormEdited?: boolean;
}
/**
 *
 * Displays a list of breadcrumb items with support for truncating when the item count exceeds the maximum display value.
 * If more than `maxDisplay` items are provided, it will show the first few, followed by an ellipsis, and then the last few.
 *
 * @property {BreadcrumbItem[]} items - Array of breadcrumb items.
 * @property {number} [maxDisplay=4] - The maximum number of breadcrumb items to display before truncation.
 *
 */
declare const Breadcrumb: ({ items, maxDisplay, isFormEdited, }: BreadcrumbProps) => import("react/jsx-runtime").JSX.Element;
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.d.ts.map