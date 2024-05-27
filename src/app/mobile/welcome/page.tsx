import WelcomeSkeleton from "@/components/mobile/welcome/welcomeSkeleton";
import dynamic from "next/dynamic";

// Lazy load the WelcomeWrapper component
const WelcomeWrapper = dynamic(
  () => import("@/components/mobile/welcome/welcome"),
  {
    ssr: false,
    loading: () => <WelcomeSkeleton />, // Optional: Add a loading indicator
  }
);

const Welcome = () => {
  return <WelcomeWrapper />;
};

export default Welcome;
