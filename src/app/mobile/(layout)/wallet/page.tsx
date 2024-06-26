"use client";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { Button } from "@/components/ui/button";
import SegmentedControl from "@/components/ui/segmented-button";
import IncomeArrow from "../../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../../public/expense-arrow.png";
import { useTab } from "@/hooks/useTab";
import WithSuspense from "@/components/common/withSuspense";
import Link from "next/link";
import { Route } from "@/enums/route";
import { getMobileRoute } from "@/utils/frontend/route";
import TotalBalance from "@/components/common/totalBalance";
import TransactionList from "@/components/mobile/transaction/transactionList";
const Wallet = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
        <Image src={Bg} alt="background" className="w-screen" />
        <WithSuspense>
          <WalletList />
        </WithSuspense>
      </div>
    </div>
  );
};

const WalletList = () => {
  const { handleTabChange, currentTab } = useTab();
  return (
    <div className="h-[90%] w-full  bg-slate-50 absolute bottom-0 rounded-t-[30px] px-4 py-5 flex flex-col items-center justify-start">
      <span className="mb-1 text-slate-500">Total balance</span>
      <TotalBalance className="mb-4" />
      <div className="flex gap-3 mb-3">
        <Button>
          <span className="flex gap-2 items-center">
            <Image src={IncomeArrow} alt="income" />
            <Link href={getMobileRoute(Route.ADD) + "?tab=Income"}>Income</Link>
          </span>
        </Button>
        <Button>
          <span className="flex gap-2 items-center">
            <Image src={ExpenseArrow} alt="expense" />
            <Link href={getMobileRoute(Route.ADD) + "?tab=Expense"}>
              Expense
            </Link>
          </span>
        </Button>
      </div>
      <div className="flex justify-between w-full items-center flex-col">
        <SegmentedControl
          currentTab={currentTab}
          data={["Income", "Expense"]}
          onSelectionChange={handleTabChange}
        />
      </div>
      <div className="grow overflow-scroll w-full">
        <TransactionList />
      </div>
    </div>
  );
};
export default Wallet;
