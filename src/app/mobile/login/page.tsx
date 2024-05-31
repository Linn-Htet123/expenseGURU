"use client";
import Bg from "../../../../public/welcome-bg.png";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Route } from "@/enums/route";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { SignInType } from "@/validations/sign-in";
import { Loading } from "@/components/common/loading";

const Login = () => {
  const { login, loading } = useLogin();
  const [user, setUser] = useState<SignInType>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await login(user);
    } catch {}
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
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  // type="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <Button
                className="w-full"
                type="submit"
                variant="gooeyLeft"
                disabled={loading}
              >
                {loading ? <Loading /> : "Login"}
              </Button>

              <Label className="text-center w-full flex justify-center">
                Do not have an account?
                <Link href={Route.SIGNUP} className="text-primary ml-2">
                  Signup
                </Link>
              </Label>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Login;
