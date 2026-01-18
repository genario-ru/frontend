import * as z from "zod";

import type { scenarioAppMenubarImproveFormSchema } from "../schemas/scenario-app-menubar-improve-form-schema";

export type ScenarioAppMenubarImproveFormSchema = z.infer<
  typeof scenarioAppMenubarImproveFormSchema
>;
