"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Loading from "@/lotties/landing_loading.json";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Route } from "@/enums/route";
import { getMobileRoute } from "@/utils/route";

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  if (!loading) {
    router.push(getMobileRoute(Route.WELCOME));
  }
  return (
    <>
      {loading ? (
        <div className="h-dvh bg-gradient-to-br from-primary to-[#488d88] flex flex-col justify-center items-center text-white font-bold text-3xl">
          <Lottie
            animationData={Loading}
            style={{ width: "150px", height: "150px" }}
          />
          <div className="relative top-[-10px]">ExpenseGURU</div>
        </div>
      ) : null}
    </>
  );
};

export default dynamic(() => Promise.resolve(Landing), {
  ssr: false,
});
