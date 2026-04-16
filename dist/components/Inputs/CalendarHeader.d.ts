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
declare function CalendarHeader({ displayedDate, monthFormatter, onPrevYear, onPrevMonth, onNextMonth, onNextYear, onClickMonth, onClickYear, }: Readonly<CalendarHeaderProps>): import("react/jsx-runtime").JSX.Element;
export default CalendarHeader;
//# sourceMappingURL=CalendarHeader.d.ts.map