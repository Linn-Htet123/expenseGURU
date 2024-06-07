import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import SegmentedControl from "@/components/ui/segmented-button";

const Wallet = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
        <Image src={Bg} alt="background" className="w-screen" />
        <div className="h-[85%] w-full  bg-slate-50 absolute bottom-0 rounded-t-[30px] px-4 py-8 flex flex-col items-center justify-start">
          <span className="mb-2">Total balance</span>
          <h2 className="font-bold text-2xl mb-4">4000000</h2>
          <div className="flex gap-3 mb-5">
            <Button>
              <span className="flex gap-2 items-center">
                <ThickArrowDownIcon />
                <span>Income</span>
              </span>
            </Button>
            <Button>
              <span className="flex gap-2 items-center">
                <ThickArrowUpIcon />
                <span>Expense</span>
              </span>
            </Button>
          </div>
          <div className="flex justify-between w-full items-center flex-col">
            <span>Transaction History</span>
            <SegmentedControl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
