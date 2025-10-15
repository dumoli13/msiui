import React from 'react';
import { type NavigateFunction } from 'react-router-dom';
export type BreadcrumbItem = {
    label: React.ReactNode;
    href?: string;
};
export type BreadcrumbProps = {
    items: BreadcrumbItem[];
    maxDisplay?: number;
} & ({
    isFormEdited?: never;
    onNavigate?: never;
} | {
    isFormEdited: boolean;
    onNavigate: NavigateFunction;
});
/**
 * Displays a list of breadcrumb items with support for truncating when the item count exceeds the maximum display value.
 * If more than `maxDisplay` items are provided, it will show the first few, followed by an ellipsis, and then the last few.
 */
declare const Breadcrumb: ({ items, maxDisplay, ...props }: BreadcrumbProps) => import("react/jsx-runtime").JSX.Element;
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.d.ts.map