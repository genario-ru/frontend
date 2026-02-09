import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { ideasListAppMenubarMoreIdeasFormSchema } from "../schemas/ideas-list-app-menubar-more-ideas-form-schema";
import { type IdeasListAppMenubarMoreIdeasFormSchema } from "../types/ideas-list-app-menubar-more-ideas-form-types";

export const ideasListAppMenubarMoreIdeasFormValidateFn =
  createFormValidateFn<IdeasListAppMenubarMoreIdeasFormSchema>(
    ideasListAppMenubarMoreIdeasFormSchema,
  );

export const ideasListAppMenubarMoreIdeasFormMatchValidateFn =
  createFormMatchValidateFn<IdeasListAppMenubarMoreIdeasFormSchema>(
    ideasListAppMenubarMoreIdeasFormSchema,
  );
