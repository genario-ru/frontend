import { formOptions } from "@tanstack/react-form";
import * as z from "zod";

import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

export const signInFormSchema = z.object({
  email: z.string().email("Введите корректный email"),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;

export const signInFormOptions = formOptions({
  defaultValues: { email: "" },
});

export const signInFormValidateFn =
  createFormValidateFn<SignInFormSchema>(signInFormSchema);
