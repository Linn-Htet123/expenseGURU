import { Skeleton } from "../ui/skeleton";

const ListSkeleton = () => {
  const list = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div>
      {list.map((index) => (
        <Skeleton key={index} className="w-full h-[48px] mb-3 bg-slate-200" />
      ))}
    </div>
  );
};

export default ListSkeleton;
