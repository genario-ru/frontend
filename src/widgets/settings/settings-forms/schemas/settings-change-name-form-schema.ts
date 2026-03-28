import { postUpdateUserMutationRequestSchema } from "@/codegen/api/auth";

export const settingsChangeNameFormSchema =
  postUpdateUserMutationRequestSchema.pick({ name: true });
