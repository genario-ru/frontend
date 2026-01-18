import * as z from "zod";

export const scenarioAppMenubarImproveFormSchema = z.object({
  prompt: z.string().min(1, "Промпт является обязательным"),
});
