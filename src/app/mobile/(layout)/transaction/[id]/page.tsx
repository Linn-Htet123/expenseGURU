"use client";
import { useEffect } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import Bg from "../../../../../../public/home-bg.png";
import WithSuspense from "@/components/common/withSuspense";
import { useTransactionDetails } from "@/hooks/useTransactionDetails";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";

interface TransactionDetailsProps {
  params: { id: string };
}

const TransactionDetails = ({ params: { id } }: TransactionDetailsProps) => {
  const { transactionDetails, fetchTransactionDetails } =
    useTransactionDetails();

  useEffect(() => {
    fetchTransactionDetails(id);
  }, [id]);

  const isIncome = (type: string) => type === "income";

  const getTransactionTypeClass = (type: string) =>
    isIncome(type)
      ? "bg-primary-transparent text-primary"
      : "bg-destructive-transparent text-destructive";

  const formatDate = (date: string) => dayjs(date).format("MMM DD, YYYY");
  const formatTime = (date: string) => dayjs(date).format("h:mm A");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
        <Image src={Bg} alt="background" className="w-screen" />
        <WithSuspense>
          {transactionDetails && (
            <div className="h-[80%] w-full bg-slate-50 absolute bottom-0 rounded-t-[30px] px-5 py-5 flex flex-col items-center justify-start">
              <div className="w-full h-full flex flex-col justify-start items-center">
                <span
                  className={`${getTransactionTypeClass(
                    transactionDetails.type
                  )} text-sm px-3 py-1.5 rounded-full mb-2`}
                >
                  {isIncome(transactionDetails.type) ? "Income" : "Expense"}
                </span>
                <div className="text-2xl font-semibold mb-12">
                  {isIncome(transactionDetails.type) ? "" : "- "}
                  <CountUp end={transactionDetails.amount} />
                </div>

                <DetailRow
                  label="Status"
                  value={
                    isIncome(transactionDetails.type) ? "Income" : "Expense"
                  }
                />
                <DetailRow label="From" value={transactionDetails.category} />
                <DetailRow
                  label="Time"
                  value={formatTime(transactionDetails.createdAt)}
                />
                <DetailRow
                  label="Date"
                  value={formatDate(transactionDetails.createdAt)}
                />
                <Separator className="w-full my-6" />
                <DetailRow label="Total" value={transactionDetails.amount} />
              </div>
            </div>
          )}
        </WithSuspense>
      </div>
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: string | number;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="flex w-full justify-between items-center mb-6 text-sm">
    <span className="text-foreground font-medium">{label}</span>
    <span>{value}</span>
  </div>
);

export default TransactionDetails;
