"use client";
import { useLogin } from "@/hooks/useLogin";
import Avatar from "./avatar";

const ProfileHead = ({ className }: { className?: string }) => {
  const { user } = useLogin();

  return (
    <div className={className}>
      <div className="flex flex-col justify-center items-center font-semibold">
        <Avatar />
        <div className="mt-2">{user.username}</div>
        <div className="text-primaryLight">{user.email}</div>
      </div>
    </div>
  );
};

export default ProfileHead;
