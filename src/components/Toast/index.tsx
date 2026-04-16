import React from 'react';
import type { NotificationProps } from '../../types/feedback/notification';
import Icon from '../Icon';
import { Portal } from '../Portal';
import ToastContainer from './ToastContainer';

let addToastToStack: ((toast: NotificationProps) => void) | null = null;

/**
 * To display a toast message at the bottom right of the screen.
 */
export const useToast = () => {
  return (toast: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  }) => {
    if (addToastToStack) {
      addToastToStack({
        id: crypto.randomUUID(),
        color: toast.color ?? 'neutral',
        ...toast,
      });
    }
  };
};

export const ToastStack = () => {
  const [toasts, setToasts] = React.useState<NotificationProps[]>([]);

  React.useEffect(() => {
    addToastToStack = (newToast) => {
      setToasts((prev) => [...prev, newToast]);
    };

    return () => {
      addToastToStack = null;
    };
  }, []);

  const handleChangeToasts = (toast: NotificationProps) => {
    setToasts((prev) => prev.filter((n) => n.id !== toast.id));
  };

  return (
    <Portal>
      <div className="fixed top-6 right-6 z-[1500] space-y-4">
        {toasts.map((toast) => {
          let icon: React.ReactNode;
          switch (toast.color) {
            case 'info':
              icon = (
                <Icon
                  name="information-circle"
                  variant="solid"
                  size={24}
                  className="shrink-0"
                />
              );
              break;
            case 'warning':
            case 'danger':
              icon = (
                <Icon
                  name="alert-triangle"
                  variant="solid"
                  size={24}
                  className="shrink-0"
                />
              );
              break;
            case 'success':
              icon = (
                <Icon
                  name="check-circle"
                  variant="solid"
                  size={24}
                  className="shrink-0"
                />
              );
              break;
            default:
              icon = toast.icon;
          }

          return (
            <ToastContainer
              open
              key={toast.id}
              title={toast.title}
              description={toast.description}
              color={toast.color}
              icon={icon}
              onClose={() => handleChangeToasts(toast)}
            />
          );
        })}
      </div>
    </Portal>
  );
};
