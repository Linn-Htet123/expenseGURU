import axios from "axios";
import { SignInType } from "@/validations/sign-in";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getMobileRoute } from "@/utils/frontend/route";
import { Route } from "@/enums/route";
export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<typeof SignInType>({
    username: "",
    email: "",
  });
  const router = useRouter();
  const setLoggedInUserData = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("/api/auth/me");
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
  const login = async (user: typeof SignInType) => {
    try {
      setLoading(true);
      const { status } = await axios.post("/api/auth/signin", user);
      if (status === 201) {
        await setLoggedInUserData();
        router.push(getMobileRoute(Route.HOME));
      }
    } catch (error: any) {
      toast(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    getLoggedInUserData,
    user,
  };
};
