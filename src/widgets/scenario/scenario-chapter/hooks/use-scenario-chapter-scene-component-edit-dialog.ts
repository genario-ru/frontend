import { useUpdateScenarioSceneComponent } from "@/actions/scenario/hooks/use-update-scenario-scene-component";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import type { ScenarioChapterSceneComponentEditFormSchema } from "../types/scenario-chapter-scene-component-edit-form-types";
import { scenarioChapterSceneComponentEditFormValidateFn } from "../utils/scenario-chapter-scene-component-edit-form-helpers";

type UseScenarioChapterSceneComponentEditDialogParams = {
  componentId: string;
  componentName: string;
  content: string;
  chapterId: string;
  setIsOpen: (isOpen: boolean) => void;
};

export function useScenarioChapterSceneComponentEditDialog({
  componentId,
  componentName,
  content,
  chapterId,
  setIsOpen,
}: UseScenarioChapterSceneComponentEditDialogParams) {
  const { isMobile } = useBreakpoints();
  const {
    updateScenarioSceneComponent,
    isUpdateScenarioSceneComponentPending,
  } = useUpdateScenarioSceneComponent({ chapterId });

  const form = useAppForm({
    defaultValues: {
      content,
    } as ScenarioChapterSceneComponentEditFormSchema,
    validators: {
      onChange: (data) => {
        if (form.state.submissionAttempts > 0) {
          return scenarioChapterSceneComponentEditFormValidateFn(data);
        }
      },
      onSubmit: scenarioChapterSceneComponentEditFormValidateFn,
    },
    onSubmit: ({ value }) => {
      updateScenarioSceneComponent(
        {
          sceneComponentId: componentId,
          data: { name: componentName, content: value.content },
        },
        { onSuccess: () => setIsOpen(false) },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isMobile,
    isUpdateScenarioSceneComponentPending,
    onFormSubmit,
  };
}
