import { useState } from "react";

import { useUpdateIdea } from "@/actions/ideas/hooks/use-update-idea";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

import type { IdeasListIdeaCardEditFormSchema } from "../types/ideas-list-idea-card-edit-form-types";
import { ideasListIdeaCardEditFormMatchValidateFn } from "../utils/ideas-list-idea-card-edit-form-helpers";

type UseIdeasListIdeaCardEditDialogParams = {
  ideaId: string;
  initialName?: string | null;
  initialDescription?: string | null;
  handleCloseMenu: () => void;
};

export function useIdeasListIdeaCardEditDialog({
  ideaId,
  initialName,
  initialDescription,
  handleCloseMenu,
}: UseIdeasListIdeaCardEditDialogParams) {
  const { showErrorToast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { updateIdea, isUpdateIdeaPending } = useUpdateIdea();

  const form = useAppForm({
    defaultValues: {
      name: initialName ?? "",
      description: initialDescription ?? "",
    } as IdeasListIdeaCardEditFormSchema,
    onSubmitInvalid: ({ formApi }) => {
      showErrorToast({
        description:
          `${formApi.state.errors[0]}` || "Произошла ошибка при изменении идеи",
      });
    },
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return ideasListIdeaCardEditFormMatchValidateFn(data);
        }
      },
      onSubmit: ideasListIdeaCardEditFormMatchValidateFn,
    },
    onSubmit: ({ value }) => {
      updateIdea(
        {
          ideaId: ideaId,
          data: value,
        },
        {
          onSuccess: () => {
            handleCloseMenu();
            setIsEditDialogOpen(false);
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isUpdateIdeaPending,
    isEditDialogOpen,
    onFormSubmit,
    setIsEditDialogOpen,
  };
}
