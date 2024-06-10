import { sanitizeMoney } from "@/utils/frontend/money";
import { TransactionType } from "@/validations/income-expense";
import { useTab } from "./useTab";

export const useTransaction = () => {
  const { currentParams } = useTab();
  const handleSubmit = (values: TransactionType) => {
    console.log(currentParams, sanitizeMoney(values.amount), values.category);
  };

  return {
    handleSubmit,
  };
};
