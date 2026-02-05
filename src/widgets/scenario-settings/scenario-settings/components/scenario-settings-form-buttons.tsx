import { ArrowLeftIcon, ArrowRightIcon, FilmIcon } from "lucide-react";

import { withForm } from "@/lib/tanstack-form";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

type ScenarioSettingsFormButtonsProps = {
  editMode: boolean;
  currentStep: ScenarioSettingsFormSteps;
  isCreateScenarioPending: boolean;
  isUpdateScenarioPending: boolean;
};

export const ScenarioSettingsFormButtons = withForm({
  defaultValues: {} as ScenarioSettingsFormSchema,
  props: {} as ScenarioSettingsFormButtonsProps,
  render: ({
    form,
    editMode,
    currentStep,
    isCreateScenarioPending,
    isUpdateScenarioPending,
  }) => {
    const { isScrolledToBottom } = usePageCheckScroll();
    const isLoading = isCreateScenarioPending || isUpdateScenarioPending;

    const onBackButtonClick = () => {
      if (currentStep === ScenarioSettingsFormSteps.PrimaryInfo) {
        form.setFieldValue(
          "currentStep",
          ScenarioSettingsFormSteps.TemplateSelection,
        );
      } else if (
        currentStep === ScenarioSettingsFormSteps.ParamsConfiguration
      ) {
        form.setFieldValue(
          "currentStep",
          ScenarioSettingsFormSteps.PrimaryInfo,
        );
      }
    };

    return (
      <Island
        row
        roundedTop={false}
        roundedBottom={isScrolledToBottom}
        className={cn("sticky bottom-0 z-1 justify-between duration-200", {
          "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
        })}
      >
        {/* Кнопка слева */}
        {currentStep === ScenarioSettingsFormSteps.TemplateSelection ? (
          <Button type="button" size="lg" disabled={isLoading}>
            Отмена
          </Button>
        ) : (
          <Button
            size="lg"
            type="button"
            iconPosition="left"
            disabled={isLoading}
            icon={<ArrowLeftIcon />}
            onClick={onBackButtonClick}
          >
            Назад
          </Button>
        )}

        {/* Кнопка справа */}
        {currentStep === ScenarioSettingsFormSteps.ParamsConfiguration ? (
          <Button
            variant="primary"
            size="lg"
            disabled={isLoading}
            state={isLoading ? "loading" : "default"}
            icon={editMode ? undefined : <FilmIcon />}
          >
            {editMode ? "Сохранить" : "Сгенерировать сценарий"}
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            disabled={isLoading}
            icon={<ArrowRightIcon />}
          >
            Далее
          </Button>
        )}
      </Island>
    );
  },
});
