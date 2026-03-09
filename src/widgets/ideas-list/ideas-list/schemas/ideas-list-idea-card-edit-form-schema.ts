import { updateIdeaBodySchemaSchema } from "@/codegen/api/product";

export const ideasListIdeaCardEditFormSchema = updateIdeaBodySchemaSchema.pick({
  name: true,
  description: true,
});
