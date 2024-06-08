"use client";
import ProfileHead from "@/components/common/profileHead";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { ExitIcon } from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";

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
          <div className="px-4 mt-4 w-full">
            <div
              className="flex items-center justify-between w-full py-4"
              onClick={handleLogout}
            >
              <div>Logout</div>
              <div>
                <ExitIcon width={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
