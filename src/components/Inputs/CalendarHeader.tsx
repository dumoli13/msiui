import Icon from '../Icon';

const NAV_BTN_CLASS =
  'p-1 flex items-center justify-center rounded-full hover:bg-neutral-20 dark:hover:bg-neutral-20-dark text-neutral-100/25 dark:text-neutral-100-dark/25';

interface CalendarHeaderProps {
  displayedDate: Date;
  monthFormatter: Intl.DateTimeFormat;
  /** Called when the user wants to navigate to the previous year. Omit to hide the button. */
  onPrevYear?: () => void;
  /** Called when the user wants to navigate to the previous month. Omit to hide the button. */
  onPrevMonth?: () => void;
  /** Called when the user wants to navigate to the next month. Omit to hide the button. */
  onNextMonth?: () => void;
  /** Called when the user wants to navigate to the next year. Omit to hide the button. */
  onNextYear?: () => void;
  /** Called when the month label is clicked — switches to month picker view. */
  onClickMonth: () => void;
  /** Called when the year label is clicked — switches to year picker view. */
  onClickYear: () => void;
}

/**
 * Navigation header bar shared by all date-picker calendar panels.
 * Pass only the handlers you need; others are hidden automatically.
 * Not exported from the library index.
 */
function CalendarHeader({
  displayedDate,
  monthFormatter,
  onPrevYear,
  onPrevMonth,
  onNextMonth,
  onNextYear,
  onClickMonth,
  onClickYear,
}: Readonly<CalendarHeaderProps>) {
  return (
    <div className="flex justify-between items-center gap-2 p-2 border-b border-neutral-40 dark:border-neutral-40-dark">
      <div className="flex items-center">
        {onPrevYear && (
          <button
            type="button"
            aria-label="Previous year"
            onClick={onPrevYear}
            className={NAV_BTN_CLASS}
          >
            <Icon name="chevron-double-left" size={20} strokeWidth={2} />
          </button>
        )}
        {onPrevMonth && (
          <button
            type="button"
            aria-label="Previous month"
            onClick={onPrevMonth}
            className={NAV_BTN_CLASS}
          >
            <Icon name="chevron-left" size={20} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 text-16px font-semibold text-neutral-100 dark:text-neutral-100-dark">
        <button
          type="button"
          aria-label={`Select month: ${monthFormatter.format(displayedDate)}`}
          className="shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-[84px]"
          onClick={onClickMonth}
        >
          {monthFormatter.format(displayedDate)}
        </button>
        <button
          type="button"
          aria-label={`Select year: ${displayedDate.getFullYear()}`}
          className="shrink-0 hover:text-primary-hover dark:hover:text-primary-hover-dark w-10"
          onClick={onClickYear}
        >
          {displayedDate.getFullYear()}
        </button>
      </div>

      <div className="flex items-center">
        {onNextMonth && (
          <button
            type="button"
            aria-label="Next month"
            onClick={onNextMonth}
            className={NAV_BTN_CLASS}
          >
            <Icon name="chevron-right" size={20} strokeWidth={2} />
          </button>
        )}
        {onNextYear && (
          <button
            type="button"
            aria-label="Next year"
            onClick={onNextYear}
            className={NAV_BTN_CLASS}
          >
            <Icon name="chevron-double-right" size={20} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}

export default CalendarHeader;
