import React from 'react';

export interface EmptyListViewProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

/**
 *
 * This component provides a styled placeholder view for empty states, such as when a list or collection has no data.
 *
 * @interface EmptyListViewProps
 * @property {ReactNode} [children] - Optional child components or elements to display below the default content.
 *
 */

function EmptyListView({ title, description, children }: EmptyListViewProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <div className="h-20 w-20 bg-danger-main dark:bg-danger-main-dark flex items-center justify-center rounded-full text-neutral-10 text-48px font-semibold">
        !
      </div>
      <div className="text-center">
        <p className="text-24px text-neutral-100/85 dark:text-neutral-100-dark/85">
          {title}
        </p>
        <p className="text-14px  text-neutral-100/45 dark:text-neutral-100-dark/45">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

export default EmptyListView;
