import React, { forwardRef } from 'react';
import cx from 'classnames';
import COLORS from '../libs/color';
const Icon = forwardRef((props, ref) => {
    const { 
    // name,
    variant = 'outline', color = COLORS.neutral['90'], size = 24, strokeWidth = 2, className, onClick, } = props;
    return (React.createElement("span", { onClick: onClick, className: cx({ 'cursor-pointer': !!onClick }, className), ref: ref },
        React.createElement("svg", { width: size, height: size, stroke: color, strokeWidth: strokeWidth },
            React.createElement("use", { href: `/${name}.svg#${variant}` }))));
});
export default Icon;
//# sourceMappingURL=Icon.js.map