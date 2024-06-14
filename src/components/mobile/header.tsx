"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const header = new Map([
  ["/mobile/profile", "Profile"],
  ["/mobile/statistic", "Statistic"],
  ["/mobile/wallet", "Wallet"],
  ["/mobile/add", "Create"],
  ["/mobile/category", "Category"],
]);

const Header = () => {
  const currentPath = usePathname();
  const { back } = useRouter();
  const isHome = currentPath === "/mobile/home";
  return (
    <>
      {!isHome && (
        <div className="z-50 fixed top-0 left-0 w-full h-16 p-4 text-white text-lg">
          <div className="w-7/12 flex justify-between items-center">
            <span>
              <ChevronLeftIcon
                width={25}
                height={25}
                onClick={() => {
                  back();
                }}
              />
            </span>
            <div>{header.get(currentPath)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
