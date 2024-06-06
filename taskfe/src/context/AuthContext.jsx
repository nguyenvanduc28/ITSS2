import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light')
    const handleChangeMode = (isLight) => {
        if (isLight === true) {
            console.log("light", isLight);
            setMode('light')
        }
        else {
            console.log("DARK", isLight);
            setMode('dark')
        }
    }

    const value = {
        mode,
        handleChangeMode,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}