import { z } from "@/lib/zod";

import type { ideasListAppMenubarMoreIdeasFormSchema } from "../schemas/ideas-list-app-menubar-more-ideas-form-schema";

export type IdeasListAppMenubarMoreIdeasFormSchema = z.infer<
  typeof ideasListAppMenubarMoreIdeasFormSchema
>;
