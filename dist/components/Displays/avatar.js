import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import cx from 'classnames';
import Icon from '../Icon';
const Avatar = ({ name, src, size = 64, className, onClick, ...props }) => {
    const [imgError, setImgError] = useState(false);
    const initials = useMemo(() => {
        if (!name)
            return null;
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length === 1) {
            return parts[0][0].toUpperCase();
        }
        return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
    }, [name]);
    const showImage = src && !imgError;
    const showInitials = !showImage && initials;
    let avatarContent;
    if (showImage) {
        avatarContent = (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- onError is not interactive
        _jsx("img", { src: src, alt: name ?? 'avatar', className: "w-full h-full object-cover object-center", onError: () => setImgError(true) }));
    }
    else if (showInitials) {
        avatarContent = (_jsx("span", { className: "font-semibold text-primary-main", style: { fontSize: 0.4 * size }, children: initials }));
    }
    else {
        avatarContent = (_jsx("span", { className: "text-primary-main", children: _jsx(Icon, { name: "user", color: "currentColor", strokeWidth: 2, size: 0.6 * size }) }));
    }
    return (
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex -- role and tabIndex are conditional on onClick */
    _jsx("div", { ...props, role: onClick ? 'button' : undefined, onClick: onClick, style: { width: size, height: size }, tabIndex: onClick ? 0 : undefined, className: cx('rounded-full overflow-hidden flex items-center justify-center bg-primary-surface select-none', 'focus:outline-none focus:ring-3 focus:ring-primary-focus active:scale-95', className), children: avatarContent }));
};
export default Avatar;
