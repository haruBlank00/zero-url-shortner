import type { CreateUrlFormValues } from "@/routes/dashboard/-components/create-url-form/form";
import { shortenUrl } from "@/services/api/url";
import type { ErrorResponse } from "@/types/error-response";
import type { SuccessResponse } from "@/types/success-response";
import type { Url } from "@/types/url";
import { useMutation } from "@tanstack/react-query";

export const useShortenUrl = () => {
  const mutate = useMutation<
    SuccessResponse<Url>,
    ErrorResponse,
    CreateUrlFormValues
  >({
    mutationKey: ["shorten-url"],
    mutationFn: (payload) => shortenUrl(payload),
  });

  return {
    mutate,
    shortenUrl: mutate.mutateAsync,
    isShorteningUrl: mutate.isPending,
  };
};
