import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useGenerateMoreIdeas } from "@/actions/ideas-lists/hooks/use-generate-more-ideas";
import { getApiV1IdeasListsByIdeasListIdQueryKey } from "@/codegen/api/product";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import type { IdeasListAppMenubarMoreIdeasFormSchema } from "../types/ideas-list-app-menubar-more-ideas-form-types";
import { ideasListAppMenubarMoreIdeasFormValidateFn } from "../utils/ideas-list-app-menubar-more-ideas-form-helpers";

type UseIdeasListAppMenubarMoreIdeasDialogParams = {
  ideasListId: string;
};

export function useIdeasListAppMenubarMoreIdeasDialog({
  ideasListId,
}: UseIdeasListAppMenubarMoreIdeasDialogParams) {
  const { isMobile } = useBreakpoints();
  const queryClient = useQueryClient();
  const [isMoreIdeasDialogOpen, setIsMoreIdeasDialogOpen] = useState(false);

  const { generateMoreIdeas, isGenerateMoreIdeasPending } =
    useGenerateMoreIdeas();

  const form = useAppForm({
    defaultValues: {
      userPrompt: "",
    } as IdeasListAppMenubarMoreIdeasFormSchema,
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return ideasListAppMenubarMoreIdeasFormValidateFn(data);
        }
      },
      onSubmit: ideasListAppMenubarMoreIdeasFormValidateFn,
    },
    onSubmit: ({ value }) => {
      generateMoreIdeas(
        {
          ideasListId: ideasListId,
          data: value,
        },
        {
          onSuccess: () => {
            setIsMoreIdeasDialogOpen(false);

            queryClient.invalidateQueries({
              queryKey: getApiV1IdeasListsByIdeasListIdQueryKey({
                ideasListId: ideasListId,
              }),
            });
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isMobile,
    isMoreIdeasDialogOpen,
    isGenerateMoreIdeasPending,
    setIsMoreIdeasDialogOpen,
    onFormSubmit,
  };
}
