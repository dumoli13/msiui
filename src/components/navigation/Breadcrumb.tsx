import React from 'react';
import { Fragment, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string; // Optional URL to link the breadcrumb item
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  maxDisplay?: number; // Maximum number of breadcrumb items to display, defaults to 4
  isFormEdited?: boolean;
}

const BreadcrumbLink = ({
  item,
  isLast = false,
  isFormEdited,
}: {
  item: BreadcrumbItem;
  isLast?: boolean;
  isFormEdited: boolean;
}) => {
  const navigate = useNavigate();

  const handleRoute = (href: string) => {
    if (isFormEdited) {
      Modal.danger({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Going back now will discard them.',
        confirmText: 'Discard',
        onConfirm: () => {
          navigate(href);
        },
      });
    } else {
      navigate(href);
    }
  };

  return isLast ? (
    <div className="font-bold text-neutral-100">{item.label}</div>
  ) : (
    <>
      {item.href ? (
        <div
          role="link"
          tabIndex={0}
          onClick={() => handleRoute(item.href!)}
          className="cursor-pointer"
        >
          {item.label}
        </div>
      ) : (
        <div>{item.label}</div>
      )}
      <div>/</div>
    </>
  );
};

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

const Breadcrumb = ({
  items,
  maxDisplay = 4,
  isFormEdited = false,
}: BreadcrumbProps) => {
  const parsedItem = items.map((item, index) => ({
    key: index,
    label: item.label,
    href: item.href,
  }));

  const shouldTruncate = items.length > maxDisplay;

  const renderItems = () => {
    if (!shouldTruncate) {
      return parsedItem.map((item, index) => (
        <BreadcrumbLink
          item={item}
          key={item.key}
          isLast={index === parsedItem.length - 1}
          isFormEdited={isFormEdited}
        />
      ));
    }

    const leftCount = Math.floor(maxDisplay / 2);
    const rightCount = maxDisplay % 2 === 0 ? leftCount : leftCount + 1;

    const firstItems = parsedItem.slice(0, leftCount);
    const lastItems = parsedItem.slice(parsedItem.length - rightCount);

    return [
      ...firstItems.map((item) => (
        <BreadcrumbLink
          item={item}
          key={item.key}
          isLast={false}
          isFormEdited={isFormEdited}
        />
      )),
      <Fragment key="ellipsis">
        <span className="mx-2">...</span>
        <span>/</span>
      </Fragment>,
      ...lastItems.map((item, index) => (
        <BreadcrumbLink
          item={item}
          key={item.key}
          isLast={index === lastItems.length - 1}
          isFormEdited={isFormEdited}
        />
      )),
    ];
  };

  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center gap-2.5 font-medium text-neutral-60 text-24px"
    >
      {renderItems()}
    </nav>
  );
};

export default Breadcrumb;
