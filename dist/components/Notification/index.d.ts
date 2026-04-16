import React from 'react';
/**
 * To display a notification message at the bottom right of the screen.
 */
export declare const useNotification: () => (notification: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    color?: "primary" | "success" | "danger" | "warning" | "info" | "neutral";
}) => void;
export declare const NotificationStack: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map