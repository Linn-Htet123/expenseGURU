"use client";
import { useLogin } from "@/hooks/useLogin";
import { AuthContext } from "@/utils/frontend/AuthContext";
import React from "react";
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { getLoggedInUserData } = useLogin();
  console.log(getLoggedInUserData());
  return (
    <AuthContext.Provider value={getLoggedInUserData()}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthWrapper;
