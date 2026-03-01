import { z } from "@/lib/zod";

import type { ideasListIdeaCardEditFormSchema } from "../schemas/ideas-list-idea-card-edit-form-schema";

export type IdeasListIdeaCardEditFormSchema = z.infer<
  typeof ideasListIdeaCardEditFormSchema
>;
