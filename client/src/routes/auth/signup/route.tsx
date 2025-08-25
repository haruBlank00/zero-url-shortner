import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { useForm, type SubmitHandler } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  defaultSignupFormValues,
  signupFormFields,
  signupFormResolver,
  type SignupFormValues,
} from "./-form";
import { Form } from "@/components/ui/form";
import { FormBuilder } from "@/components/form-builder";
import { useSignup } from "@/hooks/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const signupForm = useForm({
    defaultValues: defaultSignupFormValues,
    resolver: signupFormResolver,
  });
  const { signup, isSigningUp } = useSignup();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    signup(data, {
      onSuccess: () => {
        navigate({
          to: "/auth/login",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormBuilder formFields={signupFormFields} form={signupForm} />
              </div>

              <div className="py-4">
                <Button className="w-full" disabled={isSigningUp}>
                  Signup
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
