import { INPUT_TYPE } from "@/constants/input-type";
import type { InputFieldType } from "@/types/input-field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type { UseFormReturn } from "react-hook-form";

type FormBuilderProps = {
  formFields: InputFieldType[];
  form: UseFormReturn<any>;
};

export const FormBuilder = ({ formFields, form }: FormBuilderProps) => {
  return (
    <>
      {formFields.map((formField) => {
        const { type, name, label, placeholder, required } = formField;

        let inputType = "text";
        if (type === INPUT_TYPE.email) inputType = "email";
        if (type === INPUT_TYPE.password) inputType = "password";

        return (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {label}
                  {required && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type={inputType}
                    placeholder={placeholder}
                    required={required}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </>
  );
};
