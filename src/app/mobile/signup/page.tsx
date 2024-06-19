"use client";
import SignUpForm from "@/components/common/signUpForm";
import Bg from "../../../../public/welcome-bg.png";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

const Signup = () => {
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
          <CardTitle className="text-2xl font-bold">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
