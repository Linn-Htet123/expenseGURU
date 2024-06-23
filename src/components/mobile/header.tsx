"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { getRelevantRoute } from "@/utils/frontend/route";
import { Route } from "@/enums/route";

const header = new Map([
  [getRelevantRoute(Route.PROFILE), "Profile"],
  [getRelevantRoute(Route.STATISTIC), "Statistic"],
  [getRelevantRoute(Route.WALLET), "Wallet"],
  [getRelevantRoute(Route.ADD), "Create"],
  [getRelevantRoute(Route.CATEGORY), "Category"],
  [getRelevantRoute(Route.TRANSACTION), "Transaction"],
]);

const Header = () => {
  let currentPath = usePathname();
  const { back } = useRouter();
  const isHome = currentPath === "/mobile/home";
  currentPath = currentPath.includes("/transaction")
    ? getRelevantRoute(Route.TRANSACTION)
    : currentPath;

  return (
    <>
      {!isHome && (
        <div className="z-30 fixed top-0 left-0 w-full h-16 p-4 text-white text-lg flex items-center">
          <ChevronLeftIcon
            width={25}
            height={25}
            onClick={() => {
              back();
            }}
            className="cursor-pointer z-50"
          />
          <div className="flex-grow text-center relative right-4">
            {header.get(currentPath)}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
