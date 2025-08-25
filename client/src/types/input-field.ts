import { INPUT_TYPE } from "@/constants/input-type";

type BaseInput = {
  name: string;
  label: string;
  required: boolean;
};

type EmailInput = BaseInput & {
  placeholder: string;
  type: INPUT_TYPE.email;
};

type PasswordInput = BaseInput & {
  placeholder: string;
  type: INPUT_TYPE.password;
};

type TextInput = BaseInput & {
  placeholder: string;
  type: INPUT_TYPE.text;
};

export type InputFieldType = EmailInput | PasswordInput | TextInput;
