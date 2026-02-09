import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useGenerateMoreIdeas } from "@/actions/ideas-lists/hooks/use-generate-more-ideas";
import { getApiV1IdeasListsIdeasListIdQueryKey } from "@/codegen/api/product/@tanstack/react-query.gen";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useToast } from "@/shared/hooks/use-toast";

import type { IdeasListAppMenubarMoreIdeasFormSchema } from "../types/ideas-list-app-menubar-more-ideas-form-types";
import { ideasListAppMenubarMoreIdeasFormValidateFn } from "../utils/ideas-list-app-menubar-more-ideas-form-helpers";

type UseIdeasListAppMenubarMoreIdeasDialogParams = {
  ideasListId: string;
};

export function useIdeasListAppMenubarMoreIdeasDialog({
  ideasListId,
}: UseIdeasListAppMenubarMoreIdeasDialogParams) {
  const queryClient = useQueryClient();
  const [isMoreIdeasDialogOpen, setIsMoreIdeasDialogOpen] = useState(false);
  const { showErrorToast } = useToast();

  const { generateMoreIdeas, isGenerateMoreIdeasPending } =
    useGenerateMoreIdeas({
      onSuccess: () => {
        setIsMoreIdeasDialogOpen(false);

        queryClient.invalidateQueries({
          queryKey: getApiV1IdeasListsIdeasListIdQueryKey({
            path: {
              ideasListId: ideasListId,
            },
          }),
        });
      },
      onError: () => {
        showErrorToast({
          description: "Произошла ошибка при выполнении данной операции",
        });
      },
    });

  const form = useAppForm({
    defaultValues: {
      userPrompt: "",
    } as IdeasListAppMenubarMoreIdeasFormSchema,
    onSubmitInvalid: ({ formApi }) => {
      showErrorToast({
        description:
          `${formApi.state.errors[0]}` || "Произошла ошибка при улучшении идеи",
      });
    },
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return ideasListAppMenubarMoreIdeasFormValidateFn(data);
        }
      },
      onSubmit: ideasListAppMenubarMoreIdeasFormValidateFn,
    },
    onSubmit: ({ value }) => {
      generateMoreIdeas({
        path: {
          ideasListId: ideasListId,
        },
        body: value,
      });
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isMoreIdeasDialogOpen,
    isGenerateMoreIdeasPending,
    setIsMoreIdeasDialogOpen,
    onFormSubmit,
  };
}
