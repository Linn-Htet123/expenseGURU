import { TransactionTab } from "@/enums/transactionTab";
import { sanitizeMoney } from "@/utils/frontend/money";
import { createQueryString } from "@/utils/frontend/route";
import { TransactionType } from "@/validations/income-expense";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";

export const useTransaction = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentParams = searchParams.get("tab") || TransactionTab.INCOME;
  const [currentTab, setCurrentTab] = useState<string>(currentParams);

  const createQuery = useCallback(
    (name: string, value: string) => {
      return createQueryString(name, value, searchParams.toString());
    },
    [searchParams]
  );

  const handleTabChange = (item: string) => {
    router.push(`${pathname}?${createQuery("tab", item)}`);
    setCurrentTab(currentParams);
  };

  const handleSubmit = (values: TransactionType) => {
    console.log(currentParams, sanitizeMoney(values.amount));
  };

  return {
    handleTabChange,
    currentTab,
    currentParams,
    handleSubmit,
  };
};
