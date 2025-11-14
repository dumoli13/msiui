import React from 'react';
export interface NotificationContainerProps {
    title: string;
    description: string | number;
    icon?: React.ReactNode;
    open: boolean;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    onClose?: () => void;
    duration?: number;
}
/**
 *
 * A component that displays an individual notification with a title, description, icon, and a progress bar indicating the remaining time.
 * The notification automatically closes after a specified duration (default is 5 seconds), but the user can also manually close it.
 * The progress bar visually decreases over time, and it pauses when the user hovers over the notification.
 * It supports different colors to indicate various types of notifications (e.g., success, danger, warning).
 *
 * @property {string} title - The title of the notification.
 * @property {string | number} description - The description or content of the notification. Can be a string or a number.
 * @property {React.ReactNode} [icon] - Optional custom icon to display alongside the notification. Defaults to predefined icons based on the color.
 * @property {boolean} open - A boolean to control whether the notification is visible. If `true`, the notification is shown.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info'} color - The color of the notification, which influences the icon and progress bar color. Possible values are:
 *    - 'primary': Default color, blue progress bar and icon.
 *    - 'success': Green progress bar and icon.
 *    - 'danger': Red progress bar and icon.
 *    - 'warning': Yellow progress bar and icon.
 *    - 'info': Light blue progress bar and icon.
 * @property {Function} [onClose] - Optional callback function triggered when the notification is closed manually.
 *
 */
declare const NotificationContainer: ({ open, title, description, icon, color, duration, onClose, }: NotificationContainerProps) => import("react/jsx-runtime").JSX.Element | null;
export default NotificationContainer;
//# sourceMappingURL=NotificationContainer.d.ts.map