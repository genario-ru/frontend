import { formOptions } from "@tanstack/react-form";

import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";
import { z } from "@/lib/zod";

export const signInFormSchema = z.object({
  email: z.email("Введите корректный email"),
  isLegalAccepted: z.boolean().refine(Boolean, {
    message: "Для входа необходимо согласиться с условиями и документами",
  }),
  isMarketingAccepted: z.boolean(),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;

type SignInFormOptionsParams = {
  email?: string;
};

export function signInFormOptions({ email = "" }: SignInFormOptionsParams) {
  return formOptions({
    defaultValues: {
      email,
      isLegalAccepted: false,
      isMarketingAccepted: false,
    },
  });
}

export const signInFormValidateFn =
  createFormValidateFn<SignInFormSchema>(signInFormSchema);
