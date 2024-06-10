"use client";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { Button } from "@/components/ui/button";
import SegmentedControl from "@/components/ui/segmented-button";
import IncomeArrow from "../../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../../public/expense-arrow.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTab } from "@/hooks/useTab";
const Wallet = () => {
  const { handleTabChange, currentTab, currentParams } = useTab();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
        <Image src={Bg} alt="background" className="w-screen" />
        <div className="h-[90%] w-full  bg-slate-50 absolute bottom-0 rounded-t-[30px] px-4 py-5 flex flex-col items-center justify-start">
          <span className="mb-1 text-slate-500">Total balance</span>
          <h2 className="font-bold text-3xl mb-4">4,000,000</h2>
          <div className="flex gap-3 mb-3">
            <Button>
              <span className="flex gap-2 items-center">
                <Image src={IncomeArrow} alt="income" />
                <span>Income</span>
              </span>
            </Button>
            <Button>
              <span className="flex gap-2 items-center">
                <Image src={ExpenseArrow} alt="expense" />
                <span>Expense</span>
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
          <div className="grow bg-slate-100 w-full">
            <ScrollArea>History here</ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
