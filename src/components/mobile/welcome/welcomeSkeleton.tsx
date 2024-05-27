import { Skeleton } from "@/components/ui/skeleton";

const WelcomeSkeleton = () => {
  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div
        className="h-[65%] w-full flex flex-col justify-center items-center"
        style={{
          backgroundImage: "linear-gradient(to right, #f0f0f0, #e0e0e0)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
        }}
      >
        <Skeleton className="w-[277px] h-[300px] rounded-full" />
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col items-center justify-center gap-4 mt-6 md:flex-row">
          <div className="flex flex-col justify-center items-center text-3xl leading-9 font-bold text-[#488d88]">
            <Skeleton className="h-8 w-48 rounded" />
            <Skeleton className="h-8 w-48 rounded" />
          </div>
          <Skeleton className="h-12 w-[300px] rounded-full" />
          <div className="text-sm text-slate-400">
            <Skeleton className="h-4 w-40 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSkeleton;
