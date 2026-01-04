import { createFileRoute } from "@tanstack/react-router";

import { ScenarioComponent } from "@/entrypoints/scenario/component";

export const Route = createFileRoute("/_app/scenarios/$scenarioId")({
  component: ScenarioComponent,
});
