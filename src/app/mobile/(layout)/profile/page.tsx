import dynamic from "next/dynamic";
const WithBackground = dynamic(
  () => import("@/components/common/withBackground"),
  {
    ssr: false,
  }
);
const Profile = () => {
  return <WithBackground className="pt-10">helo</WithBackground>;
};

export default Profile;
