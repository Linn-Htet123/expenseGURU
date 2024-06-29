import axiosInstance from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";

export const useTotalIncome = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const { errorToast } = useToastHook();
  const fetchTotalIncome = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/transaction/income`);
      const data = response.data.data;
      setTotalIncome(data.income || 0);
    } catch (error: any) {
      return errorToast(
        error.response.data.message || error.response.data.error,
      );
    }
  }, [errorToast]);

  useEffect(() => {
    fetchTotalIncome();
  }, []);

  return { totalIncome };
};
