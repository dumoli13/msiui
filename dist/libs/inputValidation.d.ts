import type { SelectValue } from '../types';
export declare function isToday(date: Date | null): boolean;
export declare function areDatesEqual(dateA: Date, dateB: Date | Date[]): boolean;
export declare function isDateABeforeDateB(dateA: Date, dateB: Date): boolean;
export declare function isDateBetween({ date, startDate, endDate, }: {
    date: Date;
    startDate: Date;
    endDate: Date;
}): boolean;
export declare function getYearRange(year: number): number[];
export declare function isSelectValue<T, D>(value: SelectValue<T, D> | T | null): value is SelectValue<T, D>;
export declare function isSelectValueArray<T, D>(value: SelectValue<T, D>[] | T[] | null | undefined): value is SelectValue<T, D>[];
//# sourceMappingURL=inputValidation.d.ts.map