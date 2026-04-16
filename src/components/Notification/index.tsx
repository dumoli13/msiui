import React from 'react';
import type { NotificationProps } from '../../types/feedback/notification';
import Icon from '../Icon';
import { Portal } from '../Portal';
import NotificationContainer from './NotificationContainer';

let addNotificationToStack: ((notification: NotificationProps) => void) | null =
  null;

/**
 * To display a notification message at the bottom right of the screen.
 */
export const useNotification = () => {
  return (notification: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  }) => {
    if (addNotificationToStack) {
      addNotificationToStack({
        id: crypto.randomUUID(),
        color: notification.color ?? 'primary',
        ...notification,
      });
    }
  };
};

export const NotificationStack = () => {
  const [notifications, setNotifications] = React.useState<NotificationProps[]>(
    [],
  );

  React.useEffect(() => {
    addNotificationToStack = (newNotification) => {
      setNotifications((prev) => [...prev, newNotification]);
    };

    return () => {
      addNotificationToStack = null;
    };
  }, []);

  const handleChangeNotifications = (notification: NotificationProps) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
  };

  return (
    <Portal>
      <div className="fixed bottom-0 right-0 z-[1500] space-y-4">
        {notifications.map((notification) => {
          let icon: React.ReactNode;
          switch (notification.color) {
            case 'success':
              icon = (
                <Icon
                  name="check-circle"
                  size={24}
                  strokeWidth={2}
                  className="text-success-main dark:text-success-main-dark"
                />
              );
              break;
            case 'danger':
              icon = (
                <Icon
                  name="x-circle"
                  size={24}
                  strokeWidth={2}
                  className="text-danger-main dark:text-danger-main-dark"
                />
              );
              break;
            case 'warning':
              icon = (
                <Icon
                  name="alert-circle"
                  size={24}
                  strokeWidth={2}
                  className="text-warning-main dark:text-warning-main-dark"
                />
              );
              break;
            case 'info':
              icon = (
                <Icon
                  name="information-circle"
                  size={24}
                  strokeWidth={2}
                  className="text-info-main dark:text-info-main-dark"
                />
              );
              break;
            case 'neutral':
              icon = (
                <Icon
                  name="information-circle"
                  size={24}
                  strokeWidth={2}
                  className="text-neutral-80 dark:text-neutral-80-dark"
                />
              );
              break;
            default:
              icon = notification.icon;
          }

          return (
            <NotificationContainer
              open
              key={notification.id}
              title={notification.title}
              description={notification.description}
              color={notification.color}
              icon={icon}
              onClose={() => handleChangeNotifications(notification)}
            />
          );
        })}
      </div>
    </Portal>
  );
};
