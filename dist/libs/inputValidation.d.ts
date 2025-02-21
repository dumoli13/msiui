export declare const SUNDAY_DATE: Date;
export declare function isToday(date: Date | null): boolean;
export declare function areDatesEqual(dateA: Date, dateB: Date): boolean;
export declare function isDateABeforeDateB(dateA: Date, dateB: Date): boolean;
export declare function isDateTimeABeforeOrEqualToDateB(dateA: Date, dateB: Date): boolean;
export declare function isDateBetween({ date, startDate, endDate, }: {
    date: Date;
    startDate: Date;
    endDate: Date;
}): boolean;
export declare function getYearRange(year: number): number[];
