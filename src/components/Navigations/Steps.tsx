/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';

export interface StepProps {
  active: number;
  items: Array<{
    title: string;
    description?: string;
    error?: boolean;
    success?: boolean;
    available?: boolean;
  }>;
  onChange?: (index: number) => void;
  disabled?: boolean;
}

/**
 *
 * A component that renders a multi-step progress tracker. Each step can represent a process or a task.
 * The component displays the title and description for each step, along with visual indicators for success, error,
 * or default state. It also provides interactivity for navigation between steps, with the ability to disable
 * navigation and indicate whether a step is available or not.
 *
 * @interface StepProps
 * @property {number} active - The index of the currently active step.
 * @property {Array} items - An array of step items, each containing the following properties:
 * @property {function} [onChange] - A callback function triggered when the active step is changed.
 * @property {boolean} [disabled=false] - A flag that disables the ability to change steps.*
 *
 */

function Steps({
  active,
  items,
  onChange,
  disabled = false,
}: Readonly<StepProps>) {
  const handleChangePage = (index: number) => {
    if (!disabled) {
      onChange?.(index);
    }
  };

  return (
    <div className="flex items-start justify-between gap-4 w-full">
      {items.map((item, index) => {
        if (active === index) {
          return (
            <div
              key={index}
              className={cx('flex gap-2 relative flex-1', {
                'items-start': !!item.description,
                'items-center': !item.description,
              })}
            >
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-16px leading-none bg-primary-main dark:bg-primary-main-dark text-neutral-10 dark:text-neutral-10-dark">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h4 className="text-neutral-90 dark:text-neutral-90-dark">
                    {item.title}
                  </h4>
                  {index < items.length - 1 && (
                    <div className="h-1 w-full flex-1 border-t border-neutral-40 dark:border-neutral-40-dark" />
                  )}
                </div>
                <p className="text-neutral-90 dark:text-neutral-90-dark text-14px">
                  {item.description}
                </p>
              </div>
            </div>
          );
        } else if (item.error || item.success) {
          return (
            <div
              key={index}
              className={cx(
                `flex gap-2 relative flex-1 rounded-2xl ${!disabled && item.available ? 'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark cursor-pointer' : 'cursor-default'}`,
                {
                  'items-start': !!item.description,
                  'items-center': !item.description,
                },
              )}
              role="button"
              onClick={() => {
                if (item.available) handleChangePage?.(index);
              }}
            >
              {item.success ? (
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-16px leading-none  border text-primary-main dark:text-primary-main-dark border-primary-main dark:border-primary-main-dark">
                  <Icon name="check" size={16} />
                </div>
              ) : (
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-16px leading-none  border text-danger-main dark:text-danger-main-dark border-danger-main dark:border-danger-main-dark">
                  <Icon name="x-mark" size={16} />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h4 className="text-primary-main dark:text-primary-main-dark">
                    {item.title}
                  </h4>
                  {index < items.length - 1 && (
                    <div className="h-1 w-full flex-1 border-t border-neutral-40 dark:border-neutral-40-dark" />
                  )}
                </div>
                <p
                  className={cx('text-14px', {
                    'text-primary-main dark:text-primary-main-dark': item.error,
                    'text-neutral-50 dark:text-neutral-50-dark': item.success,
                  })}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        } else {
          <div
            key={index}
            className={cx(
              `flex gap-2 relative flex-1 rounded-2xl ${!disabled && item.available ? 'hover:bg-neutral-20 dark:hover:bg-neutral-20-dark cursor-pointer' : 'cursor-default'}`,
              {
                'items-start': !!item.description,
                'items-center': !item.description,
              },
            )}
            role="button"
            onClick={() => {
              if (item.available) handleChangePage?.(index);
            }}
          >
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-16px leading-none  border text-neutral-50 dark:text-neutral-50-dark border-neutral-50 dark:border-neutral-50-dark">
              {index + 1}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h4 className="text-neutral-50 dark:text-neutral-50-dark">
                  {item.title}
                </h4>
                {index < items.length - 1 && (
                  <div className="h-1 w-full flex-1 border-t border-neutral-40 dark:border-neutral-40-dark" />
                )}
              </div>
              <p className="text-14px text-neutral-50 dark:text-neutral-50-dark">
                {item.description}
              </p>
            </div>
          </div>;
        }
      })}
    </div>
  );
}

export default Steps;
