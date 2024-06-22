import { SignUpUserType } from "@/validations/signup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/enums/route";
import { getRelevantRoute } from "@/utils/frontend/route";
import { useToastHook } from "./useToastHook";
import axiosInstance from "@/lib/axios";
import { HttpStatus } from "@/backend/enums/httpStatus";

export const useSignup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { errorToast } = useToastHook();
  const signup = async (user: Omit<SignUpUserType, "confirmPassword">) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post("/auth/signup", user);
      if (status === HttpStatus.CREATED) {
        setLoading(false);
        router.push(getRelevantRoute(Route.LOGIN));
      }
    } catch (error: any) {
      setLoading(false);
      return errorToast(
        error.response.data.message || error.response.data.error
      );
    }
  };

  return { signup, loading };
};
