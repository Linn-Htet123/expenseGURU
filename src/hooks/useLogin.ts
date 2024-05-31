import axios from "axios";
import { SignInType } from "@/validations/sign-in";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { AuthContext } from "@/utils/frontend/AuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState();
  // const { setUser } = useContext(AuthContext);
  const setLoggedInUserData = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("/api/auth/me");
      const userData = {
        username: data.username,
        email: data.email,
      };
      console.log(data);
      localStorage.setItem("userData", JSON.stringify(userData));
      // setUser(userData);
      console.log(userData);
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
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const login = async (user: typeof SignInType) => {
    try {
      setLoading(true);
      const { status } = await axios.post("/api/auth/signin", user);
      if (status === 201) {
        await setLoggedInUserData();
      }
    } catch (error: any) {
      toast(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUpdatedAuthUser = () => {
    setUser(getLoggedInUserData);
  };
  return {
    login,
    loading,
    getLoggedInUserData,
    user,
    getUpdatedAuthUser,
    setUser,
  };
};
