import { useState } from "react";

import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

import type { IdeasListIdeaCardImproveFormSchema } from "../types/ideas-list-idea-card-improve-form-types";
import { ideasListIdeaCardImproveFormValidateFn } from "../utils/ideas-list-idea-card-improve-form-helpers";

export function useIdeasListIdeaCardImproveDialog() {
  const [isImproveDialogOpen, setIsImproveDialogOpen] = useState(false);
  const { showErrorToast } = useToast();

  const form = useAppForm({
    defaultValues: {
      prompt: "",
    } as IdeasListIdeaCardImproveFormSchema,
    onSubmitInvalid: ({ formApi }) => {
      showErrorToast({
        description:
          `${formApi.state.errors[0]}` || "Произошла ошибка при улучшении идеи",
      });
    },
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return ideasListIdeaCardImproveFormValidateFn(data);
        }
      },
      onSubmit: ideasListIdeaCardImproveFormValidateFn,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isImproveDialogPending: false,
    isImproveDialogOpen,
    setIsImproveDialogOpen,
    onFormSubmit,
  };
}
