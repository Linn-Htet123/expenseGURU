import EmptyData from "@/components/common/emptyData";
import FormattedTransactionAmount from "@/components/common/formattedTransactionAmount";
import ListSkeleton from "@/components/common/listSkeleton";
import { useTransaction } from "@/hooks/useTransaction";
import { Transaction } from "@/types/transaction";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";

const TransactionList = ({
  className,
  height,
}: {
  className?: string;
  height?: number;
}) => {
  const { transactions, fetchMore, hasMore, isFetching } = useTransaction();
  return (
    <div
      className={`relative overflow-auto w-full px-4 ${className} pb-[50px] h-full scrollbar-hide`}
      style={{ height: height + "px" }}
      id="scrollableDiv"
    >
      {isFetching && transactions.length === 0 ? (
        <ListSkeleton />
      ) : (
        <InfiniteScroll
          dataLength={transactions.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          scrollableTarget="scrollableDiv"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {transactions.length > 0 ? (
            transactions.map((item: Transaction, index: number) => (
              <div
                key={`item-${index}`}
                className="flex justify-between w-full items-center border-b border-slate-100 my-1"
              >
                <div className="flex flex-col py-2">
                  <div className="font-medium text-md">
                    {item.category?.name || "Uncategorized"}
                  </div>
                  <div className="text-sm text-slate-400">
                    {dayjs(item.createdAt).format("MMMM D, YYYY")}
                  </div>
                </div>
                <FormattedTransactionAmount
                  amount={item.amount}
                  type={item.type}
                />
              </div>
            ))
          ) : (
            <EmptyData dataName="transactions" />
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};
export default TransactionList;
