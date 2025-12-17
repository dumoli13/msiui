import React from 'react';
export interface NotificationProps {
    id: string;
    title: string;
    description: string;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    duration?: number;
    icon?: React.ReactNode;
}
/**
 * To display a notification message at the bottom right of the screen.
 */
export declare const useNotification: () => (notification: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    color?: "primary" | "success" | "danger" | "warning" | "info";
}) => void;
export declare const NotificationStack: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map