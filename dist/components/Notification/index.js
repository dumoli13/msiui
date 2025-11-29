import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../Icon';
import NotificationContainer from './NotificationContainer';
let addNotificationToStack = null;
/**
 * To display a notification message at the bottom right of the screen.
 */
export const useNotification = () => {
    return (notification) => {
        if (addNotificationToStack) {
            addNotificationToStack({
                id: Math.random().toString(),
                color: notification.color ?? 'primary',
                ...notification,
            });
        }
    };
};
export const NotificationStack = () => {
    const [notifications, setNotifications] = React.useState([]);
    React.useEffect(() => {
        addNotificationToStack = (newNotification) => {
            setNotifications((prev) => [...prev, newNotification]);
        };
        return () => {
            addNotificationToStack = null;
        };
    }, []);
    const handleChangeNotifications = (notification) => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    };
    return ReactDOM.createPortal(_jsx("div", { className: "fixed bottom-0 right-0 p-4 z-[1500] space-y-4", children: notifications.map((notification) => {
            let icon;
            switch (notification.color) {
                case 'success':
                    icon = (_jsx(Icon, { name: "check-circle", size: 24, strokeWidth: 2, className: "text-success-main dark:text-success-main-dark" }));
                    break;
                case 'danger':
                    icon = (_jsx(Icon, { name: "x-circle", size: 24, strokeWidth: 2, className: "text-danger-main dark:text-danger-main-dark" }));
                    break;
                case 'warning':
                    icon = (_jsx(Icon, { name: "alert-circle", size: 24, strokeWidth: 2, className: "text-warning-main dark:text-warning-main-dark" }));
                    break;
                case 'info':
                    icon = (_jsx(Icon, { name: "information-circle", size: 24, strokeWidth: 2, className: "text-info-main dark:text-info-main-dark" }));
                    break;
                default:
                    icon = notification.icon;
            }
            return (_jsx(NotificationContainer, { open: true, title: notification.title, description: notification.description, color: notification.color, icon: icon, onClose: () => handleChangeNotifications(notification) }, notification.id));
        }) }), document.body);
};
