"use client";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import IncomeArrow from "../../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../../public/expense-arrow.png";
import { useLogin } from "@/hooks/useLogin";
import Logout from "@/components/common/logout";
import Greeting from "@/components/common/greeting";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import TotalBalance from "@/components/common/totalBalance";
import TransactionList from "@/components/mobile/transaction/transactionList";
import { useEffect, useRef, useState } from "react";
import WithSuspense from "@/components/common/withSuspense";
import TotalIncome from "@/components/common/totalIncome";
import TotalExpense from "@/components/common/totalExpense";

const HomePage = () => {
  const { authUser } = useLogin();
  const imageRef = useRef<HTMLImageElement>(null);
  const [listHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      const imageHeight = imageRef.current ? imageRef.current?.clientHeight : 0;
      const viewportHeight = window.innerHeight;
      const calculatedHeight = viewportHeight - imageHeight - 64;
      setImageHeight(calculatedHeight);
    };

    updateHeights();

    window.addEventListener("resize", updateHeights);
  }, []);

  return (
    <WithSuspense>
      <div>
        <div className="flex flex-col items-center justify-center h-dvh overflow-hidden">
          <div className="flex justify-between text-white p-4 absolute top-2 left-0 w-full z-50">
            <div>
              <Greeting className="text-sm" />
              <div className="text-xl font-semibold">{authUser.username}</div>
            </div>
            <div>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div>
                      <DotsHorizontalIcon fontSize={30} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-24 mr-4 py-2 px-2">
                    <Logout />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 h-full overflow-hidden">
            <Image
              src={Bg}
              alt="background image"
              className="w-screen"
              ref={imageRef}
              priority
            />
            <div className="relative bottom-[170px]  w-full flex flex-col h-full">
              <div className="mb-4">
                <HomeCard />
              </div>
              <div className="grow">
                <span className="text-lg font-medium text-slate-500 px-4">
                  Transaction History
                </span>
                <TransactionList height={listHeight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithSuspense>
  );
};

const HomeCard = () => {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full h-[180px] bg-[#2f7e79] flex flex-col justify-between rounded-2xl shadow-lg shadow-[#2f7e79] p-4 text-white">
        <div className="flex flex-col mb-5">
          <span className="text-sm">Total balance</span>
          <span className="text-3xl">
            <TotalBalance className="font-semibold" />
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-300">Income</span>
              <Image src={IncomeArrow} alt="income show arrow" />
            </div>
            <TotalIncome className="text-xl font-semibold" />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-300">Expense</span>
              <Image src={ExpenseArrow} alt="income show arrow" />
            </div>
            <TotalExpense className="text-xl font-semibold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
