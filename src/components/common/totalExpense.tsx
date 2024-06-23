import { useTotalExpense } from "@/hooks/useTotalExpense";
import CountUp from "react-countup";

const TotalExpense = ({ className }: { className?: string }) => {
  const { totalExpense } = useTotalExpense();
  return (
    <h2>
      <CountUp className={className} end={totalExpense} />
    </h2>
  );
};

export default TotalExpense;
