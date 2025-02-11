import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';
import { Loader } from 'react-feather';

export type ButtonVariant = 'contained' | 'secondary' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: 'small' | 'default' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
/**
 * Button Component
 *
 * visit this link for full documentation:
 * https://www.figma.com/design/JJLvT4QpNhnT2InWV5boVj/QCIS-for-SME---Website?node-id=417-10271&node-type=frame&t=xEPdjGtNP9PPWmjd-0
 *
 * @property {string} props.children - The content to be displayed inside the button.
 * @property {'contained' | 'secondary' | 'outlined' | 'text'} props.variant - The variant of the button.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info'} props.color - The color theme for the button.
 * @property { 'default' | 'large' } [size='default'] - The size of the button, either default or large.
 * @property {string} [className] - Additional custom classes to apply to the button.
 * @property {boolean} [disabled=false] - Whether the button is disabled (non-clickable).
 * @property {boolean} [fullWidth=false] - Whether the button should take up the full width of its container.
 * @property {boolean} [loading=false] - Whether the button should show a loading state.
 * @property {ReactNode} [startIcon] - Icon to be displayed before the button content.
 * @property {ReactNode} [endIcon] - Icon to be displayed after the button content.
 * @property {() => void} [onClick] - Click handler for the button.
 */
const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'default',
  className,
  disabled = false,
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={cx(
        'relative rounded-md font-medium h-fit disabled:cursor-not-allowed',
        {
          'w-full shrink-0': fullWidth,
          'py-4 text-32px px-4': size === 'large',
          'py-2.5 text-24px px-4': size === 'default',
          'py-2.5 text-16px px-2': size === 'small',
          // contained
          'text-neutral-10 focus:ring-3 disabled:border disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow':
            variant === 'contained',
          'bg-primary-main hover:bg-primary-hover active:bg-primary-pressed focus:bg-primary-hover focus:ring-primary-focus':
            color === 'primary' && variant === 'contained',
          'bg-success-main hover:bg-success-hover active:bg-success-pressed focus:bg-success-hover focus:ring-success-focus':
            color === 'success' && variant === 'contained',
          'bg-danger-main hover:bg-danger-hover active:bg-danger-pressed focus:bg-danger-hover focus:ring-danger-focus':
            color === 'danger' && variant === 'contained',
          'bg-warning-main hover:bg-warning-hover active:bg-warning-pressed focus:bg-warning-hover focus:ring-warning-focus':
            color === 'warning' && variant === 'contained',
          'bg-info-main hover:bg-info-hover active:bg-info-pressed focus:bg-info-hover focus:ring-info-surface':
            color === 'info' && variant === 'contained',

          // secondary
          'focus:ring-3 disabled:border disabled:border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow':
            variant === 'secondary',
          'text-primary-main bg-primary-surface hover:text-primary-hover active:text-primary-pressed focus:ring-primary-focus':
            color === 'primary' && variant === 'secondary',
          'text-success-main bg-success-surface hover:text-success-hover active:text-success-pressed focus:ring-success-focus':
            color === 'success' && variant === 'secondary',
          'text-danger-main bg-danger-surface hover:text-danger-hover active:text-danger-pressed focus:ring-danger-focus':
            color === 'danger' && variant === 'secondary',
          'text-warning-main bg-warning-surface hover:text-warning-hover active:text-warning-pressed focus:ring-warning-focus':
            color === 'warning' && variant === 'secondary',
          'text-info-main bg-info-surface hover:text-info-hover active:text-info-pressed focus:ring-info-surface':
            color === 'info' && variant === 'secondary',

          // outlined
          'text-neutral-100 bg-neutral-10 hover:bg-neutral-20 active:bg-neutral-39 border focus:ring-3 border-neutral-40 disabled:text-neutral-60 disabled:bg-neutral-30 drop-shadow':
            variant === 'outlined',
          'focus:ring-primary-focus':
            color === 'primary' && variant === 'outlined',
          'focus:ring-success-focus':
            color === 'success' && variant === 'outlined',
          'focus:ring-danger-focus':
            color === 'danger' && variant === 'outlined',
          'focus:ring-warning-focus':
            color === 'warning' && variant === 'outlined',
          'focus:ring-info-focus': color === 'info' && variant === 'outlined',

          // text
          'focus:ring-3 disabled:text-neutral-60': variant === 'text',
          'text-primary-main hover:text-primary-hover active:text-primary-pressed focus:ring-primary-focus':
            color === 'primary' && variant === 'text',
          'text-success-main hover:text-success-hover active:text-success-pressed focus:ring-success-focus':
            color === 'success' && variant === 'text',
          'text-danger-main hover:text-danger-hover active:text-danger-pressed focus:ring-danger-focus':
            color === 'danger' && variant === 'text',
          'text-warning-main hover:text-warning-hover active:text-warning-pressed focus:ring-warning-focus':
            color === 'warning' && variant === 'text',
          'text-info-main hover:text-info-hover active:text-info-pressed focus:ring-info-focus':
            color === 'info' && variant === 'text',
        },
        className,
      )}
      tabIndex={disabled ? -1 : 0}
    >
      <span
        className={cx('flex justify-center items-center gap-1.5', {
          'min-h-[35px]': size === 'default' || size === 'large',
          invisible: loading,
        })}
      >
        {startIcon}
        {children}
        {endIcon}
      </span>
      {loading && (
        <span className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
          <Loader className="animate-spin" />
        </span>
      )}
    </button>
  );
};

export default Button;
