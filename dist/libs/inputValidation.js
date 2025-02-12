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
//# sourceMappingURL=inputValidation.js.map