import { postChangeEmailMutationRequestSchema } from "@/codegen/api/auth";

export const accountSettingsChangeEmailFormSchema =
  postChangeEmailMutationRequestSchema.pick({ newEmail: true });
