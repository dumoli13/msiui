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
/**
 * A single scrollable column in a time picker (hours, minutes, or seconds).
 * Manages its own scroll and item refs internally.
 * Not exported from the library index.
 */
declare function TimeColumn({ unit, length, selected, onSelect, open, buttonWidth, }: Readonly<TimeColumnProps>): import("react/jsx-runtime").JSX.Element;
export default TimeColumn;
//# sourceMappingURL=TimeColumn.d.ts.map