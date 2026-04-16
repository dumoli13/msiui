import cx from 'classnames';
import type { AlertProps } from '../../types/displays/alert';
import Icon from '../Icon';

function Alert({
  className,
  children,
  color = 'primary',
  startIcon,
  onRemove,
}: Readonly<AlertProps>) {
  return (
    <div
      className={cx(
        'ring-[1.5px] flex items-start text-14px justify-between w-full p-4 rounded-lg font-medium',
        {
          'ring-primary-border dark:ring-primary-border-dark text-primary-main dark:text-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark':
            color === 'primary',
          'ring-danger-border dark:ring-danger-border-dark text-danger-main dark:text-danger-pressed-dark bg-danger-surface dark:bg-danger-surface-dark':
            color === 'danger',
          'ring-warning-border dark:ring-warning-border-dark text-warning-main dark:text-warning-pressed-dark bg-warning-surface dark:bg-warning-surface-dark':
            color === 'warning',
          'ring-success-border dark:ring-success-border-dark text-success-main dark:text-success-pressed-dark bg-success-surface dark:bg-success-surface-dark':
            color === 'success',
          'ring-info-border dark:ring-info-border-dark text-info-main dark:text-info-main-dark bg-info-surface dark:bg-info-surface-dark':
            color === 'info',
          'ring-neutral-60 dark:ring-neutral-60-dark text-neutral-80 dark:text-neutral-80-dark bg-neutral-15 dark:bg-neutral-15-dark':
            color === 'neutral',
        },
        className,
      )}
    >
      <div className="flex items-start  gap-3 flex-1">
        <div className="mt-1">{startIcon}</div>
        <div className="flex-1 text-justify">{children}</div>
      </div>

      {onRemove && (
        <Icon
          name="x-mark"
          size={16}
          strokeWidth={1.5}
          onClick={onRemove}
          className="cursor-pointer shrink-0 text-neutral-90 mt-1"
        />
      )}
    </div>
  );
}

export default Alert;
