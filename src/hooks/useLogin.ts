import axios from "axios";
import { SignInType } from "@/validations/sign-in";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/enums/route";
export const useLogin = () => {
  const { toast } = useToast();
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
  const login = async (user: SignInType) => {
    try {
      setLoading(true);
      const { status } = await axios.post("/api/auth/signin", user);
      if (status === 201) {
        await setLoggedInUserData();
        router.push(Route.HOME);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
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
