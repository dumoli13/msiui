import React from 'react';
import { ReactNode } from 'react';
export interface EmptyListViewProps {
    children?: ReactNode;
}
/**
 * This component provides a styled placeholder view for empty states, such as when a list or collection has no data.
 *
 * @interface EmptyListViewProps
 * @property {ReactNode} [children] - Optional child components or elements to display below the default content.
 *
 */
declare function EmptyListView({ children }: EmptyListViewProps): React.JSX.Element;
export default EmptyListView;
