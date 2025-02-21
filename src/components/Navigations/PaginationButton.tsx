import React from 'react';
import cx from 'classnames';
import { ChevronLeft, ChevronRight } from 'react-feather';

export interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * PaginationButton Component
 *
 * This component provides buttons for pagination navigation, specifically for navigating to the next or previous page.
 * It includes button elements styled with icons to indicate the direction of the navigation (left for previous, right for next).
 *
 * @interface PaginationButtonProps
 * @property {() => void} onClick - A callback function to be triggered when the button is clicked.
 * @property {boolean} [disabled] - An optional boolean that disables the button if set to true.
 *
 * @example Basic Usage:
 * ```tsx
 * import PaginationButton from './PaginationButton';
 *
 * const MyComponent = () => {
 *   const handlePrevClick = () => {
 *     console.log("Previous page");
 *   };
 *   const handleNextClick = () => {
 *     console.log("Next page");
 *   };
 *
 *   return (
 *     <div>
 *       <PaginationButton.prev onClick={handlePrevClick} disabled={false} />
 *       <PaginationButton.next onClick={handleNextClick} disabled={false} />
 *     </div>
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element} Pagination navigation buttons (Previous and Next).
 */

const navButtonStyle = cx(
  'text-14px flex items-center gap-2 h-8 px-2 shadow-box-1 rounded border border-neutral-40 text-neutral-100 bg-neutral-10',
  'disabled:bg-neutral-40 disabled:text-neutral-60',
  'hover:bg-primary-hover hover:text-neutral-10',
);

const PaginationButton = () => {
  return null;
};

PaginationButton.prev = ({ onClick, disabled }: PaginationButtonProps) => {
  return (
    <button
      key="prev"
      type="button"
      className={navButtonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      <ChevronLeft width={16} height={16} strokeWidth={2} />
      <span>Prev</span>
    </button>
  );
};

PaginationButton.next = ({ onClick, disabled }: PaginationButtonProps) => {
  return (
    <button
      type="button"
      className={navButtonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      <span>Next</span>
      <ChevronRight width={16} height={16} strokeWidth={2} />
    </button>
  );
};

export default PaginationButton;
