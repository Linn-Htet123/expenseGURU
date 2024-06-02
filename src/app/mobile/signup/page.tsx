"use client";
import Bg from "../../../../public/welcome-bg.png";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Route } from "@/enums/route";
import { FormField } from "@/components/common/formField";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  SignUpUserType,
  signUpValidationFormSchema,
} from "@/validations/signup";
import { useSignup } from "@/hooks/useSignup";
import { Loading } from "@/components/common/loading";

const Signup = () => {
  const { signup, loading } = useSignup();
  const handleSubmit = async (newUser: SignUpUserType) => {
    await signup({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    });
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
          <CardTitle className="text-2xl font-bold">Signup</CardTitle>
        </CardHeader>
        <Formik
          validationSchema={toFormikValidationSchema(
            signUpValidationFormSchema
          )}
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <FormField
                    name="username"
                    id="username"
                    placeholder="Larry.."
                    type="text"
                    as={Input}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <FormField
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    as={Input}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <FormField
                    name="password"
                    id="password"
                    required
                    type="password"
                    as={Input}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">confirm</Label>
                  <FormField
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    type="password"
                    as={Input}
                  />
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  variant="gooeyLeft"
                  disabled={loading}
                >
                  {loading ? <Loading /> : "Signup"}
                </Button>
                <Label className="text-center w-full flex justify-center">
                  Already have an account?{" "}
                  <Link href={Route.LOGIN} className="text-primary ml-2">
                    Login
                  </Link>
                </Label>
              </div>
            </CardContent>
          </Form>
        </Formik>
      </Card>
    </div>
  );
};

export default Signup;
