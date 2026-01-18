import { zPatchApiV1IdeasIdeaIdData } from "@/codegen/api/product/zod.gen";

export const ideasListIdeaCardEditFormSchema =
  zPatchApiV1IdeasIdeaIdData.shape.body.unwrap().pick({
    name: true,
    description: true,
  });
