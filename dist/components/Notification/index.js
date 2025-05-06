import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../Icon';
import NotificationContainer from './NotificationContainer';
let addNotificationToStack = null;
export const useNotification = () => {
    return (notification) => {
        var _a;
        if (addNotificationToStack) {
            addNotificationToStack(Object.assign({ id: Math.random().toString(), color: (_a = notification.color) !== null && _a !== void 0 ? _a : 'primary' }, notification));
        }
    };
};
/**
 * useNotification Hook
 *
 * A custom hook for managing notifications within a React application. This hook allows components to trigger
 * notifications with customizable titles, descriptions, icons, and colors. Notifications are displayed in a stack
 * and can be closed automatically when clicked or after a specified duration.
 *
 * @property {Object} notification - The notification to display.
 * @property {string} notification.title - The title of the notification.
 * @property {string} notification.description - The description or content of the notification.
 * @property {React.ReactNode} [notification.icon] - Optional custom icon for the notification. Defaults to pre-defined icons based on color.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info'} [notification.color='primary'] - The color of the notification, determining the icon and styling. Possible values are:
 *    - 'primary': Blue icon (AlertCircle)
 *    - 'success': Green icon (CheckCircle)
 *    - 'danger': Red icon (XCircle)
 *    - 'warning': Yellow icon (AlertCircle)
 *    - 'info': Light Blue icon (AlertCircle)
 *
 */
const NotificationStack = () => {
    const [notifications, setNotifications] = React.useState([]);
    React.useEffect(() => {
        addNotificationToStack = (newNotification) => {
            setNotifications((prev) => [...prev, newNotification]);
        };
        return () => {
            addNotificationToStack = null;
        };
    }, []);
    return ReactDOM.createPortal(_jsx("div", { className: "fixed bottom-0 right-0 p-4 z-[1500] space-y-4", children: notifications.map((notification) => {
            const handleChangeNotifications = () => {
                const newNotif = notifications.filter((n) => n.id !== notification.id);
                setNotifications(newNotif);
            };
            let icon;
            switch (notification.color) {
                case 'success':
                    icon = (_jsx(Icon, { name: "check-circle", size: 24, strokeWidth: 3, className: "text-success-main dark:text-success-main-dark" }));
                    break;
                case 'danger':
                    icon = (_jsx(Icon, { name: "x-circle", size: 24, strokeWidth: 3, className: "text-danger-main dark:text-danger-main-dark" }));
                    break;
                case 'warning':
                    icon = (_jsx(Icon, { name: "alert-circle", size: 24, strokeWidth: 3, className: "text-warning-main dark:text-warning-main-dark" }));
                    break;
                case 'info':
                    icon = (_jsx(Icon, { name: "information-circle", size: 24, strokeWidth: 3, className: "text-info-main dark:text-info-main-dark" }));
                    break;
                default:
                    icon = notification.icon;
            }
            return (_jsx(NotificationContainer, { title: notification.title, description: notification.description, icon: icon, open: true, color: notification.color, onClose: handleChangeNotifications }, notification.id));
        }) }), document.body);
};
export const NotificationProvider = ({ children, }) => {
    return (_jsxs(_Fragment, { children: [children, _jsx(NotificationStack, {})] }));
};
