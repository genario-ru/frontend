import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { scenarioChapterSceneComponentEditFormSchema } from "../schemas/scenario-chapter-scene-component-edit-form-schema";
import type { ScenarioChapterSceneComponentEditFormSchema } from "../types/scenario-chapter-scene-component-edit-form-types";

export const scenarioChapterSceneComponentEditFormValidateFn =
  createFormValidateFn<ScenarioChapterSceneComponentEditFormSchema>(
    scenarioChapterSceneComponentEditFormSchema,
  );
