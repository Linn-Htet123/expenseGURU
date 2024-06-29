"use client";

import { User, useLogin } from "@/hooks/useLogin";
import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<User>({ username: "", email: "" });

  const { getLoggedInUserData, isLoggedIn } = useLogin();

  const memoedValue = useMemo(
    () => ({ isLoggedIn, authUser, setAuthUser }),
    [authUser, isLoggedIn],
  );

  useEffect(() => {
    const user = getLoggedInUserData();
    if (user) {
      setAuthUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
