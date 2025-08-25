import type { User } from "@/types/user";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userState, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");

    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("auth-user");
      }
    }
  }, []);

  const setUser = (newUser: User) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("auth-user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("auth-user");
    }
  };

  return (
    <AuthContext.Provider value={{ user: userState, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
