import { Route } from "@/enums/route";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useToastHook } from "./useToastHook";
import { HttpStatus } from "@/backend/enums/httpStatus";
import { getRelevantRoute } from "@/utils/frontend/route";
import { useLogin } from "./useLogin";

export const useLogout = () => {
  const { errorToast } = useToastHook();
  const router = useRouter();
  const { removeLoggedInUserData } = useLogin();

  const logout = async () => {
    try {
      const { status } = await axiosInstance.get("/auth/logout");
      if (status === HttpStatus.CREATED) {
        removeLoggedInUserData();
        router.push(getRelevantRoute(Route.LOGIN));
      }
    } catch (error: any) {
      return errorToast(
        error.response.data.message || error.response.data.error,
      );
    }
  };

  return { logout };
};
