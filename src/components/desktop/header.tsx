"use client";
import Link from "next/link";
import Avatar from "../common/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLogin } from "@/hooks/useLogin";
import { Route } from "@/enums/route";
import Lottie from "lottie-react";
import Logo from "@/lotties/desktop_logo.json";
import { ExitIcon } from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";

const Header = () => {
  const { user } = useLogin();

  const { logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#438883] text-white">
      <Link
        href={Route.HOME}
        className="flex items-center gap-2"
        prefetch={false}
      >
        <Lottie
          animationData={Logo}
          style={{ width: "50px", height: "50px" }}
        />
        <span className="text-lg font-medium">Expense GURU</span>
      </Link>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger>
            <Avatar width={40} height={40} />
          </PopoverTrigger>
          <PopoverContent className="p-4 w-56 mr-1">
            <div className="w-full">
              <div className="space-y-1">
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-sm text-[#438883]">{user.email}</p>
              </div>
              <div className="border-t border-gray-200 my-2" />
              <div
                className="flex items-center gap-2 text-red-700 cursor-pointer hover:bg-slate-50 p-2 transition-all"
                onClick={handleLogout}
              >
                <ExitIcon className="h-4 w-4" />
                <span>Logout</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
