import AnimationData from "@/lotties/loading.json";
import Lottie from "lottie-react";

export const Loading = () => {
  return <Lottie animationData={AnimationData} style={{ width: "30px" }} />;
};
