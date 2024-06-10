import { TransactionTab } from "@/enums/transactionTab";
import { createQueryString } from "@/utils/frontend/route";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";

export const useTab = () => {
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

  const handleTabChange = (item: string, queryName: string = "tab") => {
    router.push(`${pathname}?${createQuery(queryName, item)}`);
    setCurrentTab(currentParams);
  };

  return {
    handleTabChange,
    currentTab,
    currentParams,
  };
};
