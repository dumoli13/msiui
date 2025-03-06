import React, { forwardRef } from 'react';
import cx from 'classnames';
import icon from '../assets/icon.svg';
const Icon = forwardRef((props, ref) => {
    const { name, color = 'currentColor', size = 24, strokeWidth = 1, className, onClick, } = props;
    return (React.createElement("span", Object.assign({ ref: ref, "aria-label": name, className: cx({ 'cursor-pointer': !!onClick }, className) }, (onClick && { onClick, role: 'button', tabIndex: 0 })),
        React.createElement("svg", { width: size, height: size, stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("use", { xlinkHref: `${icon}#${name}` }))));
});
Icon.displayName = 'Icon';
export default Icon;
//# sourceMappingURL=Icon.js.map