import { useTotalIncome } from "@/hooks/useTotalIncome";
import CountUp from "react-countup";

const TotalIncome = ({ className }: { className?: string }) => {
  const { totalIncome } = useTotalIncome();
  return (
    <h2>
      <CountUp className={className} end={totalIncome} />
    </h2>
  );
};

export default TotalIncome;
