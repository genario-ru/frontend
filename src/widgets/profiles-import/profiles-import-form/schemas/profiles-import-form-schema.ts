import { createProfilesFromChannelsBodySchemaSchema } from "@/codegen/api/product";
import { z } from "@/lib/zod";

export const profilesImportFormSchema =
  createProfilesFromChannelsBodySchemaSchema;

export type ProfilesImportFormValues = z.infer<typeof profilesImportFormSchema>;
