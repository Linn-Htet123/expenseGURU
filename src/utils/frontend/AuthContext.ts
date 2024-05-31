import { createContext } from "react";
interface User {
  username: string;
  email: string;
}
interface AuthContext {
  setUser: (user: User) => void;
  user: User | undefined;
}

export const AuthContext = createContext<AuthContext>({
  setUser: () => {},
  user: {
    username: "",
    email: "",
  },
});
