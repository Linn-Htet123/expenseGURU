"use client";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import IncomeArrow from "../../../../../public/income-arrow.png";
import ExpenseArrow from "../../../../../public/expense-arrow.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLogin } from "@/hooks/useLogin";
import Logout from "@/components/common/logout";
import greetPlugin from "@/utils/frontend/date";
import dayjs from "dayjs";
import Greeting from "@/components/common/greeting";

const HomePage = () => {
  dayjs.extend(greetPlugin);
  const { user } = useLogin();
  const generateRandomData = () => {
    const categories = ["Movies", "Shopping", "Dining", "Travel", "Utilities"];
    const amounts = [-200, -400, -600, -800, -1000];
    const dates = [
      "May 3, 2024",
      "June 10, 2024",
      "July 15, 2024",
      "August 20, 2024",
      "September 25, 2024",
    ];

    return Array.from({ length: 10 }, () => ({
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      date: dates[Math.floor(Math.random() * dates.length)],
    }));
  };
  const data = generateRandomData();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-dvh overflow-hidden">
        <div className="flex justify-between text-white p-4 absolute top-2 left-0 w-full z-50">
          <div>
            <Greeting className="text-sm" />
            <div className="text-xl font-semibold">{user.username}</div>
          </div>
          <div>
            <Logout />
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full">
          <Image src={Bg} alt="background image" className="w-screen" />
          <div className="relative bottom-[170px]  w-full flex flex-col h-full">
            <div className="mb-4">
              <HomeCard />
            </div>
            <div className="grow">
              <span className="text-lg font-medium text-slate-500 px-4">
                Transaction History
              </span>
              <ScrollArea className="w-full h-[90%] px-4">
                {data.map((item, index) => (
                  <div
                    key={index + item.category.length}
                    className="flex justify-between items-center border-b border-slate-100 my-1"
                  >
                    <div className="flex flex-col py-2">
                      <div className="font-medium text-md">{item.category}</div>
                      <div className="text-sm text-slate-400">{item.date}</div>
                    </div>
                    <div className="text-red-700 font-semibold">
                      {item.amount}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const HomeCard = () => {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full h-[180px] bg-[#2f7e79] flex flex-col justify-between rounded-2xl shadow-lg shadow-[#2f7e79] p-4 text-white">
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
