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
import Logout from "../common/logout";

const Header = () => {
  const { user } = useLogin();
  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-md bg-white border-secondary sticky top-0 z-50 text-white">
      <Link
        href={Route.HOME}
        className="flex items-center gap-2"
        prefetch={false}
      >
        {/* <Lottie
          animationData={Logo}
          style={{ width: "50px", height: "50px" }}
        /> */}
        <span className="text-xl font-semibold text-primaryLight">
          Expense GURU
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger>
            <Avatar width={40} height={40} />
          </PopoverTrigger>
          <PopoverContent className="p-4 w-56 mr-1">
            <div className="w-full">
              <div className="space-y-1">
                <p className="font-medium">{user.username}</p>
                <p className="text-primaryLight">{user.email}</p>
              </div>
              <div className="border-t border-gray-200 my-2" />
              <Logout />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
