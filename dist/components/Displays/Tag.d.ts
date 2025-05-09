export interface TagProps {
    className?: string;
    children: string;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
    size?: 'small' | 'default' | 'large';
    onRemove?: () => void;
}
/**
 *
 * @property {string} [props.className] - Additional class names to apply to the tag.
 * @property {string} props.children - The content to be displayed inside the tag.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info'} props.color - The color theme for the tag
 *
 */
declare function Tag({ className, children, color, size, onRemove, }: Readonly<TagProps>): import("react/jsx-runtime").JSX.Element;
export default Tag;
//# sourceMappingURL=Tag.d.ts.map