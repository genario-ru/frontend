import { patchApiV1IdeasIdeaIdMutationRequestSchema } from "@/codegen/api/product";

export const ideasListIdeaCardEditFormSchema =
  patchApiV1IdeasIdeaIdMutationRequestSchema.pick({
    name: true,
    description: true,
  });
