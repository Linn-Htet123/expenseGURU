import axios from "axios";
import { Route } from "@/enums/route";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const { status } = await axios.get("/api/auth/logout");
      if (status === 201) {
        router.push(Route.LOGIN);
      }
    } catch (error) {}
  };

  return { logout };
};
