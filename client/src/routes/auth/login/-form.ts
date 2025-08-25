import { INPUT_TYPE } from "@/constants/input-type";
import type { InputFieldType } from "@/types/input-field";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginFormFields: InputFieldType[] = [
  {
    name: "email",
    label: "Email",
    type: INPUT_TYPE.email,
    required: true,
    placeholder: "blank@gmail.com",
  },
  {
    name: "password",
    label: "Password",
    type: INPUT_TYPE.password,
    required: true,
    placeholder: "••••••••",
  },
];

const loginFormSchema = zod.object({
  email: zod.email(),

  password: zod.string(),
});

export const loginFormResolver = zodResolver(loginFormSchema);

export type LoginFormValues = zod.infer<typeof loginFormSchema>;

export const defaultLoginFormValues: LoginFormValues = {
  email: "",

  password: "",
};
