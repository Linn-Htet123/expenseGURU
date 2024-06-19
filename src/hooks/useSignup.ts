import { SignUpUserType } from "@/validations/signup";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Route } from "@/enums/route";
import { getMobileRoute, isMobile } from "@/utils/frontend/route";
export const useSignup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const signup = async (user: Omit<SignUpUserType, "confirmPassword">) => {
    try {
      setLoading(true);
      const { status } = await axios.post("/api/auth/signup", user);
      if (status === 201) {
        setLoading(false);
        router.push(isMobile() ? getMobileRoute(Route.LOGIN) : Route.LOGIN);
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

  return { signup, loading };
};
