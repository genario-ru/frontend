import { postApiV1ProfilesMutationRequestSchema } from "@/codegen/api/product";
import { z } from "@/lib/zod";

export const profileSettingsFormSchema = postApiV1ProfilesMutationRequestSchema;

export type ProfileSettingsFormValues = z.infer<
  typeof profileSettingsFormSchema
>;
