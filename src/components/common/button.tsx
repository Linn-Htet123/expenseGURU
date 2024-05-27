type ButtonProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};

const Button = ({ children, size = "medium" }: ButtonProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-3 py-2 text-sm";
      case "large":
        return "px-8 py-6 text-lg";
      case "medium":
      default:
        return "px-6 py-4 text-base w-[300px]";
    }
  };

  return (
    <div
      className={` text-white inline-block text-center rounded-full shadow-lg bg-gradient-to-r from-primary to-[#488d88] shadow-primary ${getSizeClasses()}`}
    >
      {children}
    </div>
  );
};

export default Button;
