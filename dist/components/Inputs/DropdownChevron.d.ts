interface DropdownChevronProps {
    open: boolean;
    disabled?: boolean;
    onClick: () => void;
}
/**
 * Animated chevron button used by dropdown-style inputs (Select, AutoComplete, etc.).
 * Renders a plain icon when disabled; a focusable button otherwise.
 * Not exported from the library index.
 */
declare function DropdownChevron({ open, disabled, onClick, }: Readonly<DropdownChevronProps>): import("react/jsx-runtime").JSX.Element;
export default DropdownChevron;
//# sourceMappingURL=DropdownChevron.d.ts.map