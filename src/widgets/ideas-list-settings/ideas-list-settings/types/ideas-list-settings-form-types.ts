import { z } from "@/lib/zod";

import type { createIdeasListSchema } from "../schemas/create-ideas-list-schema";

export type CreateIdeasListSchema = z.infer<typeof createIdeasListSchema>;
