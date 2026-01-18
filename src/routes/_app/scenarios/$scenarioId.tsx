import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { ScenarioComponent } from "@/entrypoints/scenario/component";

export const Route = createFileRoute("/_app/scenarios/$scenarioId")({
  validateSearch: zodValidator(
    z.object({
      tab: z.optional(z.string()),
    }),
  ),
  component: ScenarioComponent,
});
