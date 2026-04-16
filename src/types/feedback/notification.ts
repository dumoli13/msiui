interface BaseNotificationProps {
  title: string;
  color: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
}

export interface NotificationProps extends BaseNotificationProps {
  id: string;
}

export interface NotificationContainerProps extends BaseNotificationProps {
  open: boolean;
  onClose?: () => void;
}
