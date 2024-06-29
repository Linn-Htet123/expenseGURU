import { sanitizeMoney } from "@/utils/frontend/money";
import { TransactionType } from "@/validations/income-expense";
import { useTab } from "./useTab";
import axiosInstance from "@/lib/axios";
import { HttpStatus } from "@/backend/enums/httpStatus";
import { useCallback, useEffect, useState } from "react";
import { useToastHook } from "./useToastHook";
import { Transaction } from "@/types/transaction";

export const useTransaction = () => {
  const { successToast, errorToast } = useToastHook();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { currentParams } = useTab();

  const fetchTransactions = useCallback(
    async (page = 1) => {
      try {
        const response = await axiosInstance.get(`/transaction?page=${page}`);
        const data = response.data.data.data;
        if (page === 1) {
          setTransactions(data);
        } else {
          setTransactions((prevTransactions) => [...prevTransactions, ...data]);
        }
        setHasMore(data.length > 0);
      } catch (error: any) {
        return errorToast(
          error.response.data.message || error.response.data.error,
        );
      } finally {
        setIsFetching(false);
      }
    },
    [errorToast],
  );

  const fetchMore = async () => {
    setPage((prevPage) => {
      return prevPage + 1;
    });
  };

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
          error.response.data.message || error.response.data.error,
        );
      } finally {
        setLoading(false);
      }
    },
    [currentParams, errorToast, successToast],
  );

  useEffect(() => {
    fetchTransactions(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {
    transactions,
    loading,
    isFetching,
    hasMore,
    page,
    createTransaction,
    fetchMore,
  };
};
