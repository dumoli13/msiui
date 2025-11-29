import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import iconFilled from '../assets/icon-filled.svg';
import iconOutline from '../assets/icon-outline.svg';
/**
 * ready-to-use icons from the MisDesign icon library
 */
const Icon = React.forwardRef((props, ref) => {
    const { name, color = 'currentColor', fillColor = color, size = '1em', variant = 'outline', strokeWidth = variant === 'outline' ? 1 : 0, className, onClick, disabled = false, animation, } = props;
    const animationStyle = React.useMemo(() => {
        const baseStyle = {
            display: 'block',
            verticalAlign: 'middle',
        };
        switch (animation) {
            case 'spin':
                return { ...baseStyle, animation: 'spin 1s linear infinite' };
            case 'pulse':
                return {
                    ...baseStyle,
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                };
            case 'bounce':
                return { ...baseStyle, animation: 'bounce 1s infinite' };
            case 'ping':
                return {
                    ...baseStyle,
                    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                };
            default:
                return baseStyle;
        }
    }, [animation]);
    return (_jsxs("span", { ref: ref, "aria-label": name, className: cx('flex items-center justify-center', className, {
            'cursor-pointer': !!onClick && !disabled,
        }), ...(onClick && !disabled && { onClick, role: 'button', tabIndex: 0 }), children: [_jsx("svg", { width: size, height: size, stroke: color, fill: variant === 'solid' ? fillColor : 'none', strokeWidth: variant === 'outline' && strokeWidth === 0 ? 1 : strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style: animationStyle, "aria-hidden": "true", children: _jsx("use", { xlinkHref: `${variant === 'outline' ? iconOutline : iconFilled}#${name}` }) }), _jsx("style", { children: `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
            50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
          }
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        ` })] }));
});
Icon.displayName = 'Icon';
export default Icon;
