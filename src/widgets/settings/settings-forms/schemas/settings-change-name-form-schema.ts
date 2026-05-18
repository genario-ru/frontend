import { updateUserBodySchemaSchema } from "@/codegen/api/product";

export const settingsChangeNameFormSchema = updateUserBodySchemaSchema.pick({
  name: true,
});
