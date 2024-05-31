"use client";
import Image from "next/image";
import HomeBg from "../../../../public/home-bg.png";
import IncomeArrow from "../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../public/expense-arrow.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/mobile/footer";
import { useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";

const HomePage = () => {
  const { user, getLoggedInUserData } = useLogin();
  useEffect(() => {
    getLoggedInUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="h-dvh flex flex-col gap-2 py-4"
      style={{
        backgroundImage: `url(${HomeBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top center",
      }}
    >
      <div className="flex flex-col justify-start text-white py-2 px-4">
        <div className="text-sm">Good night</div>
        <div className="text-xl font-semibold">{user.username}</div>
      </div>
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
      <div className="my-3 flex flex-col">
        <span className="text-lg font-medium text-slate-500 px-4">
          Transaction History
        </span>
        <ScrollArea className="w-full h-[300px] px-4">
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
              <div className="text-xs text-slate-400">May, 3 2024</div>
            </div>
            <div className="text-red-700 font-semibold"> + 300</div>
          </div>
          <div className="flex justify-between items-center border-b border-slate-100 my-1">
            <div className="flex flex-col py-2">
              <div className="font-medium text-md">Movies</div>
              <div className="text-xs text-slate-400">May, 3 2024</div>
            </div>
            <div className="text-green-700 font-semibold"> - 400</div>
          </div>
          <div className="flex justify-between items-center border-b border-slate-100 my-1">
            <div className="flex flex-col py-2">
              <div className="font-medium text-md">Movies</div>
              <div className="text-xs text-slate-400">May, 3 2024</div>
            </div>
            <div className="text-green-700 font-semibold"> + 500</div>
          </div>
          <div className="flex justify-between items-center border-b border-slate-100 my-1">
            <div className="flex flex-col py-2">
              <div className="font-medium text-md">Movies</div>
              <div className="text-xs text-slate-400">May, 3 2024</div>
            </div>
            <div className="text-green-700 font-semibold"> + 600</div>
          </div>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
