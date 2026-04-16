import React from 'react';
import cx from 'classnames';
import { TimeUnit } from '../../const/datePicker';

interface TimeColumnProps {
  unit: TimeUnit;
  /** 24 for hours, 60 for minutes/seconds, 1000 for days */
  length: number;
  selected: number | null;
  onSelect: (value: number) => void;
  /** When true, scroll the selected item into view. Typically tied to the dropdown open state. */
  open: boolean;
  /** Tailwind w-* class for button width. Defaults to 'w-10'. Use 'w-12' for days column (3-digit values). */
  buttonWidth?: string;
}

const UNIT_LABELS: Record<TimeUnit, string> = {
  [TimeUnit.days]: 'day',
  [TimeUnit.hours]: 'hour',
  [TimeUnit.minutes]: 'min',
  [TimeUnit.seconds]: 'sec',
};

/**
 * A single scrollable column in a time picker (hours, minutes, or seconds).
 * Manages its own scroll and item refs internally.
 * Not exported from the library index.
 */
function TimeColumn({
  unit,
  length,
  selected,
  onSelect,
  open,
  buttonWidth = 'w-10',
}: Readonly<TimeColumnProps>) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (!open || selected === null) return;

    // Small delay to let the dropdown finish rendering before scrolling
    const timer = setTimeout(() => {
      const container = scrollRef.current;
      const item = itemRefs.current[selected];
      if (!container || !item) return;

      const offset =
        item.getBoundingClientRect().top -
        container.getBoundingClientRect().top -
        8;
      container.scrollTo({
        top: container.scrollTop + offset,
        behavior: 'smooth',
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [open, selected]);

  return (
    <div className="flex flex-col border-l border-neutral-40 dark:border-neutral-40-dark first:border-none">
      <div
        ref={scrollRef}
        className="text-neutral-100 dark:text-neutral-100-dark max-h-[234px] overflow-y-auto p-2 apple-scrollbar flex flex-col gap-1"
      >
        {Array.from({ length }, (_, idx) => (
          <button
            type="button"
            key={idx}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            aria-label={`${idx.toString().padStart(2, '0')} ${unit}`}
            aria-pressed={idx === selected}
            className={cx(
              buttonWidth,
              'text-center rounded py-0.5 transition-colors duration-100',
              {
                'bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark cursor-default':
                  idx === selected,
                'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark':
                  idx !== selected,
              },
            )}
            onClick={() => onSelect(idx)}
          >
            {idx.toString().padStart(2, '0')}
          </button>
        ))}
      </div>
      <div className="text-center text-11px text-neutral-60 dark:text-neutral-60-dark pb-1.5 pt-0.5">
        {UNIT_LABELS[unit]}
      </div>
    </div>
  );
}

export default TimeColumn;
