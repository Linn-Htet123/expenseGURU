import { TransactionTab } from "@/enums/transactionTab";
import { formatMoney } from "@/utils/frontend/money";

const FormattedTransactionAmount = ({
  amount,
  type,
}: {
  amount: number;
  type: string;
}) => {
  const isExpense = type === TransactionTab.EXPENSE.toLowerCase();
  return (
    <div
      className={`font-semibold ${
        isExpense ? "text-red-700" : "text-green-700"
      }`}
    >
      {isExpense ? "- " : " "}
      {formatMoney(amount)}
    </div>
  );
};

export default FormattedTransactionAmount;
