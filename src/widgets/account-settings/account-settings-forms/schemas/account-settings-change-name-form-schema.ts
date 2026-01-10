import { zPostUpdateUserData } from "@/codegen/api/auth/zod.gen";

export const accountSettingsChangeNameFormSchema =
  zPostUpdateUserData.shape.body.unwrap().pick({ name: true });
