"use client";
import ProfileHead from "@/components/common/profileHead";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { ExitIcon, StackIcon } from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import { Route } from "@/enums/route";
import { getMobileRoute } from "@/utils/frontend/route";

const Profile = () => {
  const { logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="pt-10 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0">
        <Image src={Bg} alt="background image" className="w-screen" />
        <div className="relative bottom-[80px]">
          <ProfileHead />
          <div className="px-4 mt-4 w-full font-medium">
            <Link
              href={getMobileRoute(Route.CATEGORY)}
              className="flex items-center w-full py-4 gap-6"
            >
              <div>
                <StackIcon width={30} />
              </div>
              <div>Category</div>
            </Link>
            <div
              className="flex items-center w-full py-4 gap-6 text-red-700"
              onClick={handleLogout}
            >
              <div>
                <ExitIcon width={30} />
              </div>
              <div>Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
