import WelcomeSkeleton from "@/components/mobile/welcome/welcomeSkeleton";
import dynamic from "next/dynamic";

const WelcomeWrapper = dynamic(
  () => import("@/components/mobile/welcome/welcome"),
  {
    ssr: false,
    loading: () => <WelcomeSkeleton />,
  },
);

const Welcome = () => {
  return <WelcomeWrapper />;
};

export default Welcome;
