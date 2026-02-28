import { postUpdateUserMutationRequestSchema } from "@/codegen/api/auth";

export const accountSettingsChangeNameFormSchema =
  postUpdateUserMutationRequestSchema.pick({ name: true });
