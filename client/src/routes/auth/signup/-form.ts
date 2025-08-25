import { INPUT_TYPE } from "@/constants/input-type";
import type { InputFieldType } from "@/types/input-field";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const signupFormFields: InputFieldType[] = [
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
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: INPUT_TYPE.password,
    required: true,
    placeholder: "••••••••",
  },
];

const signupFormSchema = zod
  .object({
    email: zod.email(),

    password: zod.string(),

    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const signupFormResolver = zodResolver(signupFormSchema);

export type SignupFormValues = zod.infer<typeof signupFormSchema>;

export const defaultSignupFormValues: SignupFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};
