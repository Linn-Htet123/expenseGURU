"use client";
import Bg from "../../../../public/welcome-bg.png";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Ensure this points to the correct file
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Route } from "@/enums/route";
import { useLogin } from "@/hooks/useLogin";
import { Loading } from "@/components/common/loading";
import { Field, Form, Formik } from "formik";
import { SignInType, signInValidation } from "@/validations/sign-in";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormField } from "@/components/common/formField";
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
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={toFormikValidationSchema(signInValidation)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <CardContent>
                <div className="space-y-3.5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <FormField
                      as={Input}
                      name="email"
                      type="text"
                      id="email"
                      placeholder="name@example.com"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <FormField
                      name="password"
                      type="password"
                      as={Input}
                      id="password"
                      errors={errors}
                      touched={touched}
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
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
