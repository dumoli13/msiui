import React from 'react';
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
function EmptyListView({ children }) {
    return (React.createElement("div", { className: "flex flex-col items-center justify-center gap-6 py-24" },
        React.createElement("div", { className: "h-20 w-20 bg-danger-main flex items-center justify-center rounded-full text-neutral-10 text-48px font-semibold" }, "!"),
        React.createElement("div", { className: "text-center" },
            React.createElement("p", { className: "text-24px text-neutral-100/85" }, "You haven't created anything yet"),
            React.createElement("p", { className: "text-14px text-neutral-100/45" }, "Get started by clicking 'Create New'.")),
        children));
}
export default EmptyListView;
//# sourceMappingURL=EmptyListView.js.map