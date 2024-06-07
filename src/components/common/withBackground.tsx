import dynamic from "next/dynamic";
import HomeBg from "../../../public/home-bg.png";
const WithBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`h-dvh flex flex-col gap-2 py-4 ${className}`}
      style={{
        backgroundImage: `url(${HomeBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top center",
      }}
    >
      {children}
    </div>
  );
};

export default dynamic(() => Promise.resolve(WithBackground), {
  ssr: false,
});
