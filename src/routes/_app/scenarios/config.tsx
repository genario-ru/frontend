import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { ScenarioConfigComponent } from "@/entrypoints/scenario-config/component";

export const Route = createFileRoute("/_app/scenarios/config")({
  validateSearch: zodValidator(
    z.object({
      scenarioId: z.optional(z.string()),
      fromIdeaId: z.optional(z.string()),
    }),
  ),
  component: ScenarioConfigComponent,
});
