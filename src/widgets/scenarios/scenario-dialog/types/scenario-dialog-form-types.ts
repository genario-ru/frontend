import * as z from "zod";

import type { createScenarioSchema } from "../schemas/create-scenario-schema";

export type CreateScenarioSchema = z.infer<typeof createScenarioSchema>;
