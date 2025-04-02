import React from 'react';
export interface NotificationProps {
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}
export declare const useNotification: () => (notification: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    color?: "primary" | "success" | "danger" | "warning" | "info";
}) => void;
export declare const NotificationProvider: ({ children, }: {
    children: React.ReactNode;
}) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map