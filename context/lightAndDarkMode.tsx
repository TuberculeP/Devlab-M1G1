'use client';
import React, { ReactNode, useEffect, useState } from 'react';

type LightAndDarkModeContextType = {
    isDark: boolean,
    setIsDark: (isDark: boolean) => void
}

export const LightAndDarkModeContext = React.createContext<LightAndDarkModeContextType | null>(null);

type LightAndDarkModeType = {
    children: ReactNode
}

export const Context = ({ children }: LightAndDarkModeType) => {

    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark-mode", isDark);
      }, [isDark]);

    useEffect(() => {
        const isDarkStorage = localStorage.getItem("isDark");
        if (isDarkStorage !== null) {
            setIsDark(isDarkStorage === "true");
        }
    }, []);

    return (
        <>

            <LightAndDarkModeContext.Provider value={{ isDark, setIsDark }}>
                <div className={isDark ? "dark-body" : "clear-body"}>
                    {children}
                </div>
            </LightAndDarkModeContext.Provider>
        </>
    )
}