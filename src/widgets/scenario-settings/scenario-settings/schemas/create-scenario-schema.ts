import { zPostApiV1ScenariosData } from "@/codegen/api/product/zod.gen";

export const createScenarioSchema = zPostApiV1ScenariosData.shape.body.unwrap();
