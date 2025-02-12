import React from 'react';
import { ReactNode } from 'react';
interface EmptyListViewProps {
    children?: ReactNode;
}
/**
 * EmptyListView Component
 *
 * This component provides a styled placeholder view for empty states, such as when a list or collection has no data.
 *
 * @interface EmptyListViewProps
 * @property {ReactNode} [children] - Optional child components or elements to display below the default content.
 *
 * @example Basic Usage:
 * ```tsx
 * import EmptyListView from './EmptyListView';
 *
 * const MyComponent = () => (
 *   <EmptyListView>
 *     <button className="btn-primary">Create New</button>
 *   </EmptyListView>
 * );
 * ```
 *
 * @property {EmptyListViewProps} props - The props for the EmptyListView component.
 * @returns {JSX.Element} A placeholder view for empty states.
 */
declare function EmptyListView({ children }: EmptyListViewProps): React.JSX.Element;
export default EmptyListView;
