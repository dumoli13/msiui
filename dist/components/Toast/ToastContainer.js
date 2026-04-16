import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
const ToastContainer = ({ open, title, description, icon, color = 'neutral', duration = 5000, onClose, }) => {
    const [visible, setVisible] = React.useState(open);
    const [progressWidth, setProgressWidth] = React.useState(100);
    const timerRef = React.useRef(null);
    const intervalRef = React.useRef(null);
    const decrementInterval = 10;
    const decrementRate = 100 / (duration / decrementInterval);
    const [animateIn, setAnimateIn] = React.useState(false);
    React.useEffect(() => {
        if (open) {
            setVisible(true);
            setProgressWidth(100);
            setAnimateIn(false);
            requestAnimationFrame(() => setAnimateIn(true));
            startProgress();
            timerRef.current = setTimeout(() => {
                handleClose();
            }, duration);
        }
        return () => {
            clearTimeout(timerRef.current ?? undefined);
            clearInterval(intervalRef.current ?? undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- startProgress and handleClose use refs; duration is stable for the lifetime of this instance
    }, [open]);
    const startProgress = () => {
        intervalRef.current = setInterval(() => {
            setProgressWidth((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalRef.current ?? undefined);
                    return 0;
                }
                return Math.max(prev - decrementRate, 0);
            });
        }, decrementInterval);
    };
    const handleMouseEnter = () => {
        clearInterval(intervalRef.current ?? undefined);
        clearTimeout(timerRef.current ?? undefined);
    };
    const handleMouseLeave = () => {
        startProgress();
        timerRef.current = setTimeout(() => {
            handleClose();
        }, duration * (progressWidth / 100));
    };
    const handleClose = () => {
        setAnimateIn(false);
        setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, 300);
    };
    if (!visible)
        return null;
    return (_jsxs("div", { role: "none", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: cx('relative p-4 flex items-start gap-4 rounded-md shadow-box-2 max-w-[420px] overflow-hidden transition-all duration-300 ease-out', {
            'translate-x-0 opacity-100': animateIn,
            'translate-x-full opacity-0': !animateIn,
            'bg-neutral-10 text-neutral-90 dark:bg-neutral-10-dark dark:text-neutral-90-dark': color === 'neutral',
            'bg-success-surface text-success-main dark:bg-success-surface-dark dark:text-success-main-dark': color === 'success',
            'bg-danger-surface text-danger-main dark:bg-danger-surface dark:text-danger-main-dark': color === 'danger',
            'bg-warning-surface text-warning-main dark:bg-warning-surface-dark dark:text-warning-main-dark': color === 'warning',
            'bg-info-surface text-info-main dark:bg-info-surface-dark dark:text-info-main-dark': color === 'info',
            'bg-primary-surface text-primary-main dark:bg-primary-surface-dark dark:text-primary-main-dark': color === 'primary',
        }), children: [icon, _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-semibold text-16px mb-1 break-words", children: title }), !!description && (_jsx("p", { className: "text-14px break-words", children: description }))] }), _jsx("div", { className: "shrink-0", children: _jsx(Icon, { name: "x-mark", size: 16, strokeWidth: 2, className: "p-1 rounded-full hover:bg-neutral-30 dark:hover:bg-neutral-30-dark text-neutral-70 dark:text-neutral-70-dark transition-color cursor-pointer", onClick: handleClose }) })] }));
};
export default ToastContainer;
