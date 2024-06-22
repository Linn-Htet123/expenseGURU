"use client";
import AuthLayout from "@/components/desktop/layout/AuthLayout";
import SignUpForm from "@/components/common/signUpForm";
import SignUpImage from "@/lotties/desktop_signup_image.json";
import Lottie from "lottie-react";

export default function SignUp() {
  return (
    <AuthLayout
      image={
        <Lottie
          animationData={SignUpImage}
          style={{ width: "600px", height: "600px" }}
        />
      }
    >
      <SignUpForm className="w-[80%]" />
    </AuthLayout>
  );
}
