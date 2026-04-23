import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SaveIcon,
  WandSparklesIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useMemo } from "react";

import { withForm } from "@/lib/tanstack-form";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { useGoBack } from "@/shared/hooks/use-go-back";
import { usePageCheckScroll } from "@/shared/hooks/use-page-check-scroll";
import { cn } from "@/shared/utils/cn";

import {
  type ScenarioSettingsFormSchema,
  ScenarioSettingsFormSteps,
} from "../utils/scenario-settings-form-helpers";

type ScenarioSettingsFormButtonsProps = {
  formId: string;
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
    formId,
    editMode,
    currentStep,
    isCreateScenarioPending,
    isUpdateScenarioPending,
  }) => {
    const goBack = useGoBack();
    const { isMobile } = useBreakpoints();
    const { isScrolledToBottom } = usePageCheckScroll();
    const isLoading = isCreateScenarioPending || isUpdateScenarioPending;

    const onBackButtonClick = useCallback(() => {
      switch (currentStep) {
        case ScenarioSettingsFormSteps.PrimaryInfo:
          form.setFieldValue(
            "currentStep",
            ScenarioSettingsFormSteps.TemplateSelection,
          );
          break;

        case ScenarioSettingsFormSteps.ParamsConfiguration:
          form.setFieldValue(
            "currentStep",
            ScenarioSettingsFormSteps.PrimaryInfo,
          );
          break;

        default:
          break;
      }
    }, [currentStep, form]);

    const leftButton = useMemo(() => {
      if (currentStep === ScenarioSettingsFormSteps.TemplateSelection) {
        return (
          <Button
            type="button"
            size="lg"
            icon={isMobile ? <XIcon /> : null}
            disabled={isLoading}
            onClick={goBack}
          >
            {!isMobile ? "Отмена" : null}
          </Button>
        );
      }

      return (
        <Button
          size="lg"
          type="button"
          iconPosition="left"
          disabled={isLoading}
          icon={isMobile ? <ArrowLeftIcon /> : null}
          onClick={onBackButtonClick}
        >
          {!isMobile ? "Назад" : null}
        </Button>
      );
    }, [currentStep, isMobile, isLoading, goBack, onBackButtonClick]);

    const rightButtons = useMemo(() => {
      if (currentStep === ScenarioSettingsFormSteps.ParamsConfiguration) {
        if (!editMode) {
          return (
            <Button
              priority="primary"
              size="lg"
              form={formId}
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
              icon={<WandSparklesIcon />}
            >
              Сгенерировать
            </Button>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              size="lg"
              form={formId}
              icon={isMobile ? <SaveIcon /> : null}
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
            >
              {!isMobile ? "Сохранить" : null}
            </Button>
            <Button
              type="button"
              priority="primary"
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
              icon={<WandSparklesIcon />}
              onClick={() => form.handleSubmit({ submitAction: "regenerate" })}
            >
              Сгенерировать
            </Button>
          </div>
        );
      }

      return (
        <Button
          size="lg"
          form={formId}
          disabled={isLoading}
          icon={<ArrowRightIcon />}
        >
          Далее
        </Button>
      );
    }, [currentStep, editMode, form, formId, isLoading, isMobile]);

    return (
      <Island
        row
        roundedBottom={false}
        className={cn("sticky bottom-0 z-1 justify-between duration-200", {
          "shadow-top-1": !isScrolledToBottom,
        })}
      >
        {leftButton}
        {rightButtons}
      </Island>
    );
  },
});

export function ScenarioSettingsFormButtonsSkeleton() {
  const { isScrolledToBottom } = usePageCheckScroll();

  return (
    <Island
      row
      roundedBottom={false}
      className={cn("sticky bottom-0 justify-between duration-200", {
        "shadow-top-1": !isScrolledToBottom,
      })}
    >
      <ItemsList
        row
        noParent
        count={2}
        item={<Skeleton className="rounded-4 h-12 w-32" />}
      />
    </Island>
  );
}
