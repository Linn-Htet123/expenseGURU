"use client";

import Greeting from "@/components/common/greeting";
import TotalBalance from "@/components/common/totalBalance";
import FinanceCard from "@/components/desktop/financeCard";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";

const Home = () => {
  const { authUser } = useLogin();
  const financeCards = [
    {
      label: "Total balance",
      img: { src: "/footerIcon/wallet.svg", alt: "Total balance icon" },
      children: <TotalBalance />,
    },
    {
      label: "Income",
      img: { src: "/income-icon.png", alt: "Income icon" },
      badgeClass: "bg-primary-transparent",
      children: <TotalBalance />,
    },
    {
      label: "Expense",
      img: { src: "/expense-icon.png", alt: "Expense icon" },
      badgeClass: "bg-destructive-transparent",
      children: <TotalBalance />,
    },
  ];
  return (
    <div className="h-full -z-10">
      <div className="w-full h-32 relative">
        <Image
          alt="background"
          src={"/home-bg.png"}
          fill
          className="object-cover object-top"
        />
        <div className="z-50 absolute p-5 w-full">
          <div className="text-white">
            <Greeting className="text-xl font-semibold" />
            <div className="text-lg">{authUser.username}</div>
          </div>
          <div className="absolute top-24 left-0 flex justify-between gap-8 w-full mx-auto px-4">
            {financeCards.map((card, index) => (
              <FinanceCard
                key={card.label.length + index}
                label={card.label}
                img={card.img}
                badgeClass={card.badgeClass}
              >
                {card.children}
              </FinanceCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
