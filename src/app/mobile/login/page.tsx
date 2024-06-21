"use client";
import Bg from "../../../../public/welcome-bg.png";
import { CardTitle, CardHeader, Card } from "@/components/ui/card";
import LoginForm from "@/components/common/loginForm";

const Login = () => {
  return (
    <div
      className="h-dvh flex flex-col justify-center items-center overflow-hidden"
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
