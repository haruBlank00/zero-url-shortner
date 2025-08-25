import { Form } from "@/components/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  createUrlFormFields,
  createUrlFormResolver,
  defaultCreateUrlFormValues,
  type CreateUrlFormValues,
} from "./form";
import { FormBuilder } from "@/components/form-builder";
import { Button } from "@/components/ui/button";
import { useShortenUrl } from "@/hooks/url/useShortenUrl";
import { useQueryClient } from "@tanstack/react-query";

export const CreateUrlForm = () => {
  const createUrlForm = useForm({
    defaultValues: defaultCreateUrlFormValues,
    resolver: createUrlFormResolver,
  });
  const queryClient = useQueryClient();

  const { shortenUrl, isShorteningUrl } = useShortenUrl();

  const onSubmit: SubmitHandler<CreateUrlFormValues> = (data) => {
    shortenUrl(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["shorten-urls"],
        });
      },
    });
  };

  return (
    <div className="max-w-2xl">
      <Form {...createUrlForm}>
        <form onSubmit={createUrlForm.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormBuilder
              formFields={createUrlFormFields}
              form={createUrlForm}
            />

            <Button disabled={isShorteningUrl} type="submit">
              shorten url
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
