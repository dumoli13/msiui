import React from 'react';
import { Theme } from '../const';
interface LibraryContextType {
    theme: Theme;
    toggleTheme?: () => void;
}
export declare const useMisDesignContext: () => LibraryContextType;
interface MisDesignProviderProps {
    defaultTheme?: Theme;
    theme?: Theme;
    children: React.ReactNode;
}
export declare const MisDesignProvider: ({ defaultTheme, theme: themeProp, children, }: MisDesignProviderProps) => import("react/jsx-runtime").JSX.Element;
export default MisDesignProvider;
//# sourceMappingURL=index.d.ts.map