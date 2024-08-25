import React, { useContext, useState, ReactNode, useEffect } from "react";

interface loginContextType {
    isOpen: boolean;
    setLoginOpen: (isOpen: boolean) => void;
}

const LoginContext = React.createContext<loginContextType>(
    {} as loginContextType
);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setLoginOpen] = useState<boolean>(false);

    return (
        <LoginContext.Provider value={{ isOpen, setLoginOpen }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = (): loginContextType => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
};
