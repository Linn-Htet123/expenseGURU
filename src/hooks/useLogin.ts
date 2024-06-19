import { SignInType } from "@/validations/sign-in";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { Route } from "@/enums/route";
import { useToastHook } from "./useToastHook";
import { HttpStatus } from "@/backend/enums/httpStatus";
import { getMobileRoute, isMobile } from "@/utils/frontend/route";
export const useLogin = () => {
  const { errorToast } = useToastHook();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [user, setUser] = useState<{ username: ""; email: "" }>({
    username: "",
    email: "",
  });
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
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (user: SignInType) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post("/auth/signin", user);
      if (status === HttpStatus.CREATED) {
        await setLoggedInUserData();
        router.push(isMobile() ? getMobileRoute(Route.HOME) : Route.HOME);
      }
    } catch (error: any) {
      return errorToast(
        error.response.data.message || error.response.data.error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoggedInUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    login,
    loading,
    user,
  };
};
