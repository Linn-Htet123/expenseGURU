"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { DESKTOP_SIDE_MENU } from "@/constants/frontend/route";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const SideMenu = () => {
  const pathname = usePathname();
  return (
    <div className="group flex flex-col gap-4 py-2 w-[15%] h-full border-r border-secondary z-20">
      <nav className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 px-2 mt-3">
          {DESKTOP_SIDE_MENU.map((menu) => {
            const isActive = pathname === "/" + menu.name.toLowerCase();
            return (
              <Link
                key={menu.route + menu.name}
                href={menu.route}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "gap-3 text-gray-500 hover:text-gray-900 flex items-center justify-start text-base",
                  isActive && "bg-secondary text-secondary-foreground"
                )}
                prefetch={false}
              >
                <menu.icon className="w-4 h-4" />
                {menu.name}
              </Link>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="justify-start px-[20px] text-red-700 hover:text-red-900 mx-2"
        >
          <div className="w-full flex items-center gap-3 text-base">
            <ExitIcon className="w-4 h-4" />
            <span>Logout</span>
          </div>
        </Button>
      </nav>
    </div>
  );
};

export default SideMenu;
