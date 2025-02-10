import React, { ReactNode, useEffect, useRef, useState } from 'react';
import COLORS from '@/libs/color';
import { X } from 'react-feather';

export interface NotificationContainerProps {
  title: string;
  description: string | number;
  icon?: ReactNode;
  open: boolean;
  color: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  onClose?: () => void;
}

/**
 * NotificationContainer Component
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
 * @returns {JSX.Element | null} The notification component that is displayed if `open` is `true`, otherwise `null`.
 *
 * @example Basic Usage:
 * ```tsx
 * <NotificationContainer
 *   title="Success!"
 *   description="Your changes have been saved."
 *   color="success"
 *   open={true}
 *   onClose={() => console.log('Notification closed')}
 * />
 * ```
 */

const NotificationContainer = ({
  open,
  title,
  description,
  icon,
  color = 'primary',
  onClose,
}: NotificationContainerProps) => {
  const [visible, setVisible] = useState(open);
  const [progressWidth, setProgressWidth] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationDuration = 5000;
  const decrementInterval = 10;
  const decrementRate = 100 / (animationDuration / decrementInterval);

  useEffect(() => {
    setVisible(open);

    if (open) {
      setProgressWidth(100);
      startProgress();

      timerRef.current = setTimeout(() => {
        handleClose();
      }, animationDuration);
    }

    return () => {
      clearTimeout(timerRef.current!);
      clearInterval(intervalRef.current!);
    };
  }, [open]);

  const startProgress = () => {
    intervalRef.current = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return Math.max(prev - decrementRate, 0);
      });
    }, decrementInterval);
  };

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current!);
    clearTimeout(timerRef.current!);
  };

  const handleMouseLeave = () => {
    startProgress();
    timerRef.current = setTimeout(
      () => {
        handleClose();
      },
      animationDuration * (progressWidth / 100),
    );
  };

  const handleClose = () => {
    if (visible) {
      setVisible(false);
      onClose?.();
    }
  };

  if (!visible) return null;

  return (
    <div
      role="presentation"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative px-6 py-5 bg-neutral-10 text-neutral-90 flex gap-4 rounded-md shadow-box-notification max-w-[448px] overflow-hidden">
        <div className="shrink-0">{icon}</div>
        <div>
          <div className="text-24px mb-2 break-words">{title}</div>
          <p className="text-20px break-words">{description}</p>
        </div>
        <X
          width={22}
          height={22}
          onClick={handleClose}
          className="shrink-0 cursor-pointer text-neutral-60"
        />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-30">
          <div
            className="h-full transition-all ease-linear bg-primary-main"
            style={{
              width: `${progressWidth}%`,
              transitionDuration: '0s',
              backgroundColor: COLORS[color].main,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
