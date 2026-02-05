import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { ScenarioSettingsComponent } from "@/entrypoints/scenario-settings/component";

const scenarioSettingsSearchSchema = z.object({
  templateId: z.string().optional(),
  scenarioId: z.string().optional(),
  fromIdeaId: z.string().optional(),
});

export type ScenarioSettingsSearch = z.infer<
  typeof scenarioSettingsSearchSchema
>;

export const Route = createFileRoute("/_app/scenarios/settings")({
  validateSearch: zodValidator(scenarioSettingsSearchSchema),
  component: ScenarioSettingsComponent,
});
