'use client';

import { useThemeContext } from '@/components/context/ThemeContextProvider/ThemeContextProvider';

export const Header = () => {
    const { theme, setTheme } = useThemeContext();
    return (
        <header
            className={`flex justify-between ${theme === 'light' ? 'bg-white' : ''}`}
        >
            <h4>Header</h4>
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light');
                }}
            />
        </header>
    );
};
