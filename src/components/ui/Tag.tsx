import cx from 'classnames';
import { X } from 'react-feather';

interface TagProps {
  className?: string;
  children: string;
  color: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  size?: 'default' | 'large';
  onRemove?: () => void;
}

/**
 * Tag Component
 *
 * visit this link for full documentation:
 * https://www.figma.com/design/JJLvT4QpNhnT2InWV5boVj/SME'-Website?node-id=416-3124&node-type=frame&t=dgTCEUBbfJ6leKHY-0
 *
 * @property {string} [props.className] - Additional class names to apply to the tag.
 * @property {string} props.children - The content to be displayed inside the tag.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info'} props.color - The color theme for the tag.
 */
function Tag({
  className,
  children,
  color,
  size = 'default',
  onRemove,
}: TagProps) {
  return (
    <div
      className={cx(
        'ring-[1.5px] border-box truncate flex items-center justify-center w-fit py-1.5 px-3 rounded-lg font-medium',
        {
          'ring-primary-border text-primary-main bg-primary-surface':
            color === 'primary',
          'ring-danger-border text-danger-pressed bg-danger-surface':
            color === 'danger',
          'ring-warning-border text-warning-pressed bg-warning-surface':
            color === 'warning',
          'ring-success-border text-success-pressed bg-success-surface':
            color === 'success',
          'ring-info-border text-info-main bg-info-surface': color === 'info',
          'ring-neutral-40 text-neutral-80 bg-neutral-15': color === 'neutral',
          'text-12px': size === 'default',
          'text-18px': size === 'large',
        },
        className,
      )}
    >
      {children}
      {onRemove && (
        <X
          width={12}
          height={12}
          onClick={onRemove}
          className="cursor-pointer ml-1"
        />
      )}
    </div>
  );
}

export default Tag;
