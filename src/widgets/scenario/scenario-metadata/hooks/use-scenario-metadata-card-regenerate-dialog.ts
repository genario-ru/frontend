import { useCallback, useState } from "react";

import { useRegenerateScenarioMetadata } from "@/actions/scenario/hooks/use-regenerate-scenario-metadata";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { transformEmptyStrings } from "@/shared/utils/transform-empty-strings";

type UseScenarioMetadataCardRegenerateDialogParams = {
  scenarioId: string;
  platformId: string;
};

type ScenarioMetadataCardRegenerateFormSchema = {
  prompt: string;
};

export function useScenarioMetadataCardRegenerateDialog({
  scenarioId,
  platformId,
}: UseScenarioMetadataCardRegenerateDialogParams) {
  const { isMobile } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  const { regenerateScenarioMetadata, isRegenerateScenarioMetadataPending } =
    useRegenerateScenarioMetadata();

  const form = useAppForm({
    defaultValues: {
      prompt: "",
    } as ScenarioMetadataCardRegenerateFormSchema,
    onSubmit: ({ value, formApi }) => {
      regenerateScenarioMetadata(
        {
          scenarioId,
          data: {
            platformId,
            ...transformEmptyStrings(
              {
                prompt: value.prompt,
              },
              "to-null",
            ),
          },
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            formApi.reset();
          },
        },
      );
    },
  });

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isMobile,
    isOpen,
    isRegenerateScenarioMetadataPending,
    handleOpen,
    handleOpenChange: setIsOpen,
    onFormSubmit,
  };
}

export type ScenarioMetadataCardRegenerateDialogForm = ReturnType<
  typeof useScenarioMetadataCardRegenerateDialog
>["form"];
