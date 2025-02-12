import React from 'react';
import COLORS from '../../libs/color';
const LoaderIcon = ({ color = COLORS.neutral['90'], size = 24, strokeWidth = 2, className, }) => {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: `0 0 24 24`, strokeWidth: strokeWidth, stroke: color, width: size, height: size, className: className },
        React.createElement("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
        React.createElement("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
        React.createElement("line", { x1: "4.93", y1: "4.93", x2: "7.76", y2: "7.76" }),
        React.createElement("line", { x1: "16.24", y1: "16.24", x2: "19.07", y2: "19.07" }),
        React.createElement("line", { x1: "2", y1: "12", x2: "6", y2: "12" }),
        React.createElement("line", { x1: "18", y1: "12", x2: "22", y2: "12" }),
        React.createElement("line", { x1: "4.93", y1: "19.07", x2: "7.76", y2: "16.24" }),
        React.createElement("line", { x1: "16.24", y1: "7.76", x2: "19.07", y2: "4.93" })));
};
export default LoaderIcon;
//# sourceMappingURL=LoaderIcon.js.map