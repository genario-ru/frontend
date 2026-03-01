import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { ScenarioComponent } from "@/entrypoints/scenario/component";
import { z } from "@/lib/zod";

const scenarioSearchSchema = z.object({
  chapterId: z.string().optional(),
  sceneId: z.string().optional(),
  tab: z.string().optional(),
});

export type ScenarioSearch = z.infer<typeof scenarioSearchSchema>;

export const Route = createFileRoute("/_app/scenarios/$scenarioId")({
  validateSearch: zodValidator(scenarioSearchSchema),
  component: ScenarioComponent,
});
