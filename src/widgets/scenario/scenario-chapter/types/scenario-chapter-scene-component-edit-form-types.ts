import { z } from "@/lib/zod";

import type { scenarioChapterSceneComponentEditFormSchema } from "../schemas/scenario-chapter-scene-component-edit-form-schema";

export type ScenarioChapterSceneComponentEditFormSchema = z.infer<
  typeof scenarioChapterSceneComponentEditFormSchema
>;
