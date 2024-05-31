"use client";
import styles from "./welcome.module.scss";
import Bg from "../../../../public/welcome-bg.png";
import Person from "../../../../public/welcome-man.png";

import Image from "next/image";
import Link from "next/link";
import { getMobileRoute } from "@/utils/frontend/route";
import { Route } from "@/enums/route";
import Button from "@/components/common/button";
import dynamic from "next/dynamic";

const WelcomeWrapper = () => {
  return (
    <div className={`${styles.welcome} h-dvh`}>
      <div
        className={`${styles.background} h-[65%] flex-col flex justify-center items-center`}
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
        }}
      >
        <Image
          src={Person}
          alt="background-person"
          className="w-[277px] relative top-8 left-[-17px]"
          quality={100}
        />
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col items-center justify-center gap-4 mt-6 md:flex-row">
          <div className="flex flex-col justify-center items-center text-3xl leading-9 font-bold text-[#488d88]">
            <span>Spend Smarter</span>
            <span>Save More</span>
          </div>
          <Button>
            <Link href={getMobileRoute(Route.SIGNUP)}>Get Started</Link>
          </Button>
          <div className="text-sm text-slate-400">
            Already have an account?
            <Link
              href={getMobileRoute(Route.LOGIN)}
              className="text-primary ml-2"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(WelcomeWrapper), {
  ssr: false,
});
