"use client";
import { Button } from "@/components/ui/button";
import { Route } from "@/enums/route";
import Lottie from "lottie-react";
import Link from "next/link";
import NotFoundData from "@/lotties/404.json";
import Bg from "../../public/welcome-bg.png";
import { getMobileRoute, isMobile } from "@/utils/frontend/route";

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
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary-500">
            <Lottie animationData={NotFoundData} />
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something is missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {` Sorry, we can't find that page. You'll find lots to explore on the
            home page.`}
          </p>
          <Link href={isMobile() ? getMobileRoute(Route.HOME) : Route.HOME}>
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
