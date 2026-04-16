import React from 'react';
/**
 * To display a toast message at the bottom right of the screen.
 */
export declare const useToast: () => (toast: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    color?: "primary" | "success" | "danger" | "warning" | "info" | "neutral";
}) => void;
export declare const ToastStack: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map