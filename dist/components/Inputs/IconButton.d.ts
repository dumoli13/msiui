import { ButtonHTMLAttributes, JSXElementConstructor, ReactElement } from 'react';
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'contained' | 'secondary' | 'outlined' | 'text';
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    loading?: boolean;
    icon?: ReactElement<any, string | JSXElementConstructor<any>>;
    size?: 'small' | 'default' | 'large';
    title: string;
    titleVerticalAlign?: 'top' | 'bottom';
    titleHorizontalAlign?: 'left' | 'center' | 'right';
}
/**
 * @property {'contained' | 'secondary' | 'outlined' | 'text'} props.variant - The variant of the button.
 * @property {'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'} props.color - The color theme for the button.
 * @property {boolean} [loading=false] - A flag to display loading state if set to true.
 * @property {ReactNode} [icon] - Icon to be displayed inside the button.
 * @property {IconButtonProps} props - The properties for the IconButton component.
 * @property {string} [className] - Additional class names to apply to the button.
 * @property {boolean} [disabled=false] - A flag that disables input field if set to true.
 * @property {() => void} [onClick] - Callback function to handle click events.
 * @property {string} [ariaLabel] - Aria-label for accessibility.
 * @property {'small' | 'default' | 'large'} [size='default'] - The size of the button.
 * @property {string} title - The title text for the button.
 * @property {'top' | 'bottom'} [titleVerticalAlign] - Vertical alignment for the title.
 * @property {'left' | 'center' | 'right'} [titleHoridzontalAlign] - Horizontal alignment for the title.
 */
declare const IconButton: ({ variant, color, className, disabled, loading, icon, size, onClick, title, titleVerticalAlign, titleHorizontalAlign, ...props }: IconButtonProps) => import("react/jsx-runtime").JSX.Element;
export default IconButton;
//# sourceMappingURL=IconButton.d.ts.map