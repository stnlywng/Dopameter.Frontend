import React, { useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
    userId: number;
    setUserId: (id: number) => void;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number>(10);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
