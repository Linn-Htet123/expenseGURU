"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Loading from "@/lotties/landing_loading.json";
import dynamic from "next/dynamic";

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-dvh bg-primary flex flex-col justify-center items-center text-white font-bold text-3xl">
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
