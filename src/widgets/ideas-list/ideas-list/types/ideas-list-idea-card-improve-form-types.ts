import * as z from "zod";

import type { ideasListIdeaCardImproveFormSchema } from "../schemas/ideas-list-idea-card-improve-form-schema";

export type IdeasListIdeaCardImproveFormSchema = z.infer<
  typeof ideasListIdeaCardImproveFormSchema
>;
