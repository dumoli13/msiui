import React from 'react';
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'contained' | 'secondary' | 'outlined' | 'text';
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    loading?: boolean;
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    size?: 'small' | 'default' | 'large';
    title: string;
    titleVerticalAlign?: 'top' | 'bottom';
    titleHorizontalAlign?: 'left' | 'center' | 'right';
}
/**
 *  Icon buttons are commonly found in app bars and toolbars.
 *
 * Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected,
 * such as adding or removing a star to an item.
 */
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default IconButton;
//# sourceMappingURL=IconButton.d.ts.map