"use client";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { Button } from "@/components/ui/button";
import SegmentedControl from "@/components/ui/segmented-button";

const Add = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
        <Image src={Bg} alt="background" className="w-screen" />
        <div className="h-[90%] w-full  bg-slate-50 absolute bottom-0 rounded-t-[30px] px-4 py-5 flex flex-col items-center justify-start">
          helo world
        </div>
      </div>
    </div>
  );
};

export default Add;
