"use client";
import AuthLayout from "@/components/desktop/layout/AuthLayout";
import LoginForm from "@/components/common/loginForm";
import LoginImage from "@/lotties/desktop_login_image.json";
import Lottie from "lottie-react";

export default function Login() {
  return (
    <AuthLayout
      image={
        <Lottie
          animationData={LoginImage}
          style={{ width: "600px", height: "600px" }}
        />
      }
    >
      <LoginForm className="w-[80%]" />
    </AuthLayout>
  );
}
