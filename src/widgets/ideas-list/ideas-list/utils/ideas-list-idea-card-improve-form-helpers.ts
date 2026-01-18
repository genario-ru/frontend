import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { ideasListIdeaCardImproveFormSchema } from "../schemas/ideas-list-idea-card-improve-form-schema";
import type { IdeasListIdeaCardImproveFormSchema } from "../types/ideas-list-idea-card-improve-form-types";

export const ideasListIdeaCardImproveFormValidateFn =
  createFormValidateFn<IdeasListIdeaCardImproveFormSchema>(
    ideasListIdeaCardImproveFormSchema,
  );

export const ideasListIdeaCardImproveFormMatchValidateFn =
  createFormMatchValidateFn<IdeasListIdeaCardImproveFormSchema>(
    ideasListIdeaCardImproveFormSchema,
  );
