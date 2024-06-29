"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import styles from "./input.module.scss";
import { formatMoney } from "@/utils/frontend/money";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isMoneyInput?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isMoneyInput, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isMoneyInput) {
        event.target.value = formatMoney(event.target.value);
      }
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          autoComplete={isPassword ? "current-password" : "on"}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            isPassword && "pr-8",
            styles.input,
          )}
          ref={ref}
          onChange={isMoneyInput ? handleChange : onChange}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
