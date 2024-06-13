"use client";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import IncomeArrow from "../../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../../public/expense-arrow.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";
import Logout from "@/components/common/logout";
import greetPlugin from "@/utils/frontend/date";
import dayjs from "dayjs";
import Greeting from "@/components/common/greeting";
import dynamic from "next/dynamic";
import WithSuspense from "@/components/common/withSuspense";

const WithBackground = dynamic(
  () => import("@/components/common/withBackground"),
  {
    ssr: false,
  }
);
const HomePage = () => {
  dayjs.extend(greetPlugin);
  const { user, getLoggedInUserData } = useLogin();
  useEffect(() => {
    getLoggedInUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
          <Image src={Bg} alt="background" className="w-screen" />
          <WithSuspense>
            <div className="flex flex-col h-full w-full mx-4 absolute bottom-0">
              <div className="flex justify-between text-white py-4 mb-2 px-4">
                <div>
                  <Greeting className="text-sm" />
                  <div className="text-xl font-semibold">{user.username}</div>
                </div>
                <div>
                  <Logout />
                </div>
              </div>
              <HomeCard />
              <div className="my-3 flex flex-col grow bg-red-100">
                <span className="text-lg font-medium text-slate-500 px-4">
                  Transaction History
                </span>
                <ScrollArea className="w-full h-full  bg-blue-50 px-4">
                  <div className="flex justify-between items-center border-b border-slate-100 my-1">
                    <div className="flex flex-col py-2">
                      <div className="font-medium text-md">Movies</div>
                      <div className="text-sm text-slate-400">May, 3 2024</div>
                    </div>
                    <div className="text-red-700 font-semibold"> - 400</div>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 my-1">
                    <div className="flex flex-col py-2">
                      <div className="font-medium text-md">Movies</div>
                      <div className="text-sm text-slate-400">May, 3 2024</div>
                    </div>
                    <div className="text-red-700 font-semibold"> - 400</div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </WithSuspense>
        </div>
      </div>
    </>
  );
};

const HomeCard = () => {
  return (
    <div className="flex justify-center px-4">
      <div className="w-[360px] h-[180px] bg-[#2f7e79] flex flex-col justify-between rounded-2xl shadow-lg shadow-[#2f7e79] p-4 text-white">
        <div className="flex flex-col mb-5">
          <span className="text-sm">Total balance</span>
          <span className="text-3xl font-semibold">4,000</span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-300">Income</span>
              <Image src={IncomeArrow} alt="income show arrow" />
            </div>
            <span className="text-xl font-semibold">30000</span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-300">Expense</span>
              <Image src={ExpenseArrow} alt="income show arrow" />
            </div>
            <span className="text-xl font-semibold">30000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
