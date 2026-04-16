import cx from 'classnames';
import type { ChipProps } from '../../types/displays/Chip';
import Icon from '../Icon';

function Chip({
  className,
  children,
  color = 'primary',
  size = 'default',
  startIcon,
  endIcon,
  onRemove,
}: Readonly<ChipProps>) {
  return (
    <div
      className={cx(
        'border-box truncate flex items-center justify-center w-fit px-2 py-1.5 rounded-lg font-medium',
        {
          'text-primary-main dark:text-primary-main-dark bg-primary-surface dark:bg-primary-surface-dark':
            color === 'primary',
          'text-neutral-90 dark:text-neutral-90-dark bg-neutral-15 dark:bg-neutral-15-dark':
            color === 'neutral',

          'text-12px': size === 'small',
          'text-14px': size === 'default',
          'text-16px leading-5': size === 'large',
        },
        className,
      )}
    >
      {startIcon}
      <div className="px-1">{children}</div>
      {endIcon}
      {onRemove && (
        <Icon
          name="x-mark"
          size={12}
          onClick={onRemove}
          className="cursor-pointer ml-1"
        />
      )}
    </div>
  );
}

export default Chip;
