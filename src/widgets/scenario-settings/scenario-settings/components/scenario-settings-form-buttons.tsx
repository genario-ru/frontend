import { useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon, BookImageIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { withForm } from "@/lib/tanstack-form";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Skeleton } from "@/shared/components/ui/skeleton";
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
    const router = useRouter();
    const { isScrolledToBottom } = usePageCheckScroll();
    const isLoading = isCreateScenarioPending || isUpdateScenarioPending;

    const onCancelButtonClick = useCallback(() => {
      router.history.back();
    }, [router]);

    const onBackButtonClick = useCallback(() => {
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
    }, [currentStep, form]);

    const leftButton = useMemo(() => {
      if (currentStep === ScenarioSettingsFormSteps.TemplateSelection) {
        return (
          <Button
            type="button"
            size="lg"
            disabled={isLoading}
            onClick={onCancelButtonClick}
          >
            Отмена
          </Button>
        );
      }

      return (
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
      );
    }, [currentStep, isLoading, onCancelButtonClick, onBackButtonClick]);

    const rightButtons = useMemo(() => {
      if (currentStep === ScenarioSettingsFormSteps.ParamsConfiguration) {
        if (!editMode) {
          return (
            <Button
              priority="primary"
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
              icon={<BookImageIcon />}
            >
              Сгенерировать сценарий
            </Button>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Button
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
            >
              Сохранить
            </Button>
            <Button
              priority="primary"
              size="lg"
              disabled={isLoading}
              state={isLoading ? "loading" : "default"}
              icon={<BookImageIcon />}
              onClick={() => form.handleSubmit({ submitAction: "regenerate" })}
            >
              Сохранить и сгенерировать новую версию
            </Button>
          </div>
        );
      }

      return (
        <Button size="lg" disabled={isLoading} icon={<ArrowRightIcon />}>
          Далее
        </Button>
      );
    }, [currentStep, editMode, form, isLoading]);

    return (
      <Island
        row
        roundedTop={false}
        roundedBottom={isScrolledToBottom}
        className={cn("sticky bottom-0 z-1 justify-between duration-200", {
          "shadow-[0_-8px_12px_-4px_rgba(0,0,0,0.10)]": !isScrolledToBottom,
        })}
      >
        {leftButton}
        {rightButtons}
      </Island>
    );
  },
});

export function ScenarioSettingsFormButtonsSkeleton() {
  return (
    <Island row roundedTop={false}>
      <ItemsList
        row
        count={2}
        item={<Skeleton className="rounded-4 h-10 w-32" />}
        className="w-full items-center justify-between"
      />
    </Island>
  );
}
