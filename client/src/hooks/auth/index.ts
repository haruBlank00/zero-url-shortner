import type { SignupFormValues } from "@/routes/auth/signup/-form";
import { login, signup } from "@/services/api/auth";
import type { ErrorResponse } from "@/types/error-response";
import type { SuccessResponse } from "@/types/success-response";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  const mutate = useMutation<
    SuccessResponse<User>,
    ErrorResponse,
    SignupFormValues
  >({
    mutationKey: ["signup"],
    mutationFn: (data) => signup(data),
  });

  return {
    mutate,
    signup: mutate.mutateAsync,
    isSigningUp: mutate.isPending,
  };
};

export const useLogin = () => {
  const mutate = useMutation<
    SuccessResponse<{
      user: User;
      token: string;
    }>,
    ErrorResponse,
    unknown
  >({
    mutationKey: ["login"],
    mutationFn: (data) => login(data),
  });

  return {
    mutate,
    login: mutate.mutateAsync,
    isLoggingIn: mutate.isPending,
  };
};
