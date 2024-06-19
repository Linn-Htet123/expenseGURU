"use client";

import { useWallet } from "@/hooks/useWallet";

const TotalBalance = ({ className }: { className?: string }) => {
  const { totalBalance } = useWallet();

  return <h2 className={`font-bold text-3xl ${className}`}>{totalBalance}</h2>;
};

export default TotalBalance;
