import { formOptions } from "@tanstack/react-form";
import * as z from "zod";

import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

export const verifyOTPFormSchema = z.object({
  code: z.string().length(6, "Введите корректный код"),
});

export type VerifyOTPFormSchema = z.infer<typeof verifyOTPFormSchema>;

export const verifyOTPFormOptions = formOptions({
  defaultValues: {
    code: "",
  },
});

export const verifyOTPFormValidateFn =
  createFormValidateFn<VerifyOTPFormSchema>(verifyOTPFormSchema);
