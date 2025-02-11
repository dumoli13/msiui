import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { X } from 'react-feather';

export interface NotificationContainerProps {
  title: string;
  description: string;
  icon?: ReactNode;
  open: boolean;
  onClose?: () => void;
}

/**
 * NotificationContainer Component
 *
 * A component that displays an individual notification with a title, description, and an optional icon.
 * The notification has a progress bar that counts down to automatically close after a specified duration (default 5 seconds).
 * It also includes user interactions like pausing the progress when hovering over the notification and closing it manually via the close button.
 * The notification appears from the right side of the screen with a sliding effect, and it disappears smoothly after the duration or when closed manually.
 *
 * @property {string} title - The title of the notification.
 * @property {string} description - The description or content of the notification.
 * @property {React.ReactNode} [icon] - Optional icon displayed alongside the notification.
 * @property {boolean} open - Controls whether the notification is visible or not. If `true`, the notification will be shown.
 * @property {Function} [onClose] - Optional callback function triggered when the notification is closed manually.
 *
 * @returns {JSX.Element | null} The notification component that is displayed if `open` is `true`, otherwise `null`.
 *
 * @example Basic Usage:
 * ```tsx
 * <NotificationContainer
 *   title="Operation Successful"
 *   description="Your data has been saved successfully."
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
      id="modal-container"
      className={`fixed bottom-4 right-4 z-[1000] transition-transform duration-300 ease-in-out transform ${
        open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
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
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
