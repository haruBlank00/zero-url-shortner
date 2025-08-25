import { API_ROUTES } from "@/constants/api-routes";
import { zeroAxios } from "@/lib/zero-axios";
import type { CreateUrlFormValues } from "@/routes/dashboard/-components/create-url-form/form";
import type { SuccessResponse } from "@/types/success-response";
import type { Url } from "@/types/url";

export const shortenUrl = async (data: CreateUrlFormValues) =>
  (
    await zeroAxios<SuccessResponse<Url>>({
      method: "POST",
      url: API_ROUTES.URL.CREATE,
      data,
    })
  ).data;

export const getShortUrls = async () =>
  (
    await zeroAxios<SuccessResponse<Url[]>>({
      method: "GET",
      url: `${API_ROUTES.URL.GET}`,
    })
  ).data;
