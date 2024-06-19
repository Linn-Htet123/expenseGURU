"use client";
import { Button } from "@/components/ui/button";
import { Route } from "@/enums/route";
import Lottie from "lottie-react";
import Link from "next/link";
import NotFoundData from "@/lotties/404.json";
import Bg from "../../public/welcome-bg.png";

const NotFound = () => {
  return (
    <section
      className="bg-white dark:bg-gray-900 w-full h-dvh flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${Bg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "150%",
        backgroundPosition: "center center",
      }}
    >
      <div className="px-4 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-sm text-center flex flex-col items-center justify-center">
          <div className="mx-auto">
            <Lottie
              animationData={NotFoundData}
              style={{ width: "450px", height: "450px" }}
            />
          </div>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something is missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {` Sorry, we can't find that page. You'll find lots to explore on the
            home page.`}
          </p>
          <Link href={Route.HOME}>
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
