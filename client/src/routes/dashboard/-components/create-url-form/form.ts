import { INPUT_TYPE } from "@/constants/input-type";
import type { InputFieldType } from "@/types/input-field";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

export const createUrlFormFields: InputFieldType[] = [
  {
    name: "longUrl",
    type: INPUT_TYPE.text,
    label: "Url",
    placeholder: "https://example.com",
    required: true,
  },
  {
    name: "title",
    type: INPUT_TYPE.text,
    label: "Title",
    placeholder: "One Piece",
    required: false,
  },
];

const createUrlFormSchema = zod.object({
  longUrl: zod.url(),

  title: zod.string().nullable(),
});

export const createUrlFormResolver = zodResolver(createUrlFormSchema);

export type CreateUrlFormValues = zod.infer<typeof createUrlFormSchema>;

export const defaultCreateUrlFormValues: CreateUrlFormValues = {
  longUrl: "",

  title: "",
};
