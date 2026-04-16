import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Icon from '../Icon';
import { Portal } from '../Portal';
import ToastContainer from './ToastContainer';
let addToastToStack = null;
/**
 * To display a toast message at the bottom right of the screen.
 */
export const useToast = () => {
    return (toast) => {
        if (addToastToStack) {
            addToastToStack({
                id: crypto.randomUUID(),
                color: toast.color ?? 'neutral',
                ...toast,
            });
        }
    };
};
export const ToastStack = () => {
    const [toasts, setToasts] = React.useState([]);
    React.useEffect(() => {
        addToastToStack = (newToast) => {
            setToasts((prev) => [...prev, newToast]);
        };
        return () => {
            addToastToStack = null;
        };
    }, []);
    const handleChangeToasts = (toast) => {
        setToasts((prev) => prev.filter((n) => n.id !== toast.id));
    };
    return (_jsx(Portal, { children: _jsx("div", { className: "fixed top-6 right-6 z-[1500] space-y-4", children: toasts.map((toast) => {
                let icon;
                switch (toast.color) {
                    case 'info':
                        icon = (_jsx(Icon, { name: "information-circle", variant: "solid", size: 24, className: "shrink-0" }));
                        break;
                    case 'warning':
                    case 'danger':
                        icon = (_jsx(Icon, { name: "alert-triangle", variant: "solid", size: 24, className: "shrink-0" }));
                        break;
                    case 'success':
                        icon = (_jsx(Icon, { name: "check-circle", variant: "solid", size: 24, className: "shrink-0" }));
                        break;
                    default:
                        icon = toast.icon;
                }
                return (_jsx(ToastContainer, { open: true, title: toast.title, description: toast.description, color: toast.color, icon: icon, onClose: () => handleChangeToasts(toast) }, toast.id));
            }) }) }));
};
