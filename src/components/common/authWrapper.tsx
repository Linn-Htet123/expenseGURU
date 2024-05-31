"use client";
import { useLogin } from "@/hooks/useLogin";
import { AuthContext } from "@/utils/frontend/AuthContext";
import React, { useEffect } from "react";
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { getUpdatedAuthUser, user, setUser } = useLogin();
  useEffect(() => {
    getUpdatedAuthUser();
  }, []);

  useEffect(() => {
    setUser(user || undefined);
  }, [user]);

  return <AuthContext.Provider value={user!}>{children}</AuthContext.Provider>;
};
export default AuthWrapper;
