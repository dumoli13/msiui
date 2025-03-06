/* eslint-disable react/no-array-index-key */
import React from 'react';
import Icon from '../Icon';

export interface StepProps {
  active: number;
  items: Array<{
    title: string;
    description: string;
    error?: boolean;
    success?: boolean;
    available?: boolean;
  }>;
  onChange?: (index: number) => void;
  disabled?: boolean;
}

/**
 * Steps Component
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
 * @returns {JSX.Element} The Steps component that displays the steps and allows navigation between them.
 *
 */

function Steps({ active, items, onChange, disabled = false }: StepProps) {
  const handleChangePage = (index: number) => {
    if (!disabled) {
      onChange?.(index);
    }
  };

  return (
    <div className="flex items-start justify-between gap-4 w-full">
      {items.map((item, index) => {
        return active === index ? (
          // Active Step
          <div key={index} className="flex items-start gap-2 relative flex-1">
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-16px leading-none bg-primary-main text-neutral-10">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h4 className="text-neutral-90 font-black text-24px">
                  {item.title}
                </h4>
                {index < items.length - 1 && (
                  <div className="h-1 w-full flex-1 border-t border-neutral-40" />
                )}
              </div>
              <p className="text-neutral-90 text-14px">{item.description}</p>
            </div>
          </div>
        ) : item.error || item.success ? (
          // Inactive Step but has error or success indicator
          <div
            key={index}
            className={`flex items-start gap-2 relative flex-1 rounded-2xl ${!disabled && item.available ? 'hover:bg-neutral-20 cursor-pointer' : 'cursor-default'}`}
            role="button"
            onClick={() => {
              if (item.available) handleChangePage?.(index);
            }}
          >
            {item.success ? (
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-16px leading-none  border text-primary-main border-primary-main">
                <Icon name="check" size={16} />
              </div>
            ) : (
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-16px leading-none  border text-danger-main border-danger-main">
                <Icon name="x-mark" size={16} />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h4 className="font-black text-24px text-neutral-90">
                  {item.title}
                </h4>
                {index < items.length - 1 && (
                  <div className="h-1 w-full flex-1 border-t border-neutral-40" />
                )}
              </div>
              <p className="text-14px text-neutral-90">{item.description}</p>
            </div>
          </div>
        ) : (
          // Inactive Step
          <div
            key={index}
            className={`flex items-start gap-2 relative flex-1 rounded-2xl ${!disabled && item.available ? 'hover:bg-neutral-20 cursor-pointer' : 'cursor-default'}`}
            role="button"
            onClick={() => {
              if (item.available) handleChangePage?.(index);
            }}
          >
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-16px leading-none  border text-neutral-50 border-neutral-50">
              {index + 1}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h4 className="font-black text-24px text-neutral-50">
                  {item.title}
                </h4>
                {index < items.length - 1 && (
                  <div className="h-1 w-full flex-1 border-t border-neutral-40" />
                )}
              </div>
              <p className="text-14px text-neutral-50">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Steps;
