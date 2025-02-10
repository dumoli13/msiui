import React, { ReactNode, useEffect, useState } from 'react';
import COLORS from '@/libs/color';
import ReactDOM from 'react-dom';
import { AlertCircle, CheckCircle, XCircle } from 'react-feather';
import NotificationContainer from './NotificationContainer';

interface Notification {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  color: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}

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
 * @returns {void} This hook does not return a value, but it adds a notification to the stack.
 *
 * @example Basic Usage:
 * ```tsx
 * const showNotification = useNotification();
 * showNotification({
 *   title: "Success",
 *   description: "Your changes have been saved successfully.",
 *   color: "success",
 * });
 * ```
 */

let addNotificationToStack: ((notification: Notification) => void) | null =
  null;

export const useNotification = () => {
  return (notification: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  }) => {
    if (addNotificationToStack) {
      addNotificationToStack({
        id: Math.random().toString(),
        color: notification.color || 'primary',
        ...notification,
      });
    }
  };
};

const NotificationStack: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    addNotificationToStack = (newNotification) => {
      setNotifications((prev) => [...prev, newNotification]);
    };

    return () => {
      addNotificationToStack = null;
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed bottom-0 right-0 p-4 z-[1500] space-y-4">
      {notifications.map((notification) => {
        let icon: ReactNode;
        switch (notification.color) {
          case 'primary':
            icon = (
              <AlertCircle
                height={24}
                width={24}
                strokeWidth={3}
                stroke={COLORS.primary.main}
              />
            );
            break;
          case 'success':
            icon = (
              <CheckCircle
                height={24}
                width={24}
                strokeWidth={3}
                stroke={COLORS.success.main}
              />
            );
            break;
          case 'danger':
            icon = (
              <XCircle
                height={24}
                width={24}
                strokeWidth={3}
                stroke={COLORS.danger.main}
              />
            );
            break;
          case 'warning':
            icon = (
              <AlertCircle
                height={24}
                width={24}
                strokeWidth={3}
                stroke={COLORS.warning.main}
              />
            );
            break;
          case 'info':
            icon = (
              <AlertCircle
                height={24}
                width={24}
                strokeWidth={3}
                stroke={COLORS.info.main}
              />
            );
            break;
          default:
            icon = notification.icon;
        }

        return (
          <NotificationContainer
            key={notification.id}
            title={notification.title}
            description={notification.description}
            icon={icon}
            open
            color={notification.color}
            onClose={() =>
              setNotifications((prev) =>
                prev.filter((n) => n.id !== notification.id),
              )
            }
          />
        );
      })}
    </div>,
    document.body,
  );
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      <NotificationStack />
    </>
  );
};
