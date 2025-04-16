import React from 'react';
import cx from 'classnames';
import icon from '../assets/icon.svg';
const Icon = React.forwardRef((props, ref) => {
    const { name, color = 'currentColor', size = '1em', strokeWidth = 1, className, onClick, animation, } = props;
    const animationStyle = React.useMemo(() => {
        const baseStyle = {
            display: 'inline-block',
            verticalAlign: 'middle',
        };
        switch (animation) {
            case 'spin':
                return Object.assign(Object.assign({}, baseStyle), { animation: 'spin 1s linear infinite' });
            case 'pulse':
                return Object.assign(Object.assign({}, baseStyle), { animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' });
            case 'bounce':
                return Object.assign(Object.assign({}, baseStyle), { animation: 'bounce 1s infinite' });
            case 'ping':
                return Object.assign(Object.assign({}, baseStyle), { animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' });
            default:
                return baseStyle;
        }
    }, [animation]);
    return (React.createElement("span", Object.assign({ ref: ref, "aria-label": name, className: cx('aspect-square', className, {
            'cursor-pointer': !!onClick,
        }) }, (onClick && { onClick, role: 'button', tabIndex: 0 })),
        React.createElement("svg", { viewBox: "0 0 24 24" // Maintain aspect ratio
            , width: size, height: size, stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style: animationStyle },
            React.createElement("use", { xlinkHref: `${icon}#${name}` })),
        React.createElement("style", null, `
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
        `)));
});
Icon.displayName = 'Icon';
export default Icon;
//# sourceMappingURL=Icon.js.map