import { formOptions } from "@tanstack/react-form";

import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";
import { z } from "@/lib/zod";

export const waitlistLandingFormSchema = z.object({
  email: z.email("Введите корректный email"),
  interests: z.array(z.string()),
  comment: z.string(),
  isPrivacyAccepted: z.boolean().refine(Boolean, {
    message: "Данное согласие является обязательным",
  }),
  isMarketingAccepted: z.boolean(),
});

export type WaitlistLandingFormSchema = z.infer<
  typeof waitlistLandingFormSchema
>;

export function waitlistLandingFormOptions() {
  return formOptions({
    defaultValues: {
      email: "",
      interests: [] as string[],
      comment: "",
      isPrivacyAccepted: false,
      isMarketingAccepted: false,
    },
  });
}

export const waitlistLandingFormValidateFn =
  createFormValidateFn<WaitlistLandingFormSchema>(waitlistLandingFormSchema);
