import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { ScenarioSettingsComponent } from "@/entrypoints/scenario-settings/component";

export const Route = createFileRoute("/_app/scenarios/settings")({
  validateSearch: zodValidator(
    z.object({
      scenarioId: z.optional(z.string()),
      fromIdeaId: z.optional(z.string()),
    }),
  ),
  component: ScenarioSettingsComponent,
});
