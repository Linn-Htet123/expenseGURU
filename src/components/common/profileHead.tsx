"use client";
import { useLogin } from "@/hooks/useLogin";
import Avatar from "./avatar";

const ProfileHead = ({ className }: { className?: string }) => {
  const { authUser } = useLogin();

  return (
    <div className={className}>
      <div className="flex flex-col justify-center items-center font-semibold">
        <Avatar />
        <div className="mt-2">{authUser.username}</div>
        <div className="text-primaryLight">{authUser.email}</div>
      </div>
    </div>
  );
};

export default ProfileHead;
