import { User } from "@/hooks/useLogin";
import { createContext } from "react";

interface AuthContext {
  isLoggedIn: boolean;
  authUser: User;
  setAuthUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContext>({
  isLoggedIn: false,
  authUser: { email: "", username: "" },
  setAuthUser: () => {},
});
