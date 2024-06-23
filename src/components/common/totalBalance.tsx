"use client";
import { useWallet } from "@/hooks/useWallet";
import CountUp from "react-countup";

const TotalBalance = ({ className }: { className?: string }) => {
  const { totalBalance } = useWallet();
  return (
    <h2 className={`font-bold text-3xl ${className}`}>
      <CountUp end={totalBalance} duration={1.4} redraw={false} />
    </h2>
  );
};

export default TotalBalance;
