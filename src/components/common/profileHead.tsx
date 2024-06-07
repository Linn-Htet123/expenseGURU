"use client";
import { useLogin } from "@/hooks/useLogin";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";

const ProfileHead = ({ className }: { className?: string }) => {
  const { user, getLoggedInUserData } = useLogin();
  useEffect(() => {
    getLoggedInUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      <div className="flex flex-col justify-center items-center font-semibold">
        <Image
          src={faker.image.avatar()}
          alt="profile"
          width={120}
          height={120}
          className="rounded-full"
        />
        <div className="mt-2">{user.username}</div>
        <div className="text-[#438883]">{user.email}</div>
      </div>
    </div>
  );
};

export default ProfileHead;
