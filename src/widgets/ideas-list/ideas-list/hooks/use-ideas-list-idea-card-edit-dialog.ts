import { useState } from "react";

import { useUpdateIdea } from "@/actions/ideas/hooks/use-update-idea";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { updateIdea, isUpdateIdeaPending } = useUpdateIdea({
    onSuccess: () => {
      handleCloseMenu();
      setIsEditDialogOpen(false);
    },
  });

  const form = useAppForm({
    defaultValues: {
      name: initialName ?? "",
      description: initialDescription ?? "",
    } as IdeasListIdeaCardEditFormSchema,
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return ideasListIdeaCardEditFormMatchValidateFn(data);
        }
      },
      onSubmit: ideasListIdeaCardEditFormMatchValidateFn,
    },
    onSubmit: ({ value }) => {
      updateIdea({
        path: {
          ideaId: ideaId,
        },
        body: value,
      });
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
