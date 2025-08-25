import { API_ROUTES } from "@/constants/api-routes";
import { zeroAxios } from "@/lib/zero-axios";
import type { SignupFormValues } from "@/routes/auth/signup/-form";
import type { SuccessResponse } from "@/types/success-response";
import type { User } from "@/types/user";

export const signup = async (data: SignupFormValues) =>
  (
    await zeroAxios<SuccessResponse<User>>({
      method: "POST",
      url: API_ROUTES.AUTH.SIGNUP,
      data,
    })
  ).data;

export const login = async (data: unknown) =>
  (
    await zeroAxios<
      SuccessResponse<{
        user: User;
        token: string;
      }>
    >({
      method: "POST",
      url: API_ROUTES.AUTH.LOGIN,
      data,
    })
  ).data;
