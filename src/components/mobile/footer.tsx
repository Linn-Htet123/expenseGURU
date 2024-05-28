"use client";
import Link from "next/link";
import { MOBILE_FOOTER } from "@/constants/frontend/route";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 px-4">
      <div className="flex justify-around items-center h-full gap-4">
        {MOBILE_FOOTER.map((footer) => (
          <Link
            key={footer.route}
            className="flex flex-col items-center"
            href={footer.route}
          >
            <div
              className={`${
                footer.name === "addIncome" &&
                "rounded-full bg-[#2f7e79] w-[68px] h-[68px] flex items-center justify-center relative bottom-6"
              }`}
            >
              <Image src={footer.icon} alt={`${footer.name}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Footer;
