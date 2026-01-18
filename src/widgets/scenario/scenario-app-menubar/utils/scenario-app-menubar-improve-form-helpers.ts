import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { scenarioAppMenubarImproveFormSchema } from "../schemas/scenario-app-menubar-improve-form-schema";
import type { ScenarioAppMenubarImproveFormSchema } from "../types/scenario-app-menubar-improve-form-types";

export const scenarioAppMenubarImproveFormValidateFn =
  createFormValidateFn<ScenarioAppMenubarImproveFormSchema>(
    scenarioAppMenubarImproveFormSchema,
  );

export const scenarioAppMenubarImproveFormMatchValidateFn =
  createFormMatchValidateFn<ScenarioAppMenubarImproveFormSchema>(
    scenarioAppMenubarImproveFormSchema,
  );
