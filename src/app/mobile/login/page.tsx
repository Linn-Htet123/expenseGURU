"use client";
import Bg from "../../../../public/welcome-bg.png";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Route } from "@/enums/route";
import { useLogin } from "@/hooks/useLogin";
import { Loading } from "@/components/common/loading";
import { Form, Formik } from "formik";
import { SignInType, signInValidation } from "@/validations/sign-in";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormField } from "@/components/common/formField";
import LoginForm from "@/components/common/loginForm";
import { getMobileRoute } from "@/utils/frontend/route";

const Login = () => {
  const { login, loading } = useLogin();

  const handleSubmit = async (user: SignInType) => {
    await login(user);
  };

  return (
    <div
      className="h-dvh flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${Bg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "144%",
        backgroundPosition: "top center",
      }}
    >
      <Card className="mx-auto w-[340px] max-w-sm drop-shadow-2xl shadow-primary">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
