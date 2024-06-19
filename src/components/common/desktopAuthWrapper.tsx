import React from "react";

const DesktopAuthWrapper = ({
  children,
  image,
}: {
  children: React.ReactNode;
  image: React.ReactNode;
}) => {
  return (
    <div className="flex h-dvh">
      <div className="w-[60%] mx-auto grow bg-[#EEF8F7]  flex flex-col items-center justify-center">
        {image}
      </div>
      <div className="w-[40%] flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default DesktopAuthWrapper;
