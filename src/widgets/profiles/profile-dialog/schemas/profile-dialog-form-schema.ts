import { zPostApiV1ProfilesData } from "@/codegen/api/product/zod.gen";

export const profileDialogFormSchema =
  zPostApiV1ProfilesData.shape.body.unwrap();
