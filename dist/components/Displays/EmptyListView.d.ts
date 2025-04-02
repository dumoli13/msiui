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
declare function EmptyListView({ title, description, children }: EmptyListViewProps): React.JSX.Element;
export default EmptyListView;
//# sourceMappingURL=EmptyListView.d.ts.map