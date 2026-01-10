import { zPostChangeEmailData } from "@/codegen/api/auth/zod.gen";

export const accountSettingsChangeEmailFormSchema =
  zPostChangeEmailData.shape.body.pick({ newEmail: true });
