import { Suspense } from "react";
import { Loading } from "./loading";

const WithSuspense = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="h-dvh w-full flex flex-col justify-center items-center">
          <Loading />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default WithSuspense;
