import * as z from "zod";

import type { createIdeasListSchema } from "../schemas/create-ideas-list-schema";

export type CreateIdeasListSchema = z.infer<typeof createIdeasListSchema>;
