'use client';

import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react';

type ThemeType = 'light' | 'dark';
type ThemeContextProps = {
    theme: ThemeType;
    setTheme: Dispatch<SetStateAction<ThemeType>>;
};
type ThemeContextProviderProps = {
    children: ReactNode;
};

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    setTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({
    children,
}: ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<ThemeType>('light');

    return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
