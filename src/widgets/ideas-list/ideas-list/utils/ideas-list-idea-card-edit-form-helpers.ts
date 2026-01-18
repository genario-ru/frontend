import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { ideasListIdeaCardEditFormSchema } from "../schemas/ideas-list-idea-card-edit-form-schema";
import type { IdeasListIdeaCardEditFormSchema } from "../types/ideas-list-idea-card-edit-form-types";

export const ideasListIdeaCardEditFormValidateFn =
  createFormValidateFn<IdeasListIdeaCardEditFormSchema>(
    ideasListIdeaCardEditFormSchema,
  );

export const ideasListIdeaCardEditFormMatchValidateFn =
  createFormMatchValidateFn<IdeasListIdeaCardEditFormSchema>(
    ideasListIdeaCardEditFormSchema,
  );
