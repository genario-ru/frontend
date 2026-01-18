import { useState } from "react";

import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import type { ScenarioAppMenubarImproveFormSchema } from "../types/scenario-app-menubar-improve-form-types";
import { scenarioAppMenubarImproveFormValidateFn } from "../utils/scenario-app-menubar-improve-form-helpers";

type UseScenarioAppMenubarImproveDialogParams = {
  scenarioId: string;
};

export function useScenarioAppMenubarImproveDialog({
  scenarioId: _scenarioId,
}: UseScenarioAppMenubarImproveDialogParams) {
  const [isImproveDialogOpen, setIsImproveDialogOpen] = useState(false);

  const form = useAppForm({
    defaultValues: {
      prompt: "",
    } as ScenarioAppMenubarImproveFormSchema,
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return scenarioAppMenubarImproveFormValidateFn(data);
        }
      },
      onSubmit: scenarioAppMenubarImproveFormValidateFn,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isImproveDialogOpen,
    isImproveDialogPending: false,
    setIsImproveDialogOpen,
    onFormSubmit,
  };
}
