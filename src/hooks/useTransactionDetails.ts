import axiosInstance from "@/lib/axios";
import { useCallback, useState } from "react";
import { useToastHook } from "./useToastHook";
interface Category {
  _id: string;
  type: string;
  amount: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const useTransactionDetails = () => {
  const [transactionDetails, setTransactionDetails] = useState<Category>({
    _id: "",
    type: "",
    amount: 0,
    category: "",
    createdAt: "",
    updatedAt: "",
  });
  const { errorToast } = useToastHook();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const fetchTransactionDetails = useCallback(
    async (id: string) => {
      try {
        const response = await axiosInstance.get(`/transaction/${id}`);
        const data = response.data.data;

        setTransactionDetails(data);
      } catch (error: any) {
        return errorToast(
          error.response.data.message || error.response.data.error
        );
      } finally {
        setIsFetching(false);
      }
    },
    [errorToast]
  );

  return {
    transactionDetails,
    isFetching,
    fetchTransactionDetails,
  };
};
