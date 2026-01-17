import { zPostApiV1IdeasListsData } from "@/codegen/api/product/zod.gen";

export const createIdeasListSchema =
  zPostApiV1IdeasListsData.shape.body.unwrap();
