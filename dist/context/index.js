import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { NotificationStack } from '../components/Notification';
import { Theme } from '../const';
const LibraryContext = React.createContext(undefined);
export const useMisDesignContext = () => {
    const context = React.useContext(LibraryContext);
    if (context === undefined) {
        // throw new Error('UseContext must be used within a LibraryContext');
        const theme = document.documentElement.classList.contains('dark')
            ? Theme.DARK
            : Theme.LIGHT;
        return {
            theme,
        };
    }
    return context;
};
export const MisDesignProvider = ({ defaultTheme = Theme.LIGHT, theme: themeProp, children, }) => {
    const [isDarkMode, setIsDarkMode] = React.useState(() => {
        if (themeProp)
            return themeProp === Theme.DARK;
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme === 'dark';
        }
        // return window.matchMedia('(prefers-color-scheme: dark)').matches;
        return defaultTheme === Theme.DARK;
    });
    React.useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
    React.useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    setIsDarkMode(isDark);
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                }
            }
        });
        observer.observe(document.documentElement, {
            attributes: true,
        });
        return () => observer.disconnect();
    }, []);
    const value = React.useMemo(() => ({
        theme: isDarkMode ? Theme.DARK : Theme.LIGHT,
        toggleTheme: () => setIsDarkMode((prev) => !prev),
    }), [isDarkMode]);
    return (_jsxs(LibraryContext.Provider, { value: value, children: [children, _jsx(NotificationStack, {})] }));
};
export default MisDesignProvider;
