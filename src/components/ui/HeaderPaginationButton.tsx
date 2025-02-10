import cx from 'classnames';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * HeaderPaginationButton Component
 *
 * This component provides navigation buttons for paginated content. It is designed with accessibility and responsiveness in mind and can be used for navigating lists, tables, or any paginated views.
 *
 * @interface PaginationButtonProps
 * @property {() => void} onClick - Callback function triggered when the button is clicked.
 * @property {boolean} [disabled=false] - Indicates if the button is disabled.
 *
 * @component HeaderPaginationButton
 * @description
 * This is the main component that provides subcomponents for pagination buttons:
 * - `HeaderPaginationButton.prev`: Button to navigate to the previous page.
 * - `HeaderPaginationButton.next`: Button to navigate to the next page.
 *
 * @returns {JSX.Element} A pagination button for navigation with customizable actions and styles.
 */

const navButtonStyle = cx(
  'text-14px flex items-center justify-center gap-2 h-12 w-24 shadow-box-1 rounded border border-neutral-40 text-neutral-100 bg-neutral-10',
  'disabled:bg-neutral-30 disabled:text-neutral-60 disabled:cursor-not-allowed',
  'hover:bg-primary-hover hover:text-neutral-10',
);

const HeaderPaginationButton = () => {
  return null;
};

HeaderPaginationButton.prev = ({
  onClick,
  disabled,
}: PaginationButtonProps) => {
  return (
    <button
      key="prev"
      type="button"
      className={navButtonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      <ChevronLeft width={16} height={16} strokeWidth={3} />
      <span>Prev List</span>
    </button>
  );
};

HeaderPaginationButton.next = ({
  onClick,
  disabled,
}: PaginationButtonProps) => {
  return (
    <button
      type="button"
      className={navButtonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      <span>Next List</span>
      <ChevronRight width={16} height={16} strokeWidth={3} />
    </button>
  );
};

export default HeaderPaginationButton;
