import React from 'react';
import { ReactNode } from 'react';
export type BreadcrumbItem = {
    label: ReactNode;
    href?: string;
};
interface BreadcrumbProps {
    items: BreadcrumbItem[];
    maxDisplay?: number;
    isFormEdited?: boolean;
}
/**
 * Breadcrumb Component
 *
 * Displays a list of breadcrumb items with support for truncating when the item count exceeds the maximum display value.
 * If more than `maxDisplay` items are provided, it will show the first few, followed by an ellipsis, and then the last few.
 * https://www.figma.com/design/JJLvT4QpNhnT2InWV5boVj/QCIS-for-SME---Website?node-id=433-34089&node-type=frame&t=xEPdjGtNP9PPWmjd-0
 *
 * @property {BreadcrumbItem[]} items - Array of breadcrumb items.
 * @property {number} [maxDisplay=4] - The maximum number of breadcrumb items to display before truncation.
 * @returns {JSX.Element} A breadcrumb navigation component.
 *
 * @example Basic Usage:
 * ```tsx
 * const items = [
 *   { label: 'Home', href: '/' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Electronics', href: '/products/electronics' },
 *   { label: 'Mobile Phones', href: '/products/electronics/mobiles' },
 *   { label: 'Smartphones', href: '/products/electronics/mobiles/smartphones' },
 * ];
 *
 * <Breadcrumb items={items} maxDisplay={4} />
 * ```
 *
 */
declare const Breadcrumb: ({ items, maxDisplay, isFormEdited, }: BreadcrumbProps) => React.JSX.Element;
export default Breadcrumb;
