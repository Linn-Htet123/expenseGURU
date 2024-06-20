import { sanitizeMoney } from "@/utils/frontend/money";
import { TransactionType } from "@/validations/income-expense";
import { useTab } from "./useTab";
import axiosInstance from "@/lib/axios";
import { HttpStatus } from "@/backend/enums/httpStatus";
import { useCallback, useState } from "react";
import { useToastHook } from "./useToastHook";

export const useTransaction = () => {
  const { successToast, errorToast } = useToastHook();
  const [loading, setLoading] = useState<boolean>(false);
  const { currentParams } = useTab();

  const createTransaction = useCallback(
    async (transaction: TransactionType) => {
      try {
        const body = {
          category: transaction.category,
          amount: sanitizeMoney(transaction.amount),
          type: currentParams.toLowerCase(),
        };
        const response = await axiosInstance.post("/transaction", body);
        if (response.data.status === HttpStatus.CREATED) {
          return successToast(response.data.message);
        }
      } catch (error: any) {
        return errorToast(
          error.response.data.message || error.response.data.error
        );
      } finally {
        setLoading(false);
      }
    },
    [currentParams, errorToast, successToast]
  );

  return {
    createTransaction,
  };
};
