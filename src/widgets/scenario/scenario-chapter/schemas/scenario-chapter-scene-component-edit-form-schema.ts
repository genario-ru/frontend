import { z } from "@/lib/zod";

export const scenarioChapterSceneComponentEditFormSchema = z.object({
  content: z.string().min(16).max(4096),
});
