import React, { useContext, useState, ReactNode } from "react";

interface UserContextType {
  userID: number;
  username: string;
  email: string;
  setUserID: (id: number) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userID, setUserID] = useState<number>(10);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <UserContext.Provider
      value={{ userID, username, email, setUserID, setUsername, setEmail }}
    >
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
