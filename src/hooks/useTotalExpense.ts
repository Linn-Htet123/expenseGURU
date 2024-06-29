import axiosInstance from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";

export const useTotalExpense = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const { errorToast } = useToastHook();
  const fetchTotalExpense = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/transaction/expense`);
      const data = response.data.data;
      setTotalExpense(data.expense || 0);
    } catch (error: any) {
      return errorToast(
        error.response.data.message || error.response.data.error,
      );
    }
  }, [errorToast]);

  useEffect(() => {
    fetchTotalExpense();
  }, []);

  return { totalExpense };
};
