import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormBuilder } from "@/components/form-builder";
import {
  defaultLoginFormValues,
  loginFormFields,
  loginFormResolver,
  type LoginFormValues,
} from "./-form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLogin } from "@/hooks/auth";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/auth/useAuth";
import { AuthContextProvider } from "@/context/auth";

export const Route = createFileRoute("/auth/login")({
  component: () => (
    <AuthContextProvider>
      <RouteComponent />
    </AuthContextProvider>
  ),
});

function RouteComponent() {
  const loginForm = useForm({
    defaultValues: defaultLoginFormValues,
    resolver: loginFormResolver,
  });

  const { login, isLoggingIn } = useLogin();

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    login(data, {
      onSuccess: (response) => {
        const token = response.data.token;

        // TODO: combine token and user context later?
        const user = response.data.user;

        localStorage.setItem("auth-token", token);

        setUser(user);

        navigate({
          to: "/dashboard",
        });
      },
      onError: (error) => {
        console.log({ error }, "From Login Page");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Log In
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...loginForm}>
            <form
              className="space-y-4"
              onSubmit={loginForm.handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                <FormBuilder formFields={loginFormFields} form={loginForm} />

                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  Log In
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
            Don't have an account?
            <Link to="/auth/signup" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
