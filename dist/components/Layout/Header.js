import React from 'react';
import { Tag } from '../Displays';
import Breadcrumb from '../Navigations/Breadcrumb';
import HeaderClock from './HeaderClock';
function Header({ breadcrumbs, role }) {
    return (React.createElement("div", { className: "bg-neutral-10 border-b-2 border-neutral-15 box-border h-[72px] fixed top-0 left-0 right-0 z-[1100]" },
        React.createElement("div", { className: "ml-[98px] flex gap-6 px-9 items-center justify-between h-full relative" },
            React.createElement(Breadcrumb, { items: breadcrumbs }),
            role && (React.createElement("div", { className: "absolute left-1/2 -translate-x-1/2" },
                React.createElement(Tag, { color: "info", size: "large" }, role))),
            React.createElement(HeaderClock, null))));
}
export default Header;
//# sourceMappingURL=Header.js.map