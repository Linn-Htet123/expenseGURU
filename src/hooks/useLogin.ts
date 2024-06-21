import { SignInType } from "@/validations/sign-in";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { Route } from "@/enums/route";
import { useToastHook } from "./useToastHook";
import { HttpStatus } from "@/backend/enums/httpStatus";
import { getRelevantRoute } from "@/utils/frontend/route";
import { AuthContext } from "@/components/context/AuthContext";

export interface User {
  username: string;
  email: string;
}

export const useLogin = () => {
  const { errorToast } = useToastHook();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const setLoggedInUserData = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get("/auth/me");
      const userData = {
        username: data.username,
        email: data.email,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      setAuthUser(userData);
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getLoggedInUserData = () => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        setIsLoggedIn(true);
        return JSON.parse(userData);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const removeLoggedInUserData = () => {
    setIsLoggedIn(false);
    setAuthUser({ username: "", email: "" });
    localStorage.removeItem("userData");
  };

  const login = async (user: SignInType) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post("/auth/signin", user);
      if (status === HttpStatus.CREATED) {
        await setLoggedInUserData();
        setIsLoggedIn(true);
        router.push(getRelevantRoute(Route.HOME));
      }
    } catch (error: any) {
      setLoading(false);
      return errorToast(
        error.response.data.message || error.response.data.error
      );
    }
  };

  return {
    login,
    loading,
    authUser,
    isLoggedIn,
    getLoggedInUserData,
    removeLoggedInUserData,
  };
};
