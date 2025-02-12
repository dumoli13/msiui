import React from 'react';
interface TagProps {
    className?: string;
    children: string;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
    size?: 'default' | 'large';
    onRemove?: () => void;
}
/**
 * Tag Component
 *
 * visit this link for full documentation:
 * https://www.figma.com/design/JJLvT4QpNhnT2InWV5boVj/SME'-Website?node-id=416-3124&node-type=frame&t=dgTCEUBbfJ6leKHY-0
 *
 * @property {string} [props.className] - Additional class names to apply to the tag.
 * @property {string} props.children - The content to be displayed inside the tag.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info'} props.color - The color theme for the tag.
 */
declare function Tag({ className, children, color, size, onRemove, }: TagProps): React.JSX.Element;
export default Tag;
