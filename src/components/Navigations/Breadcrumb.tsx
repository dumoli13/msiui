import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Tooltip } from '..';
import type { BreadcrumbProps } from '../../types';
import type { BreadcrumbLinkProps } from '../../types/navigations/breadcrumb';

const MAX_LABEL_LENGTH = 32;

const truncateLabel = (label: React.ReactNode) => {
  const isTruncated =
    typeof label === 'string' && label.length > MAX_LABEL_LENGTH;
  return {
    display: isTruncated
      ? `${(label as string).slice(0, MAX_LABEL_LENGTH)}...`
      : label,
    fullLabel: isTruncated ? (label as string) : '',
    isTruncated,
  };
};

const BreadcrumbLink = ({
  item,
  isLast = false,
  isFormEdited,
  onNavigate,
}: BreadcrumbLinkProps) => {
  const handleRoute = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (!onNavigate) return;

    Modal.danger({
      title: 'Unsaved Changes',
      content: 'You have unsaved changes. Going back now will discard them.',
      confirmText: 'Discard',
      onConfirm: () => {
        onNavigate(href);
      },
    });
  };

  const { display, fullLabel, isTruncated } = truncateLabel(item.label);

  const wrapWithTooltip = (node: React.ReactNode) =>
    isTruncated ? (
      <Tooltip
        title={fullLabel}
        verticalAlign="bottom"
        horizontalAlign="center"
        arrow
      >
        {node}
      </Tooltip>
    ) : (
      <>{node}</>
    );

  return isLast ? (
    wrapWithTooltip(
      <div className="text-neutral-70 dark:text-neutral-70-dark">
        {display}
      </div>,
    )
  ) : (
    <>
      {item.href &&
        isFormEdited &&
        wrapWithTooltip(
          <Link
            to={item.href}
            onClick={handleRoute(item.href)}
            className="cursor-pointer"
          >
            {display}
          </Link>,
        )}
      {item.href &&
        !isFormEdited &&
        wrapWithTooltip(<Link to={item.href}>{display}</Link>)}
      {!item.href && wrapWithTooltip(<div>{display}</div>)}
      <div>/</div>
    </>
  );
};

/**
 * Displays a list of breadcrumb items with support for truncating when the item count exceeds the maximum display value.
 * If more than `maxDisplay` items are provided, it will show the first few, followed by an ellipsis, and then the last few.
 */
const Breadcrumb = ({ items, maxDisplay = 4, ...props }: BreadcrumbProps) => {
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
          {...props}
        />
      ));
    }

    const leftCount = Math.floor(maxDisplay / 2);
    const rightCount = maxDisplay % 2 === 0 ? leftCount : leftCount + 1;

    const firstItems = parsedItem.slice(0, leftCount);
    const lastItems = parsedItem.slice(parsedItem.length - rightCount);

    return [
      ...firstItems.map((item) => (
        <BreadcrumbLink item={item} key={item.key} isLast={false} {...props} />
      )),
      <React.Fragment key="ellipsis">
        <span className="mx-2.5">...</span>
        <span>/</span>
      </React.Fragment>,
      ...lastItems.map((item, index) => (
        <BreadcrumbLink
          item={item}
          key={item.key}
          isLast={index === lastItems.length - 1}
          {...props}
        />
      )),
    ];
  };

  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center gap-2.5 font-medium text-neutral-100 dark:text-neutral-100-dark text-14px"
    >
      {renderItems()}
    </nav>
  );
};

export default Breadcrumb;
