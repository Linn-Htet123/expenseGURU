import axios from "axios";
import { SignInType } from "@/validations/sign-in";
export const useLogin = () => {
  const login = async (user: typeof SignInType) => {
    console.log(user);
    const response = await axios.post("/api/auth/signin", user);
    // console.log(response);
  };
  return { login };
};
