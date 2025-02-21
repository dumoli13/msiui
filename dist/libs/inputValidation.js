export const SUNDAY_DATE = new Date('2023-01-01');
export function isToday(date) {
    if (!date)
        return false;
    const today = new Date();
    return (date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate());
}
export function areDatesEqual(dateA, dateB) {
    return (dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate());
}
export function isDateABeforeDateB(dateA, dateB) {
    return (dateA.getFullYear() < dateB.getFullYear() ||
        (dateA.getFullYear() === dateB.getFullYear() &&
            dateA.getMonth() < dateB.getMonth()) ||
        (dateA.getFullYear() === dateB.getFullYear() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getDate() < dateB.getDate()));
}
export function isDateTimeABeforeOrEqualToDateB(dateA, dateB) {
    const isTimeABeforeOrEqualToTimeB = dateA.getHours() < dateB.getHours() ||
        (dateA.getHours() === dateB.getHours() &&
            dateA.getMinutes() < dateB.getMinutes()) ||
        (dateA.getHours() === dateB.getHours() &&
            dateA.getMinutes() === dateB.getMinutes() &&
            dateA.getSeconds() <= dateB.getSeconds());
    return (isDateABeforeDateB(dateA, dateB) ||
        (areDatesEqual(dateA, dateB) && isTimeABeforeOrEqualToTimeB));
}
export function isDateBetween({ date, startDate, endDate, }) {
    const isAfterStartDate = isDateABeforeDateB(startDate, date);
    const isBeforeEndDate = isDateABeforeDateB(date, endDate);
    return isAfterStartDate && isBeforeEndDate;
}
export function getYearRange(year) {
    const step = 12;
    const lowerBound = Math.floor(year / step) * step;
    const upperBound = lowerBound + step;
    return Array.from({ length: upperBound - lowerBound }, (_, i) => lowerBound + i);
}
//# sourceMappingURL=inputValidation.js.map