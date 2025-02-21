import React, { forwardRef } from 'react';
import cx from 'classnames';
import COLORS from '../libs/color';
const Icon = forwardRef((props, ref) => {
    const { name, color = COLORS.neutral[100], size = 24, strokeWidth = 1, className, onClick, } = props;
    return (React.createElement("span", Object.assign({ ref: ref, "aria-label": name, className: cx({ 'cursor-pointer': !!onClick }, className) }, (onClick && { onClick, role: 'button', tabIndex: 0 })),
        React.createElement("svg", { width: size, height: size, stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("use", { xlinkHref: `/icons/icon.svg#${name}` }))));
});
Icon.displayName = 'Icon';
export default Icon;
//# sourceMappingURL=Icon.js.map